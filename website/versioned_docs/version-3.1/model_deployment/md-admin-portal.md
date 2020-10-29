---
id: version-3.1-md-admin-portal
title: Admin Portal
original_id: md-admin-portal
---

This quickstart shows how to access `Admin Portal`.

## Login

![](assets/login_1.png)

Select a `language` you prefer. Click Login with Admin username and password.

## Switch to Admin Portal

When login as an administrator, initially, you are directed to **User Portal**, click the icon at top-right and select `Admin Portal` for the switch.

![](assets/v3-admin-entry.png)

## Admin Portal

Basically, the layout is same as Admin Dashboard in PrimeHub v2.x; in addition,  `Notebooks Admin` feature, `Maintenance` feature and `Grafana` link are merged into Admin Portal.

+ `JupyterHub Admin` is renamed to `Notebooks Admin`.

![](assets/md_admin_portal_v31.png)

### Side Menu

+ `Groups` where Admin can manage groups. See [Group Management](md-group).

+ `Users` where Admin can manage users. See [User Management](md-user).

+ `Instance Types` where Admin can manage instance types. See [Instance Type Management](md-instancetype).

+ `Secrets` where Admin can manage secrets. See [Secret Management](md-secret).

+ `System Settings` where Admin can configure system-wise settings. See [System Settings](md-system).

+ `Grafana` where Admin can an monitor the metrics of serving deployments.

## Logout

Click `Logout` button at top-right. The page would be directed to the `Login` page.
