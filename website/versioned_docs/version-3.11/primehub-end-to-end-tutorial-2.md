---
id: version-3.11-primehub-end-to-end-tutorial-2
title: Part 2 - Train and Manage the Model
sidebar_label: 2 - Train & Manage Model
description: Train and Manage the Model
original_id: primehub-end-to-end-tutorial-2
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
</div>

## Introduction

In this tutorial, we will do the following.

1. Train our model using the labeled data.
2. Use MLFLow to manage the model parameters, metrics, and artifact files.

## What is MLFlow?

MLFlow is an open-source platform to manage the machine learning model, including training parameters, metrics, and artifacts. All the data scientists can check the information in the platform and know how to improve the machine learning model. Find out more at the following links.


- [MLflow Website](https://mlflow.org/)
- [MLflow Documentation](https://mlflow.org/docs/latest/index.html)
    

The PrimeHub platform integrates MLFlow as the model management function. You can see the result on the [PrimeHub model page](model-management-tutorial). You can see the detailed information here:


## Step 1: Create the MLflow Server

To track our experiments, we must first install MLflow, which is available as part of PrimeHub Apps. Use the guide at the following link to install MLflow:
    
- [Create an MLflow server](primehub-app-tutorial-mlflow)
    

## Step 2: Training the model


### 1. Create Jupyter Notebook
    
PrimeHub UI → User portal → Notebook → Choose the instance type and Jupyter image → Start the Notebook

| Variable | Value |
| --- | --- |
| Instance Type | CPU 2 |
| Image | Tensorflow 2.5 |

When the notebook has started, you will see the My Server Information page:
    
![](assets/primehub-end-to-end-tutorial-server-information.png)
        
### 2. Download the tutorial project code
    
Jupyter Notebook → Create terminal → Run the following commands
        
```bash
$ cd <group-name>
$ git clone https://github.com/InfuseAI/primehub-screw-detection.git
$ cd primehub-screw-detection
```
        
Open the Notebook and modify the variables
                
```bash
# Kaggle connection
kaggle_username = <kaggle-username>
kaggle_key = <kaggle-key>

# Label Data file
label_data_file_path = "project-6-at-2022-09-19-04-17-b9f72b54.json"
```

> More information about obtaining your Kaggle username and key can be found in the [Kaggle API documentation](https://www.kaggle.com/docs/api)
        
### 3. Run the Notebook and train the model
    
![](assets/primehub-end-to-end-tutorial-train-model.png)
    

> Note: If you want to run the training Notebook in the background job, we also support submitting the Jupyter Notebook as a job method. Please see the [advanced tutorial section](primehub-end-to-end-tutorial-advanced-2) for details.
> 

## Step 3: Use MLFlow to manage the model

In the training code, we write the following code. MLFlow can help us record the parameters, metrics, and artifact files into the platform. We can manage the model via the MLFlow platform.
    
```python
import mlflow
mlflow.set_experiment("tutorial_screw_train")
mlflow.tensorflow.autolog()
```
    
As a result, we can go back to the PrimeHub user portal, open the MLFlow platform and see the model result in the MLFlow server.
    
→ PrimeHub User portal → models → MLFlow UI → (In MLFlow) Experiments → tutorial_screw_train

![](assets/primehub-end-to-end-tutorial-experiment.png)
    

## Step 4: Change the parameter for tuning the model

When we successfully build the machine learning model, we need to give experiments for tuning the machine learning model to be the best. 

1. Change the variable value and run the Notebook again:
    
    Please change the `base_learning_rate` variable value and run the Notebook again:
    
    `base_learning_rate = 0.01` → `base_learning_rate = 0.05`
    
2. Then you will see the second experiment result in MLFlow platform.
    
![](assets/primehub-end-to-end-tutorial-mlflow-experiments.png)
    

## Conclusion

In this tutorial we have done the following. 

1. Installed MLflow in PrimeHub Apps
2. Connected the MLFlow to PrimeHub in the PrimeHub settings
3. Trained our model in PrimeHub Notebook
4. Check the modal management content in the MLFlow Platform.
5. Use different parameters for tuning the model.

## Next Section

In the next tutorial, we will analyze the two sets of results, manage the trained models, and deploy the best model to the cloud.

