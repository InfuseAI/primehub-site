---
id: minio_configurations
title: Minio Configurations
---


We build the object store feature with [minio](https://docs.min.io/). By default, minio installed as the standard mode, it would provision a PV to keep data. The administrator could customize it:

* enable ingress 
* configure standalone mode PersistentVolume
* launch minio as [AWS S3](https://aws.amazon.com/s3/) gateway  
* launch minio as [Google Cloud Storage](https://cloud.google.com/storage) gateway

All minio configurations at the top level `minio:`

## Common settings

Here is the default values to start minio:

```yaml
minio:
  ## Set default image, imageTag, and imagePullPolicy. mode is used to indicate the
  ##
  image:
    repository: minio/minio
    tag: RELEASE.2020-06-14T18-32-17Z
    pullPolicy: IfNotPresent

  ## Set default image, imageTag, and imagePullPolicy for the `mc` (the minio
  ## client used to create a default bucket).
  ##
  mcImage:
    repository: minio/mc
    tag: RELEASE.2020-05-28T23-43-36Z
    pullPolicy: IfNotPresent

  ## Additional arguments to pass to minio binary
  extraArgs: []

  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
  persistence:
    enabled: true

    ## minio data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    ## Storage class of PV to bind. By default it looks for standard storage class.
    ## If the PV uses a different storage class, specify that here.
    storageClass: ""
    VolumeName: ""
    accessMode: ReadWriteOnce
    size: 10Gi

  service:
    type: ClusterIP
    port: 9000

  imagePullSecrets: []

  ingress:
    enabled: false

    # annotation for nginx.ingress.kubernetes.io/proxy-body-size: "8192m"
    maxBodySize: "8192m"

  nodeSelector: {}
  tolerations: []
  affinity: {}

  resources:
    requests:
      memory: 512Mi

  s3gateway:
    enabled: false
    replicas: 1
    serviceEndpoint: ""
    accessKey: ""
    secretKey: ""

  ## Use minio as GCS (Google Cloud Storage) gateway, you should disable data persistence so no volume claim are created.
  ## https://docs.minio.io/docs/minio-gateway-for-gcs
  gcsgateway:
    enabled: false
    # Number of parallel instances
    replicas: 1
    # credential json file of service account key
    gcsKeyJson: ""
    # Google cloud project-id
    projectId: ""
```

## Ingress

We could enable the ingress by this example:

```yaml
minio:
  ingress:
    enabled: true
    maxBodySize: "8192m"
```

Enabled ingress would export the handy minio object browser to `/minio` path. If you upload a large file and see the message `413 Request Entity Too Large`. You could increase the value of `maxBodySize`.

## PersistentVolume

If `minio.persistence.enabled` is true, the PV would be created. You might set the `storageClass` and `size`. We take an example in AWS use case `gp2`:

```yaml
minio:
  persistence:
    enabled: true
    storageClass: "gp2"
    accessMode: ReadWriteOnce
    size: 1024Gi

```

## AWS S3 Gateway

You have to provide a credentials whice is able to access AWS S3:

```yaml
minio:
  s3gateway:
    enabled: true
    accessKey: "[put-your-access-key-id-here]"
    secretKey: "[put-your-secret-access-key-here]"
```

## Google Cloud Storage Gateway

You have to create a Service Account and download the json key file, put the content of the file into `gcsKeyJson`

```yaml
minio:
  gcsgateway:
    enabled: true
    projectId: "[your-proejct-id]"
    gcsKeyJson: "[the-content-of-your-json-key-file]"
```
