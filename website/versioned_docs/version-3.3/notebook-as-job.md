---
id: version-3.3-notebook-as-job
title: Submit a Notebook as a Job
description: Submit a Notebook as a Job
sidebar_label: Notebook as a Job
original_id: notebook-as-job
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

## Simple Usecase

>The working group's Group Volume is required.

1. Select **API Token** from the extension and add your own token. See [How to generate a API Token](tasks/api-token).
   
    ![](assets/ph-extension-token.png)

2. Launch Notebook instance from User Portal by using a base image from InfuseAI or a image built on top of a base image from InfuseAI.

3. Enter the **Group Volume** directory of the current working group, open an empty notebook file there.
    >If the notebook is not located in the group volume, you may see *"Now, we only support notebook under group volume. Please move your notebook into your group volume.*" when submitting it.

4. Add two cells.
   
   ```
   !pip install camelcase
   ```

    Here we comment out `start=1` & `end=10` because we will feed the parameters into notebook later.

    ```
    import time
    import camelcase

    camel = camelcase.CamelCase()

    txt = "this method capitalizes the first letter of each word."

    #start = 1
    #end = 10

    print("Counting from 1 to 10:")
    for num in range(start, end + 1):
        time.sleep(1)
        print('{}: {}'.format(num, camel.hump(txt)))
    ```



5. Select **Submit Notebook as Job** from the extension
   
    1.  Select Instance Type for the Job.
    2.  Select Image for the instance. (Use a base image from InfuseAI or a image built on top of a base image from InfuseAI)
    3.  Fill in **Job Name** you want.
    4.  Fill in **Notebook Parameters** `start=1; end=10`.(using `;` as separator, *new lin*e is not allowed.)
    5.  Submit.

    ![](assets/ph-extension-sub-nb.png)

6. View the job status by clicking the link.

    ![](assets/ph-extension-success.png)

7. Once the job succeeded, go back to Notebook. There is a generated notebook file with the result beside the original notebook file. We can notice the parameter we gave is inserted as the first cell.
   
   ![](assets/nb-as-job-output.png)

