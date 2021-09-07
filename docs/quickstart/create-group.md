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

This quickstart shows how to create a new group.

PrimeHub is group-centric. This means that users, instance types, images, and datasets must be assigned to a group. Without being assigned to a group, these elements cannot be utilized, and users will not be able to access any features of PrimeHub.

Groups allow a subset of users to share storage, such as datasets and shared volumes. Available computational resources can also be configured through assigning Instance Types to groups, allowing resource allocation on a per-project basis.

As users can be added to multiple groups, this means they can collaborate on many projects, and access different datasets with specific server resource configurations. 


## Create a Group

1. Log in as an administrator and [switch to the Admin Portal](login-portal-admin).

2. Click `Groups` in the left sidebar, then click the `+ Add` button.

3. Enter required information, such as `Name`

4. Toggle `Shared Volume` if a volume for sharing data among the group is required.
   1. Specify the `volume capacity`
   2. To restrict access to only this group, leave `Launch Group Only` toggled to `yes` (default)

   ![qs-create-group.png](assets/jobsub-tt-p1-1.png)

5. Adjust the `User Quota` resource allocation limit for users in this group (if required).

6. Adjust the `Group Quota` resource allocation limit for the group (if required).

7. Click `Edit Users` to select and assign `Users` to this group.
    ![qs-create-group2.png](assets/qs-create-group2.png)

8. Click `Confirm` to create the group.

We have now created a group, configured a shared volume and user/group quota, and added users.

## Next

In the next quickstart, we will learn how to assign a group admin.
