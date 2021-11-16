---
id: admin-app-settings
title: App Settings
description: Import and Manage the PrimeHub Apps
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>
<br>

Starting from PrimeHub v3.9, the `App Settings` is introduced that administrators can manage their customized apps into the PrimeHub.
![](assets/app-settings-default.png)

## Import App

Follow the [tutorial](../primehub-app-tutorial-template) to know how to create your PrimeHub app using PhAppTemplate CRD.

We also hosted some well-known apps in the [awesome-primehub-apps](https://github.com/InfuseAI/awesome-primehub-apps) repository.

- Let's use the [Streamlit app template](https://raw.githubusercontent.com/InfuseAI/awesome-primehub-apps/main/app-templates/streamlit.yaml) as an example. Fill in the URL of the app template and click `Import` button.
![](assets/app-settings-import-streamlit-1.png)

- The `Streamlit` app is successfully imported.
![](assets/app-settings-import-streamlit-2.png)

- In [PrimeHub Apps](primehub-app), we can directly choose the imported app template and launch it as an app instance.
![](assets/app-settings-import-streamlit-3.png)
