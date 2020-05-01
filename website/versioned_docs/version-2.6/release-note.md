---
id: version-2.6-release-note
title: Release Notes
original_id: release-note
---

## Job Submission (Beta)

Our previous Job Scheduler feature has now been integrated into the Job Submission icon. To make the working directory path consistent with Jupyter Notebook, the mount path has also been changed from `/workingdir` to `/home/jovyan`. By default, all Job Submission and Scheduler features are enabled and supports Kubernetes 1.17. If you would like to disable it, set `PRIMEHUB_FEATURE_JOB_SUBMISSION` flag to `false`. 

With Job Submission, users are able to submit time-consuming jobs to run in the background, set a scheduled recurrence when creating a new job, or choose to run a job manually at a later time. 

### Job Submission Documentation 

- [Job Submission Tutorial Simple](job-submission-tutorial-simple)
- [Job Submission Feature](job-submission-feature)

### Job Scheduler Documentation

- [Job Scheduling Feature](job-scheduling-feature)

## Spawner

NFS pods are now evenly spread throughout all nodes in your Kubernetes cluster to prevent a single node from getting too busy when it is being drained. 

## Image Builder

To improve the user experience, and to adhere to the [Anaconda Best Practices](https://www.anaconda.com/using-pip-in-a-conda-environment/), the installation order of new packages has been changed to **APT > Conda > Pip**.