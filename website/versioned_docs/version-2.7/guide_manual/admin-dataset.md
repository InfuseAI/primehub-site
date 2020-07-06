---
id: version-2.7-admin-dataset
title: Dataset Management
original_id: admin-dataset
---

Dataset management provides the capabilities of managing dataset resources such as create, delete, edit datasets and of permission-control so that datasets can be accessed only by specific groups accordingly.

## Creating New Dataset

![](assets/dataset_5_v26.png)

Click `Add` to add a Dataset and it will pop up the edit screen of Datasets.

![](assets/admin_dataset_v26.png)

You need to fill in these fields:

+ `Name` (required): Only lowercase letters, numbers, hyphen `-` and a dot `.` can be filled in.

+ `Display name`

+ `Description`

+ `Mount Root` This field is not editable. It displays the path to datasets.

+ `Global` If enabled, everyone can read this dataset; furthermore, we can set `Writable` groups. If disabled, linking groups with `ReadOnly` or `Writable` permission by `edit groups` is required.

+ `Launch Group Only` When `Global` is disabled, we can set `Launch Group Only` or not. If enabled, the dataset is only visible to specific groups; furthermore, we can set `ReadOnly` groups or `Writable` groups.

+ `Type` Dataset volume type.

+ `Edit Groups` Set accessible groups, when `Global` is disabled.

There are several `type`:

### persistent volume

+ `Provisioning`: `Auto`, `Manual`.

#### Auto

![](assets/dataset_pv_auto.png)

Specifying the `volume size`, once it is confirmed, there is a fixed-size volume created and the volume size is not changeable by editing the dataset.

#### Manual

![](assets/dataset_pv_manual.png)

Setting provisioning `Manual` allows administrators configure the persistent volume dataset manually with an existing storage. Generally, it is used for storages types which are not listed in PrimeHub Dataset. Please refer to the [Kubernetes official documentation](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) for the configuration.

The only rule you need to follow is that the `PersistentVolumeClaim` name must be `dataset-{"Name" field set via UI}`.

Click `Confirm` to complete the addition.

---

### nfs

![](assets/dataset_nfs.png)

An nfs volume allows an existing NFS(Network File System) share to be mounted into the pod. The data of an nfs volume is preserved even if the volume is unmounted.
NFS can be mounted by multiple groups simultaneously.

NFS settings remain editable after the creation.

>You must have an existing NFS server running with the share exported before you can use it, otherwise unexpected behaviors which are varied with circumstances occur.
>Please see [trouble-shooting](../trouble/dataset-failure).

+ `NFS Server` Fill in the URL of the server.

+ `NFS Path` Fill in the path to the share.

---

### hostPath

![](assets/dataset_hostpath.png)

In PrimeHub, a hostPath volume mounts a directory from the hosting node's filesystem into the pod.

>The hostpath/to/directory must exist on nodes and corresponding permissions must be granted, otherwise unexpected behaviors which are varied with circumstances occur.
>Please see [trouble-shooting](../trouble/dataset-failure).

+ `HostPath` Fill in the path to a directory. The setting remains editable after the creation.

---

### git

![](assets/dataset_git.png)

Fill the URL of git repo (can be https or git). You can use `#branch` to specify the branch or tag name.

![](assets/dataset_secret_list.png)

Click `Change` to select a secret from the list `if a pull-secret is required`.

---

![](assets/edit_groups.png)

If `Global` is disabled, please click `edit groups` under the edit Dataset page to set accessible groups that have permission to use the Dataset.

---

### env

![](assets/dataset_env.png)

If dataset is an environment variable, not a file, you can use `env` type. Please fill the `key` and `value` in the `Variables`. If there are more than one variable, you can click `+ Add field` to add more field.

>The full name of env variables will be `<dataset_name>_<variable_name>`.

## Deleting Dataset

![](assets/actions.png)

Click `Delete` in the Datasets list, the confirmation dialog will pop up, and the Dataset will be deleted when you click `OK`.

## Editing Deataset

![](assets/actions.png)

Click `Edit` to enter the edit page of the Dataset.

In terms of type `pv`, `nfs` and `hostpath` dataset, we can turn on `Upload Server` feature on the dataset editing page. See [Upload Server](admin-uploader).
