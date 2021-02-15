---
id: core-resources
title: Core Resources
description: Core Resources
---


## Groups

PrimeHub adopts the group-centric design, one of core concepts is **Group-Context** that users and various types of resources must be associated with one group at least. Based on the specified working group, users are able to access corresponding resources and perform features within the group accordingly. Resources are not viewable if no associated group. 

Groups, arguably, are considered as projects when multiple projects are being developed by a group simultaneously.

See [Group Management](guide_manual/admin-group).

## Users

Users are project/group members. In order to perform features from User Portal, users must be associated with one group at least. 

In addition, users can have Group Admin privilege or/and Admin privilege to access dedicated features.

See [User Management](guide_manual/admin-user).

## Instance Types

PrimeHub is Kubernetes-based platform. Instance types are presets of resources allocation for environments. When launching a environment, platform needs to know the requested resources for it, under the hood, platform tries to find/allocates an instance according to requested resources for the environment if it is available by then in the circumstance. 

Instance types must be associated with one group at least for being viewable.

See [Instance Type Management](guide_manual/admin-instancetype).

## Images

Images are working environments to **Notebook**, **Job**, **Model**. When launching Notebook, Job, Model, platform needs to know requested environments (images). Existing container images can be added and be specified the access to certain groups. In addition, building custom images is also an option on PrimeHub.

Images must be associated with one group at least for being viewable.

See [Image Management](guide_manual/admin-image)(Admin), [Image Builder](guide_manual/admin-build-image)(Admin), [Image](group-image)(Group Admin).


## Datasets

PrimeHub supports several types of where datasets locate, **persist volume**, **nfs**, **host path**, **git** and **env**. It depends on where/how/what groups are going to share these datasets.

Groups can have read-only access datasets on git repository, or can clone datasets from internet into a persist volume/nfs/host path or can share just environmental variables.

Datasets must be associated with one group at least for being viewable.

See [Dataset Management](guide_manual/admin-dataset).

## Secrets

Secrets are credentials to access certain resources if required. Usually add secrets for pulling images or pulling datasets on git repo which requires credentials, in this case, images must be associated with secrets.

See [Secret Management](guide_manual/admin-secret).

