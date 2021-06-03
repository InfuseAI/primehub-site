---
id: primehub-app-cht
title: PrimeHub Apps (Beta)
sidebar_label: Overview (Beta)
description: PrimeHub Apps
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>
<br>

> This is an Beta feature. The page content is subject to change.

**PrimeHub** 以做為讓資料科學家恣意導入多樣性資料及各種工具的整合性 MLOps 平台為目標，藉此可以加速研究開發的流程。因此我們導入 **PrimeHub Apps** 新功能。藉由此功能，我們可以安裝第三方應用服務來擴充 PrimeHub 的實用性，如：ML 自動化、資料視覺化等工具，可以更貼近開發流程。安裝的第三方應用服務同樣受惠於 PrimeHub 平台的存取權限管理、運算資源分配管理。

![](assets/app_overview_v36.png)

## Installed Apps

Apps 首頁顯示已安裝實體應用服務

![](assets/app_landing_cards.png)

|Info|Description|
|----|-----------|
|Title| 使用者命名的實體服務名稱 |
|Status| 實體服務狀態|
|App version| 實體服務使用的應用程式及版號|


+ `Manage`: 進入實體服務詳細資訊頁
+ `Start/Stop`: 實體服務開關
+ `Open`: 於新分頁開啟實體服務 URL

同樣地，當沒有任何安裝實體服務時，首頁顯示空白。

![](assets/app_landing_empty.png)


+ `+ Applications`: 進入 Store 頁，選擇安裝的應用服務

## App Store

App Store 呈現內建的應用服務選單及[使用者自建應用服務](../primehub-app-tutorial-template)。

![](assets/app_store_v36.png)

+ `Search`: 關鍵字搜尋
+ `App Documents`: 於新頁開啟應用服務的官方文件網站
+ `+ Install to PrimeHub`: 進入應用服務安裝設定頁


## Installing App

![](assets/app_mlflow.png)

+ `App`: 應用服務選擇
+ `App ID`: 實體服務 ID
+ `Name`: 實體服務命名
+ `Environment Variables`: 新增/修改預設環境變數
+ `Instance Types`: 選擇實體服務配置運算資源
+ `Access Scope`: 選擇實體服務存取的使用者群
  + `Group members only`: 工作群組成員
  + `PrimeHub users only`: 全平台使用者
  + `Public`: 全開放，不限平台使用者；有實體服務 URL 的人皆可存取

> 請確保工作群組有足夠未使用的運算資源可以配置給此實體服務，以利啟動運作。

### Preset Environment Variables

使用環境變數的用法格式，例如： `$(PRIMEHUB_APP_ROOT)/data`。

這裡列出可供使用的內建的環境變數：

+ `PRIMEHUB_APP_ID`: 應用服務 ID
`<app-id>`
+ `PRIMEHUB_APP_ROOT`:  應用服務資料的根目錄；用來存放此應用服務的資料。 其路徑因有無開啟 Group Volume 而異
  + `/project/<group-name>/phapplications/<app-id>` 開啟 Group Volume 時。
  + `/phapplications/<app-id>` 關閉 Group Volume 時。
+ `PRIMEHUB_APP_BASE_URL`: 應用服務 URL 前置字串為 `/console/apps/<app-id>`。

## Installed App Detail

![](assets/app_detail.png)

### Panel

+ `Title`: 使用者命名的實體服務名稱
+ `App version`: 使用的應用程式及版號
+ `Description`: 應用程式摘要

Action buttons:

+ `Open Web UI`: 於新分頁開啟實體服務 URL
+ `App Documents`: 於新頁開啟應用服務的官方文件網站
+ `Start/Stop`: 實體服務開關
+ `Update`: 變更實體服務設定並重啟服務套用新設定值
+ `Uninstall`: 卸載實體服務

### Information

|Info|Description|
|----|-----------|
|Status|實體服務狀態|
|Message|實體服務狀態描述；如有錯誤發生，顯示錯誤訊息 |
|App URL|實體服務 URL|
|Service Endpoints|  實體服務端點|
|App ID|實體服務 ID|
|Name|實體服務的使用者命名|
|Instance Type| 配置運算資源|
|Access Scope| 實體服務存取的使用者群|
|Environment Variables| 已設定的環境變數|

### Logs

實體服務工作記錄。

工作記錄觀覽只顯示最新的倒數 2000 行記錄。 點擊 `Scroll to Bottom` 至記錄最下方，或點擊 `Download` 下載完整記錄。

![](assets/app_log.png)


## Built-in Apps

請參照[英文文件](../primehub-app-builtin-code-server)。

