---
id: version-3.10-howto-resize-vol
title: HOWTO - Increase Volume Size
description: Increase Volume Size
original_id: howto-resize-vol
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

As an operator, I may need to resize a volume. This document describes how to resize the usage of user volumes, group volumes, and PV data volumes.

> **Caution**: The volume size can only be **increased** and cannot be rolled back after resizing.

## Prerequisites
1. Can access your Kubernetes cluster by `kubectl`
1. Basic understanding of kuberentes [storage classes, *PersistentVolume (PV)* , and *PersistentVolumeClaim (PVC)*](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
1. Your storage class can enforce storage size. If you use *local storage* or *NFS client* as storage, the volume size cannot be enforced. To resize volume is even not applicable.
1. The storage class of your PVC allows volume expansion. You can check by the following command.

    ```
    $ kubectl get storageclass
    NAME            PROVISIONER                    RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
    gp2 (default)   kubernetes.io/aws-ebs          Delete          WaitForFirstConsumer   true                   104d
    ```

    For more information, please see [Resizing Persistent Volumes using Kubernetes](https://kubernetes.io/blog/2018/07/12/resizing-persistent-volumes-using-kubernetes/)


## Resize User Volume

1. Find the PVC of the user volume `claim-<username>`.

    ```bash
    $ kubectl -n hub get pvc
    NAME            STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
    claim-phadmin   Bound    pvc-86331a97-b736-490c-be72-7ef5c6cad47a   20Gi       RWO            gp2            102d
    ```

1. Check if the storage class of the PVC allows volume expansion

    ```
    $ kubectl get storageclass <storage-class>
    NAME            PROVISIONER                    RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
    gp2 (default)   kubernetes.io/aws-ebs          Delete          WaitForFirstConsumer   true                   104d
    ```

1. Resize the PVC by the following command

    ```bash
    kubectl -n hub patch pvc claim-<username> -p '{"spec":{"resources":{"requests":{"storage":"40Gi"}}}}}'
    ```

## Resize Group Volume

1. Find the PVC named `project-<group>`. If the storage class of the PVC is not empty, go to step 2 to resize this PVC.

    ```bash
    $ kubectl -n hub get pvc
    NAME                         STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
    project-phusers              Bound    pvc-0c62598b-c9fe-49d4-910f-b0c7f6269636   1Gi        RWX            efs            74d
    ```

    Otherwise, the PVC is binding an NFS PV pointing to an NFS server. Please find the PVC named `data-nfs-project-<group>-0`, which is the backed PVC for the NFS server.

    ```
    $ kubectl -n hub get pvc
    NAME                         STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
    project-phusers              Bound    hub-nfs-project-phusers                    1Gi        RWX                           74d
    data-nfs-project-phusers-0   Bound    pvc-0c62598b-c9fe-49d4-910f-b0c7f6269636   1Gi        RWO            gp2            74d
    ```

1. Check if the storage class of the PVC allows volume expansion

    ```
    $ kubectl get storageclass <storageclass>
    NAME            PROVISIONER                    RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
    gp2 (default)   kubernetes.io/aws-ebs          Delete          WaitForFirstConsumer   true                   104d
    ```

1. Resize the PVC by the following command

    ```bash
    kubectl -n hub patch pvc <pvcname> -p '{"spec":{"resources":{"requests":{"storage":"50Gi"}}}}}'
    ```

## Resize PV data volume

1. Find the PVC named `dataset-<dataset>`. If the storage class of the PVC is not empty, go to step 2 to resize this PVC.

    ```bash
    $ kubectl -n hub get pvc
    NAME                         STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
    dataset-test                 Bound    pvc-0c62598b-c9fe-49d4-910f-b0c7f6269636   1Gi        RWX            efs            74d
    ```

    Otherwise, the PVC is binding an NFS PV pointing to an NFS server. Please find the PVC named `data-nfs-dataset-<dataset>-0`, which is the backed PVC for the NFS server.

    ```
    $ kubectl -n hub get pvc
    NAME                         STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
    dataset-test                 Bound    hub-nfs-project-phusers                    1Gi        RWX                           74d
    data-nfs-dataset-test-0      Bound    pvc-0c62598b-c9fe-49d4-910f-b0c7f6269636   1Gi        RWO            gp2            74d
    ```

1. Check if the storage class of the PVC allows volume expansion

    ```
    $ kubectl get storageclass <storageclass>
    NAME            PROVISIONER                    RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
    gp2 (default)   kubernetes.io/aws-ebs          Delete          WaitForFirstConsumer   true                   104d
    ```

1. Resize the PVC by the following command

    ```bash
    kubectl -n hub patch pvc <pvcname> -p '{"spec":{"resources":{"requests":{"storage":"50Gi"}}}}}'
    ```