---
id: login-portal-admin
title: Admin Portal
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

This quickstart shows how to access `Admin Portal`.

## Login

![](assets/login_1.png)

Select a `language` you prefer. Click Login with your own username and password.

## Entrance

When login as an administrator, initially, you are directed to **User Portal**, click the icon at top-right and select `Admin Portal` for the switch.

![](assets/v3-admin-entry.png)

## Admin Portal

Basically, the layout is same as Admin Dashboard in PrimeHub v2.x; in addition,  `Notebooks Admin` feature, `Maintenance` feature and `Grafana` link are merged into Admin Portal.

+ `JupyterHub Admin` is renamed to `Notebooks Admin`.

![](assets/v3-admin-portal.png)

### Side Menu

+ `Groups` where Admin can manage groups. See [Group Management](../guide_manual/admin-group).

+ `Users` where Admin can manage users. See [User Management](../guide_manual/admin-user).

+ `Instance Types` where Admin can manage instance types. See [Instance Type Management](../guide_manual/admin-instancetype).

+ `Images` where Admin can manage images. See [Image Management](../guide_manul/../guide_manual/admin-image).

+ `Image Builder` where Admin can build custom images. See [Image Builder](../guide_manual/admin-build-image). `Enterprise`

+ `Datasets` where Admin can manage datasets. See [Dataset Management](../guide_manual/admin-dataset).

+ `Secrets` where Admin can manage secrets. See [Secret Management](../guide_manual/admin-secret).

+ `Notebooks Admin` where Admin can manage Notebooks of users.

+ `Usage Report` where Admin can review monthly reports of usage. See [Usage Report](../guide_manual/admin-report). `Enterprise`

+ `System Settings` where Admin can configure system-wise settings. See [System Settings](../guide_manual/admin-system).

+ `Maintenance` where Admin can run several built-in useful operations. See [Maintenance](../maintenance). `Enterprise`

+ `Grafana` where Admin can view dashboards on **Grafana**.

## Switch Portal

Click *PrimeHub logo* at top-left for switching back to User Portal.

## Logout

Click `Logout` button at top-right. The page would be directed to the `Login` page.
