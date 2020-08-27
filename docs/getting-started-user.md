---
id: getting-started-user
title: Getting Started
---



From **PrimeHub v3.0**, there are huge changes on UI for introducing group-context experience that users have to pre-specify a current working project-group from joining groups, the context/the operations are limited within the working group; PrimeHub becomes more team-centric intuitively. Please check these changes if you come from PrimeHub v2.x or just skip to guides if you are newcomers.

## Changes

+ Users have their own group-context portal which presents information within the context of the user-specified working group.

+ Users can switch the working group among joining groups easily to have the different context of group on portal.

+ Because group-context design, `Jobs` feature, `Schedule` feature and `Models` feature, these features present/operate items *only within the current working group*. Furthermore, user-operations, such as submitting jobs, creating job schedule and deploying models, are also performed against the current working group.

+ Because group-context design, JupyterHub will be launched within the current working group without choosing a group from the spawner page.

## Guides

As Data/ML scientists, you will learn how to conduct projects and how to deploy models on PrimeHub with JupyterHub, Job Submission and Model Deployment features.

Guides are included:

+ [Access User Portal.](quickstart/login-portal-user.md)

+ [Launch/Shutdown projects of JupyterHub on PrimeHub.](quickstart/launch-project)

+ [Advanced settings of JupyterHub Spawner](user-advanced-setting)
  
+ [Submit and schedule Jobs](job-submission-feature).

+ [Deploy Models and serve models](model-deployment-feature).