---
id: version-3.8-release-note
title: 3.8 Release Note
description: 3.8 Release Note
original_id: release-note
---

## 🌟 &NonBreakingSpace; What's New

### 1-Click Installation on AWS

Are you AWS users? If you are 🎉, you luckily can enjoy the pleasing 1-click easy installation on AWS. With AWS account you can hand on fully-featured PrimeHub Enterprise with default license(1 group & 1 deployment) in 30mins. Visit [one.primehub.io](https://one.primehub.io) for the *click*.

![](assets/release-v38-1-click.png)

### PrimeHub EE Default License for Free

We are glad to release more power to users/teams for PrimeHub Enterprise evaluation  by 1 Deployment. The default licence will give teams a **fully-featured** PrimeHub with the quotas of **1 Group** and **1 Deployment**. You, of course, are welcome to purchase more quotas for the acceleration of your research & business.

![](assets/release-v38-default-license.png)


### PrimeHub Python CLI/SDK

GitHub: [PrimeHub Python CLI/SDK&neArr;](https://github.com/InfuseAI/primehub-python-sdk)

#### CLI

With command lines, you can have another way to have an insight about your PrimeHub.

![](assets/release-v38-cli.png)

#### SDK

With PrimeHub Python SDK, Python-skilled users are able to make the software integrating with PrimeHub for Job and Deployment features.

![](assets/release-v38-sdk.png)


## ❣️ &NonBreakingSpace; Breaking Changes

### Images (Admin Portal) incorporates Custom Image Build

Since the release of Images (Group Admin), we have some good feedback regarding the 2-in-1 design(Use existing One & Build Custom Image). We are glad to announce Images(Admin Portal) adopting the same 2-in-1 design, Administrators now can manage/build images more easily in one place.

![](assets/release-v38-custom-image.png)

## 🚀 &NonBreakingSpace; Improvements

+ All of us agree with the card style of Apps look great. So we re-designed the Deployments page with the same style.
  
  ![](assets/release-v38-card-style.png)

+ Rephrased secret type: *Git Dataset* (~~Opaque~~), *Image Pull* (~~kubernetes.io/dockerconfigjson~~)
  
  ![](assets/release-v38-secret-type.png)

+ PHFS viewer supports Jupyter Notebook; you can view *.ipynb* file without launching a Notebook
  
  ![](assets/release-v38-notebook-viewer.png)

+ PrimeHub App: Streamlit supports the installation of external package dependency [[Doc]](primehub-app-builtin-streamlit#external-dependencies)
+ Platform administrators who are not Group Admin are able to access Group Admin features for every group
+ Enhanced the UX of the Maximum Deployments component
+ Updated PrimeHub Extension with Papermill v2.3.3
+ Updated cudnn version to keep pace with Cuda 11
+ Made the type of a created secret non-changeable to prevent sync errors.


## 🧰 &NonBreakingSpace; Bug Fixes

+ Fixed: Deployments update action is not checked by the maximum deployments
+ Fixed: Deployed Deployment is not able to be updated due to the maximum deployment is achieved.
+ Fixed: Maximum deployment counts stopped deployments in.
+ Fixed: Changing the type of created secrets causes the sync error.

## 💫 &NonBreakingSpace; More Things

+ [Document: HOWTO - Check Volume Usage](tasks/howto-check-vol-usage)
+ [Document: HOWTO - Increase Volume Size](tasks/howto-resize-vol)

+ End-to-end tutorial part4: [Build the Web App by Streamlit](primehub-end-to-end-tutorial-4)

+ Upgraded Helm from v3.3.4 to 3.6.2

+ PrimeHub CE displays EE-tier features information
  
  ![](assets/release-v38-ce-pro.png)





## 🌇 &NonBreakingSpace; Deprecation

+ Maintenance Notebook (Admin Portal)
+ Image Builder (Admin Portal)

---

## 🎪 &NonBreakingSpace; In the Community

+ [InfuseAI x Discord](https://discord.gg/CrAxQznedH) &neArr;

+ [Ways of doing ML](https://waysof.ml) &neArr;

+ [MLOps.toys](https://mlops.toys/) &neArr;

+ [MLOps Taiwan x Facebook](https://www.facebook.com/groups/mlopstw/) &neArr;

+ [InfuseAI x Youtube](https://www.youtube.com/channel/UCbbRUfqKPWfZxZY62Pian-g) &neArr;
