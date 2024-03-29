---
id: version-3.10-concept
title: Concept
description: Concept
sidebar_label: Concept
original_id: concept
---

## Core Resources

PrimeHub incorporates various types of core resources which are prominent existence that administrators must/can manage those resources according to the circumstance.

### Users

Users are project/group members. In order to perform features from User Portal, users must be associated with one group at least.

In addition, users can have Group Admin privilege or/and Admin privilege to access dedicated features.

See [User Management](guide_manual/admin-user).

### Groups

Groups which are arguably considered as projects are critical existence in PrimeHub. 

PrimeHub adopts the group-centric design, one of core concepts is **Group-Context** that users and various types of resources must be associated with one group at least. Based on the specified working group, users are able to access corresponding resources and to perform features within the group accordingly. Resources are not viewable if no associated group and not set Global.

See [Group Management](guide_manual/admin-group).

### Instance Types

PrimeHub is *Kubernetes*-based platform. Instance types are presets of resources allocation for environments. When launching a environment, platform needs to know the requested resources for it, under the hood, platform tries to find/allocates an instance according to requested resources for the environment if it is available by then in the circumstance. 

Instance types must be associated with one group at least for being viewable.

See [Instance Type Management](guide_manual/admin-instancetype).

### Images

Images are working environments to **Notebook**, **Job**, **Model**. When launching Notebook, Job, Model, platform needs to know requesting environments (images). Existing container images can be added and be specified the access to certain groups. In addition, building custom images is also an option on PrimeHub.

Both of Administrator and group administrator are able to add images from Images of Admin Portal and Images of User Portal respectively. Images must be associated with one group at least or be Global for being viewable

See [Image Management](guide_manual/admin-image)(Admin), [Image](group-image)(Group Admin).


### Volumes

PrimeHub supports several types of where volumes locate, **persist volume**, **nfs**, **host path**, **git** and **env**. It depends on where/how/what groups are going to share these volumes.

Groups can have read-only access volumes on git repository, or can clone volumes from internet into a persist volume/nfs/host path or can share just environmental variables.

Volumes must be associated with one group at least for being viewable.

See [Volume Management](guide_manual/admin-volume).

### Secrets

Secrets are credentials to access certain resources if required. Usually add secrets for pulling images or pulling volumes on git repo which requires credentials, in this case, images must be associated with secrets.

See [Secret Management](guide_manual/admin-secret).

---

## Components

PrimeHub incorporates several prominent data-scientist-facing components.

### Notebooks

Notebook is [Jupyter Notebook](https://jupyter.org/) which is a well-known open-source web application in data science area that empowers users to create and share interactive documents that contain live code, equations, visualizations and description.

On PrimeHub, users have to choose an image containing valid Jupyter environment with a specified instance type (requested resources) to launch a Notebook. From Notebook, users can access associated user volume, group volume, data volumes and PHFS storage.

See [Notebook](quickstart/launch-project).

### Jobs

Besides Notebook, users are able to launch an environment to accomplish certain tasks through executing given commands, it is called **Job**. Same as Notebook, users have to choose an image and an instance type for running a job.

By using Jobs, user can turn a workflow into a pipeline of automatic tasks which are time-consuming that users can check the result once jobs finish, in the meantime, users can continue works on Notebook. Also by PrimeHub Notebook Extension, Notebooks are able to be submitted as Jobs which executes cells in Notebook, then generates a page of the result.

See [Jobs](job-submission-feature), [PrimeHub Notebook Extension](ph-notebook-extension).

### Recurring Jobs

Jobs are one-time jobs, sometimes, users may want to automate jobs regularly; then **Recurring Jobs** feature can do the work, it could create a schedule which will arrange the submission of a same job recursively.

See [Recurring Job](job-submission-feature#recurring-jobs).

### Deployments

One of the last stages in the MLOps is Model Deployment that by integration of a machine learning model into an service environment which can retrieve queries and respond with inferences/predictions. By serving models, scientists can also learn the performance of trained models in a practical circumstance.

By Deployments feature of PrimeHub, users can deploy a model file directly with a specified image of pre-packaged server or can deploy a model image which already packages a model file into.

See [Deployments](model-deployment-feature), [Tutorials](model-deployment-tutorial-concepts).
