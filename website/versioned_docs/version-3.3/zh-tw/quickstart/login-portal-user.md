---
id: version-3.3-login-portal-user
title: User Portal
description: User Portal
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

這份文件說明介紹使用者層級的`User Portal`。

## 登入

![](assets/login_1.png)

首先選擇 `language`及用「使用者」帳號密碼登入。

## User Portal

![](assets/v33-landing-user.png)

Portal 頁面上左側為使用者功能選單、右側為「專案群組先決」下的內容、最右上方則為切換專案群組的下拉選單 `Group:`。

![](assets/group_context.png)

+ **Home** 使用者可以由此參考 PrimeHub 相關文件。

+ **Notebooks**  使用者可以由此進行啟始專案。請參考 [啟始 Jupyter Notebook](launch-project)。

+ **Jobs** 使用者可以由此遞交需要費時的任務。請參考 [Job Submission](../job-submission-cht)。<span class="ee-only">Enterprise</span>

+ **Schedule** 使用者可以由此排程需要費時的任務。請參考 [Job Scheduler](../job-scheduling-feature-cht)。<span class="ee-only">Enterprise</span>

+ **Models (Beta)** 使用者可以由此部署模型並以模型為中心提供服務。請參考 [Model Deployment](../model-deployment-feature)。<span class="ee-only">Enterprise</span>

+ **Images** 群組管理者可以為其管理群組增加群組限定映像檔。請參考 [Images](../group-image-cht)。(群組管理者限定)

+ **Shared Files** 使用者可以上傳群組限定共享檔案至 PHFS 空間。請參考 [Shared Files](../shared-files-cht)。

>如果使用者不屬於任一專案群組，頁面上會顯示 `No group available`，請洽管理者。

![](assets/v3-landing-user-no-group.png)

## 登出

點擊右上角的`Logout`。 導回登入頁
