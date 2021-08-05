---
id: version-3.7-admin-group
title: Group Management
description: Group Management
original_id: admin-group
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

## Groups List

It lists all of groups in pages, clicking a header of a column for ascending/descending sorting.

![](assets/group_12_v27.png)

## Creating New Group

Click `Add` to add a group, which will pop up the editing screen of Groups.

## Info

![](assets/group_add_v37.png)

You need to fill in the fields in the above picture:

+ `Name` (required): Only lowercase letters, numbers, hyphen `-` and the underscore `_` can be filled in.

+ `Display name`

### Model Deployment

Groups with enabled model deployment are able to deploy/serve models via [Model Deployment](../model-deployment-feature).

+ `Maximum Deployment`: set limit on the amount of deployments for this group; it takes *running* deployments into consideration only, i.e., *stopped* deployments are not counted.

### Shared Volume

Create shared volume with specific capacity. The shared volume is shared among members in the group.

+ `Shared Volume Capacity` Set the capacity of the shared volume.

+ `Launch Group Only` Set if the shared volume is only mounted in the launch group. When a user open a notebook, by default, it will mount the shared volume of the current launch group. However, if the user is also the member of a group which configures shared volume `Launch Group Only` as false, this volume would be also mounted in this notebook. In this case, you can see current group shared volumes and some non-launch group shared volumes are all mounted in the `/project/` folder.

### User Quota

Set quotas for each user in this group.

+ `CPU Quota` How many CPU can be used by the user within this group. The default is `0.5`.

+ `GPU Quota` How many GPU can be used by the user within this group. The default is `0`. Default is `0` that means users can't use GPU.

+ `Memory Quota` How many Memory can be used by the user within this group. The default is `unlimited`.

### Group Quota

Set quota for the whole group.

+ `CPU Quota` When the user chooses the group, how many CPU can be shared by all users in the group. The default is `unlimited`.

+ `GPU Quota` When the user chooses the group, how many GPU can be shared by all users in the the group. Default is `unlimited`.

+ `Memory Quota` When the user chooses the group, how many Memory can be shared by all users in the the group. Default is `unlimited`.

Click `Confirm` to complete the addition.

### Members

![](assets/group_admin.png)

The list shows all of users of this group. Click `edit users` to add/remove users into/from groups.

#### Group Admin

Also, multiple members are able to be assigned **Group Admin** for a group.

>**Group Admin** have the privilege *to access features dedicated to them on User Portal*, such as [Image](../group-image).

---

## Instance Types

![](assets/admin_group_it_v31.png)

The list shows connecting instance types which are able to be used by this group.

## Images

![](assets/admin_group_img_v27.png)

The list shows connecting images which are able to be used by this group.

## Datasets

![](assets/admin_group_ds_v25.png)

The list shows connecting datasets which can be read or written. We also can edit these datasets through here.


## Deleting Group

Click `Delete` button of Actions in the group list, the confirmation dialog will pop up, and the group will be deleted when you click `OK`.

## Editing Group

Click `Edit` button of Actions to enter the edit page of the Group.
