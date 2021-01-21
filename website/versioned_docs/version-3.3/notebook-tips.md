---
id: version-3.3-notebook-tips
title: Notebook Tips
description: Notebook Tips
sidebar_label: Tips
original_id: notebook-tips
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

## Install Custom Software

>PrimeHub v3.2+

Users are able to run `sudo apt <command>` in a terminal of a Jupyter or `!sudo apt <command> --assume-yes` in a Jupyter Notebook to install required softwares in the environment.

## Notebook Logs

>PrimeHub v3.3+

Notebooks, sometimes, are failed to spawn or run into troubles because user programs/environments. Now users are able to investigate failures and shoot troubles from logs of [Notebook Logs](quickstart/launch-project#notebook-logs).

## Safe Mode

>PrimeHub v2.4+

When a user's jupyter pod cannot be launched successfully, try to launch the Notebook under [Safe Mode](user-advanced-setting#safe-mode) for ***troubleshooting***. If the Notebook can be launched under Safe Mode, which implies two possible causes 

+ User's home folder `/home/jovyan`is full so that jupyter is not able to write its own files successfully.
+ There is something wrong with packages which are installed by users causing problems during Jupyter initialization.

Under Safe Mode, try to

+ Clean up home folder to make space for Jupyter.
+ Uninstall installed packages one-by-one to find out which package interrupt Jupyter initialization.
