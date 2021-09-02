---
id: nb-data-store
title: Persistence
description: Storing Data
sidebar_label: Persistence
---

PrimeHub provides several types of persistent data stores. This document describes the characteristic of them and when to use one of them.

## Volume Types
### User Volume

User volume is the private storage for a user.

The user volume is
- **(Good)** Store the personal data. (e.g. datasets, codes)
- **(Limitation)** Only available in notebooks

### Group Volume

Group volume is a shared volume among group members. All members can read and write data to this volume. It is like an NFS server for a group.

The group volume is
- **(Good)** Store shared data among members in a group
- **(Good)** Exchange data among notebooks, jobs, and apps.
- **(Limitation)** Cannot download and upload data through API/CLI/SDK

Group volume is not enabled by default. Please contact the system administrator to enable it. For more information, Please see [Group Management](../guide_manual/admin-group#shared-volume).

### PHFS Storage

PHFS (PrimeHub File System), like group volume, is shared storage among group members. The difference is it's more like an S3 (or said [object storage](https://en.wikipedia.org/wiki/Object_storage)) for a group. Physically, the data of PHFS is stored under the subpath `/groups/<group>` of an object storage bucket.

Due to the characteristics of object storage, PHFS provides the best accessibility among all kinds of storage. There are several ways to access the data in the PHFS
- PHFS is mounted in notebooks, apps, and jobs.
- Users can download/upload the content from the [Shared Files](../shared-files) UI in the user portal.
- Users can list and download files from [PrimeHub SDK/CLI](https://github.com/infuseai/primehub-python-sdk)

PHFS is
- **(Good)** Upload and download files from PHFS through [Shared Files](../shared-files) UI
- **(Good)** Data exchange through [PrimeHub SDK/CLI](https://github.com/infuseai/primehub-python-sdk)
- **(Good)** Store the [artifacts of a job's output](../job-artifact-feature)
- **(Good)** The [source of model files](http://localhost:3000/docs/next/model-deployment-model-uri) for model deployment.
- **(Limitation)** Although we can access the PHFS from the filesystem, the access mode is not fully POSIX-compatible. It does not allow *random access* and *append write*. It's only suitable for *sequential read* and *sequential write* operation.
- **(Limitation)** Because of the limitation above, users **cannot** upload a file with size **> 1MB** to PHFS from notebook UI (i.e Jupterlab upload feature); there will be an error occurred and the uploaded file size is only 1MB. Please use *Shared Files* UI to upload.
- **(Not suitable)** As the output of training. Because of the limitation above, some ML frameworks cannot output the training result successfully to PHFS. For example, in TensorFlow, writing model files in *HDF5* format to PHFS will cause the error, `Problems closing file (file write failed: ...)` since *HDF5* uses *seek* while writing. If we want to put the output to PHFS, we can output to user volume or group volume and then copy them to PHFS.
- **(Not suitable)** As the input of training. PHFS has the worst performance among all kinds of storage. If we would like to train a dataset multiple runs, we recommend putting them in user volume or group volume.

PHFS is not installed by default, please check this document to [configure PrimeHub store and PHFS](../getting_started/configure-primehub-store).

### Dataset Volume

Dataset volume is a storage that can be shared among multiple groups. We can share the dataset by the following sharing options

- Readonly for ALL groups
- Readonly for certain groups
- Writable for certain groups

There are several kinds of the dataset we can create

- **persistent volume (PV)**: Like group volume, but can be shared among multiple groups rather than a single group.
- **NFS**: A volume that connects to an external NFS server
- **Host Path**: A special kind of volume that mounts the host filesystem.
- **Git**: A special kind of volume which syncs the upstream git repository periodically. The actual data is stored on the host filesystem.
- **Env**: Actually, this is not a volume. This allows configuring the environment variables used in notebooks and jobs.

The dataset is
- **(Good)** Shared among groups. In a course, we can share datasets among multiple teams(groups) of students with read-only permission, while the teacher assistants can be in a TA group that has the writable permission.
- **(Good)** Special storage destination (e.g. external NFS server, host path, git sync)
- **(Limitation)** Cannot download and upload data through API/CLI/SDK
- **(Not suitable)** volume only for one group, use group volume instead.

Dataset is configured by system administrator. For more information, Please see [Dataset Management](../guide_manual/admin-dataset). In some types of the dataset, we can also configure a [upload server](../guide_manual/admin-uploader) to upload data to the dataset volume.

## Comparision

|Type|Shared by| API/UI Access | Use case
|-|-|-|-|
| User Volume | No | No | Private data
| Group Volume | Group members of a group | No | Shared data in group
| PHFS | Group members of a group | Yes | Data import/export
| Dataset Volume | Multiple groups | No | Shared data among groups

All four storage can be accessed by the file system. Here describes the mount points and characteristic

|Type| Available in | Mount point | Characteristic
|-|-|-|-|
| User Volume | Notebooks | `/home/jovyan` | Best performance<br>(like block device)
| Group Volume | Notebooks<br>Apps<br>Jobs | `/project/<group>` | Good performance <br>(like NFS)
| PHFS | Notebooks<br>Apps<br>Jobs | `/phfs` | Limited access mode<br> Sequential Read/Write <br>(like object storage)
| Dataset Volume | Notebooks<br>Apps<br>Jobs | `/datasets/<dataset>` | Good performace <br>(like NFS)
