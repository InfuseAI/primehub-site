---
id: configure-primehub-store
title: Configure PrimeHub Store
description: Configure PrimeHub Store
sidebar_label: PrimeHub Store
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

PrimeHub Store is the central storage for storing PrimeHub files. Many features are based on PrimeHub store to persist, transfer, and load the data.

PrimeHub store selects [MinIO](https://docs.min.io/) as the backend and uses one bucket to store the data. To enable the PrimeHub store, set the `store.enabled` to true.

Path | Description | Default Value
--- | ----- | -----------------------
`store.enabled` | If the PrimeHub store is enabled | `false`
`store.accessKey` | The access key for the PrimeHub store | `AKIAIOSFODNN7EXAMPLE`
`store.secretKey` | The secret key for the PrimeHub store | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`
`store.bucket` | The bucket name the PrimeHub store use | `primehub`
`minio.*` | The MinIO configuration | Please see the [chart configuration](../references/primehub_chart)

## Configure MinIO

MinIO is installed if PrimeHub store is enabled. By default, MinIO data are stored in a PVC. However, we have these options to store the data.

* **Standalone mode**: Store data in Kuberentes PVC
* **AWS S3 gateway**: Store data in [AWS S3](https://aws.amazon.com/s3/) and use MinIO as gateway
* **Google Cloud Storage gateway**: Store data in [Google Cloud Storage](https://cloud.google.com/storage) and use MinIO as gateway

### Standalone mode

If `minio.persistence.enabled` is true, the MinIO would operate as standalone mode and one PVC is created. Here is the example for standalone mode:

```yaml
store:
  bucket: "primehub"

minio:
  persistence:
    enabled: true
    storageClass: "gp2"
    accessMode: ReadWriteOnce
    size: 1024Gi

```

As the MinIO is installed, the bucket is also created automatically.

### AWS S3 Gateway

According to [MinIO S3 Gateway](https://docs.min.io/docs/minio-gateway-for-s3.html), prepare the AWS S3 bucket before installation.

* Choose an existing bucket or [create a bucket](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html) from Amazon S3 console
* Create an IAM user and get `accessKey` and `secretKey`
* Attach the user with AWS S3 permissions policies

Here is the example for AWS S3:

```yaml
store:
  bucket: "the-bucket-your-created"

minio:
  s3gateway:
    enabled: true
    accessKey: "[put-your-access-key-id-here]"
    secretKey: "[put-your-secret-access-key-here]"
```

MinIO also supports to use s3 gateway to connect to [Ceph RGW](https://docs.ceph.com/docs/master/radosgw/). Here is the example for connecting to Ceph RGW by [Rook](https://rook.io/docs/rook/master/ceph-object.html).

```yaml
store:
  bucket: "primehub"

minio:
  s3gateway:
    enabled: true
    serviceEndpoint: "http://rook-ceph-rgw-object-store.rook"
    accessKey: "[put-your-access-key-id-here]"
    secretKey: "[put-your-secret-access-key-here]"
```

### Google Cloud Storage Gateway

According to [MinIO GCS Gateway](https://docs.min.io/docs/minio-gateway-for-gcs.html), prepare the GCS bucket before installation.

* Choose a existing bucket or [create a bucket](https://cloud.google.com/storage/docs/quickstart-console) from Google Cloud Storage console
* [Create and manage service accounts](https://cloud.google.com/iam/docs/creating-managing-service-accounts)
* [Generate json keyfile](https://cloud.google.com/iam/docs/creating-managing-service-account-keys)

Here is the example for GCS:

```yaml
store:
  bucket: "the-bucket-your-created"

minio:
  gcsgateway:
    enabled: true
    projectId: "[your-project-id]"
    gcsKeyJson: "[the-content-of-your-json-key-file]"
```

### Access the MinIO UI

You could export the MinIO web UI to the public domain `http://${PRIMEHUB_DOMAIN}/minio`

```yaml
minio:
  ingress:
    enabled: true
    maxBodySize: "8192m"
```

Enabled ingress would export the handy MinIO object browser to `/minio` path. If you upload a large file and see the message `413 Request Entity Too Large`. You could increase the value of `maxBodySize`.

However, the ingress only allows you to use MinIO UI. If you want to operate object with AWS S3 compatible library outside of the Kubernetes, do it with `port-forward`:

```
kubectl -n hub port-forward service/primehub-minio 9000
```

## Configure PHFS

PHFS(PrimeHub File System) is the PrimeHub store based group sharing space. The group data is stored under `mybucket/groups/<group>`. It also a fundamental building block for group resources.

By default, if the Primehub store is enabled, the PHFS is enabled as well. But we can manually disable PHFS by configuring `store.phfs.enabled` as false.

Path | Description | Default Value
--- | ----- | -----------------------
`store.phfs.enabled` | If PHFS is enabled | `true`
`rclone.*` | The rclone configuration | Please see the [chart configuration](../references/primehub_chart)


Configuration:

```yaml
store:
  enabled: true
  phfs:
    enabled: true
```

The following components would be installed if PHFS is enabled.

1. **csi-rclone**: A CSI implementation for mounting S3-compatible object storage.
1. **primehub store PVC**: csi-rclone-provisioned PVC for PrimeHub store. We use it for mounting the MinIO bucket on the user's pod.

### Note for MicroK8s

Because the default kubelet path for MicroK8s is not `/var/lib/kubelet`, we need to configure the kubelet path as follow

```
rclone:
  kubeletPath: '/var/snap/microk8s/common/var/lib/kubelet'
```

## Configure Log Persistence

Log persistence enables logs to be stored persistently in the PrimeHub store under `mybucket/logs`. Currently, only job logs are supported to persist.

By default, if the PrimeHub store is enabled, the log persistence is enabled as well. But we can manually disable log persistence by configuring `store.logPersistence.enabled` as false.

Path | Description | Default Value
--- | ----- | -----------------------
`store.logPersistence.enabled` | If the log persistence is enabled | `true`
`fluentd.*` | The fluentd configuration | Please see the [chart configuration](../references/primehub_chart)

The following components would be installed if log persistence is enabled

1. **fluentd**: The collector to collect container logs and upload to PrimeHub store.
