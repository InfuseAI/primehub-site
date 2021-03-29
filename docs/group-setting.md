---
id: group-setting
title: Settings
sidebar_label: Settings
description: Group Settings
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


As a Group Admin, we can view the current settings which are configured by Platform administrators.

The timeout setting of Jobs is adjustable.

## Info

>It's viewable-only. Platform administrator only can modify these settings.

>screenshot

+ `Name`

+ `Display name`

+ `Shared Volume Capacity` Set the capacity of the shared volume.

+ `Launch Group Only` Set if the shared volume is only mounted in the launch group. When a user open a notebook, by default, it will mount the shared volume of the current launch group. However, if the user is also the member of a group which configures shared volume `Launch Group Only` as **false**, this volume would be also mounted in this notebook. In this case, we can see current group-shared volumes and some other group-shared volumes which are all mounted under the `/project/` folder.

### User Quota

Set quotas for each user in this group.

+ `CPU Quota` How many CPU can be used by the user within this group. The default is `0.5`.

+ `GPU Quota` How many GPU can be used by the user within this group. The default is `0`. Default is `0` that means users can't use GPU.

+ `Memory Quota` How many Memory can be used by the user within this group. The default is `unlimited`.

### Group Quota

Set quota for the whole group.

+ `CPU Quota` When the user chooses the group, how many CPU can be shared by all users in the group. The default is `unlimited`.

+ `GPU Quota` When the user chooses the group, how many GPU can be shared by all users in the the group. Default is `unlimited`.

+ `Memory Quota` When the user chooses the group, how many Memory can be shared by all users in the the group. Default is `unlimited`.

## Members

We can view the members list and learn who are Group Admin.

>It's viewable-only. Platform administrator only can modify these settings.

>screenshot

+ `Group Admin`: check off if the member has privileges.

## Jobs

>screenshot

+ `Default Timeout Setting`: Set Minutes / Hours / Days.

Group Admin can apply a group-wise Jobs timeout setting. A running job will be cancelled when it exceeds the interval of time. This setting is able to be overwritten by each job submission.

## Models

>It's viewable-only. Platform administrator only can modify these settings.

>screenshot

+ `Model Deployment`: Groups with enabled model deployment are able to access [Models](../model-deployment-feature) for model deployments.
