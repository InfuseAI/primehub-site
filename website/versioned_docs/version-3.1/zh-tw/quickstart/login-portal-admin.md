---
id: version-3.1-login-portal-admin
title: Admin Portal
original_id: login-portal-admin
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

這份文件說明介紹管理者層級的 `Admin Portal`。

## 登入

![](assets/login_1.png)

首先選擇 `language`及用「管理者」帳號密碼登入。

## 入口

當以管理者帳號登入後，起先會進入到 **User Portal**，點擊右上角的圖示並選擇 `Admin Portal` 來切換至管理功能頁。

![](assets/v3-admin-entry.png)

## Admin Portal

Portal 頁面上的捷徑圖示會因實際環境而有差異，基本上會有：

基本上介面如同原 PrimeHub v2.x 的 **Admin Dashboard**，但追加整合  `Notebooks Admin` 功能、 `Maintenance` 功能及 `Grafana`連結至 Admin Portal。

+ `JupyterHub Admin` 功能更名為 `Notebooks Admin`

![](assets/v3-admin-portal_v31.png)

### 功能選單

+ `Groups` 管理群組。 請見 [群組管理](../guide_manual/admin-group-cht)。

+ `Users` 管理使用者。 請見 [使用者管理](../guide_manual/admin-user-cht)。

+ `Instance Types` 管理 instance types. 請見 [Instance Type 管理](../guide_manual/admin-instancetype-cht)。

+ `Images` 管理映像檔。 請見 [Image Management](../guide_manul/../guide_manual/admin-image-cht)。

+ `Image Builder` 客製映像檔工具。請見 [Image Builder](../guide_manual/admin-build-image-cht)。 `Enterprise`

+ `Datasets` 管理資料集。 請見 [Dataset 管理](../guide_manual/admin-dataset-cht)。

+ `Secrets` 管理 secrets。 請見 [Secret 管理](../guide_manual/admin-secret-cht)。

+ `Notebooks Admin` 管理使用者的 Notebook。

+ `Usage Report` 閱覽使用量月報告。 請見 [Usage Report](../guide_manual/admin-report-cht)。 `Enterprise`

+ `System Settings` 設定系統參數。 請見 [System Settings](../guide_manual/admin-system-cht)。

+ `Maintenance` 開新分頁連至維運用 Notebook 內建常用維運指令集。 請見 [Maintenance](../maintenance-cht)。 `Enterprise`

+ `Grafana` 開新分頁連至 **Grafana** ，可檢視監控儀表板。

## 登出

點擊右上角的`Logout`。 導回登入頁。
