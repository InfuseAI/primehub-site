---
id: version-3.6-group-setting-cht
title: Settings
description: Group Settings
sidebar_label: Settings
original_id: group-setting-cht
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
  <div class="deploy-only tooltip">Deploy
    <span class="tooltiptext">Applicable to Deploy Edition</span>
  </div>
</div>
<br>


由群組設定，群組管理者可以檢視此群組的各種設定值；設定值為平台管理者設定，因此只有平台管理者能變更，除了 Job 的 Default Timeout Setting。

>設定值變更請洽平台管理者

## Info

![](assets/group_setting_info.png)

顯示目前群組 Name、 Display Name、 Shared Volume、User Quota 及 Group Quota 的設定值。

## Members

![](assets/group_setting_member.png)

顯示目前群組的成員及管理者。

## Jobs

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
</div>
<br>

![](assets/group_setting_job.png)

+ `Default Timeout Setting`: 設定 Minutes / Hours / Days.

Job 預設逾時期限；此設定套用至同群組遞出的所有 Job；若期限內該 Job 尚未完成，該 Job 會被強制中斷。另外，此設定可被每次遞出 Job 時覆寫；系統預設值為 7 天。

## Deployments

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
</div>
<br>

![](assets/group_setting_model.png)

顯示 Model Deployment 是否開啟，換句話換說，此群組可否使用 **Deployments** 功能。

## MLflow

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="deploy-only tooltip">Deploy
    <span class="tooltiptext">Applicable to Deploy Edition</span>
  </div>
</div>
<br>

PrimeHub 整合 MLflow 提供模型追蹤管理功能，因此必須要綁定運作中的 MLflow 服務。

![](assets/group-setting-mlflow.png)

透過[PrimeHub Apps 安裝 MLflow](primehub-app-cht)，可以從應用服務資訊頁得知 `App URL` 及 `Service Endpoint`。

![](assets/app_detail.png)

+ 將 `http://`+`Service Endpoint` 填入 `MLflow Tracking URI`
+ 將 `App URL` 填入 `MLflow UI URI`

儲存綁定 MLflow 服務資訊。
