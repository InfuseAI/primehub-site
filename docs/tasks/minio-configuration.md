---
id: minio_configurations
title: MinIO Configurations
---


We build the object store feature with [minio](https://docs.min.io/). By default, minio installed as the standard mode, it would provision a PV to keep data. The administrator could customize it:

* configure standalone mode
* launch minio as [AWS S3](https://aws.amazon.com/s3/) gateway
* launch minio as [Google Cloud Storage](https://cloud.google.com/storage) gateway

All minio configurations at the top level `minio:`


## Standalone mode

If `minio.persistence.enabled` is true, the PV would be created. You might set the `storageClass` and `size`. We take an example in the AWS EC2 use case `gp2`:

```yaml
minio:
  persistence:
    enabled: true
    storageClass: "gp2"
    accessMode: ReadWriteOnce
    size: 1024Gi

```

## AWS S3 Gateway

Refer to [minio gateway for s3](https://docs.min.io/docs/minio-gateway-for-s3.html) prerequisites are:

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

## Google Cloud Storage Gateway

Refer to [minio gateway for gcs](https://docs.min.io/docs/minio-gateway-for-gcs.html) prerequisites are:

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
    projectId: "[your-proejct-id]"
    gcsKeyJson: "[the-content-of-your-json-key-file]"
```

## Access the minio UI

You could export the minio web UI to the public domain `http://${PRIMEHUB_DOMAIN}/minio`

```yaml
minio:
  ingress:
    enabled: true
    maxBodySize: "8192m"
```

Enabled ingress would export the handy minio object browser to `/minio` path. If you upload a large file and see the message `413 Request Entity Too Large`. You could increase the value of `maxBodySize`.

However, the ingress only allows you to use minio UI. If you want to operate object with AWS S3 compatible library outside of the kubernetes, do it with `port-forward`:

```
kubectl -n hub port-forward service/primehub-minio 9000
```
