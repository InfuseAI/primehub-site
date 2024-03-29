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

## Portal

After login, a user lands on User Portal.

![](assets/v34-landing-user.png)

On Portal, the left side is **side menu** composed of platform user features, the right side is the **context of the current working group**. At the top-right, there is a `Group:` dropdown of switching working groups. Users can switch the working group to proceed to different projects easily.


### Group-Context

First of all, users have to specify a working group from joining groups by using the dropdown. Accordingly, the following right-side context is retained within the working group, it is so called **Group-Context**.

![](assets/group_context.png)

>If users don't belong to any group, the page shows `No group available` without any features. Please contact administrators.

![](assets/v3-landing-user-no-group.png)


### Profile Menu

Hovering over top-right icon, there is a Profile Menu containing **User Profile**, **Change Password**, **API Token**, **Admin Portal** and **Logout** shortcuts.


## User Feature

+ **Home** where users can find **User Guide** linking to the **PrimeHub Documentation** site.

+ **Notebooks**  where users can launch a Jupyter Notebook for projects. See [Notebook environment](../quickstart/launch-project).

+ **Jobs** where users can submit jobs of time-consuming tasks. See [Jobs](../job-submission-feature). <span class="ee-only">Enterprise</span>

+ **Schedule** where users can schedule jobs regularly. See [Schedule](../job-scheduling-feature). <span class="ee-only">Enterprise</span>

+ **Models** where users can deploy and serve models as services. See [Model Deployment](../model-deployment-feature). <span class="ee-only">Enterprise</span>

+ **Shared Files** where users can upload files to PHFS storage to share with group members. See [Shared Files](../shared-files).

### Group admin feature

Features here are Group-Admin-Only.

+ **Images** where Group Admin can add/build group-specific images for the managed group. See [Images](../group-image).

> Please contact administrators to acquire Group Admin privilege.
 

## License warning

A license issued by InfuseAI contains `Expiration Date`, `Maximum Nodes`, `Maximum Models`.

+ When a license has expired, a warning message appears.

  >Your license has expired. Please contact your sales team to extend your license.

+ When used node amount > granted node amount, a warning message appears.

  > You are using more nodes than your license allows. Please contact your system administrator.

+ when used model amount > granted model amount + 10%, a warning message appears.

  >Please contact your system administrator for assistance to upgrade your license to run more models.

To learn the current PrimeHub license information, please see [PrimeHub License](../guide_manual/admin-system#primehub-license).
