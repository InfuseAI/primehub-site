---
id: version-3.2-release-note
title: 3.2 Release Note
original_id: release-note
---

In this release, we wanted to give you more power to plug and chug what you want to use into PrimeHub—including your environment variables for model deployments and any custom software. We also took care of some housekeeping items to get rid of some clutter, allowing a clear path to focus on the project in front of you.

## 🌟 What's New

### Job Monitoring

![](assets/jsub-monitoring-15m.png)

System administrators can be informed and monitor their teams' resource usage patterns and behaviors for jobs with our new Monitoring tab. View the average resource usage for each job by the most recent timeframes by selecting the filters in the upper right corner of the tab.

+ [Document](job-submission-feature#monitoring)

## 🚀 Improvements

### Environment Variables for Models

Use your own environment variables when creating a model deployment.

+ [Document](model-deployment-feature#environment-variables)
  
### Install Custom Software

PrimeHub supports installing custom software in your notebook/job environment with `!sudo apt-get install`.

### Image Error Handling

![](assets/spawner_cancel.png)

Get past the image-related errors while staying informed when launching your notebook server. If you come across a server request timeout, you will be able to cancel the request, know the reason for the timeout, and continue using the system.

### Jobs

+ Add search-by-name fields in jobs/schedules page.

### Jobs retention

From now on, we will clean up and archive your jobs/artifacts after seven days for you to prevent you from getting caught up in all of the clutter.

+ [Job design document](design/job-submission#pod-ttl-after-finished)
+ [Job artifacts retention](job-artifact-feature#retention)


### Miscellaneous

+ Support the configuration of liveness and readiness timeout of PrimeHub-graphql by helm value.
+ Support memorizing the last selection of group.
+ The [instructions](https://github.com/InfuseAI/primehub-job/tree/master/jupyterlab_primehub) of building own images with PrimeHub Extension.


## 🧰 Bug Fixes

+ Fixed: The default user volume permission to SSH on Microk8s cluster.
+ Fixed: Group name duplicate validation is not case insensitive.
+ Fixed: The vulnerability while job amount are increased.
+ Fixed: Model deployment didn't support all of gpu resources.
+ Fixed: Timeout doesn't work on scheduled jobs.
+ Fixed: An empty file is not editable in phfs from notebook.

---

## 🎪 In the Community

+ [PrimeHub CE v3.2 (Community Edition) Release](https://github.com/InfuseAI/primehub/releases)

+ [InfuseAI x Youtube](https://www.youtube.com/channel/UCbbRUfqKPWfZxZY62Pian-g)