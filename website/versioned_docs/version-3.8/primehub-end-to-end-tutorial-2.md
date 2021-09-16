---
id: version-3.8-primehub-end-to-end-tutorial-2
title: 2 - Train and Tune the Model
description: Using PrimeHub from Training to Serving the Model
original_id: primehub-end-to-end-tutorial-2
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
</div>
<br>

In this tutorial we will train our model using the labeled data from [Part 1](primehub-end-to-end-tutorial-1), learn how to tweak parameter values, and submit our notebook as a job.

## Prerequisites

To track our experiments, we must first install [MLflow](https://mlflow.org/), which is available as part of [PrimeHub Apps](primehub-app).

### Install MLflow 

In the **User Portal** left sidebar, click **Apps** and then click the **+ Applications** button. 

Find **MLflow** and click **Install to PrimeHub** .

![](assets/primehub-end-to-end-tutorial-install-mlflow-1.png)

Enter the **Name** as **mlflow**.

![](assets/primehub-end-to-end-tutorial-install-mlflow-2.png)

Click the **Create** button.

![](assets/primehub-end-to-end-tutorial-install-mlflow-3.png)

When MFflow has finished installing, you will see the green **Ready** label.

![](assets/primehub-end-to-end-tutorial-install-mlflow-4.png)

### Connect MLflow to PrimeHub

We can now connect MLflow to PrimeHub, which will enable the automatic exporting of notebook run results into MLflow.

On the **Apps** page, find MLflow and click **Manage**. 

![](assets/primehub-end-to-end-tutorial-configure-mlflow-1.png)

Make a note of the **App URL** and **Service Endpoints** values.

![](assets/primehub-end-to-end-tutorial-configure-mlflow-2.png)

Click **Settings** in the left sidebar and then click the **MLflow** tab.

![](assets/primehub-end-to-end-tutorial-configure-mlflow-3.png)

In the **MLflow Tracking URI** text field enter the **service endpoints** value we copied earlier, preceded by ‘http://’. 

E.g. `http://your-service-endpoints`

In the **MLflow UI URI** text field enter the **App URL** value we copied earlier. Then, click the **Save** button.

![](assets/primehub-end-to-end-tutorial-configure-mlflow-4.png)


## Train the Model

Now that MLflow is installed and connected to PrimeHub, we can go back to our Notebook and start training the model.

Run all cells in the **Start Training** section of the script.

![](assets/primehub-end-to-end-tutorial-start-training.png)

The script will parse our labeling results (stored in JSON files at the end of [Part 1](primehub-end-to-end-tutorial-1)) and copy the images into four folders located in  `~/<group_name>/screw`:

- `data/train/good`: Good screw images as the training dataset
- `data/train/bad`: Bad screw images as the training dataset
- `data/val/good`: Good screw images as the validation dataset
- `data/val/bad`: Bad screw images as the validation dataset

The script also sets the experiment name to **tutorial_screw_train** and enables the [MLflow autologging API](https://www.mlflow.org/docs/latest/python_api/mlflow.tensorflow.html#mlflow.tensorflow.autolog), which will automatically export our run to MLflow for experient tracking. 

Checking the results at the end of the script, we can see that a validation accuracy of around 88% was achieved after training.
![](assets/primehub-end-to-end-tutorial-after-training.png)

## Input Parameters and API Access

Now that we have a runnable notebook to train the screw classification model, we can tweak parameter values and then submit our notebook as a job via the [PrimeHub Notebook Extension](ph-notebook-extension).

### Tweak Parameters 

First, let's allow the editing of  the `base_learning_rate` input parameter. This will enable us to submit jobs with a different learning rate and compare model accuracy.

Click **cell 20** where the default `base_learning_rate` is configured.

![](assets/primehub-end-to-end-tutorial-select-cell.png)

With cell 20 selected, click the **Property Inspector** button.

![](assets/primehub-end-to-end-tutorial-property-inspector.png)

Click **Add Tag** and enter **parameters** as the tag name, then click the **+** icon to add the tag. Adding this tag allows us to override the `base_learning_rate`.

![](assets/primehub-end-to-end-tutorial-property-inspector-parameters.png)

### Set up an API Token

To submit the notebook as a job, we need to set up an [API Token](tasks/api-token).

Click on the **PrimeHub** dropdown menu in the toolbar, then click **API Token**.

![](assets/primehub-end-to-end-tutorial-extension-api-token.png)

In the pop-up dialog you will see the message ``Visit here to access your API token.`` Click the **here** link in the pop-up dialogue and the PrimeHub **API Token** page will open in a new tab.

![](assets/ph-extension-token.png)

On the **API Token** page, click the **Request API Token** button.

![](assets/tutorial_request_api_token.png)

Click the **Copy** button to copy the API token to your clipboard.

![](assets/tutorial_copy_api_token.png)

Go back to your notebook and paste the API token into the text field,  then click **OK**.

![](assets/primehub-end-to-end-tutorial-extension-api-token-value.png)

## Submit Notebook Jobs

With API access now configured, we can submit notebook jobs. To compare the effect of different `base_learning_rate` values on results, we will submit two jobs.

Click the **PrimeHub** dropdown in the toolbar again, but this time click **Submit Notebook as Job**.

![](assets/primehub-end-to-end-tutorial-extension-submit.png)

In the pop-up dialog, we can adjust the following settings:
- **Instance Type** to adjust computational resources
- **Image** to execute the notebook in different environments
- **Notebook Parameters** to alter parameter values

### Job 1: Base Learning Rate of 0.01
 
Leave the **Instance Type** and **Image** settings as default, and enter the following:

- Job Name: `tf-screw-training-lr-0.01`
- Notebook Parameters: `base_learning_rate = 0.01`

Click **Submit** to start training with a `base_learning_rate` of  0.01.

![](assets/primehub-end-to-end-tutorial-submit-job-001.png)

### Job 2: Base Learning Rate of 0.05

For the second job, as above, leave **Instance Type** and **Image** settings as default, then enter the following:

- Job Name: `tf-screw-training-lr-0.05`
- Notebook Parameters: `base_learning_rate = 0.05`

![](assets/primehub-end-to-end-tutorial-submit-job-005.png)

Click **Submit** to start the second job.

## PrimeHub Jobs

The status of the jobs can be found in [PrimeHub Jobs](job-submission-feature), by clicking **Jobs** in the left sidebar of the PrimeHub **User portal**

Here we can see our two recent jobs have succeeded. The results of each notebook training job has also been automatically exported to **MLflow**. 

![](assets/tutorial_jobs_succeeded.png)

## Conclusion

In this tutorial we have installed MLflow, connected it to PrimeHub, trained our model, and submitted two jobs, each with a different parameter value.

In the next tutorial, we will analyze the two sets of results, manage the trained models, and deploy the best model to the cloud.



