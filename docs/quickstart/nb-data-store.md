---
id: nb-data-store
title: Persistence
description: Storing Data
sidebar_label: Persistence
---

PrimeHub provides several types of persistent data stores for user data/group data. These stores can be accessed from working environments.

## User Volume

Each user has own space called **User Volume** which is only accessible to the user to store data. The default volume capacity for everyone is 20 GB. The capacity is able to be increased, please contact Admin to learn the what capacity it is or to increase it if required. See [System Settings](../guide_manual/admin-system#system-settings).

In Notebook, it is home folder a.k.a `/home/jovyan`.

## Group Volume

Each user must be associated with one group at least. If `Shared Volume` of a Group is enabled with a specified capacity by Admin, all of group members are able to access the space called **Group Volume**. please contact Admin to learn what shared capacity it is or to enable a group volume for a group. See [Group Management](../guide_manual/admin-group#shared-volume)

In Notebook which is launched under a group `<GroupId>`, users can see a mounted folder `groupid` under home folder. E.g. `InfuseAICat` -> `infuseaicat/`.

## Dataset Volume

Admin is able to create a volume dedicated to a dataset via Dataset Management for users, the capacity is specified by Admin. It supports *persistent volume*, *nfs*, *host path*, *git* and *env*.

If one of user's groups is associated with a private dataset or global datasets, user can see the dataset folder from the Notebook which is launched under the same group.

The writable/read-only permission is varied with the combination of dataset *type*, flag *global* and associated *groups*. See [Dataset - Group Access Control](../guide_manual/admin-dataset#groups-access-control).

In Notebook, the created dataset folders are under `datasets/<dataset_name>`. Please contact Admin to create dataset volumes for users with the proper permission.

## PHFS Storage

[PHFS Storage](../design/phfs) is based on [PrimeHub Store](../design/primehub-store) technology. This storage is shared and accessed among the same group members, group members can share user data here. it seems similar to **Group Volume**, however, there are [differences between PHFS and Group Volume](../design/phfs#comparing-to-group-volume).  

>PHFS, currently, supports *writing files sequentially only*; within this limitation, writing model files in `HDF5` format directly into PHFS will cause the error, `Problems closing file (file write failed: ...)` since `HDF5` uses *seek* while writing.

>Because the limitation above, users **cannot** upload a file whose size is **> 1MB** to PHFS from Notebook/JubpyerLab; there will be error occurred and the uploaded file size is only 1MB, not intact.

>In this case, we suggest this step: *writing HDF5 files into user home directory directly* rather than PHFS, then copying files to PHFS for the preparation of model deployments.

In addition, PrimeHub features also store relative group-context data in the storage, such as Job stores artifacts under `/phfs/jobArtifacts/`. Since the limitation of the storage, we don't recommend storing performance-sensitive data such as datasets, please use Dataset Volume instead.


In Notebook, the storage is under `/phfs`.
