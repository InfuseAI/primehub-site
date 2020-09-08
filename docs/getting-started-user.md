---
id: getting-started-user
title: Getting Started
---

From **PrimeHub v3.0**, there are huge changes on UI for introducing **Group-Context** experience that users have to pre-specify a current working project-group from joining groups, accordingly, the context/the operations are retained within the working group; in the past PrimeHub v2, users had to choose a group to perform actions every time in features respectively which didn't provide a project-centric experience; In PrimeHub v3, because group-context, the user experience becomes more project-centric intuitively. Please check group-context section below if you come from PrimeHub v2.x or just skip to guides if you are newcomers.

## Group-context

+ Users have to specify a project-group from joining groups as a working group; users can switch working groups to have the different context.

+ All of the context is retained within the current working group.

+ Because group-context design, `Jobs` feature, `Schedule` feature and `Models` feature, these features present/operate items *only within the current working group*. Furthermore, user-operations, such as submitting jobs, creating job schedule and deploying models, are also performed against the current working group.

+ Because group-context design, Notebook will be launched within the current working group without choosing a group from the spawner page.

## Guides

As Data/ML scientists, you will learn how to conduct projects and how to deploy models on PrimeHub with Notebook, Job Submission and Model Deployment features.

Guides are included:

+ [Access User Portal](quickstart/login-portal-user.md)

+ [Launch/Shutdown Notebooks of projects on PrimeHub](quickstart/launch-project)

+ [Advanced settings of Notebook Spawner](user-advanced-setting)
  
+ [Submit and schedule Jobs](job-submission-feature)

+ [Deploy Models and serve models](model-deployment-feature)

+ [Access Jupyter Notebook remotely via SSH](guide_manual/ssh-config)