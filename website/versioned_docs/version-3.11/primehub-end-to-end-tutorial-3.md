---
id: version-3.11-primehub-end-to-end-tutorial-3
title: 3 - Compare, Register and Deploy the Model
sidebar_label: 3 - Deploy Model
description: Compare, Register and Deploy the Model
original_id: primehub-end-to-end-tutorial-3
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
</div>

## Introduction

In the previous part, we used PrimeHub Notebook to train and manage the base model. In this part, we will:

1. Compare the results of these two experiment. 
2. The experiment with the best performance will be registered in PrimeHub Models
3. Deploy as an online API service via PrimeHub's Model Deployment feature.
4. Use the command line to test the API service.

## Prerequisites

### 1. Enable Model Deployment
    
Before we get started, enable the Model Deployment toggle in your group settings.

![](assets/primehub-end-to-end-tutorial-model-deployment.png)
    
### 2. Model pre-package docker image

There are two methods to get your pre-package docker image:

1. You can use our model pre-package docker image:
    
    Image Name: `infuseaidev/tensorflow2-prepackaged:screw-classification`
    
2. You can [build your own pre-packaged docker](primehub-end-to-end-tutorial-advanced-3) image by followed the advanced guide.


## Step 1: Compared and Register the model

### 1. Compare the model in the MLFlow server

To compare the results, click the checkbox next to each run to select them, then click the **Compare** button.


→ MLFlow server UI → Choose two runs → Click Compare.

![](assets/primehub-end-to-end-tutorial-mlflow-compare-results.png)
    
### 2. Choose the best run and register the model

Check the best score in Metrics

![](assets/primehub-end-to-end-tutorial-mlflow-check-score.png)

At the top of the page, click the **Run ID** link for the run.

![](assets/primehub-end-to-end-tutorial-mlflow-run-id.png)

In the Artifact, register the model folder as our model registry.

![](assets/primehub-end-to-end-tutorial-mlflow-register-model-1.png)

Enter the model information to register the model.

<img src="assets/primehub-end-to-end-tutorial-mlflow-register-model-2.png" alt="drawing" width="500"/>

## Step 2: Deploy and test the model service

### 1. Model Deployment
    
On the **Models** page in the PrimeHub user portal, click our managed model with the name **tf-screw-model**.

![](assets/tutorial_models_managed.png)

The following page shows all versions of the **tf-screw-model** model. Click the **Deploy** button for **Version 1**.

![](assets/tutorial_models_version.png)

In the **Deploy Model** dialog, select **Create new deployment** from the **Deployment** dropdown and then click **OK**.

![](assets/tutorial_models_create_new_deployment.png)

Fill in the Deployment information:

| Variable | Value |
| --- | --- |
| Deployment Name | tf-screw-deployment |
| Model image | infuseai/tensorflow2-prepackaged:screw-classification |
| InstanceTypes | CPU 1 |

Click the **Deploy** button, and you will be redirected to the **Deployments** page.

To view the details of the deployment, click the **tf-screw-deployment** card.

> If you want to build your custom deployment logic and environment, you can see the information in the [advanced tutorial section](primehub-end-to-end-tutorial-advanced-3).
    

### 2. Test the model service is available to use

Run the following command line:
    
```bash
curl -F 'binData=@data/arrange/val/good/000.png' <primehub-deploy-url>
```
    
You can get the output result:
    
```bash
{"data":{"names":["t:0"],"tensor":{"shape":[1,1],"values":[2.065972089767456]}},"meta":{"requestPath":{"model":"infuseai/tensorflow2-prepackaged:screw-classification"}}}
```
    

## Conclusion

In this tutorial, we compared and selected a suitable model using MLflow, deployed a model, and tested the model with sample data.

## Next Section

In the next article, we will add a web application interface to our model using Streamlit, another app available through PrimeHub Apps.