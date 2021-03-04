---
id: version-3.3-release-note
title: 3.3 Release Note
original_id: release-note
---


## 🌟 What's New

### Group Admin

We are introducing a new role: the Group Administrator! Group Admin has access to additional features on their PrimeHub sidebar.

![](assets/group_admin.png)

+ [Document](guide_manual/admin-group#members)

In this release, the Group Administrator has the ability to create, view, update, and delete images for a group in the Images tab. 

![](assets/group-image-list.png)

+ [Document](group-image)

### Shared Files: Upload

Upload your files to your group's shared space in the Shared Files tab so that anyone from your group can use it. Stay tuned for our next release (3.4)—we plan to include a browser so that you can easily find the files you need within your group. 

![](assets/files-uploader.png)

+ [Document](shared-files)

### Models (Beta)

In our Beta release, We wanted to simplify your experience in building and pushing models to fit in with your sleek workflow. Now, you can train and deploy a Tensorflow 2, PyTorch, SKLearn models in PrimeHub without even needing to build an image.

+ [Deploy a Model by Pre-packaged Server](model-deployment-tutorial-prepackaged-image)

+ [Deploy a Model by Image built from Language Wrapper](model-deployment-tutorial-model-image)

+ [Tutorials](model-deployment-tutorial-concepts)

### Notebook Logs

Notebooks, sometimes, are failed to spawn or run into troubles because user programs/environments. Now users are able to investigate failures and shoot troubles from **Notebook Logs**.

+ [Document](quickstart/launch-project#notebook-logs)


## 🚀 Improvements

+ Use 24hr instead of 12hr in metrics chart
+ Make cosmetic change to "cancel" into a button when notebook is spawning
+ Simplify all of headings/breadcrumb on User Portal
+ Add info hint to Job Monitoring timespan
+ Make Buildah support self-signed certificate
+ Tensorflow2 model server enhancement: support image input
+ Tensorflow2 model server: upgrade to 2.4.0


## 🧰 Bug Fixes

+ Fixed: PhDeploymentController CrashLoopback if no group in response
+ Fixed: Group name is not case-insensitive to GraphQL
+ Fixed: InstanceTypes/Images are not shown in spawner when a group set "zero" of any type of quota
+ Fixed: Job artifacts cannot be accessed by non-Admin users.

## 💫 One More Thing

### NVIDIA DXG A100 Support Verified

NVIDIA has released A100 Tensor Core GPU with latest [MIG technology](https://www.nvidia.com/en-us/technologies/multi-instance-gpu/). A100 support by PrimeHub has been verified and confirmed.
  
---

## 🎪 In the Community

+ [PrimeHub CE v3.3 (Community Edition) Release](https://github.com/InfuseAI/primehub/releases)

+ [MLOps Taiwan on Facebook](https://www.facebook.com/groups/mlopstw/)

+ [InfuseAI x Youtube](https://www.youtube.com/channel/UCbbRUfqKPWfZxZY62Pian-g)
