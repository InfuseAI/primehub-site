---
id: release-note
title: 3.5 Release Candidate Note
description: 3.5 Release Candidate Note
---

> 3.5 Release Candidate Note

## 🌟 &NonBreakingSpace; What's New

### PrimeHub Apps (Alpha)

Want to explore more possibilities? Wish to make use of 3rd-party applications to enhance your workflow? You can now visit the PrimeHub Apps to start well-known applications in PrimeHub, we provided MLflow for experiment tracking and will integrate more useful applications.


![](assets/app_overview.png)

+ [Document](primehub-app)




### New informative landing page

We presented a new landing page that providing sections of reference documents, quick actions, recent history, and resource usage status. You can now monitor platform status and perform actions more conveniently.

![](assets/v35-landing-user.png)

+ [Document](quickstart/login-portal-user)


### Access group settings on user portal

Group administrators can now access detailed group information and adjust per-group job setting on user portal. With this design, we will make more settings available to the group administrators.

![](assets/group_setting_overview.png)

+ [Document](group-setting)

## 🚀 &NonBreakingSpace; Improvements

+ Removed **Default Timeout Setting** from *Admin Portal/Groups*.


## 🧰 &NonBreakingSpace; Bug Fixes

## 💫 &NonBreakingSpace; More Things

### Build model image via the simple Dockerfile

By replacing the S2I (Source-To-Image) with simple Dockerfile in building model image, users can be easier to learn how to build a model image and simplify the entire deployment process. See [Package from Language Wrapper](model-deployment-language-wrapper-intro)


### Build RStudio binder image

Build a PrimeHub-compatible RStudio binder image by repo2docker. See [Example: RStudio binder](tasks/repo2docker#example-rstudio-binder).

### Reuse installed packages in job or notebook sessions

With packages installed to the specified location, every team members can now reuse them in every job or notebook sessions. Significantly mitigate the environment establishment efforts. See [Customize Runtime Environment](tasks/customize-job-runtime).

---

## 🎪 &NonBreakingSpace; In the Community

+ [PrimeHub Community Edition v3.5](https://github.com/InfuseAI/primehub/releases) &neArr;

+ [MLOps Taiwan x Facebook](https://www.facebook.com/groups/mlopstw/) &neArr;

+ [InfuseAI x Youtube](https://www.youtube.com/channel/UCbbRUfqKPWfZxZY62Pian-g) &neArr;
