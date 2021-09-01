---
id: howto-check-vol-usage
title: HOWTO - Check Volume Usage
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

As an operator, I may need to know the usage of a volume. This document describes how to check the usage of user volumes, group volumes, and PV dataset volumes. Before checking the volume usage, please make sure you can access your Kubernetes cluster by `kubectl`, we use `kubectl exec <pod> -- df /path/to/the/volume` to check the volume

## Usage of User Volume

Because user volume can only be mounted by a notebook pod, we need to check the usage by the user's running notebook pod.

1. Find the user's notebook pod. If the pod is not launched, you cannot check the user volume usage.

    ```bash
    kubectl -n hub get pod
    ```

    Find the pod `jupyter-<username>`.

1. The user volume is mounted at `/home/jovyan`. Use the command `df` to check the usage.

   ```bash
   kubectl -n hub exec jupyter-<username> -- df -h /home/jovyan
   ```

   The sample output

   ```text
   Filesystem                   Size  Used  Avail  Capacity    Mounted on
   /dev/rbd11                    49G   53M   47G   1%          /home/jovyan
   ```

## Usage of Group Volume

> Note: This method can only works if the configuration `primehub.sharedVolumeStorageClass` is not set

If the shared volume of a group is enabled, an NFS server is created as the group volume. To check the volume usage, we can check the usage in the NFS server pod.

1. Find the group NFS server pod

    ```bash
    kubectl -n hub get pod
    ```

    Find the pod `nfs-project-<group>-0`.

1. The disk is mounted at `/exports`

   ```bash
   kubectl -n hub exec <pod-name> --  df /exports
   ```

   The sample output

   ```text
   Filesystem                   Size  Used  Avail  Capacity    Mounted on
   /dev/rbd11                    196G   3.9M   182G   3%       /exports
   ```

## Usage of PV Dataset Volume

> Note: This method only works if the configuration `primehub.sharedVolumeStorageClass` is not set

If a PV dataset is configured as [auto provisioning](../guide_manual/admin-dataset#persistent-volume), an NFS server is created as the dataset volume. To check the volume usage, we can check the usage in the NFS server pod.

1. Find the pod of the PV dataset NFS server

    ```bash
    kubectl -n hub get pod
    ```

    Find the pod `nfs-dataset-<dataset>-0`.

1. The disk is mounted at `/exports`

   ```bash
   kubectl -n hub exec <pod-name> --  df /exports
   ```

   The sample output.

   ```text
   Filesystem                   Size  Used  Avail  Capacity    Mounted on
   /dev/rbd11                    196G   3.9M   182G   3%       /exports
   ```