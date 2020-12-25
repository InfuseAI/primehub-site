---
id: create-group
title: Create Group
description: Create Group
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

This quickstart shows how to create a group.

PrimeHub is the group-centric design, things such as users, instance types, images and datasets have to be assigned to groups, otherwise, they cannot be utilized without assigning groups on PrimeHub. Hence, we have to make sure these things are assigned to groups.

A group, we can think it as a project group, users of the group share the same resources, datasets and conduct different tasks in a same project; hence, a group can be equipped with a shared volume for sharing project data by settings. We also can limit the resources quota for each group and ,furthermore, for each user in a group.

A user can be assigned to multiple groups.

## Let's create a group

1. Log in as an administrator and [switch to Admin Portal](login-portal-admin).

2. Click `Groups` management on the side menu, then click `+ Add` button for the creation.

3. Input required information, such as `Name`.

4. Enable `Shared Volume` if a volume for sharing data among the group is required.
   1. Specify the `volume capacity`
   2. Enabled `Launch Group Only` if this volume is accessed only by this group.

   ![qs-create-group.png](assets/qs-create-group.png)

5. Adjust `User Quota` if resource allocation limit is required for each user.

6. Adjust `Group Quota` if resource allocation limit is required for this group.

7. Click `edit users`, assign `Users` to this group.
    ![qs-create-group2.png](assets/qs-create-group2.png)

8. Confirm.

## Next

We learn how to create a group with settings such as shared volume, quota and assigning users. Since we have a group, we can go next to add instance types, images for our groups.
