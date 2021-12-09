---
id: version-3.10-crds
title: CRDs
original_id: crds
---

In PrimeHub data model, it mentions when a/an instance type, image, and volume is created via Admin UI, under the hood, there are a CRD object created in Kubernetes and a Realm Role created in Keycloak. This document describes what CRDs are created for and the context of them. 

CRD, CustomResourceDefinition, PrimeHub uses the custom resource mechanism to manage structured data (custom objects) stored in Kubernetes. There are three of them, `Instance Type`, `Image` and `Volume`.

For more detail of CRD, please refer to [Extend the Kubernetes API with CustomResourceDefinitions](https://kubernetes.io/docs/tasks/access-kubernetes-api/custom-resources/custom-resource-definitions/).

## Instance Type

### Basic

An `Instance Type` object contains these following settings/configurations.

You can use the following commands to view the stored data.

    # List instance type objects.
    kubectl -n hub get instancetype
    
    # View the stored data of an instance type object.
    kubectl -n hub get instancetype/object_name -o yaml --export

The structured data (including `Node Selector` and `Tolerations` if any) of an `instance type` object displays in yaml format as below.

    apiVersion: primehub.io/v1alpha1
    kind: InstanceType
    metadata:
      generation: 1
      name: p100
      selfLink: /apis/primehub.io/v1alpha1/namespaces/hub/instancetypes/p100
    spec:
      description: p100
      displayName: p100
      limits.cpu: 4
      limits.memory: 26G
      limits.nvidia.com/gpu: 1
      nodeSelector:
        memory: low
      requests.cpu: 4
      requests.memory: 26G
      tolerations:
      - effect: NoSchedule
        key: dummy
        operator: Equal
        value: cpu1core

Spec:

- `displayName` Display Name
- `description` Description
- `limits.cpu` CPU Limit
- `limits.memory` Memory Limit
- `limits.nvidia.com/gpu` GPU Limit
- `requests.cpu` CPU Request
- `requests.memory` Memory Request

### Toleration

When a node is marked with a Taint, it cannot accept any pods which don't tolerate the taints. Toleration are applied to pods so that pods are allowed to schedule onto nodes with matching taints. Please refers to [Taints and Toleration](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/) for more detail.

On Admin UI, toleration which specifies a tolerable taint(key-value pair) with an effect to take.

We add toleration to tolerate a specific taint with an effect to take, the data is stored as below.

    tolerations:
      - effect: NoSchedule
        key: dummy
        operator: Equal
        value: cpu1core
    	- ...

Toleration settings:

- `effect`: `NoSchedule`, `NoExecute`, `PreferNoSchedule` and `None`.
- `key`: The key of a taint.
- `operator`: `tolerations[].operator`, `Exists` and `Equal`.
- `value`: The value of a taint is required when `Operator` is `Equal`.

### NodeSelector

Pods can be constrained to only be able to/prefer to run on particular nodes that are labeled matching key-value pairs. We add a nodeSelector with `memory/low` via Admin UI, the data is stored as below.

    nodeSelector:
        memory: low
    		cpucore: one

Node Selector settings:

- `key`: The key of a label.
- `value`: The value of a label.

## Image

### Basic

An `Image` object contains these following settings/configurations.

You can use the following commands to view the stored data.

    # List image objects.
    kubectl -n hub get image
    
    # View the stored data of an image object.
    kubectl -n hub get image/object_name -o yaml --export

The structured data (including `Pull Secret` if any) of an `image` object displays in yaml format as below.

    apiVersion: primehub.io/v1alpha1
    kind: Image
    metadata:
      generation: 1
      name: name-of-image
      selfLink: /apis/primehub.io/v1alpha1/namespaces/hub/images/name-of-image
    spec:
      description: ""
      displayName: name-of-image
      pullSecret: pull-secret-xxx
      url: registry.gitlab.com/infuseai/docker-stacks/scipy-notebook:073d6073

Spec:

- `displayName`: The display name of a image on UI.
- `description`: Description.
- `url`: The registry url where an image is located.
- `pullSecret`: The name of a `Secret`, this is a Secret we add via Admin UI. If required, the secret is used to pull the image.

## Volume

### Basic

A `Volume` object contains these following setting/configuration.

You can use the following commands to view the stored data.

    # List volume objects.
    kubectl -n hub get dataset
    
    # View the stored data of a volume object.
    kubectl -n hub get dataset/object_name -o yaml --export

The structured data (including `launchGroupOnly` if true) of a type pv `volume` object displays in yaml format as below.

    apiVersion: primehub.io/v1alpha1
    kind: Dataset
    metadata:
      annotations:
    		dataset.primehub.io/homeSymlink: "false"
        dataset.primehub.io/launchGroupOnly: "false"
        dataset.primehub.io/mountRoot: /datasets
      generation: 1
      name: data-rw-test
      selfLink: /apis/primehub.io/v1alpha1/namespaces/hub/datasets/data-rw-test
    spec:
      description: data-rw-test
      displayName: data-rw-test
      type: pv
      url: ""
      variables: {}
      volumeName: data-rw-test

Currently, there are types `pv`, `git`, `nfs`, `hostPath` and `env` of volumes. All of types has following data fields in common, also, each type has its own data fields.  In following sections, they are described respectively.

Annotations:

- `dataset.primehub.io/mountRoot`: A path of mount root.
- `dataset.primehub.io/launchGroupOnly`: It can only be selected in a launch Group if `true`.
- `dataset.primehub.io/homeSymlink`(*hidden from UI*): A flag of making a symlink in  home directory of users if `true`.

Spec:

- `displayName`: The display name on UI.
- `description`: The description.
- `type`: `pv`, `git`, `nfs`, `hostPath` and `env`.

---

### Type pv

PV, `persistent volume`, volume has a data field,`volumeName`. The container mount point of the volume is varied with the combination of `volumeName`, and both annotations of `mountRoot` and `homeSymlink`. PV is auto provisioning by default. There is an option so that the administrators can set the underlying settings manually.

### Pv with auto provisioning

    annotations:
      dataset.primehub.io/mountRoot: /datasets

    spec:
      volumeName: test

Container Mount Point `/datasets/test`

### Pv with manual provisioning

    annotations:
      dataset.primehub.io/mountRoot: /datasets
    
    spec:
      volumeName: test
      pv:
        provisioning: manual

Container Mount Point `/datasets/test`

### Pv with homeSymlink

    annotations:
      dataset.primehub.io/mountRoot: /datasets
      dataset.primehub.io/homeSymlink: "true"
    
    spec:
      volumeName: test

Container Mount Point `/datasets/test`

Symlinks `ln -s /dataset/test ~/test`

### Pv with mountRoot

    annotations:
      dataset.primehub.io/mountRoot: /foo/bar
    
    spec:
      volumeName: test

Container Mount Point `/foo/bar/test`

### Pv with mountRoot and homeSymlink specified

    annotations:
      dataset.primehub.io/mountRoot: /foo/bar
      dataset.primehub.io/homeSymlink: "true"
    
    spec:
      volumeName: test

Container Mount Point `/foo/bar/test`

Symlinks `ln -s /foo/bar/test ~/test`

---

### Type git

Git data volume has a data field, `Url`, which points to a git repo and a data field, `Secret`, which is added via Admin UI if a secret is required to pull the data volume from repo.

The container mount point of the data volume is varied with the combination of both annotations of `mountRoot` and `homeSymlink`.

    annotations:
      dataset.primehub.io/primehub-gitsync: "true"
      dataset.primehub.io/gitSyncHostRoot: /home/dataset
      dataset.primehub.io/gitSyncRoot: /gitsync
    
    spec:
      type: git
      url: repo: xxx/myrepo

Annotations:

- `dataset.primehub.io/primehub-gitsync`: `true` by default.
- `dataset.primehub.io/gitSyncHostRoot`: (Hidden from UI)
The host path to put the gitsync result. `/home/dataset` by default.
- `dataset.primehub.io/gitSyncRoot`: (*Hidden from UI*)
The path to mount the gitsync data volume. `/gitsync` by default.

Spec:

- `url`:  The url of a repo.

### Gitsync data volume with secret

    spec:
    	gitsync:
    	  secret:  image-pull
    	type:      git
    	url:       repo: xxx/myrepo

Spec:

- `gitsync.secret`: A secret is used for pulling a data volume from repo.

Container Mount Point `/gitsync/myrepo`.

Symlinks `ln -s /gitsync/myrepo/myrepo /dataset/myrepo`.

### Gitsync data volume with homeSymlink

    Annotations:  dataset.primehub.io/homeSymlink: true
    
    Spec:
    	Type:      git
    	URL:       repo: xxx/myrepo

Container Mount Point `/gitsync/myrepo`.

Symlinks

- `ln -s /gitsync/myrepo/myrepo /dataset/myrepo`.
- `ln -s /dataset/myrepo ~/myrepo`.

### Gitsync data volume with mountRoot

    annotations:  
    	dataset.primehub.io/mountRoot: /foo/bar
    
    spec:
    	type:      git
    	url:       repo: xxx/myrepo

Container Mount Point `/gitsync/myrepo`.

Symlinks `ln -s /gitsync/myrepo/myrepo /foo/bar/myrepo`.

### Gitsync data volume with homeSymlink and mountRoot

    annotations: 
    	dataset.primehub.io/homeSymlink: true
    	dataset.primehub.io/mountRoot: /foo/bar
    
    spec:
    	type:      git
    	url:       repo: xxx/myrepo

Container Mount Point `/gitsync/myrepo`.

Symlinks

- `ln -s /gitsync/myrepo/myrepo /foo/bar/myrepo`.
- `ln -s /foo/bar/myrepo ~/myrepo`.

---

### Type nfs

Nfs data volume has additional data fields `server` and `path` which set the nfs ip/domain and the nfs path. The mount point logic is the same as pv data volume.

### Nfs data volume example

    annotations:
      dataset.primehub.io/mountRoot: /datasets
      dataset.primehub.io/homeSymlink: "true"
    
    spec:
      volumeName: test
      nfs:
        server: 192.168.0.10
        path: /

---

### Type hostPath

HostPath data volume has an additional data field `path` which set the path in host. The mount point logic is the same as pv data volume.

### HostPath data volume example

    annotations:
      dataset.primehub.io/mountRoot: /datasets
      dataset.primehub.io/homeSymlink: "true"
    
    spec:
      volumeName: test
      hostPath:
        path: /tmp

---

### Basic env

Taking environment variables as data volumes.

    spec:
      variables:
        MYSQLDB: sql_mine

Spec:

- `variables`: variables in `key/value` pair.
