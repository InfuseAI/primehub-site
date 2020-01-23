---
id: add-image
title: Add Image
---

This quickstart shows how we add an image on PrimeHub so that users can choose it on `Spawner` page on PrimeHub. If you haven't built any custom image, here is the [[quickstart] build image](build-image). Here we are going to add that custom image which is installed with `fastai v1 library` on PrimeHub.

## Steps

1. Goes to `Admin Dashboard` from the portal and `Images` management.

2. Click `+ Add` for adding an image spec.

3. Fill `Name` with `gcr-fastai-v1`.

4. Select `Type` `cpu`.

5. Fill `Container image url` with the url of our custom image. E.g. `gcr.io/infuseai/fastai-v1:1d1bxxxx`

6. Since we put our image on `Google Container Registry` (*It varies according to your real circumstance.*), it requires a pull-secret to pull down the image, we check off `Usage Image Pull Secret` and select the right `secret`.

7. Enable `Global` to make it available to all of users.

8. Click `Confirm` to save the setting.

Now users can select this custom image on the `Spawner` page, once the jupyterhub is launched, we can check the `fastai` library version in a notebook.

![](assets/jup-fastai.png)
