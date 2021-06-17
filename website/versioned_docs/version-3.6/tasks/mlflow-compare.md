---
id: version-3.6-mlflow-compare
title: Compare MLflow Models
sidebar_label: Compare MLflow Models
original_id: mlflow-compare
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>
<br>

In this tutorial, we will show how to record parameters, metrics, and artifacts from notebooks or jobs to MLflow server. Then, we can view models and compare records in MLflow server.

## What we need?

- A MLflow server or [create an MLflow server](primehub-app-tutorial-mlflow) in PrimeHub Apps
- The image `infuseai/docker-stacks:tensorflow-notebook-v2-4-1-dbdcead1`
- An instance type >= minimal requirement (CPU=1, GPU=0, Mem=2G)
- The prepared notebook file of the example

    Download [task_mlflow_demo_compare_notebook.ipynb](assets/task_mlflow_demo_compare_notebook.ipynb)

- Choose a group with enabled Shared Volume (a.k.a Group Volume)
- The [API token](api-token)

>Please have the image, the instance type on PrimeHub, or request administrators for assistance before we start.

## Steps

1. Enter Notebook from User Portal, select the image, the instance type, and start a notebook.

    ![](assets/task_mlflow_notebook.png)

2. From File Browser of Notebook, navigate into the directory of `<group_name>`  which is a Group Volume; here **mlflow** is our working group.

3. While inside the group volume, copy/drag the downloaded `task_mlflow_demo_compare_notebook.ipynb` there in File Browser and open it.
   
4. Replace `TRACKING_URI` in the notebook to the service endpoint of your MLflow server.

5. **Run All Cells** in the notebook, you will see a new run in `compare-experiment` in the MLflow UI. Click on the `Start Time` to view details.
  
    ![](assets/task_mlflow_compare_run.png)

6. Scroll down to the artifects and click on the model folder to register model.
  
    ![](assets/task_mlflow_register_model.png)

7. In the `Models` page, you can see a new register model.
  
    ![](assets/task_mlflow_view_model.png)

8. In the notebook, edit it to log parameters, metrics, and artifacts.
   
    ![](assets/mlflow_log.png)

9. Set the API token.

    ![](assets/task_mlflow_set_api_token.png)   

10. Submit notebook as job.
   
    ![](assets/task_mlflow_submit_job.png)

11. You can see the job status in PrimeHub `Jobs`.

    ![](assets/task_mlflow_running_job.png)

12. After job done, a notebook is added, which is the result.

    ![](assets/task_mlflow_job_done.png)

13. Register the new run with the same model name. In the `Models` page, the latest version is `Version 2`.
  
    ![](assets/task_mlflow_model_version.png)

14. Click on the model name, you can see and compare those versions.

    ![](assets/task_mlflow_model_result.png)
    
    ![](assets/task_mlflow_compare_detail.png)

