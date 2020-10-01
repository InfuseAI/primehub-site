---
id: launch-project
title: Launch JupyterHub
sidebar_label: Launch Jupyter Notebook
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

This quickstart shows how to launch/stop a project.

## Launch

![](assets/spawner_v3.png)

1. Log in `User Portal` with a user account, select `Notebooks` and click `Start My Server` to enter the spawner page.

2. Confirm if the current group is what you desire; switch the group by the `Group:` dropdown at the top of the right side.

3. Select an `Instance Type` for the resource allocation to this project. It lists instance types only within the context of the group.

4. Select an `Image` which the project is based on. It lists images only within the context of the group.

   Accordingly, images are selectable only if `Types` of which match the selected `Instance Type` that guarantees hub is spawned with the proper image.

5. Enabled [Advanced Settings](../user-advanced-setting) if required. Click `Start Notebook`. Your Server environment would be instantiated. Once the Notebook is spawned, it will pop up a new tab.
   
>At very first time, browser will block the pop-up from PrimeHub by default, please allow the pop-up from PrimeHub. Click `My Server` to open Notebook in a new tab once the pop-up is allowed.

![](assets/v3-jupyter-popup-block.png)


## Stop

Click `Stop My Server`. It takes a short while to stop it.

## Notice

>If switching the current working group after the Notebook is launched, it indicates the Notebook is retained in the other group.

![](assets/v3-jupyter-other-group.png)