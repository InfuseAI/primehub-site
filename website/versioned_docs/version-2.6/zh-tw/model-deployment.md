---
id: version-2.6-model-deployment-feature
title: 模型部署 (Alpha)
original_id: model-deployment-feature
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Available in Enterprise tier only</span>
</div>

>Please be noticed! This document is still **Working-in-Progress**!

透過 Model Deployment 功能，使用者可以對 Deployment 進行新增、刪除、更新及佈建等操作。當 Deployment 功能於 Group 設定中開啟時，該 Group 的成員就可以使用此功能。在資源分配上，佈建上線的 model service 須在同 Group quota 限制下，才能佈建成功。管理者可透過 Grafana 來監測該佈建上線服務的使用狀態及資源使用數據；使用者可以檢視佈建的歷史記錄。

## 開啟功能

首先開啟指定 Group 的 `Model Deployment` 功能。

![](assets/mdeploy_enable.png)

## 格列

此頁格列所有已創建的 Deployment；

![](assets/mdeploy_grid.png)

狀態分別由下列顏色來區別：

|Status   |Color|
|---------|-----|
|**Deployed** |Green |
|**Failed**   |Red   |
|**Deploying**|Yellow|
|**Stopped**  |Grey  |

### Deployment

每格代表 Deployment 及其下列資訊：

|Info        |Description|
|------------|-----------|
|Title       | 名稱|
|Group       | 所屬群組|
|Endpoint    | 佈建上線服務 URL|
|Metadata    | 點擊 `View`連結查看 metadata。|
|Last Updated| 最後更新時間|

**小技巧**: 鼠標移到 Endpoint 連結上，點擊會複製 URL 至剪貼簿供稍候複製。

+ 點擊`Create Deployment` 按鈕，進入 Deployment 創建頁。

+ 點擊`Refresh`按鈕，取得更新 Deployment 狀態。
  
## 創建

![](assets/mdeploy_create.png)

### Environment Settings

+ `Group`: 指定 Group，唯有 `Model Deployment`功能已開啟的所屬 Group 才能選擇；若看到此訊息*"No group is configured for you to launch a server. Please contact admin."*，請洽管理員開啟功能。

+ `InstanceTypes`: 指定資源配置請求的 instance type。
  
+ `Replicas`: 指定上線副本的數量。

### Deployment Details

+ `Deployment Name`: 名稱。

+ `Deployment ID`: 系統產生 ID。

+ `Model Image`: 指定採用的 Model Image。

+ `Image Pull Secret`: 如果必要，請指定下拉 Model Image 所需的 pull secret。

+ `Descriptions`: 使用者輸入描述。

### Metadata

可加入多個額外「鍵/值」組合：

+ `Name`: 鍵名。
+ `Value`: 數值。

點擊`Deploy`鈕，進行部署。

佈建啟動時會跳出對話框，點擊可查看部署詳細內容頁。

## Deployment 詳細資訊

![](assets/mdeploy_detail.png)

### Information

|欄位           |描述|
|---------------|-----------|
|Status         |狀態|
|Message        |相關訊息|
|Endpoint       |佈建上線服務 URL|
|Model Image    |指定的 Model Image|
|Replicas       |副本個數|
|Deployment Name|Deployment 名稱|
|Group          |所屬群組|
|Instance Type  |佈建用資源配請求|
|Creation Time  |創建時間|
|Last Updated   |最後更新時間|
|Description    |使用者輸入描述 |
|Run an Example |使用`Curl`查詢來驗證部署服務範例|

### Logs

+ `Filters`: 查看指定副本。

![](assets/mdeploy_log.png)

Logs 頁上顯示目前 Deployment 的記錄。

### History

History 頁上顯示過去已部署的 Deployment 的記錄。

![](assets/mdeploy_history.png)

點擊`View`連結來查看查看各個部署詳細記錄。

![](assets/mdeploy_history_view.png)

| Info   | Description     |
|---------------|----------|
| User          | 當時啟動部署的使用者|
| Stop          | *true* 或 *false*|
| Model Image   | 使用 model image url|
| Replicas      | 副本個數|
| Group         | 當時啟動部署的群組|
| Instance Type | 使用的 Instance Type 資源|
| Timestamp     | 最後更新時間 |
| Description   | 使用者輸入描述 |
| Metadata      | Metadata 列舉|

---

## 變更

在 Deployment 頁，點擊 `Update` 對此 Deployment 內容進行更動及部署更新。

其中有`Instance Type`、 `Replicas`、 `Model Image`、 `Image Pull Secret`、 `Description` 及 `Metadata`允許內容更新，其餘欄位初次佈建後則無法更動。

![](assets/mdeploy_update.png)

---

## 刪除

點擊各個 Deployment 框，在 Deployment 詳細頁，點擊右上方`Delete` 鈕，進行刪除。

---

## 停止服務

點擊各個 Deployment 框，在 Deployment 詳細頁，點擊右上方`Stop` 鈕，停止服務。

---

## 監測服務

PrimeHub 提供一個基於 **Seldon Core Analytics** 的 Grafana 監測板，我們可以根據 **deployment**/**model**/**model version** 來選擇監測目標。

1. 首先從 User Portal 進入 Grafana。

2. 選擇 `PrimeHub / Model Deployments` 監測板, 此時會列舉出所有已佈署提供服務的模型。

    ![](assets/mdeploy_grafana_list.png)

3. 選擇要監測的佈署，即可監測模型的運作。

    ![](assets/mdeploy_grafana_metrics.png)



預設監測指標:

+ QPS (Queries Per Second)

+ Success rate

+ 4xx, error if any

+ 5xx, error is any

+ Predict QPS

+ Reward

  >The reward is interpreted as the proportion of successes in the batch of data samples. Thus this implementation inherently assumes binary rewards for each sample in the batch. The helper function *n_success_failures* calculates the number of successes and failures given the batch of data samples and the reward. -[Reference](https://github.com/SeldonIO/seldon-core/blob/master/components/routers/epsilon-greedy/README.md).

+ Latency

此監測板基於 **Seldon Core Analytics**；更多詳細進階資訊可以參照 [document](https://docs.seldon.io/projects/seldon-core/en/v0.3.0/analytics/analytics.html) 及 [code](https://github.com/SeldonIO/seldon-core/tree/master/helm-charts/seldon-core-analytics)。
