---
id: version-3.8-primehub-end-to-end-tutorial-summary
title: Summary
description: A summary of everything we have achieved in this tutorial
original_id: primehub-end-to-end-tutorial-summary
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
</div>
<br />

We've acheived a lot during this tutorial, let's review what we have achieved and how PrimeHub helped us as each stage of the process.

## Part 1 - Label Data

In [Part 1](primehub-end-to-end-tutorial-1), we used **Label Studio**, installed via **PrimeHub Apps**, to label a series of screw images.

PrimeHub Apps provides easy access and configuration of popular apps such as [Code Server](primehub-app-builtin-code-server), [Matlab](primehub-app-builtin-matlab), [Label Studio](primehub-app-builtin-label-studio), [MLflow](primehub-app-builtin-mlflow), and [Streamlit](primehub-app-builtin-streamlit). These apps allow users to orchestrate data and provide tools to accelerate their machine learning workflow.

## Part 2 - Train and Tune the Model

In [Part 2](primehub-end-to-end-tutorial-2), we trained the model in Jupyter Notebook, and **submitted the notebook as a parameterized job**. The results from our jobs were **automatically logged into MLflow** for experiment tracking.

The **Submit Notebooks as Job** feature lets users configure resources through Instance Type settings, use different images for experimentation, and even use different parameters to tune models.

Once connected to PrimeHub,  **MLflow autologging** means that job results can be collected and reviewed easily. Data on parameters, metrics, and artifacts are available for model training history.

## Part 3 - Manage, Compare, and Deploy the Model

In [Part 3](primehub-end-to-end-tutorial-3), we **compared the results** of our jobs and **registered the better-performing model** to **Primehub Models**. After customizing a server image we then **deployed the model** as a web service endpoint.

PrimeHub's **Model Management** stores version-managed models for use in different projects, frameworks, or any designated use. Users can access previously trained models, deploy models, and share well-trained models across teams.

Once ready for deployment, the input and output of a model image can be customized and then deployed in a cloud-ready environment using PrimeHub's Model Deployment feature. There's no need for users to provision server resources, PrimeHub takes care of setting up all required resources.

## Part 4 - Build the Web App

In [Part 4](primehub-end-to-end-tutorial-4), we added a web interface to our endpoint using Streamlit, also installed via PrimeHub Apps.

Streamlit is a powerful tool for building web apps with trained models. The web apps made with Streamlit have many uses, such as data feedback, data correction, and model validation etc


With PrimeHub, you will experience a wonderful machine learning journey! Enjoy it!