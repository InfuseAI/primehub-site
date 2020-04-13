---
id: prometheus-fails-startup
title: Prometheus fails to start up
---

## Prometheus goes to a OOM loop and states "unknown series references"

This issue has been filed [here](https://github.com/prometheus/prometheus/issues/5560#issuecomment-537210222).

The advice from official is that either we delete Prometheus PVC(in this way, the data will be lost) or we increase the memory Prometheus requests for.

Modify prometheus:  memory requests/limits in prometheus.yaml.

```bash
    # modify prometheus segment:  memory requests/limits
    vim path/to/PrimeHub/etc/helm_override/prometheus.yaml

    cd path/to/PrimeHub
    
    # Double check the diff of modifications
    make component-diff-prometheus-operator

    # Apply the new setting
    make component-install-prometheus-operator
```

---

## Prometheus does not start up due to corrupted `meta.json` files

You may see `".../prometheus/xxxxxxxxx": unexpected end of JSON  input` in logs.

The issue is filed [here](https://github.com/prometheus/prometheus/issues/4058).

In certain versions of Prometheus, it may fail to load generated `meta.json` file which has a size of zero.

The manual resolution is to find these files and delete them.

1. Learn the pod UID of `prometheus-prometheus-operator`:

    ```bash
    $kubectl get pods –n monitor prometheus-prometheus-operator-prometheus-xxx –o jsonpath={.metadata.uid}
    ```

2. Access into the node.

   Find out the location of corrupted json files which has a size of zero:

    ```bash
    cd /var/lib/kubelet/pods/<UID>/volumes/ceph.rook.io~rook-system/pvc-xxxxxxxxxxxxxx/prometheus-db

    #(there should be a meta.json file of size 0 )
    find ./ -name meta.json -size 0
    ```

3. Remove the folder where the size zero files locate.

---
