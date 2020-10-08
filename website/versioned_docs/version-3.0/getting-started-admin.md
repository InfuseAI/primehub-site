---
id: version-3.0-getting-started-admin
title: Administration
original_id: getting-started-admin
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

## 🌟PrimeHub v3.0

From **PrimeHub v3.0**, administration features are performed on `Admin Portal` which is independent from **User Portal** now. Please check Admin Portal section below if you come from PrimeHub v2.x or just skip to guides if you are newcomers.

## Admin Portal

![](assets/v3-admin-portal.png)

+ Then entrance of **Admin Portal**. See [Access Admin Portal](quickstart/login-portal-admin). 

+ `Notebooks Admin` feature, `Maintenance` feature and `Grafana` link are merged into Admin Portal.

+ `JupyterHub Admin` is renamed to `Notebooks Admin`.

+ `System` is renamed to `System Settings`.


## Guides

PrimeHub provides features which help administrators manage resources, control access of users/groups and operate certain maintenance tasks. All of these features are performed on **Admin Portal**.

Guides are included:

+ [Access Admin Portal](quickstart/login-portal-admin)

+ [Manage PrimeHub system and check the license](guide_manual/admin-system)

+ [Manage users and groups](guide_manual/admin-user)

+ [Manage instance types, images, dataset resources](guide_manual/admin-instancetype)

+ [Build custom images for users](guide_manual/admin-build-image)
  + [Custom Image Guideline](guide_manual/custom-image-guideline)

+ [Manage secrets(credentials)](guide_manual/admin-secret.md)

  + [GitLab Pull Secret](quickstart/secret-pull-image)
  + [GitHub gitsync secret](quickstart/secret-gitsync)

  
+ [Perform operations via Maintenance Notebook](maintenance)
