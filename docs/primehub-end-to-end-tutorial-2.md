---
id: primehub-end-to-end-tutorial-2
title: 2 - Train and Tune the Model
description: Using PrimeHub from Training to Serving the Model
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
</div>
<br>

In this tutorial, we will organize the labeled data and feed into the model in PrimeHub Notebooks. Also, we will make our notebook as a repeatable job to perform parameters tuning.

## What we need?

- Install [MLflow]() in PrimeHub Apps.
    1. Click `Install to PrimeHub` in MLflow.
    ![](assets/primehub-end-to-end-tutorial-install-mlflow-1.png)
    2. Fill in `Name` field with `mlflow`.
    ![](assets/primehub-end-to-end-tutorial-install-mlflow-2.png)
    3. Click `Create` button.
    ![](assets/primehub-end-to-end-tutorial-install-mlflow-3.png)
    4. The `MLflow` app is installed successfully.
    ![](assets/primehub-end-to-end-tutorial-install-mlflow-4.png)

- Configure [MLflow]() app in your group to keep track of experiments/runs.
    1. Click `Manage` to go to the detail page of MLflow app.
    ![](assets/primehub-end-to-end-tutorial-configure-mlflow-1.png)
    2. Copy the values of `App URL` and `Service Endpoints`.
    ![](assets/primehub-end-to-end-tutorial-configure-mlflow-2.png)
    3. Click `Settings` in sidebar menu and navigate to `MLflow` tab.
    ![](assets/primehub-end-to-end-tutorial-configure-mlflow-3.png)
    4. Fill in `MLflow Tracking URI` with `http://`+`Service Endpoints`, and fill in `MLflow UI URI` with `App URL`, then click `Save`.
    ![](assets/primehub-end-to-end-tutorial-configure-mlflow-4.png)


## Train the Model

Now you can run all cells after `Start Training` section.
![](assets/primehub-end-to-end-tutorial-start-training.png)

It will parse the JSON content and put all the images into the folder `~/<group_name>/screw` in the following structure:
- `data/train/good`: Good screw images as the training dataset
- `data/train/bad`: Bad screw images as the training dataset
- `data/val/good`: Good screw images as the validation dataset
- `data/val/bad`: Bad screw images as the validation dataset

Also, we set the experiment name with `tutorial_screw_train` and enable [MLflow autologging API](https://www.mlflow.org/docs/latest/python_api/mlflow.tensorflow.html#mlflow.tensorflow.autolog) to automatically export our execution to MLflow app for experiment tracking.
![](assets/primehub-end-to-end-tutorial-mlflow-cell.png)

We can see that achieved around 88% of validation accuracy after training.
![](assets/primehub-end-to-end-tutorial-after-training.png)

## Send Notebook as Job for Parameter Tuning

Now, we have a runnable notebook to train the screw classification model.

Next, we can access [PrimeHub Notebook Extension](ph-notebook-extension) to submit our notebook as job to perform parameters tuning.

Let's configure the learning rate to see how model accuracy can be better!

Click on the `cell 20` with default `base_learning_rate` configured.
![](assets/primehub-end-to-end-tutorial-select-cell.png)

Click on `Property Inspector` button.
![](assets/primehub-end-to-end-tutorial-property-inspector.png)

Click on `Add Tag`, fill in `parameters`, and click on `+` icon. This makes the feed parameters to overwrite the `base_learning_rate`.
![](assets/primehub-end-to-end-tutorial-property-inspector-parameters.png)

To submit notebook as a job, we need to setup [API Token]() at first.

Click on PrimeHub button to expand extension menu, then click `API Token`.
![](assets/primehub-end-to-end-tutorial-extension-api-token.png)

In the pop-up dialog, click `here` to access `API Token` page.
![](assets/ph-extension-token.png)

In the `API Token` page, click `Request API Token`.
![](assets/tutorial_request_api_token.png)

After the token displayed, click `Copy` to store our token value.
![](assets/tutorial_copy_api_token.png)

Back to notebooks, click on PrimeHub button and select `API Token` again.
![](assets/primehub-end-to-end-tutorial-extension-api-token.png)

We can paste our token here then click `OK`.
![](assets/primehub-end-to-end-tutorial-extension-api-token-value.png)

Next, click on PrimeHub button and select `Submit Notebook as Job`.
![](assets/primehub-end-to-end-tutorial-extension-submit.png)

In the pop-up dialog, we can adjust instance type to gain more running resources, or we can adjust image to make notebook execution on different environment. Here is the settings: 
- Instance Type: default value
- Image: default value
- Job Name: `tf-screw-training-lr-0.01`.
- Notebook Parameters: `base_learning_rate = 0.01`

Click `Submit` to start training with `base_learning_rate = 0.01`.
![](assets/primehub-end-to-end-tutorial-submit-job-001.png)

Again, click PrimeHub button and select `Submit Notebook as Job`. Let's submit another training with `base_learning_rate = 0.05` with following settings:
- Instance Type: default value
- Image: default value
- Job Name: `tf-screw-training-lr-0.05`.
- Notebook Parameters: `base_learning_rate = 0.05`

![](assets/primehub-end-to-end-tutorial-submit-job-005.png)

Back to PrimeHub UI and go to [PrimeHub Jobs](), our two submitted jobs are succeeded! The respective notebook training results will be automatically exported to `MLflow` app.
![](assets/tutorial_jobs_succeeded.png)

In the next tutorial, we will analyze these two training results, manage trained models, and deploy the best model to cloud environment.
