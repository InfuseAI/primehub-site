---
id: version-3.6-deploy-index
title: PrimeHub Deploy
sidebar_label: Overview
original_id: deploy-index
---

<div class="label-sect">
  <div class="deploy-only tooltip">Deploy
    <span class="tooltiptext">Applicable to Deploy Edition</span>
  </div>
</div>
<br>

**PrimeHub Deploy** is a standalone **Model Deployment** tier from **PrimeHub Enterprise** edition. It incorporates **Models**, **Deployments**, **Shared Files** features intact and certain administration features from PrimeHub Enterprise edition that administrators can manage resources and group privileges to models and deployments.

### Group-Context

First of all, users have to specify a working group from joining groups by using the dropdown. Accordingly, the following right-side context is retained within the working group, it is so called **Group-Context**.

![](assets/group_context.png)

>If users don't belong to any group, the page shows `No group available` without any features. Please contact administrators.

![](assets/v3-landing-user-no-group.png)

### Home

At Home, the layout has three areas: 

+ **Getting Started/Open**: it has links of external documents where users can get started from and shortcuts of features where users can take actions quickly.

+ **Recent**: it displays recent activities done by the user; where users can have a quick-view of activities status.
+ **Resource Dashboard**: it displays *used/limit group quotas*.


### Profile Menu

Hovering over top-right icon, there is a Profile Menu containing **User Profile**, **Change Password**, **API Token**, **Admin Portal** and **Logout** shortcuts


## User Portal

![](assets/md_portal_v36.png)

After login, it lands on **User Portal**. 

On portal, the left side is **side menu**, the right side is the **context varied in the specified working group**. At the top of the right side; `Group:` dropdown for switching working groups. Users can switch the working group among joining groups easily.

![](assets/group_context.png)


## User Feature

+ **Models** where users can track registered models from MLFlow. See [Models Management (Beta)](model-management).

+ **Deployments** where users can deploy and serve models as services. See [Deployments Management](model-deployment-feature).

+ **Shared Files** where users can upload files to PHFS storage to share with group members. See [Shared Files](shared-files).

### Group admin feature

+ **Settings** where Group Admin can view settings configured by Platform Admin of the managed group and modify the default timeout setting of Jobs. See [Settings](group-setting).