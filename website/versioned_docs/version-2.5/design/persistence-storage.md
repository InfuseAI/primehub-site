---
id: version-2.5-persistence-storage
title: Persistence Storages
original_id: persistence-storage
---

When spawning a user's notebook pod, spawner mounts various types of persistent volumes. They include

- User volume
- Group volume (Project volume)
- Datasets volume

## User volume

User volume stores users' own data. When a user spawns jupyter server for the first time, the user's PVC is created. 

The capacity is determined in the order 

1. Use user's specified `volumeCapacity`
2. If this setting is not defined, use the **max** `userVolumeCapacity` of all the groups the user belongs to.
3. If none of the group set the `userVolumeCapacity`, use the system's `defaultUserVolumeCapacity`

The storage class is defined in the helm value.


## Group volume (Project volume)

A group volume (project volume) stores the data shared by a group. To enable the group volume, the administrator should enable the `Shared Volume` in the group setting. And the volume is created if it doesn't exist at the very first time of the mount to the group volume.

The storage class is defined in the helm value

```
primehub:
  sharedVolumeStorageClass: "<rwx-storage-class>"
```

But in most cases, we use an NFS pvc provisioned by `primehub-groupvolume-nfs`. The configuration would look like this

```
primehub:
  sharedVolumeStorageClass: ""
groupvolume:
  storageClass: standard
```

It means

1. the group volume is manually provisioned
2. the `primehub-groupvolume-nfs` controller would create an NFS server backed by an RWO pvc
3. the RWO pvc uses a "standard" storage class.

If you didn't specify primehub-group-sc's value ("standard" here) in yaml, it will be set by `PRIMEHUB_STORAGE_CLASS` env.

Attribute| Description 
---------|-------------
pvc name | `project-<group-name>`
volume mount | `/project/<group-name>`
symbolic link | `~/<group-name> -> /project/<group-name>`


## Dataset volume

Currently, there are these types of the dataset would be mounted as persistence volume

- pv
- pv (hostpath)
- git


### PV

If the dataset is the type of `pv`, the dataset is backed by a pvc. The difference comparing to group volume is

-  A dataset can be connected to multiple groups; while group volume only belongs to a group
-  The connection from dataset to a group can be read-only or read-write
-  Can enable an upload server

Under the hood, the storage class is defined in the helm value

```
groupvolume:
  storageClass: standard
```

It will create an NFS server backed by an RWO pvc which is similar to group volume.

If you didn't specify a value ("standard" here) in yaml, it will be set by `PRIMEHUB_STORAGE_CLASS` env.

Attribute| Description 
---------|-------------
pvc name | `dataset-<volume-name>`
volume mount | `/dataset/<dataset-name>`
symbolic link | `~/datasets/<dataset-name> -> /dataset/<dataset-name>`

> The `dataset-name` is the `metadata.name` in the CRD and the `volume-name` is `spec.volumeName` in the CRD.


### PV (hostpath)

A special hack of `pv` is set the `volumeName` with prefix `hostpath:`. In this way, the dataset is not backed by a pvc, instead, the volume is a hostpath volume

Attribute| Description | 
---------|-------------|
hostpath | path after the `hostpath:`
volume mount | `/dataset/<dataset-name>`
symbolic link | `~/datasets/<dataset-name> -> /dataset/<dataset-name>`

> The `hostpath` is not allowed to edit in the admin dashboard in the future. 

### Git

If the dataset is a type of `git`, the dataset is backed by a hostpath and periodically pulls the data from a repository. Under the hood, we use [gitsync](https://github.com/kubernetes/git-sync) daemonset to sync the data to hostpath

Attribute| Description 
---------|-------------
hostpath | `/home/dataset`|
volume mount | `/gitsync/<dataset-name>`|
symbolic link | `~/datasets/<dataset-name> -> /dataset/<dataset-name>/<dataset-name>`

### Dataset annotations


Annotation | Description | Default
---------|-------------|----------
`dataset.primehub.io/mountRoot` |  The mount path of the pv dataset. | `/datasets/`
`dataset.primehub.io/homeSymlink` | Whether a symbolic link to the mountPath is required. | `true`
`dataset.primehub.io/gitSyncHostRoot` | The host path to put the gitsync result. | `/home/dataset/`
`dataset.primehub.io/gitSyncRoot` |  The mount path of the git dataset |  `/gitsync/`
`dataset.primehub.io/launchGroupOnly` | Mount only when the launching group connects this dataset |  `false`
`dataset.primehub.io/uploadServer` | Only works in pv type dataset. Create an upload server. | `null`
`dataset.primehub.io/uploadServerAuthSecretName` | Only works when an upload server is created. Set http basic auth based on secret. | `null`

## Symbolic links in the home folder
The home folder is mounted by the user volume. However, in order to locate the project volume and dataset easily, we create symbolic links in the home folder. 

- **Group Volumes:** `~/<project-name>`
- **Dataset Volumes:** `~/datasets/<dataset-name>`

The symbolic links to a dataset can be removed by setting the annotation `dataset.primehub.io/homeSymlink` to `false`

## Launch group only

By default, if a user has permissions to access the group volume or a dataset, the spawner would mount it no matter which group the user selects.

But if a group volume or a dataset is configured `Launch Group Only` to `no`. The volume is only mounted while the user selects the group which connects to this volume.
