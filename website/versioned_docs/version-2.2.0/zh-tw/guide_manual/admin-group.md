---
id: version-2.2.0-admin-group
title: Group Management
original_id: admin-group
---

## Creating New Group

![](assets/group_12.png)

Click `Add` to add a group, which will pop up the editing screen of Groups.

![](assets/group_shared_volume.png)

You need to fill in the fields in the above picture:

+ `Name` (required): Only lowercase letters, numbers, dash `-` and the bottom line `_` can be filled in.

+ `Display name`

`Shared Volume`: Create shared volume with specific capacity.

+ `Shared Volume Capacity` Set the capacity of the shared volume.

+ `Launch Group Only` if enabled, the shared volume is `only mounted` when users select the `same group` to launch a project on PrimeHub page.

![](assets/group_user_quota.png)

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

## Deleting Group

![](assets/group_14.png)

Click `Delete` in the group list, the confirmation dialog will pop up, and the group will be deleted when you click `OK`.

## Editing Group

![](assets/group_13.png)

Click `Edit` to enter the edit page of the Group.

## Connecting Existed Users

![](assets/group_8.png)

Click `connect existing users` under the edit Group screen to select the group's user from the existing Users list and link them.
