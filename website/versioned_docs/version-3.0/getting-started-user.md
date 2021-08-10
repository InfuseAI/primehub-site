---
id: version-3.0-getting-started-user
title: Getting Started
original_id: getting-started-user
---

## Overview

**PrimeHub** is based on team/group-centric design that every user must be associated with one *Group* at least before using features. Initially there are a user `phadmin` who has admin privileges associated with a group `phusers`.

Also, resources such as image, instance type, dataset must be associated with one *Group* at least or be *Global* before being chosen.

PrimeHub v3, furthermore, enhances this concept by introducing *Group-Context* design.

Initial PrimeHub has a built-in *user* `phadmin`, a built-in *group* `phusers`, several *instance types*/*image* which are set *Global*. A user can launch a notebook quickly by using these resources. 

To add/delete/edit users, groups and other resources, users are required to switch to Admin Portal, use [administration features](getting-started-admin) there to achieve it.

## Group-Context

+ A current working project-group is required to be specified from associated groups of users; users can switch working groups to have the different context.

+ Accordingly, the context/the operations are retained within the working group.

+ `Jobs` feature, `Schedule` feature and `Models` feature, these features present/operate items *only within the current working group*. Furthermore, user-operations, such as submitting jobs, creating job schedule and serving models, are also performed within the current working group correspondingly.

+ Notebook will be launched within the current working group by default.

+ Context are independently from groups.

## Guides

Here are documents to guide you to launch a notebook, to submit jobs, to deploy models via features on User Portal and so on.

### User

+ [Access User Portal](quickstart/login-portal-user.md)

+ [Launch/Shutdown Notebooks of projects on PrimeHub](quickstart/launch-project)

+ [Advanced settings of Notebook Spawner](user-advanced-setting)
  
+ [Submit and schedule Jobs](job-submission-feature)

+ [Deploy Models and serve models](model-deployment-feature)

+ [Access Jupyter Notebook remotely via SSH](guide_manual/ssh-config)

+ [Switch to Admin Portal](quickstart/login-portal-admin)