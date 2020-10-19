---
id: md-instancetype
title: Instance Type Management
---

Instance type management provides the capabilities of managing a cluster of the computation resources by instances management  such as create, delete, edit instances and of permission-control which allows only specified-groups to use the instances.

## Creating New Instance Types

![](assets/instancetype_3_v26.png)

Click `Add` to add an Instance Type, which will pop up the editing screen of Instance Types.

![](assets/admin_inst_v26.png)

You need to fill in the fields of Basic Info in the above picture:

+ `Name` Only lowercase letters, numbers, dash `-` and the bottom line `_` can be filled in.

+ `Display name` The display name of this Instance Type, and will be seen by users.

+ `Description` The description of this Instance Type, and will be seen by users.

+ `CPU Limit` define how many CPU are allowed to use by this Instance Type. The value is also applied to CPU Request when `CPU Request` is disabled.

+ `Memory Limit` define how many memory are allowed to use by this Instance Type. The value also applied to Memory Request when `Memory Request` is disabled.

+ `GPU Limit` define how many GPU can be used by this Instance Type. GPU can only be integer.

### Overcommitting (advanced feature)

+ `CPU Request` define how many CPU are requested to use by this Instance Type initially. Once it is enabled, Instances are guaranteed to get the amount of CPU they request. If `CPU Request` < `CPU Limit`, the system will try to overcommit CPU resources within the limit if more resources are available.

+ `Memory Request` define how many Memory are requested to use by this Instance Type initially. Once it is enabled, Instances are guaranteed to get the amount of Memory they request. If `Memory Request` < `Memory Limit`, the system will try to overcommit Memory resources within the limit if more resources are available.

For details, please see [Resource QoS](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/node/resource-qos.md#resource-quality-of-service-in-kubernetes), [CPU Management Policies](https://kubernetes.io/docs/tasks/administer-cluster/cpu-management-policies/#static-policy) and [Quality of Service for Pods](https://kubernetes.io/docs/tasks/configure-pod-container/quality-service-pod/).

+ `Global` If it is turned on, this Instance Type can be chosen by everyone. You can grant permission to specific groups in the `edit groups`.

Finally, click `Confirm` to complete the addition.

## Toleration

When a node has a `taint` for certain reasons, an instance won't be scheduled to run on that node until an instance has a specific toleration to tolerate specified taint. Here we will show you how to add a toleration only.

For more detail and usage of `kubectl taint`, please refer to Taints and [Tolerations concept](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/).

![](assets/instance_type_toleration0_v26.png)

In `Toleration` tab, you can add a Toleration by clicking on `Add` button.

![](assets/instance_type_toleration1_v26.png)

Filling in the fields in popup to create a toleration.

+ `Key` The key of taint which you want to tolerate.

+ `Value` The value of taint is required if `Equal` from `Operator` is selected.

+ `Operator (Mandatary)` Select  `Equal`, `Exists`.

+ `Effect` Select `None`, `NoSchedule`, `PreferNoSchedule`, `NoExecute`

Regarding options of `Operator` and `Effect`, please refer to [Taints and Tolerations](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/).

Click `OK` to add a toleration.

Finally, click `Confirm` to complete the addition.

For a use case of toleration, please see [Toleration Use Case](usecase-toleration).

## NodeSelector

You can constrain an instance to only be able to run on specific nodes which have specific labels. A `label` is a map of key-value pair. Here we will show you how to add a nodeSelector only.

For more detail, please refer to Assigning Pods to Nodes for usage `kubectl label`.

![](assets/instance_type_nodeselector_v26.png)

In `NodeSelector` tab, you can add a NodeSelector by clicking on `+ Add field` button.

Filling in `key/value` with key-value of a label you want to specify.

Click `Confirm` to complete the addition.

For a use case, please see [NodeSelector Use Case](usecase-nodeselector).

## Deleting Instance Types

![](assets/actions.png)

Click `Delete` in the Instance Types list, the confirmation dialog will pop up, and the Instance Type will be deleted when you click `OK`.

## Editing Instance Types

![](assets/actions.png)

Click `Edit` to enter the edit page of the Instance Type.

## Edit groups

![](assets/edit_groups.png)

If `Global` is disabled, please click `edit groups` under the edit Instance Type screen to select the groups that have permission to use the Instance Type.
