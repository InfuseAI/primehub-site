---
id: csi-rclone-installation-guide
title: Csi-rclone Installation Guide
description: Csi-rclone Installation Guide
---

[csi-rclone](https://github.com/wunderio/csi-rclone) is a csi plugin to mount lots of kind storage by [rclone](https://rclone.org/), we use it to support the object store feature.

## Installation

All files in the `module/csi-rclone` directory, it could be installed by applying all:

```bash
cd primehub
kubectl apply -f modules/csi-rclone
```

However, if you were using microk8s, it should patch it after installed, because of different kubelet path:

```bash
cat modules/csi-rclone/csi-nodeplugin-rclone.yaml | sed "s#/var/lib/kubelet#/var/snap/microk8s/common/var/lib/kubelet#g" | kubectl apply -f -
```

## Configuration

We already have a csi-rclone now, but it doesn't how and where to connect the default storage. It needs a `rclone-secret` secret. There are two `secret` examples for different use cases, please replace `${VARIABLES}` to fit the real case.


### Connect to MinIO

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: rclone-secret
  namespace: csi-rclone
type: Opaque
stringData:
  remote: "s3"
  remotePath: "${BUCKET}"
  s3-provider: "Minio"
  s3-endpoint: "${MINIO_ENDPOINT}"
  s3-access-key-id: "${S3_ACCESS_KEY_ID}"
  s3-secret-access-key: "${S3_SECRET_ACCESS_KEY}"
```

**MinIO variables explained**

- remotePath
    - it could be a `BUCKET` name or a `BUCKET` with prefix. e.g. `BUCKET/prefix`
- s3-endpoint. e.g. `http://minio-release.default:9000`. It depends on minio's namespace and service name.

### Connect to AWS S3

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: rclone-secret
  namespace: csi-rclone
type: Opaque
stringData:
  remote: "s3"
  remotePath: "${BUCKET}"
  s3-provider: "AWS"
  s3-region: "${S3_REGION}"
  s3-access-key-id: "${S3_ACCESS_KEY_ID}"
  s3-secret-access-key: "${S3_SECRET_ACCESS_KEY}"
```

- remotePath
    - basically same with `MinIO`, however, you have to create the `BUCKET` before it could be used.
- s3-region
    - For a regular `AWS S3`, we needn't customize endpoint, please use `s3-region` to setup where is the bucket.

## Verification

There are 3 resources in our example:

* a PV in rclone storage class
* *a PVC to use the PV
* *a Pod to mount it

```yaml
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: rclone-example-pv
  labels:
    name: rclone-example-pv
spec:
  accessModes:
  - ReadWriteMany
  capacity:
    storage: 10Gi
  storageClassName: rclone
  csi:
    driver: csi-rclone
    volumeHandle: data-id
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: rclone-example-pv
spec:
  accessModes:
  - ReadWriteMany
  resources:
    requests:
      storage: 10Gi
  storageClassName: rclone
  selector:
    matchLabels:
      name: rclone-example-pv
---
apiVersion: v1
kind: Pod
metadata:
  name: nginx-example
  labels:
    run: nginx-example
spec:
  containers:
  - image: nginx
    imagePullPolicy: Always
    name: nginx-example
    ports:
    - containerPort: 80
      protocol: TCP
    volumeMounts:
      - mountPath: /usr/share/nginx/html
        name: rclone-example-pv
  volumes:
  - name: rclone-example-pv
    persistentVolumeClaim:
      claimName: rclone-example-pv
```

Find the mount point

```bash
$ kubectl exec -it nginx-example -- mount | grep s3
:s3:csi-rclone-20200608/foobarbar/ on /usr/share/nginx/html type fuse.rclone (rw,nosuid,nodev,relatime,user_id=0,group_id=0,allow_other)
```

Create a file to test it working (the file also could be seen at s3 browser)

```bash
$ kubectl exec -it nginx-example -- bash -c "echo 1 > /usr/share/nginx/html/test; ls -l /usr/share/nginx/html/test"
-rw-r--r-- 1 root root 2 Jun 23 03:33 /usr/share/nginx/html/test
```

