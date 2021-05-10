---
id: version-3.5-release-note
title: 3.5 Release Note
description: 3.5 Release Note
original_id: release-note
---

## 🌟 &NonBreakingSpace; What's New

### PrimeHub Apps (Alpha)

Want to explore more possibilities? Wish to make use of 3rd-party applications to enhance your workflow? You can now visit the PrimeHub Apps to start well-known applications in PrimeHub, we provided MLflow for experiment tracking and will integrate more useful applications.

![](assets/app_overview.png)

+ [Document](primehub-app)


### New informative landing page

We present a new landing page that providing sections of reference documents, quick actions, recent activity history, and resource usage status of the group. You can now be aware of the group status and perform actions more conveniently.

![](assets/v35-landing-user.png)

+ [Document](quickstart/login-portal-user)


### Access group settings on User Portal

Group administrators can now view detailed group information and adjust per-group job timeout setting on User Portal. With this design, we will empower group administrators with more available settings.

![](assets/group_setting_overview.png)

+ [Document](group-setting)

## 🚀 &NonBreakingSpace; Improvements

+ Removed: **Default Timeout Setting** from *Admin Portal/Groups*.
+ Refined: "Run an Example" in deployment detail page
+ Patched: TLS verification in custom image building


## 🧰 &NonBreakingSpace; Bug Fixes

+ Fixed: PrimeHub chart image CRD
+ Fixed: TensorFlow 2.4 image used wrong CUDA version
+ Fixed: PrimeHub graphql crashes when access the job artifacts tab without enabling artifacts
+ Fixed: The log request is disconnected if the log has no message more than 1 min
+ Fixed: Cert-manager OOM


## 💫 &NonBreakingSpace; More Things

+ [Grafana PrimeHub Dashboard Installation](tasks/monitoring)

### Build model image via the simple Dockerfile

By replacing the S2I (Source-To-Image) with simple Dockerfile in building model image, users can be easier to learn how to build a model image and simplify the entire deployment process. See [Package from Language Wrapper](model-deployment-language-wrapper-intro).


### Build RStudio binder image

Build a PrimeHub-compatible RStudio binder image by repo2docker. See [Example: RStudio binder](tasks/repo2docker#example-rstudio-binder).

### Reuse installed packages in job or notebook sessions

With packages installed to the specified location, every team members can now reuse them in every job or notebook sessions. Significantly mitigate the environment establishment efforts. See [Customize Runtime Environment](tasks/customize-job-runtime).

---

## 🎪 &NonBreakingSpace; In the Community

+ [PrimeHub Community Edition v3.5](https://github.com/InfuseAI/primehub/releases) &neArr;

+ [MLOps Taiwan x Facebook](https://www.facebook.com/groups/mlopstw/) &neArr;

+ [InfuseAI x Youtube](https://www.youtube.com/channel/UCbbRUfqKPWfZxZY62Pian-g) &neArr;
