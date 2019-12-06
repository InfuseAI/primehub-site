---
id: version-2.1.0-primehub-data-model
title: PrimeHub Data Model
original_id: primehub-data-model
---

This document describes how PrimeHub stores data.

PrimeHub does not have its own database. The data is stored in keycloak's object and kuberentes object. The following diagram is a brief view of the data.

![](assets/primehub-data-model-diagram_1.png)

- **Keycloak:** We store `user` and `group` data. And assign a group to specific roles to bind this group to images, datasets, and instance types.
- **Kuberentes:** The definition of  `image`, `dataset`, `instance type` is stored as CRD (Custom Resource Definition) objects respectively. And the `secret` is stored by the kubernetes builtin secret object.

## Resources

### Users

A user in PrimeHub corresponds to  a user in Keycloak's primehub realm.

When a user is created via Admin UI, under the hood a user is created in Keycloak via API.

![](assets/primehub-data-model-diagram_2.png)

When a user is connected to existing groups via Admin UI, a user, in fact, is assigned to groups in Keycloak via API.

- Attributes
    - `locale`
    - `personalDiskQutoa`, when a user is created, there is a 1G volume allocated by default for the user.

    ![](assets/primehub-data-model-snapshot_1.png)

- Role
    - If a user has admin privileges, it must have `realm-admin` in realm-management `Client Roles`.

    ![](assets/primehub-data-model-snapshot_2.png)

### Groups

A group in PrimeHub represents a group in Keycloak correspondingly.

When a group is created via Admin UI, a group data, in fact, is created in Keycloak via API.

- Attributes
A group can have attributes which are stored in Keycloak such as `canUseCpu`, `cpuQuota`, `gpuQuota`, `diskQuota`, `displayName` and so on.

    ![](assets/primehub-data-model-snapshot_3.png)

- Role Mappings
In Keycloak, a group can be assigned `Realm Roles`, all of members in a group inherit same realm roles by default.

    ![](assets/primehub-data-model-snapshot_4.png)

- Members
A member who is a user in a group.

A hidden Group from Admin UI, `everyone`, which every created user must join is created for PrimeHub by default. The purpose is that when flag `Global` is enabled in `instance type`/`image`/`dataset` via Admin UI, there is a corresponding realm role, `<type>:xxx`, assigned to the group `everyone`.

![](assets/primehub-data-model-snapshot_5.png)

### Instance Types / Images / Datasets

When `instance type`, `image` or `dataset` is created via Admin UI, there are two things done at background,

![](assets/primehub-data-model-diagram_3.png)

- A CRD object is created via Kubernetes.

    A CRD object stores settings which are configured via Admin UI such as `Basic Info`, `Toleration` and `NodeSelector` and so on. You can use commands below to list all of stored CRDs.

        kubectl -n hub get instancetype
        kubectl -n hub get image
        kubectl -n hub get dataset

- A dedicated realm-role is also created correspondingly in Keycloak.

    A name of Realm Role comes with a prefix which indicates `instance type`, `image`, or `dataset`.

    - it:xxx, prefix `it` represents `instance type`.
    - img:xxx, prefix `img` represents `image`.
    - ds:[rw:]xxx, prefix `ds` represents `dataset`, `rw`: read-write, read-only by default.
    A dataset is connected to an existing group via Admin UI, in fact, it is assigned to a group correspondingly in Keycloak via API.

    > For advanced usage, we can add an additional prefix to these roles. For example, `it:cpu-only` with prefix `cluster1` is `cluster1:it:cpu-only`. Please refer to helm customization relative document.

    Once a/an `instance type`/`image`/`dataset` is connected to existing groups, the dedicated Realm Role is assigned to the groups. 

    Therefore, all of members(a.k.a users) of the group can see it from the menu `Server Options`  of JupyterHub spawner. That also explains the relation between the flag `Global` and the hidden group `everyone.`.

    ![](assets/primehub-data-model-snapshot_6.png)

### Secrets

When a `secret` is created via Admin UI, the settings is stored as a `secret` in Kubernetes. You can use a command below to list them.

    kubectl get secret -n hub