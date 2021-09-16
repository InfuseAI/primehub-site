---
id: version-3.8-primehub-app-builtin-streamlit
title: Streamlit
description: Streamlit
original_id: primehub-app-builtin-streamlit
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

## Introduction

Streamlit turns data scripts into shareable web apps in minutes. All in Python. All for free. No front‑end experience required.

Property    | Description
------------|------
App Image | [`infuseai/streamlit`](https://hub.docker.com/r/infuseai/streamlit)
Official Website  | https://streamlit.io/

## Screenshots
![](assets/primehub-app-builtin-streamlit.png)

## Usage

1. Create a Streamlit app
1. In the create page, fill the `FILE_PATH` variable. The server is run as the command `streamlit run ${FILE_PATH}`. You can fill a Streamlit python from:
   - Local file (e.g. `/project/<group-name>/path/to/your/file`)
   - Web URL (e.g. `https://raw.githubusercontent.com/streamlit/streamlit-example/master/streamlit_app.py`)
1. Open the Streamlit server you just created
1. You can see the Streamlit dashboard

## External Dependencies
You can manage external dependencies by adding:
- `requirements.txt` for Python dependencies managed by `pip`([docs](https://pip.pypa.io/en/stable/user_guide/#))
- `packages.txt` for Debian dependencies managed by `apt-get`([docs](https://linux.die.net/man/8/apt-get))

At the begin of statring, Streamlit will look for requirements files in the same directory of `FILE_PATH` and install external dependencies. Your Streamlit app is ready while the "You can now view your Streamlit app in your browser." shows up in the app logs.
![](assets/primehub-app-builtin-streamlit-opencv-example.png)

If there are a lots of dependencies, it may take some time to install while starting your app. Any change not related to dependencies should show up immediately. Remeber to restart your app after adding new dependencies.
