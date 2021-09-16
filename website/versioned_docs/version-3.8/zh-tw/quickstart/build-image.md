---
id: version-3.8-build-image
title: 創建客製 Image
description: 創建客製 Image
original_id: build-image
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

這份文件說明如何利用新功能 `Admin Portal > Image` 來創建客製 image。

這裡我們以 [Jupyter base-notebook](https://github.com/jupyter/docker-stacks/tree/master/base-notebook) image 為基礎，在其上安裝 Fast.ai 提供的  **fastai v1 library for PyTorch** 後，產生新的 image。  

**[Fast.ai](https://www.fast.ai/)** 以自家的 ML 函式庫及無償提供線上 AI 課程為廣為人知，更多興趣可以參考其官網。

## 步驟

1. `User Portal > Images` 或 `Admin Portal > Images`

2. 點擊 `+ Add` 新增 custom image spec。

3. 填入 `Name` 為 `group-image-sample` (或其它命名)。

4. 選擇 `Build Custom Image`

5. 填入 `Base Image URL` 為 `jupyter/base-notebook`.

6. 取消勾選 `Use Image PullSecret`，因為我們使用的 base image 存在於公開的 repo。

7. 填入 `Conda` 欄位為 `-c pytorch -c fastai fastai` [[參考]](https://docs.fast.ai/index.html#Installation-and-updating)。

    (*由於完整 command 為 `conda install -c pytorch -c fastai fastai`*)。

8. **(非必要)** 填入 `APT` 欄位為 `vim` 或其它工具
   
    (因為 base image 為 `Ubuntu` base，`APT` 為其套件管理工具)。

9.  **限(Admin Portal > Images)** 設定 Global 或是指定特定群組。
    
10. 點擊 `Confirm` 開始創建。 

11. 一旦開始創建，點擊 `Image building in progress` 檢視 Build Details 及 Log。

![](assets/group-image-building.png)

12. 創建完成後，映像檔名稱的三角提示即消失。映像檔會被自動登錄。 使用者則可從各個映像檔清單選用這個預先安裝 fastai v1 library 的 image 做為開發之用。 (*Image url 會隨實際環境而變*)

![](assets/group-image-built.png)