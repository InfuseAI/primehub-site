---
id: version-2.7-release-note
title: 2.7 Release Note
original_id: release-note
---

## 🌟 What's New

- [Image Builder](guide_manual/admin-build-image): General Availability.
- [Model Deployment (Alpha)](model-deployment-feature): Model deployment feature enabling users to deploy and manage machine learning models.
- **PrimeHub Deploy (Alpha)**:  PrimeHub Deploy is a model deployment feature which is standalone from PrimeHub Enterprise.  Now it is able to be installed on its own without PrimeHub Enterprise; Setup `PRIMEHUB_MODE=deploy` flag.
- **JupyterHub**: [Support non-standard images](tasks/non-standard-image) (which are not originated from jupyter/base-notebook compatible.)
- **API Auth**: User can now [generate an API token](tasks/api-token) on the **API Token** page to query the GraphQL API.
- [Dataset Management](guide_manual/admin-dataset#nfs) now supports **nfs** and **hostpath** dataset types
- **Job Submission** now supports **nfs** and **hostpath** dataset types

## 🚀 Improvements

- PrimeHub Grafana dashboard refactoring

## 🧰 Bug fixes

-  Fixed the issue where the job list was out of sync 
-  Fixed a degression of Jupyter Spawner.
-  Fixed a bug that didn't allow users to spawn the latest jupyter/base-notebook on version master@f6331bae 
-  Fixed a bug where Jupyterhub showed "-" in GPU field when the user limit is 0 
-  Fixed a bug that caused  Jupyter spawner page to show 'No group is configured for you to launch a server' when specifying a floating point in RAM of an instanceType
-  Fixed a bug that caused the hub to redirect in a loop after switching user via PrimeHub-console
-  Fixed a bug that failed to pull image from private repo 
-  Fixed a bug that we did not allow access to pvc volume across zones in AWS EKS cluster 
-  Fixed a bug that caused dataset upload to be broken in http environment


---

## 📣 PrimeHub CE v2.7 (Community Edition)
InfuseAI will release PrimeHub CE along with PrimeHub Enterprise since v2.7.
- Release: https://github.com/InfuseAI/primehub/releases
- Repo: https://github.com/InfuseAI/primehub

---

## 🎪 In the Community

Eric demonstrates how to conduct ML projects on PrimeHub and what PrimeHub can help to ease the efforts during project; here are two use-case.

### 在 PrimeHub 中使用 YOLOv4 定時偵測景點擁擠度

+ [Episode 1](https://medium.com/infuseai/%E5%9C%A8-primehub-%E4%B8%AD%E4%BD%BF%E7%94%A8-yolov4-%E5%AE%9A%E6%99%82%E5%81%B5%E6%B8%AC%E6%99%AF%E9%BB%9E%E6%93%81%E6%93%A0%E5%BA%A6-14cef9f583a9?source=friends_link&sk=0b48e59f5f7d110cd3e62cabf6fce278)

+ [Episode 2](https://medium.com/infuseai/%E5%9C%A8-primehub-%E4%B8%AD%E4%BD%BF%E7%94%A8-yolov4-%E5%AE%9A%E6%99%82%E5%81%B5%E6%B8%AC%E6%99%AF%E9%BB%9E%E6%93%81%E6%93%A0%E5%BA%A6-2-4-1b6f5150fbd?source=friends_link&sk=35280c4fb62ffba272ffb7cdfc4bc994)


+ [Episode 3](https://medium.com/infuseai/%E5%9C%A8-primehub-%E4%B8%AD%E4%BD%BF%E7%94%A8-yolov4-%E5%AE%9A%E6%99%82%E5%81%B5%E6%B8%AC%E6%99%AF%E9%BB%9E%E6%93%81%E6%93%A0%E5%BA%A6-3-4-c94a82e2cb9a?source=friends_link&sk=66e453f7fb42be62251aeace3c94317c)


+ [Episode 4](https://medium.com/infuseai/%E5%9C%A8-primehub-%E4%B8%AD%E4%BD%BF%E7%94%A8-yolov4-%E5%AE%9A%E6%99%82%E5%81%B5%E6%B8%AC%E6%99%AF%E9%BB%9E%E6%93%81%E6%93%A0%E5%BA%A6-4-4-5cb3f27a1676?source=friends_link&sk=f6a2fecef8e4720a56f945db30049c44)

### 使用 PrimeHub 訓練 YOLOv4 模型 — 實現定時定點的口罩配戴比例偵測

+ [Episode 1](https://medium.com/infuseai/%E4%BD%BF%E7%94%A8-primehub-%E8%A8%93%E7%B7%B4-yolov4-%E6%A8%A1%E5%9E%8B-%E5%AF%A6%E7%8F%BE%E5%AE%9A%E6%99%82%E5%AE%9A%E9%BB%9E%E7%9A%84%E5%8F%A3%E7%BD%A9%E9%85%8D%E6%88%B4%E6%AF%94%E4%BE%8B%E5%81%B5%E6%B8%AC-9e361f837e49?source=friends_link&sk=94b9cf85a27ded2689001c739e3f4bce)