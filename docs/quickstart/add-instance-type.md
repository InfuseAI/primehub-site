---
id: create-instance-type
title: Create/Plan Instance Type
---

This quckstart shows how to crete an instance type and an advice of planning them according to a real circumstance (CPUs/MEM/GPUs).

## Advice of Plan

In a real circumstance, we have to manage/arrange resources of CPUs, Memory or even GPUs. For the sake of resources utilization, via instance types, we can plan our resources for different groups/projects according to different demands for computing resources. A good arrangement of instance types can not only utilize resources efficient, but also can prevent an instance from occupying massive resources.

Since PrimeHub cluster uses certain of resources for operating the cluster properly, we are not able to allocate all of resources for running instances. *It is recommended to leave 10%-15% resources of CPU/MEM for the cluster itself.*

Projects require various computing resources. We can start arranging/planning our instance types for different scales of resources allocations (such as small/medium/large), users can choose the appropriate scale of instance type for projects for the allocation of requested resources. We, of course, can create a specific instance type for a specific project as well.

If you are new to plan instance types, here is an advice.

**Let's assume a circumstance of *CPU 40 / MEM 512GB / GPU 4*:**

### CPU-Only instance type

|Scale|CPU|Mem|% of Total|
|-----|---|---|----------|
|Small|4|128G|10-25|
|Medium|16|256G|40-60|
|Large|32|420G|80+|

### GPU-Equipped instance type

|Scale|CPU|Mem|GPU|% of Total|
|-----|---|---|---|----------|
|Small|4|128G|1|10-25|
|Medium|16|256G|2|40-60|
|Large|32|420G|4|80+|

## Add Instance Type

According to our plan, let's create instance types for users, here we will create a GPU-equipped instance type of medium-scale.

1. Login in `PrimeHub` as an administrator.

2. Goes to `Admin Dashboard` from the portal and `Instance Types` management.

3. Fill in `Name` with *medium-with-gpu*.

4. Fill in `CPU Limit` with *16* and fill in `Memory Limit` with *256GB*.

5. Fill in `GPU Limit` with *2*.

6. (Optional) `Overcommitting`, if required, enabled it and fill in `CPU Request` with *14* and `Memory Request` with *200GB*. [More detail [Overcommitting]](https://docs.primehub.io/docs/guide_manual/admin-instancetype#overcommitting-advanced-feature).

7. Click `edit groups` and select groups which can have this instance type.

8. Click `Confirm` to save it.

We have created the instance type, *medium-with-gpu*, which requests medium-scale resources allocation for specified groups. Users who belong to these groups are able to select it for launching a jupyterhub.
