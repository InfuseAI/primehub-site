---
id: cluster_shutdown 
title: Cluster shutdown
---
## Introduction

For some reasons, we need to shutdown the whole cluster. Here provides the `MAKEFILE` and scripts to shutdown and bring up the full kuberenetes cluster.

Here are the recommended steps to shutdown a k8s cluster

1. Shutdown all applications which using `rook-block` PVCs
1. Shutdown ceph cluster
1. Shutdwon kubernetes controlplane
1. Reboot

## Shutdown Cluster

1. Go to
   ```bash
   modules/support/cluster_shutdown/
   ```
1. Check cluster status.

   ```bash
   make status
   ```

1. Stop applications

   ```bash
   # shutdown primehub
   make down-primehub
   # shutdown efk
   make down-efk
   # shutdown prometheus/grafana
   make down-prom
   ```

1. Stop other applications from using ceph

   ```bash
   # Show all pods using PVCs with `rook-block` storage class.
   make show-rook-pods

   # use 'kubectl_stasis.sh' to scale down all controllers using ceph.
   kubectl_stasis.sh -n <ns> freeze <sts|deploy|rc|rs> <name>
   ```

1. Stop ceph

   ```bash
   make down-ceph
   ```

1. Shutdown api-server. <inventory file> is the ansible inventory file.

   ```bash
   INVENTORY_FILE=<inventory file>  make down-controlplane
   ```

1. Shutdown all nodes

## Startup Cluster

1. Startup all nodes, and check kubectl is back.

   ```
   kubectl get nodes
   ```

1. Start ceph

   ```
   make up-ceph
   ```

1. Start applications

   ```
   make up-primehub
   make up-efk
   make up-prom
   ```

1. Check PrimeHub is back
1. Start all other applications

   ```
   kubectl_stasis.sh -n <ns> thaw <sts|deploy|rc|rs> <name>
   ```

# Scripts

## `kubctl_stasis.sh`

A tool to scale up/down controllers with stored replicas number in annotation.
The information is stored at 'stasis.k8s.io/replicas'. Usage

```
Usage: kubectl_stasis.sh [-n namespace] [-l selector] command type [object]

Examples:
  # freeze the statefulset
  kubectl_stasis.sh -n hub freeze sts

  # thaw the statefulset
  kubectl_stasis.sh -n hub thaw sts

  # freeze the statefulset with selector
  kubectl_stasis.sh -n hub -l foo=bar freeze sts

  # freeze with the specified object
  kubectl_stasis.sh -n hub freeze deploy hub

  # check the status
  kubectl_stasis.sh -n hub status deploy

Options:
  -n --namepsaces   the namespace
  -l --selector     the selectror
  -h                print this help
```

## `kubectl_fdelete.sh`

Force delete pods after a period of time. Especially useful for pods controlled by statefulset

```
Usage: kubectl_fdelete.sh [-n namespace] [-l selector]

Examples:
  # delete pods with label
  kubectl_fdelete.sh -n default -l app=test

  # delete pods and force delete after 10 seconds
  kubectl_fdelete.sh -n default -l app=test -t 10

Options:
  -n --namepsaces   the namespace
  -l --selector     the selectror
  -t                the time to force delete
  -h                print this help
```

## `ceph_start_all.sh`

Start the ceph cluster

## `ceph_stop_all.sh`

Stop the ceph cluster

## `ceph.sh`

Run ceph command from rook-tools

## `find_pod_using_rook.sh`

Find all the pods which mount rook storage.

# Reference

- https://ceph.com/planet/how-to-do-a-ceph-cluster-maintenance-shutdown/
