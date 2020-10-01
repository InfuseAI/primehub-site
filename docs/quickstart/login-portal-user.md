---
id: login-portal-user
title: User Portal
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

This quickstart shows how to login/logout `User Portal`.

## Login

![](assets/login_1.png)

Select a `language` you prefer. Click Login with your own username and password.

## User Portal

![](assets/v3-landing-user.png)

On Portal, the left side is **side menu**, the right side is the **context of the current working group**. At the top of the right side, there is a `Group:` dropdown for working groups switch. Users can switch the working group among joining groups easily.

First of all, users have to specify a working group from joining groups by using the dropdown. Accordingly, the following context will be retained within the working group.

At side menu, there are

+ **Home** where users can find `User Guide` link which connects to this `PrimeHub Documentation` site.

+ **Notebooks**  where users can launch a Jupyter Notebook for projects.See [Launch Project](../quickstart/launch-project).

+ **Jobs (Beta)** where users can submit jobs for time-consuming tasks. See [Job Submission](../job-submission-feature).

+ **Schedule (Beta)** where users can schedule jobs regularly. See [Job Scheduler](../job-scheduling-feature).

+ **Models (Alpha)** where users can deploy and serve models as services. See [Model Deployment](../model-deployment-feature).

>If users don't belong to any group, the page shows `No group available`. Please contact administrators.

![](assets/v3-landing-user-no-group.png)

## Logout

Please click `Logout` button at top-right. The page would be directed to the `Login` page.
