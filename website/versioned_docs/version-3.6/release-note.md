---
id: version-3.6-release-note
title: 3.6 Release Note
description: 3.6 Release Note
original_id: release-note
---

## 🌟 &NonBreakingSpace; What's New

### Models Management (Beta)

Want to compare your trained models or give every single model a unique version? You can now visit the PrimeHub Model Management to analyze the experiments, to manage the trained models, and further to deploy the best model to PrimeHub Model Deployment.

![](assets/model-mgt-list.png)

+ [Document](model-management)

## ❣️ &NonBreakingSpace; Breaking Changes

+ We introduce whole new Models Management feature in this release, the original Models feature is renamed **Deployments** onwards.

## 🚀 &NonBreakingSpace; Improvements

+ Disabled: Timeout while pulling Notebook image
+ Refined: UI/UX with minor changes
+ Added: Image records deletion action in Admin Portal/Image Builder


### In-app product guide

Users, sometimes, are lost in terms on interface. Don't bother looking around documentation now, we presented a new assistance UI in the PrimeHub, you can obtain brief descriptions and access to detailed document on every pages by "Learn More". Significantly mitigate the learning efforts while using the PrimeHub features. Just hover over it, you will find the way out.

![](assets/tool-tips.png)

## 🧰 &NonBreakingSpace; Bug Fixes

+ Fixed: The pagination disappears while switching view
+ Fixed: The “expand” right-arrow icon of Event log disappears
+ Fixed: PhJob fails to use GPU
+ Fixed: "Deploy Model" shortcut on "Home" doesn't respond 
+ Fixed: A uploaded large file into Shared Files doesn't appear
+ Fixed: Image builder fail to skip tls verification
+ Fixed: The group resource dashboard displays incorrect info in certain cases
+ Fixed: Non-relevant commands can be injected in build image package
+ Fixed: Locale is changed after logging out
+ Fixed: Notebook Admin page has no pagination
+ Fixed: GraphQL error when Global enabled On of images(pytorch-1.7.0, tf-1.15.4, tf-2.4.1)
+ Fixed: Shared file uploader UI displays without style in PrimeHub-CE


## 💫 &NonBreakingSpace; More Things

+ **Apps (Beta)**, PrimeHub Apps is continually to extend MLOps integration universe, with adding [few built-in Apps more](primehub-app-builtin-code-server) you can easily access Code Server, Matlab, Label Studio, MLflow, and Streamlit now. Allowing users to orchestrate data/tools for the acceleration of ML workflow.

+ [Tutorial: Manage and Deploy a Model with MLflow](model-management-tutorial)

+ [Tutorial: Data Labeling with Label Studio](primehub-app-tutorial-label-studio)

+ [Tutorial: Create Your Own App](primehub-app-tutorial-template)

+ [Document: Building Notebook image with Spyder by repo2docker](tasks/spyder-image)

+ [Document: Building Notebook image with ROS by repo2docker](tasks/ros-image)

---

## 🎪 &NonBreakingSpace; In the Community

+ [InfuseAI joins the AI Infrastructure Alliance to Democratize AI with the Community](https://medium.com/infuseai/infuseai-joins-aiia-3012e608d4ea)

+ [Use Intel OpenVINO Toolkit in PrimeHub Notebooks](https://medium.com/infuseai/intel-openvino-in-primehub-13a3cea4f11f) &neArr;

+ [在 PrimeHub 中使用 PyTorch Hub 的 YOLOV5 以及 OpenAI 的 CLIP 模型，快速打造行人安全的偵測系統](https://medium.com/infuseai/%E5%9C%A8-primehub-%E4%B8%AD%E4%BD%BF%E7%94%A8-pytorch-hub-%E7%9A%84-yolov5-%E4%BB%A5%E5%8F%8A-openai-%E7%9A%84-clip-%E6%A8%A1%E5%9E%8B-%E5%BF%AB%E9%80%9F%E6%89%93%E9%80%A0%E8%A1%8C%E4%BA%BA%E5%AE%89%E5%85%A8%E7%9A%84%E5%81%B5%E6%B8%AC%E7%B3%BB%E7%B5%B1-bb865921e590) &neArr;


+ [PrimeHub Community Edition v3.6](https://github.com/InfuseAI/primehub/releases) &neArr;

+ [MLOps Taiwan x Facebook](https://www.facebook.com/groups/mlopstw/) &neArr;

+ [InfuseAI x Youtube](https://www.youtube.com/channel/UCbbRUfqKPWfZxZY62Pian-g) &neArr;
