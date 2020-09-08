---
id: version-3.0-deploy-index
title: PrimeHub Deploy
sidebar_label: Introduction
original_id: deploy-index
---

**PrimeHub Deploy** is a standalone Model Deployment-only version of **PrimeHub Enterprise**. In addition to the PrimeHub Enterprise version of the Model Deployment feature, PrimeHub Deploy also features an Admin Dashboard that allows administrators to manage resources and access-control.

From **PrimeHub v3.0**, there are huge changes on UI for introducing **Group-Context** experience that users have to pre-specify a current working project-group from joining groups, accordingly, the context/the operations are retained within the working group; in the past PrimeHub v2, users had to choose a group to perform actions every time in features respectively which didn't provide a project-centric experience; In PrimeHub v3, because group-context, the user experience becomes more project-centric intuitively.

## User Portal

![](assets/md_portal_v3.png)

After login, it shows **User Portal**, on portal, the left side is **side menu**, the right side is the **context of the current working group**. At the top of the right side, there is a `Group:` dropdown for working groups switch. Users can switch the working group among joining groups easily.

### Side Menu

+ **Home** where users can find `User Guide` link which connects to this `PrimeHub Documentation` site.

+ **Models (Alpha)** where users can deploy and serve models as services. See [Model Deployment](model_deployment/md-deployment).

### Logout

Please click `Logout` button at top-right. The page would be directed to the `Login` page.
