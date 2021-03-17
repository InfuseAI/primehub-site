---
id: version-3.4-login-portal-user
title: User Portal
description: User Portal
sidebar_label: User Portal
original_id: login-portal-user
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

![](assets/v34-landing-user.png)

Portal 頁面上左側為「使用者功能選單」、右側為「工作專案群組」。

### Group-Context

![](assets/group_context.png)

最右上方則為切換工作專案群組的下拉選單 `Group:`。

### Profile Menu

滑鼠移到右上角圖示顯示「個人選單」包括 User Profile、Change Password、API Token、Admin Portal（管理員專用）、Logout。

## User Feature

+ **Home** 使用者可以由此參考 PrimeHub 相關文件。

+ **Notebooks**  使用者可以由此啟始 Jupyter Notebook。請參考 [Notebook](launch-project)。

+ **Jobs** 使用者可以由此遞交需要費時的任務。請參考 [Jobs](../job-submission-cht)。<span class="ee-only">Enterprise</span>

+ **Schedule** 使用者可以由此排程需要費時的任務。請參考 [Schedule](../job-scheduling-feature-cht)。<span class="ee-only">Enterprise</span>

+ **Models** 使用者可以由此部署模型並以模型為中心提供服務。請參考 [Models](../model-deployment-feature)。<span class="ee-only">Enterprise</span>

+ **Shared Files** 使用者可以上傳群組限定共享檔案至 PHFS 空間。請參考 [Shared Files](../shared-files-cht)。

>如果使用者不屬於任一專案群組，頁面上會顯示 `No group available`，請洽管理者。

![](assets/v3-landing-user-no-group.png)

### Group admin feature

+ **Images** 群組管理者可以為其管理群組增加群組限定映像檔。請參考 [Images](../group-image-cht)。(群組管理者限定)

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
