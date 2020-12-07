---
id: version-3.2-primehub-store
title: PrimeHub Store
original_id: primehub-store
---

PrimeHub store is the central storage of PrimeHub and its backend is object storage. We use MinIO as the object storage solution. It supports launching as a standalone object store server or a gateway to connect the most popular cloud object storage solutions (e.g. AWS s3, google cloud GCS, azure blob...)

Unlike user volume, group volume, and dataset, which are designed for storing user's data, PrimeHub store is designed for storing both system and user data.

## Features

1. Central Storage for PrimeHub
1. Supports s3-compatible REST API
1. Allows pods to mount PrimeHub store through PVC


## Non-Goal

1. Does not provide a new dataset type to connect to object storage.

## Use cases

1. **[Log Persistence](./log-persistence):** Currently, the job submission log is to retrieve the log from a pod. With the PrimeHub store, we can collect the log and store them in the PrimeHub store. The log can still be accessible even the pod is deleted.
1. **[PrimeHub File System (PHFS)](./phfs):** new shared storage for groups.

## Design

![](assets/primehub-store.png)

### MinIO

[MinIO](https://min.io/) is the key component of the Primehub Store. We support three persistence backend

1. MinIO Standalone
1. MinIO Gateway for S3
1. MinIO Gateway for GCS

MinIO hides the different implementation for different persistence backend and provides a consistent way for other PrimeHub components to access the PrimeHub store.

### GraphQL and PrimeHub services

GraphQL and other PrimeHub services use MinIO s3-compatible REST API to access the PrimeHub store.

### Csi-rclone

[csi-rclone](https://github.com/wunderio/csi-rclone) implements Container Storage Interface (CSI) plugin that allows using [rclone mount](https://rclone.org/) as storage backend. We use it to mount PrimeHub store in the user Pods. It allows users to access PrimeHub store data by the file system.

As the PrimeHub is installed, there is also a csi-rclone provisioned PVC is also created. Usually, the PVC name is `primehub-store`.


### Folder Structure in the bucket

The folder structure of the PrimeHub store is defined as follows.

The top-level folder is PrimeHub store relative features.


```bash
.
├── <feature1>
├── <feature2>
├── logs        # Log Persistence
└── groups      # PHFS
    ├── phusers
    ├── <group1>
    └── <group2>
```