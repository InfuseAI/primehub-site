---
id: version-3.9-primehub-end-to-end-tutorial-4
title: 4 - Build the Web App
description: Using PrimeHub from Training to Serving the Model
original_id: primehub-end-to-end-tutorial-4
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
</div>
<br>

In this tutorial, we will add a web interface to our deployed model using [Streamlit](primehub-app-builtin-streamlit). This will allow us to upload images, view results, and adjust the threshold for detecting a good or bad screw in a web browser.

## Before We Start

Download [tutorial_screw_app.py](assets/tutorial_screw_app.py) to your local computer and then, in your Notebook Server, upload it to `~/<group_name>/screw`.


## Install Streamlit


Install Streamlit in PrimeHub Apps

![](assets/primehub-end-to-end-tutorial-web-app-1.png)

On the Streamlit configuration page, enter **Screw Defect Detection** in the **Name** field.

In the **Environment Variables** section, enter the following:

For **FILE_PATH**, delete the default value, and then enter the path to the **tutorial_screw_app.py** we just uploaded, e.g.:

 `/project/<group_name>/screw/tutorial_screw_app.py`

Click **+ Add Field** to add a new **Environment Variable**.

For the variable **name** enter **ENDPOINT**. For the variable **value** enter the Endpoint value we copied from our running deployed model in the [previous section](primehub-end-to-end-tutorial-3#test-deployed-model).

![](assets/primehub-end-to-end-tutorial-web-app-2a.png)

Scroll to the bottom of the page and click the Create button to finish installing Streamlit.

## Using the Web Interface

Once Streamlit is ready, click **Open** to launch the web interface.

![](assets/primehub-end-to-end-tutorial-web-app-4.png)

Click the **Browse Files** button at the top left to upload images of screws. The uploaded images, along with their inference results, will be shown on the right.

![](assets/primehub-end-to-end-tutorial-web-app-5.png)

Adjust the layout of the screw images by selecting a **Column Size** in the left sidebar. The threshold to determine good and bad screws can also be adjusted with the **Threshold** slider.

## Conclusion

Congratulations! We've finished the tutorial and deployed our model, complete with web interface. Head to the summary to review what we've done.



