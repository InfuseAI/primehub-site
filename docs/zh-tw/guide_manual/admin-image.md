---
id: admin-image
title: Image Management
---

Image management provides the capabilities of managing docker-image resources such as create, delete, edit images and of permission-control which allows only specified-groups to use the images.

## Creating New Image

![](assets/image_3.png)

Click `Add` to add an Image and it will pop up the edit screen of Images.

![](assets/images_add.png)

You need to fill in the fields in the above picture:

+ `Name` (required): Only lowercase letters, numbers, dash `-` and the bottom line `_` can be filled in.

+ `Display name`

+ `Description`

+ `Container image url` Fill the Image's link location in it.

+ `Use Image Pull Secret` Checked if a pull-secret is required and select a secret from the list.

   ![](assets/images_pull_secret.png)

+ `Global` If enable it, everyone can use this Image. If disable it, you need to link the group with permission to use in `edit groups`.

Finally, click `Confirm` to complete the addition.

![](assets/image_type.png)

From v2.0 above, we introduce an attribute, `Type`, which indicates what type of this image is. Because the attribute, images which type matches the selected `Instance Type` in hub launcher can be selected only.

+ `Type`: `cpu`, `gpu` and `universal` Indicate what type of the image is.

+ `Container image url` Fill the Image's link location in it.

+ `Specific container image url for GPU` It appears when `universal` is selected. By default it uses the same url as container image url. Check off it if a specific url for GPU is desired.

## Deleting Image

![](assets/image_5.png)

Click `Delete` in the Images list, the confirmation dialog will pop up, and the Image will be deleted when you click `OK`.

## Editing Image

![](assets/image_4.png)

Click `Edit` to enter the edit page of the Image.

## Connecting existing Groups

![](assets/image_7.png)

If `Global` is disabled, click `edit groups` under the edit Image screen to select the Groups that have permission to use the Image.

![](assets/image_8.png)
