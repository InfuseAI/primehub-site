---
id: model-deployment-feature
title: 模型部署 (Alpha)
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Available in Enterprise tier only</span>
</div>

>Alpha version. It is subject to changes in the stable release.

透過 Model Deployment 功能，使用者可以對 Deployment 進行新增、刪除、更新及佈建等操作。當 Deployment 功能於 Group 設定中開啟時，該 Group 的成員就可以使用此功能。在資源分配上，佈建上線的 model service 須在同 Group quota 限制下，才能佈建成功。管理者可透過 Grafana 來監測該佈建上線服務的使用狀態及資源使用數據；使用者可以檢視佈建的歷史記錄。

## 開啟功能

首先開啟指定 Group 的 `Model Deployment` 功能。

![](assets/mdeploy_enable.png)

## 主頁

此頁格列一覽所有已創建的部署；

![](assets/mdeploy_grid_v28.png)

狀態分別由下列顏色來區別：

|**狀態** |<span style="background-color: #33ea33">Deployed</span> |<span style="background-color: red">Failed</span>|<span style="background-color: #fba500">Deploying</span>|<span style="background-color: #aaaaaa">Stopped</span>|
|---------|--------|------|---------|-------|

### 部署

各部署列出下列簡短資訊；點擊各部署可查看詳細資訊。

|Info        |Description|
|------------|-----------|
|Title       | 名稱|
|Group       | 所屬群組|
|Endpoint    | 佈建上線服務 URL|
|Metadata    | 鼠標移到`View`，顯示 Metadata 資訊|
|Last Updated| 最後更新時間|

+ 輸入`Search deploy name`: 依關鍵字搜尋部署。

+ 點擊`Create Deployment` 按鈕，進入 Deployment 創建頁。

+ 點擊`Refresh`按鈕，更新部署狀態。

+ 篩選`Group`: 僅列出選定群組發佈的部署；可複選。

+ 勾選`Deployed By Me`: 僅列出由自己發佈的部署。

#### *小技巧*

  + *鼠標移到 Endpoint 連結上，點擊會複製 URL 至剪貼簿供稍候複製。*
  
  + *鼠標移到 Metadata 連結上，顯示 Metadata 資訊。*
  
## 創建

![](assets/mdeploy_create_v27.png)

### Environment Settings

+ `Group`: 指定 Group，唯有 `Model Deployment`功能已開啟的所屬 Group 才能選擇；若看到此訊息*"No group is configured for you to launch a server. Please contact admin."*，請洽管理員開啟功能。

+ `InstanceTypes`: 指定資源配置請求的 instance type。
  
+ `Replicas`: 指定上線副本的數量。

### Endpoint

+ `Private Access`: 設定 Endpoint 存取為公開或私人開關；如果開啟私人，則部署詳細頁上會顯示`Clients`頁籤，可由此產生存取 Token。

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

## 部署詳細資訊

![](assets/mdeploy_detail_v27.png)

### Information

|欄位           |描述|
|---------------|-----------|
|Status         |狀態|
|Message        |相關訊息|
|Endpoint       |佈建上線服務 URL|
|Access Type    |Public 或 Private|
|Model Image    |指定的 Model Image|
|Replicas       |副本個數|
|Deployment Name|部署 名稱|
|Group          |所屬群組|
|Instance Type  |佈建用資源配請求|
|Creation Time  |創建時間|
|Last Updated   |最後更新時間|
|Description    |使用者輸入描述 |
|Run an Example |使用`Curl`查詢來驗證部署服務範例；`Private`或`Public`存取代入參數有異|

### Logs

+ `Replicas`: 查看指定副本。

![](assets/mdeploy_log_v27.png)

Logs 頁上顯示目前 部署 的記錄。

點擊`Scroll to Bottom`可直接跳至記錄最尾端。

#### 注意

預設只顯示最新的 2000 行記錄；點擊`Download`可下載完整記錄檔。

### History

History 頁上顯示過去已部署的 Deployment 的記錄。

![](assets/mdeploy_history.png)

點擊`View`連結來查看查看各個部署詳細記錄。

![](assets/mdeploy_history_view.png)

| Info   | Description     |
|---------------|----------|
| User          | 當時啟動部署的使用者|
| Deployment Stopped | *true* 或 *false*|
| Model Image   | 使用 model image url|
| Replicas      | 副本個數|
| Group         | 當時啟動部署的群組|
| Instance Type | 使用的 Instance Type 資源|
| Timestamp     | 最後更新時間 |
| Description   | 使用者輸入描述 |
| Metadata      | Metadata 列舉|

### Clients

只有當`Private Access`開啟時，才會顯示此頁籤。

![](assets/mdeploy_token_v27.png)

填入`Client Name`及點擊 `Add client`產生該帳號的對應`Client Token`。

必須代入此 Token 才能存取私人 endpoint；我們可以將之代入 curl 命令參數`-u <client-name>:<client-token>`。

>Client Token 產生後，在介面上只會短暫地顯示一次，請記錄下來；若遺失，請刪除再重新產生。

#### *小技巧*

如果希望在模型預測時，知道「誰`Client Name`」發送請求；可以在預測函式中，從請求的 header `X-Forwarded-User`取得資訊，如下：

```python
from flask import request as req

...
req.headers.get('X-Forwarded-User') # you can get the client name from the header
...

```

---

## 變更

在 Deployment 頁，點擊 `Update` 對此部署內容進行更動及部署更新。

其中有`Instance Type`、 `Replicas`、 `Model Image`、 `Image Pull Secret`、 `Description` 及 `Metadata`允許內容更新，其餘欄位初次佈建後則無法更動。

![](assets/mdeploy_update_v27.png)

---

## 刪除

點擊各個 Deployment 框，在部署詳細頁，點擊右上方`Delete` 鈕，進行刪除。

---

## 停止服務

點擊各個 Deployment 框，在部署詳細頁，點擊右上方`Stop` 鈕，停止服務。

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
