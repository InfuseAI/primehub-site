---
id: version-2.8-release-note
title: 2.8 Release Note
original_id: release-note
---

## 🌟 What's New

+ [PrimeHub Store](design/primehub-store) 
    / [File System](design/phfs) Design is the central storage of PrimeHub and its backend is object storage.
+ [PrimeHub Deploy](deploy-index)
    is a standalone Model Deployment-only version of PrimeHub Enterprise. In addition to the PrimeHub Enterprise version of the Model Deployment feature, PrimeHub Deploy also features an Admin Dashboard that allows administrators to manage resources and access-control.
  

## 🦄 Breaking Changes

+ Upgrade helm version from 2.16.1 to 3.2.4
+ Upgrade helm-diff version to 3.1.2
+ Upgrade helmfile version to 0.125.0

## 🚀 Improvements

- Added effectiveGroups field in the User type of graphql.
- Autoscaling is enabled by default in PrimeHub installation on EKS.
- Refined the script of cluster shutdown.
- Refined the script of PrimeHub installation for single node.
- Ignore non-existing pvc during spawning.

## 🧰 Bug fixes

- Fixed admission pvc-check failed to add an annotation to user submitting jobs.
- Fixed choosing the classic Jupyter notebook view after launching the latest jupyter/base-notebook.

---

## 📣 PrimeHub CE v2.8 (Community Edition)

- [Release](https://github.com/InfuseAI/primehub/releases/tag/v2.8.0)

---

## 🎪 In the Community

+ [PrimeHub CE installation scenario of Katacoda](https://www.katacoda.com/infuseai)
+ [使用 TensorFlow Hub 快速訓練能辨別石虎（Leopard cat）的影像分類模型](https://medium.com/infuseai/%E4%BD%BF%E7%94%A8-tensorflow-hub-%E5%BF%AB%E9%80%9F%E8%A8%93%E7%B7%B4%E8%83%BD%E8%BE%A8%E5%88%A5%E7%9F%B3%E8%99%8E-leopard-cat-%E7%9A%84%E5%BD%B1%E5%83%8F%E5%88%86%E9%A1%9E%E6%A8%A1%E5%9E%8B-f04d2ac67be6?source=friends_link&sk=922014bec736715a90863af434b6b897)