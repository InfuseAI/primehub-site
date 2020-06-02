---
id: admin-group
title: Group Management
---

## Creating New Group

![](assets/group_12_v26.png)

Click `Add` to add a group, which will pop up the editing screen of Groups.

![](assets/group_shared_volume_v26.png)

You need to fill in the fields in the above picture:

+ `Name` (required): Only lowercase letters, numbers, hyphen `-` and the underscore `_` can be filled in.

+ `Display name`

**Model Deployment**(*Alpha*): This alpha feature is hidden until the [feature flag](../references/feature-flag) is set `True`; Groups with enabled model deployment are able to deploy/serve models via [Model Deployment](../model-deployment-feature).

**Shared Volume**: Create shared volume with specific capacity.

+ `Shared Volume Capacity` Set the capacity of the shared volume.

+ `Launch Group Only` If enabled, the shared volume is `only mounted` when users select the `same group` to launch a project on PrimeHub page.


**User Quota**: Set quotas for each user in this group.

+ `CPU Quota` When the user chooses the group, how many CPU can be used by the user. The default is `0.5`.

+ `GPU Quota` When the user chooses the group, how many GPU can be used by the user. The default is `0`. Default is `0` that means users can't use GPU.

+ `Memory Quota` When the user chooses the group, how many Memory can be used by the user. The default is `unlimited`.

+ `Disk Quota` When the user chooses the group, how many Disk can be used by the user. The default is `20GB` .

**Group Quota**: Set quota for the whole group.

+ `CPU Quota` When the user chooses the group, how many CPU can be shared by all users in the group. The default is `unlimited`.

+ `GPU Quota` When the user chooses the group, how many GPU can be shared by all users in the the group. Default is `unlimited`.

+ `Memory Quota` When the user chooses the group, how many Memory can be shared by all users in the the group. Default is `unlimited`.

Click `Confirm` to complete the addition.

**Datasets**

![](assets/admin_group_ds_v25.png)

The list here shows connecting datasets which can be read or written. We also can edit these datasets through here.

**Editing Users**

![](assets/edit_users.png)

Click `edit users` under the edit Group screen to select the group's user from the existing Users list and link them.

## Deleting Group

Click `Delete` button of Actions in the group list, the confirmation dialog will pop up, and the group will be deleted when you click `OK`.

## Editing Group

Click `Edit` button of Actions to enter the edit page of the Group.


