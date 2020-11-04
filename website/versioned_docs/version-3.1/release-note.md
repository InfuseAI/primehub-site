---
id: version-3.1-release-note
title: Release Candidate Note
original_id: release-note
---

## 🌟 What's New

### Usage Report

As an admin, download monthly resource usage information at a summary and detailed level in .csv format.

![](assets/usage-list.png)

+ [Document](guide_manual/admin-report)

### Job Artifacts

We've streamlined the sharing of information between groups by allowing users to view and download all artifacts associated to a job.

![](assets/jartifact_folder.png)

+ [Document](job-artifact-feature)

### PrimeHub Notebook Extension

PrimeHub Extension is an extension of Jupyter Notebook developed for PrimeHub based on JupyterLab. We plans to roll out more features to enhance user's ML workflow and experience from Notebook. To have this extension, an image with built-in PrimeHub Extension is required.

+ [Document](ph-notebook-extension)

#### Submit Notebooks as Job

Tired of going back and forth between PrimeHub and your Jupyter notebook? Worry no more, and submit your job directly from your notebook in a few simple clicks with our new JupyterLab extension.

![](assets/ph-extension-sub-nb.png)

+ [Document](notebook-as-job)

### Server to Server

Nothing is holding you back from using PrimeHub--not even an air-gapped environment. Leverage a server-to-server connection with an internal-signed https certificate.

+ [Document](getting_started/configure-self-signed-ca)


## 🚀 Improvements

### Spawner

+ Disabled JupyterHub consecutive_failure_limit to prevent an auto-restart of the hub process.

### Group-Context

+ Removed the group column from tables in job/schedule/model.

### Admin Portal

+ Redesigned Add/Edit Group pages.
+ Added "Back to User Portal" button on side menu of Admin Portal.
+ Removed GPU/CPU quota columns from Create/Edit Dataset tables.

## Job

+ Added the job timeout setting on group and individual job.
+ Added the resource information on job submission page.
+ Jobs show failed when groups are not found.
  

## 🧰 Bug Fixes

+ Fixed: disappearing header when spawning Jupyter Notebook.
+ Fixed: Notebooks Admin shows wrong context.
+ Fixed: Datasets page is broken after clicking "Add" then clicking "Back".
+ Fixed: failed to clone a job which contains specific char or newline char.
+ Fixed: the log of a job which is submitted by user is not viewable.
+ Fixed: a scheduled job failed because a pod exists already.
  
---

## 🎪 In the Community

+ [PrimeHub CE v3.1 (Community Edition) Release](https://github.com/InfuseAI/primehub/releases)

+ [InfuseAI x Youtube](https://www.youtube.com/channel/UCbbRUfqKPWfZxZY62Pian-g)