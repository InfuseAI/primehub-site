---
id: primehub-manual
title: PrimeHub Console Manual
---

## Login and Logout

![](assets/login_1.png)

Select a `language` you prefer. Click Login with your own username and password.

![](assets/user_portal.png)

Please click `Logout` button at top-right. The page would be directed to the `Login` page.

---

## User Portal

![](assets/landing_page.png)

After login, it displays a landing page with several shortcuts:

As *end users*,

+ **JupyterHub**
It is redirected to the `JupyterHub` where users can launch projects.

+ **User Guide**
It is redirected to `Documentation` where users can find useful guides and ask questions.

As *administrators*,

+ **JupyterHub Admin**
It is redirected to the admin console of hubs where administrators can manage hubs of users.

+ **Admin Dashboard**
It is redirected to `PrimeHub Admin` where administrators can manage `PrimeHub` system.
[Reference: Admin Manual](admin-manual.md)

+ **Maintenance Notebook**
It is redirected to a `maintenance notebook` where administrators can run several built-in useful operations.

![](assets/landing_page_logout.png)

Click top-right button and select `Logout`.

---

## Launch Your Project (JupyterHub)

![](assets/spawner.png)

### Steps

1. Select a `Group` which your project belongs to.

2. Select an `Instance Type` which are provided to this Group

3. Select an `Image`.

   Accordingly, images are selectable only if `Types` of which match the selected `Instance Type` that guarantees hub is spawned with the proper image. Please see Image Management about the image type.

4. Click `Spawn`. Your Server environment would be instantiated.

   ![](assets/spawn_1.png)

   After entering Jupyter Hub, projects can be conducted here.

   ![](assets/Hub_JL.png)

## Close/Stop a Running Project

The `Control Panel` button is located under `File` on menu bar.

![](assets/Hub_control_panel.png)

Select `File` on **menubar**, then select `Hub Control Panel`.

![](assets/navbar_stop_server.png)

---

## Reference

[Jupyter documentation](https://jupyterlab.readthedocs.io/en/stable/)
