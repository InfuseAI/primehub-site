---
id: model-management-cht
title: 模型管理
description: Models Management
sidebar_label: Overview
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="deploy-only tooltip">Deploy
    <span class="tooltiptext">Applicable to Deploy Edition</span>
  </div>
</div>
<br>

資料科學家頻繁地用各種參數・資料集・特徵等組合反覆地訓練模型，並針對各個版號的模型進行反覆實驗以找出合適的模型，進一步部署模型成服務以得到更多的回饋，再重回反覆訓練出更佳更調適的模型。現今，這個循環作業流程為 MLOps 的一部分。

鑑於模型版號管理的需求，PrimeHub 整合廣泛使用的 **MLflow** 提供使用者模型追蹤管理功能  **Models** 並進一步銜接原有 **Deployment** 功能。資料科學家得以從模型訓練、版號管理、模型部署 簡易迅速的反覆地完成此流程。

![](assets/model-mgt.png)

## MLflow is required

必須具備一個可存取且運作中的 [MLflow instance](primehub-app-cht) 服務， 並於 [Group Setting](group-setting-cht#mlflow) 中的 MLflow 頁籤填入設定值來綁定服務。

#### MLflow setting 尚未設定

![](assets/model-mgt-not-config.png)


#### MLflow 服務未運作/無法存取

![](assets/mlflow-not-reachable.png)


## Models

此頁顯示綁定 MLflow 服務中已登錄追蹤的 Registered Models。

+ 從 Notebook 遞交 Model 至 MLflow Tracking 請見 [Tutorial: Use MLflow Tracking](../primehub-app-tutorial-mlflow#use-mlflow-tracking-in-primehub)。

> 如果第一次進入頁面一直看到頁面在載入時，請於 Group Setting 再次確認 `MLflow Tracking URI` 設定值是否正確。
![](assets/model-mgt-list.png)

+ `MLflow UI` ：點擊，開啟新分頁導向綁定 MLflow 服務的網頁介面。

一旦 Model 進一步登錄於 MLflow 中 (點擊 Register Model)，該 Registered Model 將會顯示在 Models 清單中。

![](assets/mlflow-register-model.png)

### Versioned Model List

點擊 Model 名稱，導向顯示所有版號的 Model。

![](assets/model-mgt-version-list.png)

+ `Version`: 版號
+ `Registered At`: 登錄日期時間
+ `Deployed By`: 如果此版號 Model 被部署的話，將會顯示該部署名稱；點擊部署名稱會導向至該部署詳細資訊頁。
+ `Deploy`： 點擊，部署該版號 Model

### Versioned Model Detail

點擊版號，導向顯示該版號的詳細資訊。

![](assets/model-mgt-versioned-item.png)

+ `Registered At`：登錄日期時間
+ `Last Modified`：最後更新時間
+ `Source Run`: 連結到 MLflow 中 Run 的資訊頁
+ `Parameters`: 參數
+ `Metrics`: 測量結果
+ `Tags`: 標籤


## Deploy Versioned Model

選定想要部署的 Model 版號，點擊 `Deploy`，於對話框選擇建立新部署 `+ Create new deployment` 或是選擇更新已存在的部署。選擇後導向 [模型部署](model-deployment-feature) 並填入必要資訊送出部署。

![](assets/model-mgt-deploy-popup.png)


### Deployed

Model 部署後，在 `Deployed by` 欄位會顯示該部署的名稱，點擊部署名稱會導向該[部署詳細資訊頁](model-deployment-feature#deployment-details)。

![](assets/model-mgt-deployed.png)

從該部署詳細資訊頁， `Model URI` 會顯示 `models:/<model_name>/<model_version>`，如： `models:/tensorflow-model/2`。

+ `models:/`: 顯示此 Model 來自於 MLflow 登錄追蹤。
+ `<model_name>`: 模型名稱
+ `<model_version`: 模型版號
