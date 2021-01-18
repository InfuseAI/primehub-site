---
id: launch-project
sidebar_label:  Jupyter Notebook
title: Launch Notebook Environment
description: Launch Notebook Environment
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>


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

## Spawning

From Notebook tab, it shows the spawning progress.

![](assets/spawner_cancel_v33.png)

Spawning can be cancelled by clicking `Cancel`.

## Notebook Logs

Logs are retrieved from Jupyter Pod since Notebook spawning to Notebook end. The logs can be viewed from `Logs` tab and be downloaded as a file *as long as Notebook is alive*. Once Notebook is terminated, logs are gone with it. In this case, we can only check latest logs cached by UI.

![](assets/spawner_log.png)

>Logs are shown when Notebook pod is being started or alive. If there is no running notebook, it shows `Error: cannot get log due to pods "jupyter-xxxx" not found`.

## Stop

Click `Stop My Server`. It takes a short while to stop it.

## Notice

>If switching the current working group after the Notebook is launched, it indicates the Notebook is retained in the other group.

![](assets/v3-jupyter-other-group.png)

## Reference

[Accessible Data Store from Notebook ](nb-data-store)
