---
id: primehub-app
title: PrimeHub Apps (Beta)
sidebar_label: Overview (Beta)
description: PrimeHub Apps
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

> This is an Alpha feature. The page content is subject to change.

**PrimeHub** aims at being a MLOps platform where scientists can orchestrate data/tools for the acceleration of researches. In terms of a platform, we introduce **PrimeHub Apps** that PrimeHub capability is able to be extended by integrations of 3rd-party applications such as auto ML tools, visualization tools, etc. These integrated applications also benefit from access-control and resource constraints of PrimeHub.

![](assets/app_overview.png)

## Installed Apps

The landing page of Apps displays installed applications;

![](assets/app_landing_cards.png)

|Info|Description|
|----|-----------|
|Title| The name of the application instance |
|Status| The status of the application instance|
|App version| The application version of the instance|


+ `Manage`: Enter the detail page of the instance
+ `Start/Stop`: Toggle the instance
+ `Open`: Open the URL of the application in a new tab

likewise it displays a blank when no installed one.

![](assets/app_landing_empty.png)


+ `+ Applications`: Select and install an application from Store

## App Store

![](assets/app_store.png)

+ `Search`: Search available applications by a keyword
+ `App Documents`: Open the external official documentation of the application in a new tab
+ `+ Install to PrimeHub`: Enter the installing page


## Installing App

![](assets/app_mlflow.png)

+ `App`: Selection of applications
+ `App ID`: A random unique ID of App
+ `Name`: Name the instance
+ `Environment Variables`: Displays/Add/Modify required environment variables by default
+ `Instance Types`: Select an instance type for the application
+ `Access Scope`: Select targeted users who can access the application
  + `Group members only`: Current working group members only
  + `PrimeHub users only`: Platform-wise users
  + `Public`: To anyone who has the URL

> Please assure that Group Resources are sufficient to run the instance.

### Preset Environment Variables

In the `Environment Variables` settings, to use other environment variables in the value column, the format is `$(PRIMEHUB_APP_ROOT)/data`. 

Here are some preset environment variables we can use

+ `PRIMEHUB_APP_ID`: The application ID
`<app-id>`
+ `PRIMEHUB_APP_ROOT`:  The root of application data. This path is supposed to store the application-specific persistent data. The value is:
  + `/project/<group-name>/phapplications/<app-id>` if the group volume is available
  + `/phapplications/<app-id>` if the group volume is not available
+ `PRIMEHUB_APP_BASE_URL`: The url prefix for the application. The value is `/console/apps/<app-id>`
+ `PRIMEHUB_URL`: The external url of PrimeHub
+ `PRIMEHUB_GROUP`: The group name

## Installed App Detail

![](assets/app_detail.png)

### Panel

+ `Title`: The name of the application instance
+ `App version`: The application version of the instance
+ `Description`: A digest of the application

Action buttons:

+ `Open Web UI`: Open the URL of the application in a new tab
+ `App Documents`: Open the external official documentation of the application in a new tab
+ `Start/Stop`: toggle the instance
+ `Update`: Modify the instance detail and re-start the instance with updates
+ `Uninstall`: Remove the instance

### Information

|Info|Description|
|----|-----------|
|Status|The status of the application instance|
|Message|The message describes the status; error message if any |
|App URL|The URL of the application|
|Service Endpoints| The service endpoints. Clients in the cluster can access this application by HOST:PORT directly.|
|App ID|A random ID of App|
|Name|The name of the instance|
|Instance Type| Allocated instance type|
|Access Scope| The targeted users who can access the application|
|Environment Variables| Added environmental variables|

### Logs

The logs of the running instance.

Log viewer only list the latest 2000 lines of logs. Clicking `Scroll to Bottom` to check the last logs at the bottom or clicking `Download` to download a complete log file

![](assets/app_log.png)
