---
id: model-deployment-tutorial-prepackaged-image-cht
title: 透過 Pre-packaged Server 模型部署
description: 透過 Pre-packaged Server 模型部署
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="deploy-only tooltip">Deploy
    <span class="tooltiptext">Applicable to Deploy Edition</span>
  </div>
</div>>

此教學將採用 pre-packaged server 方式來部署模型。我們採用 SKLearn pre-packaged server 來部署 IRIS 模型檔做為範例。

## 前置條件

### 開啟工作群組的 Model Deployment 功能

須先開啟工作群組的 Model Deployment 功能；請洽系統管理者。

![](assets/mdeploy_enable.png)

## 教學步驟

1. 登入 [User Portal](quickstart/login-portal-user) 並選擇 `Models`。
2. 在 [model deployment 主頁](model-deployment-feature#主頁) 點擊 `Create Deployment`。
3. `Deployment name` 欄位中填入 `quickstart-iris`。

   `Model Image` 欄位中填入 `SKLearn server`；此為 `scikit-learn` 用的 pre-packaged 基底映像檔，可以將 `scikit-learn` 模型檔服務化。

   ![](assets/mdeploy_create_model_image_suggestion.png)

   `Model URI` 欄位中填入 `gs://seldon-models/sklearn/iris`；此路徑指向存放在 Google Cloud Storage 已訓練的模型檔。
   ![](assets/mdeploy_quickstart_deploydetail_1.png)
   
4. `Resources` 選項：
    - 選擇 instance type， 我們選擇 `(CPU: 0.5 / Memory: 1 G / GPU: 0)`作為範例
    - 保留 `Replicas` 預設值 (1)
    ![](assets/mdeploy_quickstart_deployresource.png)
5. 點擊 `Deploy`後，導轉回主頁。 等待同時，可以點擊 `Refresh` 更新部署狀態。
    ![](assets/mdeploy_quickstart_deploying_iris.png)
    
    ![](assets/mdeploy_quickstart_deployed_iris.png)

    部署成功後(綠色)，點擊該部署查看詳細資訊。
    
    ![](assets/mdeploy_quickstart_detailpage_1.png)

6. 頁面顯示所有詳細資訊；準備測試部署的模型， 複製 `endpoint URL` 並取代下列指令中 `${YOUR_ENDPOINT_URL}`。
    ```bash
    curl -X POST ${YOUR_ENDPOINT_URL} \
        -H 'Content-Type: application/json' \
        -d '{ "data": {"tensor": {"shape": [1, 4], "values": [5.3, 3.5, 1.4, 0.2]}} }'
    ```
    在 Terminal 執行整串指令； 指令中我們帶入 tensor 並送出請求。

  - 請求範例
      ```bash
      curl -X POST https://hub.xxx.aws.primehub.io/deployment/quickstart-iris-xxx/api/v1.0/predictions \
          -H 'Content-Type: application/json' \
          -d '{ "data": {"tensor": {"shape": [1, 4], "values": [5.3, 3.5, 1.4, 0.2]}} }'
      ```
  - 回應範例 (it predicts the species is `Iris setosa` as the first index has the highest prediction value)
      ```bash
      {
        "data": {
          "names": [
            "t:0",
            "t:1",
            "t:2"
          ],
          "tensor": {
            "shape": [
              1,
              3
            ],
            "values": [
              0.8700986370655746,
              0.12989376988727133,
              7.5930471540348975e-06
            ]
          }
        },
        "meta": {}
      }
      ```
7. 恭喜，至此我們已成功部署模型，並同時提供線上服務接受請求。

## Reference

- 完整模型部署功能，請見 [Model Deployment](model-deployment-feature)。
- 客製 pre-packaged server 指引，請見 [Pre-packaged Server](model-deployment-prepackaged-server-intro-cht)。
