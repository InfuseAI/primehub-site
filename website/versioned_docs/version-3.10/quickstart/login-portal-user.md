---
id: version-3.10-login-portal-user
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

## Portal

After login, a user lands on User Portal.

![](assets/v310-landing-user.png)

On Portal, the left side is **side menu** composed of platform user features, the right side is the **context of the current working group**. At the top-right, there is a `Group:` dropdown of switching working groups. Users can switch the working group to proceed to different projects easily.

### Group-Context

First of all, users have to specify a working group from joining groups by using the dropdown. Accordingly, the following right-side context is retained within the working group, it is so called **Group-Context**.

![](assets/group_context.png)

>If users don't belong to any group, the page shows `No group available` without any features. Please contact administrators.

![](assets/v3-landing-user-no-group.png)

### Home

At Home, the layout has multiple areas:

+ **User Guide/Quickstart**: it has links of external documents where users can get started from and shortcuts of features where users can take actions quickly.
  
  *Quick-launch for TensorFlow and PyTorch*
  ![](assets/v39-quick-launch-tf.gif)

+ **Recent**: it displays recent activities (such as Job, Model) done by the user; where users can have an quick-view of activities status.
+ **Resource Dashboard**: it displays *permitted user quota in this group* and *used/limit group quotas*.
+ **Invite Users**: it makes possible to invite more users to experience PrimeHub via the *invitation link*.

### Profile Menu

Hovering over top-right icon, there is a Profile Menu containing **User Profile**, **Change Password**, **API Token**, **Admin Portal** and **Logout** shortcuts.


## User Feature

+ **Notebooks**  where users can launch a Jupyter Notebook for projects. See [Notebook environment](../quickstart/launch-project).

+ **Jobs** where users can submit jobs of time-consuming tasks. See [Jobs](../job-submission-feature#jobs).

+ **Recurring Jobs** where users can schedule jobs regularly. See [Recurring Jobs](../job-submission-feature#recurring-jobs).

+ **Models** where users can track registered models from MLFlow. See [Models Management (Beta)](../model-management).
 
+ **Deployments** where users can deploy and serve models as services. See [Deployments Management](../model-deployment-feature). 

+ **Shared Files** where users can upload files to PHFS storage to share with group members. See [Shared Files](../shared-files).

+ **Datasets** where users can manage datasets. See [Datasets Management](../datasets).

+ **Apps** where users can install 3rd-party applications to extend capabilities of PrimeHub. See [PrimeHub Apps (Beta)](../primehub-app).

### Group admin feature

Features here are Group-Admin only.

+ **Images** where Group Admin can add/build group-specific images for the managed group. See [Images](../group-image).

+ **Settings** where Group Admin can view settings configured by Platform Admin of the managed group and modify the default timeout setting of Jobs. See [Settings](../group-setting).

> Please contact administrators to acquire Group Admin privilege.
 

## License warning

A license issued by InfuseAI contains `Expiration Date`, `Maximum Nodes`, `Maximum Deployments`.

+ When a license has expired, a warning message appears.

  >Your license has expired. Please contact your sales team to extend your license.

+ When used node amount > granted node amount, a warning message appears.

  > You are using more nodes than your license allows. Please contact your system administrator.

+ when used model amount > granted model amount + 10%, a warning message appears.

  >Please contact your system administrator for assistance to upgrade your license to run more models.

To learn the current PrimeHub license information, see [PrimeHub License](../guide_manual/admin-system#primehub-license).
