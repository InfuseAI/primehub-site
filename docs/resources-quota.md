---
id: resources-quota
title: Resources Quota
description: Resources Quota
sidebar_label: Quota Control
---

Resources such as CPU, GPU, Memory are shared in multiple users and multiple groups. PrimeHub provides quotas control of valuable resources of a multi-tenant platform against users and groups, which can prevent single user/group from utilizing significant amount of resources. 

These quota settings can be adjusted in [Groups Management](guide_manual/admin-group#user-quota).


## Group Quota

By setting the group quota of a specific group, the sum of requested/allocated resources by all of group members cannot exceed the limitation. If a new resources request from group members will cause the exceedance of group quotas, the request will be rejected.

## User Quota

By setting the user quota of specific group, a group member cannot request resources more than the user quota. The request will be rejected. 

Since a user can be associated with multiple groups, switching working groups can have a user different user quotas from different group accordingly.

