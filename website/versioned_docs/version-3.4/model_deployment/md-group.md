---
id: version-3.4-md-group
title: Group Management
description: Group Management
original_id: md-group
---
<div class="label-sect">
  <div class="deploy-only tooltip">Deploy
    <span class="tooltiptext">Applicable to Deploy Edition</span>
  </div>
</div>
<br>

## Creating New Group

![](assets/md_group_list_v28.png)

Click `Add` to add a group, which will pop up the editing screen of Groups.

![](assets/md_group_shared_volume_v34.png)

Need to fill in the fields in the above picture:

+ `Name` (required): Only lowercase letters, numbers, dash `-` and the bottom line `_` can be filled in.

+ `Display name`

### Group Quota

Set quota for the whole group.

+ `CPU Quota` When the user chooses the group, how many CPU can be shared by all users in the group. The default is `unlimited`.

+ `GPU Quota` When the user chooses the group, how many GPU can be shared by all users in the the group. Default is `unlimited`.

+ `Memory Quota` When the user chooses the group, how many Memory can be shared by all users in the the group. Default is `unlimited`.

Click `Confirm` to complete the addition.

### Users

![](assets/edit_users.png)

Click `edit users` under the edit Group screen to select the group's user from the existing Users list and link them.

### Instance Type

![](assets/md_group_it.png)

View the associations between this group and instance types, furthermore, edit associated instance types.


## Deleting Group

Click `Delete` button of Actions in the group list, the confirmation dialog will pop up, and the group will be deleted when you click `OK`.

## Editing Group

Click `Edit` button of Actions to enter the edit page of the Group.
