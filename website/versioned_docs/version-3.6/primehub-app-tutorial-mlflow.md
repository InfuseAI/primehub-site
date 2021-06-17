---
id: version-3.6-primehub-app-tutorial-mlflow
title: Create an MLflow server
description: Create an MLflow server
original_id: primehub-app-tutorial-mlflow
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

This tutorial covers the basic flow to help you get started with MLflow in PrimeHub.

## Install MLflow
First, you need to install it in the `Apps` tab. Please check the [Overview](primehub-app) section to learn how to install an App. In the installing process, you can change the `backend store` and `artifact store` environment variables. If you don't know the meaning of the environment variables, can just use the default values or check the [MLflow Official Doc](https://mlflow.org/docs/latest/tracking.html#mlflow-tracking-servers) and [Our Setting](primehub-app-builtin-mlflow) for more details.

## MLflow UI
PrimeHub shows the app's state in the `Apps` tab. You can open the MLflow UI by clicking `Open` after the state becomes `Ready`.

![](assets/app_tutorial_mlflow_app_block.png)

It will open a new window and show the MLflow UI. You can see your experiments and runs in this UI. We will show you how to record a run in an experiment by using the PrimeHub Notebook function in the next section.

![](assets/app_tutorial_mlflow_ui.png)

## Use MLflow Tracking in PrimeHub
### What we need?

- The image `infuseai/docker-stacks:tensorflow-notebook-v2-4-1-5b5a244c`
- An instance type >= minimal requirement (CPU=1, GPU=0, Mem=2G)
- The prepared notebook file of the example

    Download [app_tutorial_mlflow_demo_notebook.ipynb](assets/app_tutorial_mlflow_demo_notebook.ipynb)

- Choose a group with enabled Shared Volume (a.k.a Group Volume)

>Please have the image, the instance type on PrimeHub, or request administrators for assistance before we start.

### Steps

1. Enter Notebook from User Portal, select the image, the instance type, and start a notebook.

    ![](assets/app_tutorial_mlflow_notebook.png)

2. From File Browser of Notebook, navigate into the directory of `<group_name>`  which is a Group Volume; here **mlflow** is our working group.

3. While inside the group volume, copy/drag the downloaded `app_tutorial_mlflow_demo_notebook.ipynb` there in File Browser and open it.

4. Open the notebook, and change the line `mlflow.set_tracking_uri("http://app-mlflow-32adp:5000/")` into the proper link based on the detail page in the `Apps` tab.

    ![](assets/app_tutorial_mlflow_app_block2.png)

5. Copy the Service Endpoint value and replace `app-mlflow-32adp:5000` in the notebook to this value.

    ![](assets/app_tutorial_mlflow_app_detail.png)

6. **Run All Cells** in the notebook, you will see a new run in `internal-experiment` in the MLflow UI.

    ![](assets/app_tutorial_mlflow_run.png)

That's the basic use of how to track your machine learning experiments by using MLflow and PrimeHub.

## Binding MLflow App to Models

With a running MLflow App, we can bind MLflow service to [Models Management](model-management). Once binding, on Models, we can view registered models, furthermore deploy these models via Deployments at ease on PrimeHub. See [Group Setting - MLflow](group-setting#mlflow) to bind your MLflow App.
