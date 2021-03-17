---
id: version-3.4-release-note
title: 3.4 Release Note
original_id: release-note
---

> 3.4 Release Candidate Note

## 🌟 &NonBreakingSpace; What's New

### Build Custom Image

Group administrators can now build new custom images for their managed groups. From the Images tab, they can create custom images by installing packages to already existing base images.

![](assets/release_custom_group_image.png)

+ [Document](group-image)

### Shared File: Browse

Want to share your project files with your group-mate? Wish to share and find your group files in one place? You can now visit the Shared Files tab in PrimeHub and browse through, view, and download your groups' project files.

![](assets/release_shared_files_browse.png)

+ [Document](shared-files)


## 🚀 &NonBreakingSpace; Improvements

+ Changed: Notebook spawning timeouts to 600s
+ Added: The [documentation](getting_started/configure-model-deployment#increase-the-timeout-of-model-deployment-endpoint) of Increase the Timeout of Model Deployment Endpoint
+ Added: The [image](guide_manual/images-list#jupyterlab-v2-with-primehub-extension-1) of PyTorch 1.7, Python 3.7, Cuda 10.x
+ Added: License constraints of max_node and max_model_deploy

### Real-time resource dashboard update

System administrators can gain more insight with their Grafana dashboard (PrimeHub/GPU/Cluster). Instead of only seeing the status per node and GPU, system administrators now have an overall view of what the current resource utilization and GPU allocation per node is.

![](assets/grafana-primehub-gpu-cluster.png)


## 🧰 &NonBreakingSpace; Bug Fixes

+ Fixed: TensorFlow model freezes when .predict() is called
+ Fixed: User quota and group quota fail to function properly
+ Fixed: Notebook page shows "400 Bad Request" after launching

## 💫 &NonBreakingSpace; More Things

### MATLAB image

MATLAB is a platform that aims to numeric computing, data analysis, and create models. InfuseAI now provides the PrimeHub-compatible image to launch a MATLAB environment on PrimeHub directly. See [How to launch MATLAB environment on PrimeHub](tasks/matlab-img) to learn more.

### Reuse installed packages

In addition to using group-shared images, users can now follow the guide to reuse installed packages in Jobs and Notebook environments more easily without repeating same packages installation. See [Customize Runtime Environment](tasks/customize-job-runtime).

---

## 🎪 &NonBreakingSpace; In the Community

+ [PrimeHub Community Edition v3.4](https://github.com/InfuseAI/primehub/releases) &neArr;

+ [MLOps Taiwan x Facebook](https://www.facebook.com/groups/mlopstw/) &neArr;

+ [InfuseAI x Youtube](https://www.youtube.com/channel/UCbbRUfqKPWfZxZY62Pian-g) &neArr;
