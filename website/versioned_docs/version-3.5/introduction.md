---
id: version-3.5-introduction
title: Platform Introduction
sidebar_label: Introduction
original_id: introduction
---


**PrimeHub** is a *Kubernetes*-based platform designed for groups of data scientists. It aims at being a all-in-one enterprise machine learning platform to provide seamless MLOps experience.

Adopting the group-centric design, scientists can share datasets, artifacts and collaborates easily within same groups/projects, which accelerates collaborative development for project groups, besides, scientists are capable of developing models, serving models and monitoring models performance with full governance and transparency. In terms of platform administration, PrimeHub provides administrators capability of access control management, resources management and quotas control for project groups accordingly, which facilitates the efficiency of resources utilization.

## Key Capabilities

+ Cluster Computing
+ One-Click Research Environments
+ Easy Dataset Loading
+ Management of Resource & Quota Privileges
+ Custom Deep Learning Environments
+ Enterprise-Class Account Management

## Tiers

PrimeHub has **PrimeHub Community**, **PrimeHub Enterprise** and **PrimeHub Deploy**, three tiers. Regarding the differences, see [Tiers Feature Comparison](comparison).

---

**PrimeHub** platform is composed of **User Portal** and **Admin Portal**; former provides dedicated features to data scientists, latter provides dedicated features to platform administrators.

## User Portal

incorporates data-scientists-facing prominent features that scientists are able to turn workflows into automating pipelines by Job submission/schedule, able to prepare data/develop trained models from Notebook and able to deploy container-wrapped models as services by Model Deployment.

![landing-user.png](assets/v35-landing-user.png)


### Getting Started as Users

+ [User Portal overview](quickstart/login-portal-user.md)

+ [Starts a Jupyter Notebook](quickstart/launch-project)

+ [Start training a model and tuning it](quickstart/qs-primehub)

+ [Deploy a model in a quick way](quickstart/qs-primehub-deploy)

+ [Submit and monitor jobs](job-submission-feature)

+ [Schedule routine jobs](job-scheduling-feature)

+ [Share files within a group](shared-files)

+ [Install the first 3rd-party application](primehub-app) `NEW` `ALPHA`

+ [Notebook extension and submit notebooks as jobs](ph-notebook-extension)

+ [Persistent data stores](quickstart/nb-data-store)

+ [Access Jupyter Notebook remotely via SSH](guide_manual/ssh-config)

#### As Group Admin

+ [Add/Build group-specific images](group-image)

+ [View the current settings of the managed group](group-setting) `NEW`

---

## Admin Portal

incorporates administration features that administrators are able to do access-control management, resources/quotas control management, and to oversight the usage, moreover, administrators are able to build custom environments by customization of images.

![](assets/v3-admin-portal_v31.png)

### Getting Started as Platform Admin

+ [Admin Portal overview](quickstart/login-portal-admin)

+ [Manage PrimeHub system and the license status](guide_manual/admin-system)

+ [Manage users and groups](guide_manual/admin-user)

+ [Assign group admin](guide_manual/admin-group#members)

+ [Manage instance types](guide_manual/admin-instancetype), [Manage images](guide_manual/admin-image), [Manage dataset](guide_manual/admin-dataset)

+ [Build custom images for users](guide_manual/admin-build-image)
  + [Custom Image Guideline](guide_manual/custom-image-guideline)

+ [Manage secrets (credentials)](guide_manual/admin-secret.md)

+ [Review monthly usage report](guide_manual/admin-report)

+ [Quick start for Administration](quickstart/create-user)
  