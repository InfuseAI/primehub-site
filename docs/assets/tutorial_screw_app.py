import json

import requests
import streamlit as st

endpoint = "<your_endpoint_url>"


@st.cache(show_spinner=False, suppress_st_warning=True)  # Avoid redundant API calls for the same image
def inference(imageBytes):
    res = requests.post(endpoint, files={'binData': imageBytes})
    content = json.loads(res.content)
    score = content['data']['tensor']['values'][0]
    return score


def main():
    st.set_page_config(layout='wide')

    st.title('Screw Defect Detection')

    files = st.sidebar.file_uploader('Upload Images:', type=['png', 'jpeg', 'jpg'], accept_multiple_files=True)

    threshold = st.sidebar.slider('Threshold:', min_value=-5.0, max_value=5.0, value=0.0, step=0.1)

    col_size = st.sidebar.selectbox('Column Size:', range(1, 11), index=4)
    cols = st.beta_columns(col_size)
    cells = []

    if files:
        # Display
        for i, file in enumerate(reversed(files)):
            imageBytes = file.read()
            cols[i % col_size].text(file.name)
            cols[i % col_size].image(imageBytes)
            cells.append({
                'image': imageBytes,
                'text': cols[i % col_size].info('Processing')
            })

        # Inference and show result
        for cell in reversed(cells):
            score = inference(cell['image'])
            if score > threshold:
                cell['text'].success(f'Good (Score: {score:.2f})')
            else:
                cell['text'].error(f'Bad (Score: {score:.2f})')


if __name__ == "__main__":
    main()
