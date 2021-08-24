---
id: build-image
title: 創建客製 Image (deprecated)
description: 創建客製 Image
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

這份文件說明如何利用新功能 `Image Builder` 來創建客製 image。

這裡我們以 [Jupyter base-notebook](https://github.com/jupyter/docker-stacks/tree/master/base-notebook) image 為基礎，在其上安裝 Fast.ai 提供的  **fastai v1 library for PyTorch** 後，產生新的 image。  

**[Fast.ai](https://www.fast.ai/)** 以自家的 ML 函式庫及無償提供線上 AI 課程為廣為人知，更多興趣可以參考其官網。

## 步驟

1. 以管理者帳號登入後[切換至 Admin Portal](login-portal-admin)，進入 `Image Builder` 管理

2. 點擊 `+ Add` 新增 custom image spec。

3. 填入 `Name` 為 `fastai-v1` (或其它命名)。

4. 填入 `Base Image` 為 `jupyter/base-notebook`.

5. 取消勾選 `Use Image PullSecret`，因為我們使用的 base image 存在於公開的 repo。

6. 填入 `Conda` 欄位為 `-c pytorch -c fastai fastai` [[參考]](https://docs.fast.ai/index.html#Installation-and-updating)。

    (*由於完整 command 為 `conda install -c pytorch -c fastai fastai`*)。

7. **(非必要)** 填入 `APT` 欄位為 `vim` 或其它工具
   
    (因為 base image 為 `Ubuntu` base，`APT` 為其套件管理工具)。

8.  點擊 `Confirm` 儲存 custom image spec。

    ![](assets/qs-img-build-spec.png)

9.  此時有個 job 會被生成出並處在 pending 狀態；一旦開始創建，job 為 running 狀態。

10. 一旦 job 完成後，狀態處於 `Succeeded`。我們可以複製 image url 作為之後在 `Images` 管理上新增該 image 之用。 Image 新增後，使用者就可以選用這個預先安裝 fastai v1 library 的 image 做為開發之用。 (*Image url 會隨實際環境而變*)

    ![](assets/qs-img-build.png)

我們已經成功創建客製 image 並得到了 url。 下一步，我們可以參照 [[quickstart] add image](add-image) 為讓使用者選用，將此 image 新增至 PrimeHub。
