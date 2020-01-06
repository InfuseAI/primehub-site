---
id: version-2.3-ADVANCED-rook-setup-metadata-on-vg
title: Setup rook metadata on VG
original_id: ADVANCED-rook-setup-metadata-on-vg
---

In order to get the best out of ssd raid devices for rook's performance, we wanted to place the metadata database on ssd raid.

Here are the sample steps. Please change the commands accordingly.

In this document, we have 4 SSD disks(sdb-sde) and 2 HDD(sdf-sdg) on each node. We'll create a raid5 on those 4 SSDs and use the HDDs as OSDs.

## Create the SSD raid

```bash
yum -y install mdadm
mdadm --create --verbose --auto=yes /dev/md0 --level=5 --raid-devices=4 /dev/sd[b-e]

# make sure the rotational bit is correct. There's a bug before linux kernel 4.9
echo 0 > /sys/block/md0/queue/rotational
```

## Use our patched rook image

Override `etc/helm_override/rook.yaml` to use our patched rook image.

```yaml
image:
  prefix: rook
  repository: infuseai/rook
  tag: v0.9.3-b2bf163
  pullPolicy: IfNotPresent
```

## Modify the CephCluster CRD

There's a example file in `modules/rook/examples/rook-cluster-metadata-on-vg.yml`

_Note_ The databaseSizeMB needs to be > 1024 for lvcreate to consume.

```yaml

---
storage: # cluster level storage configuration and selection
  useAllNodes: true
  useAllDevices: false
  deviceFilter: ^sd[b-d]
  location:
  config:
    databaseSizeMB: "2048"
    storeType: bluestore
    osdsPerDevice: "1" # this value can be overridden at the node or device level
    #directories:
    #- path: /data/rook-storage
```

## Bootstrap rook

Install rook operator and create the CRDs.

```bash
helmfile -f helm/helmfile.d/01rook.yaml
kubectl apply -f modules/rook
```
