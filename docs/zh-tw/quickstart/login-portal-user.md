---
id: login-portal-user
title: User Portal
description: User Portal
sidebar_label: User Portal
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

登入後，首頁為 User Portal。

## Portal

![](assets/v37-landing-user.png)

Portal 頁面左側為「使用者功能選單」、右側為「工作專案群組對應內容」。

### Group-Context

![](assets/group_context.png)

最右上方則為切換工作專案群組的下拉選單 `Group:`。

>如果使用者不屬於任一專案群組，頁面上會顯示 `No group available`，請洽管理者。

![](assets/v3-landing-user-no-group.png)

### Home

Home 頁呈現三個區塊：

+ **Getting Started/Open**: 外部文件連結，新手使用者可以從文件快速上手 PrimeHub 及更多了解；功能捷徑，使用者可以快速進行功能。

+ **Recent**: 呈現最近使用者進行的活動，如：Job, Model；使用者可以快速了解活動狀態。
+ **Resource Dashboard**: 呈現此群組使用者允許使用的資源額度；群組整體已使用額度/群組額度上限。


### Profile Menu

滑鼠移到右上角圖示顯示「個人選單」包括 User Profile、Change Password、API Token、Admin Portal（管理員專用）、Logout。

## User Feature

+ **Notebooks**  使用者可以由此啟始 Jupyter Notebook。請參考 [Notebook](launch-project)。

+ **Jobs** 使用者可以由此遞交需要費時的任務。請參考 [Jobs](../job-submission-cht)。

+ **Schedule** 使用者可以由此排程需要費時的任務。請參考 [Schedule](../job-scheduling-feature-cht)。

+ ***Models** 使用者可以由此管理由 MLflow 追蹤登錄模型版號。請參考 [Models](../model-management-cht).

+ **Deployments** 使用者可以由此部署模型並以模型為中心提供服務。請參考 [Deployments](../model-deployment-feature)。

+ **Shared Files** 使用者可以上傳群組限定共享檔案至 PHFS 空間。請參考 [Shared Files](../shared-files-cht)。

+ **Apps** 使用者可以安裝第三方應用來擴充 PrimeHub 功能。請參考 [PrimeHub Apps (Beta)](../primehub-app-cht)。


### Group Admin Feature

+ **Images** 群組管理者可以為其管理群組增加群組限定映像檔。請參照 [Images](../group-image-cht)。(群組管理者限定)

+ **Settings** 群組管理者可以檢視平台管理者為此群組設定的資訊；變更 Job 預設逾時期限。請參照 [Settings](../group-setting-cht)

>請洽管理者取得群組管理者權限。

## 授權警示

InfuseAI 發出的授權包括 `授權期限`、 `最多節點數量`, `最多模型部署數量`。

+ 當授權逾期時，顯示警示訊息

  >Your license has expired. Please contact your sales team to extend your license.

+ 當使用節點數 > 授權節點數量，顯示警示訊息

  > You are using more nodes than your license allows. Please contact your system administrator.

+ 當使用模型部署數量 > 授權模型部署數量 + 10%，顯示警示訊息

  >Please contact your system administrator for assistance to upgrade your license to run more models.

想要得知目前授權資訊，請見 [PrimeHub License](../guide_manual/admin-system-cht#primehub-license)。
