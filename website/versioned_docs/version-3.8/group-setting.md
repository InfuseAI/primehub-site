---
id: version-3.8-group-setting
title: Settings
description: Group Settings
sidebar_label: Settings
original_id: group-setting
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


Group Admin now can view the current settings of the managed group which are configured by Platform Administrator. All of settings are viewable-only to Group Admin, except **Default Timeout Setting** of Jobs is configurable.

>To request Platform Administrator for adjustments.

## Info

![](assets/group_setting_info_v38.png)

It displays the current settings, **Name**, **Display Name**, **Shared Volume**, **User Quota** and **Group Quota** of the working group.

## Members

![](assets/group_setting_member_v38.png)

It displays group members and group administrators.

## Jobs

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
</div>
<br>

![](assets/group_setting_job_v38.png)

+ `Default Timeout Setting`: Set Minutes / Hours / Days.

Group Admin can apply a group-wise Job timeout setting on every jobs submitted from the group. A running job will be cancelled when it exceeds the setting. This setting is able to be overwritten by each job submission for the customization. By default it is 7 days.

## Deployments

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="deploy-only tooltip">Deploy
  <span class="tooltiptext">Applicable to Deploy Edition</span>
  </div>
</div>
<br>

![](assets/group_setting_deployment_v38.png)

It displays if **Model Deployment** is enabled to the group, i.e., if the group can use **Deployments** feature.

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

PrimeHub provides models management feature, Models, by integrating MLflow. Before starting using Models, it requires the information of the binding MLflow instance.

![](assets/group_setting_mlflow_v38.png)

After [the installation of MLflow by PrimeHub Apps](primehub-app), we can learn `App URL` and `Service Endpoint` from the installed App detail.

![](assets/app_detail.png)

+ Fill in `MLflow Tracking URI` with `http://`+`Service Endpoint`
+ Fill in `MLflow UI URI` with `App URL`.

Save the setting for binding Models to the MLflow instance.

>By integrating externally-hosted MLflow server, see [Configuration](model-configuration) for the detail.
