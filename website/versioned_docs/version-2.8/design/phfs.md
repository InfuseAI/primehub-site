---
id: version-2.8-phfs
title: PrimeHub File System (PHFS)
original_id: phfs
---

PrimeHub File System (PHFS) is storage shared among a group. It is based on the PrimeHub store.

# Prerequisites

The [PrimeHub Store](primehub-store) feature must be enabled

# Features

- Jupyter and job can access the PHFS on `/phfs`
- The data is stored in an object storage.

# Configruation
To enable PHFS, set the `store.eanbled` and `store.phfs.enabled` to `true`.

Path | Description | Default Value
--- | ----- | -----------------------
`store.enabled` | If the PrimeHub store is enabled | `false`
`store.phfs.enabled` | If the PHFS is enabled | `true`

# Why PHFS

PHFS is very similar to group volumes. They are both a shared storage among a group.

However, the design of group volumes is one PVC per group. It is not convenient for graphql or other components to access the group volume because it is required to mount then it can access it.

In contrast, the PHFS is a single PVC and can be accessed by s3 rest API as well. It allows PrimeHub system to provide richer interaction on the PHFS.

# Comparing to group volume

 Descritpion   | PHFS | Group Volume
----|--- | -----
PVC count | Shared PVC among groups | One PVC per group
PVC type | csi-rclone on MinIO | any RWX PVC
REST API (Internal) | S3-Compatible API | N/A
Mount point | `/phfs` | `/project/<group-name>`


## Prefix in primehub store

- The prefix of phfs is `/groups`
- The phfs data of one group is `/groups/<group>`
- The mount point of one group in a pod is always `/phfs`


# Limitation

PHFS cannot enforce quota on a group.