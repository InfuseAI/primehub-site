---
id: release-note
title: 3.3 Release Candidate Note
---


## 🌟 What's New

### Group Admin

Group members who are assigned Group Admin to a group can access dedicated features from User Portal. Such as **Image**.

+ [Document](guide_manual/admin-group#members)

### Images

Group Admin can add group-specific images for the managed group. 

+ [Document](group-image)

### Shared Files

Users can upload files to PHFS storage to share with group members. 

+ [Document](shared-files)

### Models (Beta)

Move Models from alpha to Beta, in beta we introduce two ways for the model deployment.

+ To deploy a *ready-to-serve packaged model image* which is [packaged by user already](model-deployment-language-wrapper-intro) directly using **Model Image** field only.

+ To deploy a model file using the **Model URI** field **with** a [specified pre-packaged image](model-deployment-prepackaged-server-intro) using **Model Image** field, under the hood, the model file will be packaged into a image, then the image will be deployed automatically.

+ [Tutorials](model-deployment-tutorial-concepts)

### Notebook Logs

Notebooks, sometimes, are failed to spawn or run into troubles because user programs/environments. Now users are able to investigate failures and shoot troubles from logs of **Notebook Logs**.

+ [Document](quickstart/launch-project#notebook-logs)


### Shared Space: Upload

Allow uploading to groups' phfs folder space directly from UI

## 🚀 Improvements

## 🧰 Bug Fixes

  
---

## 🎪 In the Community

+ [PrimeHub CE v3.3 (Community Edition) Release](https://github.com/InfuseAI/primehub/releases)

+ [InfuseAI x Youtube](https://www.youtube.com/channel/UCbbRUfqKPWfZxZY62Pian-g)

+ [JupyterLab extension for PrimeHub](https://github.com/InfuseAI/primehub-job/tree/master/jupyterlab_primehub)
