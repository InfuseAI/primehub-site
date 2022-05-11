---
id: custom-image-guideline
title: 客製 Image 指南
description: 客製 Image 指南
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

## 創建 Images

管理者現在可以利用`Images`功能來為使用者創建客製 image （如：必要 Python 套件安裝、環境變數設定等等）並新增至 PrimeHub 讓使用者可以選用；如此一來，使用者可重複利用此 image 來進行不同的專案，省去每次前置設定的時間，加速專案進行。

基本上我們可以用`Images`客製任何的 image；對 PrimeHub 而言 image 有分兩種用途，一個是**Job Submission**用，另一個則是**JupyterHub**用。

### Job Submission 用

因為 Job 可以是各式各樣的任務；只要是個可以正常起始 container 的 image，我們都可以拿來做為 Job 的工作環境。

### JupyterHub 用

PrimeHub 期待 JupyterHub 用 image 具備 JupyterHub 環境，一旦起始後，會立即起動 Jupyter 環境；

為了創建具備 JupyterHub 的 image，我們必須利用 JupyterHub 相容的 base image；幸運地是，我們可以從官方 registry 來源取得它們。

### 官方 Registry

有兩個官方 registry 來源，我們可以取得 JupyterHub 相容的 base images；分別是 **Jupyter** 及 **InfuseAI**。

|Provider|Registry|Reference|
|------|--------|----|
|Jupyter|`jupyter/docker-stacks`|https://github.com/jupyter/docker-stacks|
|InfuseAI|`registry.gitlab.com/infuseai/docker-stacks/`|非公開；須有**認證用 secret** 才能下載 ，請洽 **InfuseAI** 窗口。|
|InfuseAI|`infuseai/docker-stacks/`|https://hub.docker.com/r/infuseai/docker-stacks/tags|

**InfuseAI 官方提供的 base image 有：**

|Base|image|Description|
|----|-----|-----------|
|N/A|`base-notebook`|Conda, Jupyter|
|base-notebook|`r-notebook`|R|
|base-notebook|`minimal-notebook`|OS packages|
|minimal-notebook|`scipy-notebook`|Python packages|
|minimal-notebook|`datascience-notebook`|R and Julia|
|minimal-notebook|`tensorflow-notebook`|TensorFlow|
|minimal-notebook|`pytorch-notebook`|Pytorch|

## Images 創建 Image

我們可以利用`Images`新增 Image Spec （如：必要 Python 套件安裝、環境變數設定等等），`Images`就會根據指定規格建立並發佈 image。請見 [Images](admin-image-cht#build-custom-image) 功能，以及 快速上手[「創建 image」](../quickstart/build-image)。

### 利用 DockerHub Registry

經由 **Images** 創建的 image 會被發佈至 PrimeHub 設定的 registry 上指定的 repository；我們可以設定自己的 DockerHub registry 做為發佈目地的。

## Dockerfile 創建 Image

### From Jupyter

例： Dockerfile 指定 Jupyter base image

``` dockerfile
FROM jupyter/minimal-notebook
# Get the latest image tag at:
# https://hub.docker.com/r/jupyter/minimal-notebook/tags/
# Inspect the Dockerfile at:
# https://github.com/jupyter/docker-stacks/tree/master/minimal-notebook/Dockerfile


# install additional package for customization
RUN pip install --no-cache-dir astropy
```

#### From InfuseAI

例：Dockerfile 指定 InfuseAI 提供 base image

``` dockerfile
FROM infuseai/docker-stacks/<image>
```

### Dockerfile 參考

1. [Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
2. [Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

## 由 repo2docker 建立 image

進階的使用者如果想要試試 [repo2docker](https://repo2docker.readthedocs.io/en/latest/) 工具建立 image。請務必參考我們的技術文件 [「repo2docker image」](../../tasks/repo2docker.md) 確認建立出來的 image 符合 PrimeHub 要求。
