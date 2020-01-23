---
id: add-image
title: 增加 Image
---

這份文件說明我們如何在 PrimeHub 新增一個實際存在於某個 Docker registry 的 Image。

這裡我們將用在 [[quickstart] build image](build-image) 創建出的「內建 `fastai v1 library` Image」及其 image url，將其新增至 PrimeHub，讓使用者可以從 `Jupyter` 起始頁指定；如果您還沒創建過客製 image，請參照該份文件。

## 步驟

1. 登入管理者，進入 `Admin Dashboard`後，進入 `Images` 管理。

2. 點擊 `+ Add` 新增 `custom image spec`。

3. 填入 `Name` 為 `fastai-v1`。

4. 選擇 `Type` 為 `cpu`。

5. 填入 `Container image url` 為該 image 在某 registry 的 url。例：
   + `gcr.io/infuseai/fastai-v1:1d1bxxxx`
   + `jupyter/datascience-notebook`
   + `registry.gitlab.com/infuseai/yyy/jupyterlab_variableinspector`。

6. 因為我們是以在 `private Google Container Registry` 的 image 為例子 (*image url 依實際環境而變*)，所以需要對應足夠的權限，勾選 `Usage Image Pull Secret` 並挑選對應的 `secret`。

7. 開啟 `Global`，讓所有使用者可以選用；如需指定特定 `group`，請另行指定 `connect existing groups`。

8. 點擊 `Confirm` 儲存。

之後使用者可以從 jupyter 起始頁，看到並選擇此 image 作為開發利用。我們可以從 notebook 來驗證 `fastai v1 library` 是確實事先安裝了。

![](assets/jup-fastai.png)
