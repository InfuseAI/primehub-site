---
id: primehub_chart
title: Chart Configuration
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

## Configuration

Please see the default value in [values.yaml](https://github.com/InfuseAI/primehub/blob/master/chart/values.yaml)


Parameter | Description | Default
--- | --- | ---
`primehub.scheme` | The url scheme for primehub |  `http`
`primehub.domain` | The url domain for primehub. Cannot be a ip address. | *required*
`primehub.port` | The url port for primehub  | no port in url
`primehub.keycloak.scheme` | The url scheme for keycloak | `http`
`primehub.keycloak.domain` | The url domain for keycloak. Cannot be a ip address.| *required*
`primehub.keycloak.port` | The url port for keycloak | no port in url
`primehub.keycloak.username` | The master username for keycloak master realm | `keycloak`
`primehub.keycloak.password` | The master password for keycloak master realm | *required*
`primehub.keycloak.maxFreeSockets` | Maximum number of sockets (per host) to leave open in a free state | `10`
`primehub.keycloak.maxSockets` | Maximum number of sockets to allow per host | `80`
`primehub.keycloak.realm` | The keycloak realm for primehub | `primehub`
`primehub.keycloak.clientId` | The keycloak client id for primehub | `admin-ui`
`primehub.keycloak.rolePrefix` | The prefix of roles for the resource-group binding | `""`
`primehub.keycloak.svcUrl`| The Keycloak service url| `http://keycloak-http.default/auth` if Keycloak under namespace `default`; <br> `http://keycloak-http.hub/auth` if Keycloak under namespace `hub`.
`primehub.sharedVolumeStorageClass` | The storage class for shared volume. If the value is empty string `""`, it means to use `groupvolume` to provision shared volume | `""`
`ingress.annotations` | Annotations for ingress| `{}`
`ingress.hosts` | a list of ingress hosts | `[]`
`ingress.tls` | 	a list of ingress tls items | `[]`
`console.locale` | The language of console | `en`
`console.portalConfig` | The configuration of portal | Please see [values.yaml](values.yaml)
`console.readOnlyOnInstanceTypeAndImage` | Whether we only allow read operations and group-assignment on instanceType/image form | `false`
`console.replicas` | The number of primehub console replicas| `1`
`console.image.repository` | The primehub console image repository | `infuseai/canner-admin-server`
`console.image.tag` | The primehub console image tag | Please see [values.yaml](values.yaml)
`console.image.pullPolicy` | The primehub console image pull policy | `IfNotPresent`
`console.image.credentials.*` | The credential for primehub console image | `null`
`console.resources` | Pod resource requests and limits | Please see [values.yaml](values.yaml)
`console.nodeSelector` | Node labels for pod assignment | `{}`
`console.affinity` | Pod affinitiy |  `[]`
`console.tolerations` | Node taints to tolerate| `{}`
`graphql.sharedGraphqlSecret` | Secret key to request read-only graphql with. Client should put this shared key in header Authorization: `Bearer <SHARED_GRAPHQL_SECRET_KEY>` | *required*
`graphql.playgroundEnabled` | Enable the graphql playground | `false`
`graphql.apolloTracing` | Enable appolo tracing | `false`
`graphql.defaultUserVolumeCapacity` | Default user volume capacity | `20G`
`graphql.replicas` | The number of graphql server replicas | `1`
`graphql.image.repository` | The graphql server image repository | `infuseai/canner-graphql-server`
`graphql.image.tag` | The graphql server image tag | Please see [values.yaml](values.yaml)
`graphql.image.pullPolicy` | The graphql server image pull policy | `IfNotPresent`
`graphql.image.credentials.*` | The credential for graphql server image | `null`
`graphql.resources` | Pod resource requests and limits | Please see [values.yaml](values.yaml)
`graphql.nodeSelector` | Node labels for pod assignment | `{}`
`graphql.affinity` | Pod affinitiy | `[]`
`graphql.tolerations` | Node taints to tolerate| `{}`
`watcher.replicas` | The number of watcher replicas | `1`
`watcher.image.credentials.*` | The credential for watcher image | `null`
`watcher.image.repository` | The watcher image repository | `infuseai/canner-watcher`
`watcher.image.tag` | The watcher image tag | Please see [values.yaml](values.yaml)
`watcher.image.pullPolicy` | The watcher image pull policy | `IfNotPresent`
`watcher.resources` | Pod resource requests and limits | Please see [values.yaml](values.yaml)
`watcher.nodeSelector` | Node labels for pod assignment | `{}`
`watcher.affinity` | Pod affinitiy | `[]`
`watcher.tolerations` | Node taints to tolerate| `{}`
`admission.image.repository` | The admission webhook image repository | `infuseai/primehub-admission`
`admission.image.tag` |The admission webhook image tag | Please see [values.yaml](values.yaml)
`admission.image.pullPolicy` | The admission webhook image pull policy | `IfNotPresent`
`admission.resources` | Pod resource requests and limits | Please see [values.yaml](values.yaml)
`bootstrap.enabled` | If bootstrap job is enabled. | `true`
`bootstrap.username` | The name of admin user | `phadmin`
`bootstrap.password` | The password of admin user | random generated
`bootstrap.group` | The group of the init user | `phusers`
`bootstrap.image.repository` | The bootstrap image repository | `infuseai/primehub-bootstrap`
`bootstrap.image.tag` | The bootstrap image tag | Please see [values.yaml](values.yaml)
`bootstrap.image.pullPolicy` | The bootstrap image pull policy | `IfNotPresent`
`bootstrap.resources` | Pod resource requests and limits | Please see [values.yaml](values.yaml)
`controller.replicaCount` | The number of primehub controller replicas | `1`
`controller.image.repository` | The primehub controller image repository  | `infuseai/primehub-controller-ee`
`controller.image.tag` | The primehub controller image tag | Please see [values.yaml](values.yaml)
`controller.nodeSelector` | Node labels for pod assignment | `{}`
`controller.proxy.image.repository` | The kube-rbac-proxy image repository | `gcr.io/kubebuilder/kube-rbac-proxy`
`controller.proxy.image.tag` | The kube-rbac-proxy image tag | Please see [values.yaml](values.yaml)
`controller.resources` | Pod resource requests and limits | Please see [values.yaml](values.yaml)
`controller.affinity` | Pod affinitiy |  `[]`
`controller.tolerations` | Node taints to tolerate| `{}`
`groupvolume.enabled` | If enabl the groupvolume controller | `true`
`groupvolume.storageClass` | The storage class of the NFS underlying pvc | *Required if enabled*
`groupvolume.replicas` | The number of metacontroller webhook replicas | `1`
`groupvolume.image.repository` | The metacontroller webhook image repository | `metacontroller/jsonnetd`
`groupvolume.image.tag` | The metacontroller webhook image tag | Please see [values.yaml](values.yaml)
`groupvolume.image.pullPolicy` | The metacontroller webhook image pull policy | `IfNotPresent`
`groupvolume.nfs.image.repository` | The NFS image repository | `k8s.gcr.io/volume-nfs`
`groupvolume.nfs.image.tag` | The NFS image tag | Please see [values.yaml](values.yaml)
`groupvolume.nfs.image.pullPolicy` | The NFS image pull policy | `IfNotPresent`
`groupvolume.resources` | Pod resource requests and limits | Please see [values.yaml](values.yaml)
`groupvolume.nodeSelector` | Node labels for pod assignment | `{}`
`groupvolume.affinity` | Pod affinitiy | `[]`
`groupvolume.tolerations` | Node taints to tolerate| `{}`
`gitsync.enabled` | If enable the gitsync controller | `true`
`gitsync.replicas` | The number of metacontroller webhook replicas | `1`
`gitsync.image.repository` | The metacontroller webhook image repository | `metacontroller/jsonnetd`
`gitsync.image.tag` | The metacontroller webhook image tag | Please see [values.yaml](values.yaml)
`gitsync.image.pullPolicy` | The metacontroller webhook image pull policy | `IfNotPresent`
`gitsync.resources` | Pod resource requests and limits | Please see [values.yaml](values.yaml)
`gitsync.nodeSelector` | Node labels for pod assignment | `{}`
`gitsync.tolerations` | Node taints to tolerate| `{}`
`gitsync.affinity` | Pod affinitiy | `[]`
`gitsync.daemonset.delayInit` | Enable random init delay for gitsync container. It prevent from pulling data at the same time. | `false`
`gitsync.daemonset.image.repository` | The [gitsync](https://github.com/kubernetes/git-sync) image repository | `k8s.gcr.io/git-sync`
`gitsync.daemonset.image.tag` | The gitsync image tag | Please see [values.yaml](values.yaml)
`gitsync.daemonset.image.pullPolicy` | The gitsync image tag pull policy | `IfNotPresent`
`jupyterhub.*` | The [configuration of zero-to-jupyterhub chart](https://zero-to-jupyterhub.readthedocs.io/en/latest/reference/reference.html)| Please see [values.yaml](values.yaml)
`jupyterhub.primehub.keycloakClientId`| | `jupyterhub`
`jupyterhub.primehub.scopeRequired` | The keycloak scope is required to use jupyterhub |  `""`
`jupyterhub.primehub.startnotebook` | A map to inject the start notebook scripts. The key is the filename, the value is the script content | `{}`
`jupyterhub.primehub.startNotebookConfigMap` | The configmap name for start notebook scripts| `start-notebook-d`
`jupyterhub.primehub.kernelGateway` | If kerenel gateway enabled | `false`
`jupyterhub.primehub.authRefreshAge` | The authentication refresh rate. | `-1`
`jupyterhub.primehub.node-affinity-preferred`| The affinity setting for jupyter notebook | `[]`
`jupyterhub.primehub.node-affinity-required` | The affinity setting for jupyter notebook  | `[]`
`jupyterhub.primehub.pod-affinity-preferred` | The affinity setting for jupyter notebook | `[]`
`jupyterhub.primehub.pod-affinity-required` | The affinity setting for jupyter notebook | `[]`
`jupyterhub.primehub.pod-anti-affinity-preferred` | The affinity setting for jupyter notebook | `[]`
`jupyterhub.primehub.pod-anti-affinity-required` | The affinity setting for jupyter notebook | `[]`
`datasetUpload.enabled` | If dataset upload server enabled | `true`
`datasetUpload.interface.tusdImage.repository` | The dataset upload tusd image repository | `infuseai/tusd`
`datasetUpload.interface.tusdImage.tag` | The dataset upload tusd image tag | Please see [values.yaml](values.yaml)
`datasetUpload.interface.tusdImage.pullPolicy` | The dataset upload tusd image pull policy |  `IfNotPresent`
`datasetUpload.interface.tusdImage.resources` | Pod resource requests and limits | Please see [values.yaml](values.yaml)
`datasetUpload.interface.webFrontEndImage.repository` | The dataset upload frontend image repository | `infuseai/dataset-upload-web-front-end`
`datasetUpload.interface.webFrontEndImage.tag` | The dataset upload frontend image tag | Please see [values.yaml](values.yaml)
`datasetUpload.interface.webFrontEndImage.pullPolicy` | The dataset upload frontend image pull policy | `IfNotPresent`
`datasetUpload.interface.webFrontEndImage.resources` | Pod resource requests and limits | Please see [values.yaml](values.yaml)
`datasetUpload.metacontrollerHooks.replicas` | The number of metacontroller webhook replicas | `1`
`datasetUpload.metacontrollerHooks.image.repository` | The metacontroller webhook image repository | `metacontroller/jsonnetd`
`datasetUpload.metacontrollerHooks.image.tag` | The metacontroller webhook image tag | Please see [values.yaml](values.yaml)
`datasetUpload.metacontrollerHooks.image.pullPolicy` | The metacontroller webhook image pull policy | `IfNotPresent`
`customImage.enabled` | If image builder enabled | `false`
`customImage.registryEndpoint` | The endpoint of the registry server. `docker login <server>` | *required if enabled*
`customImage.registryUsername` | The username of the registry server. | *required if enabled*
`customImage.registryPassword` | The password of the registry server. | *required if enabled*
`customImage.pushRepoPrefix` | The repository prefix for all built images. The built image will be `<prefix>/my-image-name:<hash>` | *required if enabled*
`jobSubmission.enabled` | Enable the job submission | `false`
`jobSubmission.workingDirSize` | The size of ephemeral storage for working directory. The format of unit is defined in [kubernetes document](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/) | `5Gi`
`jobSubmission.defaultActiveDeadlineSeconds` | Default timeout (seconds) for a running job | `86400`
`jobSubmission.defaultTTLSecondsAfterFinished` | Default TTL (seconds) to delete the pod for a finished job | `604800`
`jobSubmission.nodeSelector` | The default [node selector](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector) for the underlying pod | `{}`
`jobSubmission.affinity` | The default [affinity](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity) setting for the underlying pod | `{}`
`jobSubmission.tolerations` | The default [tolerations](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/) setting for the underlying pod | `[]`
`jobSubmission.artifact.enabled` | If the job artifact feature is enabled | `true`
`jobSubmission.artifact.limitSizeMb` | The total size of artifacts a job can upload | `100`
`jobSubmission.artifact.limitFiles` | The total files a job can upload | `1000`
`jobSubmission.artifact.retentionSeconds` | How long would the artifacts preserve | `604800`
`adminNotebook.enabled` | | `false`
`adminNotebook.replicaCount` | The number of admin notebook replicas | `1`
`adminNotebook.image.repository` | The admin noteoobk image repository | `infuseai/primehub-admin-notebook`
`adminNotebook.image.tag` | The admin noteoobk image tag | Please see [values.yaml](values.yaml)
`adminNotebook.image.pullPolicy` | The admin noteoobk image pull policy | `IfNotPresent`
`adminNotebook.resources` | Pod resource requests and limits | Please see [values.yaml](values.yaml)
`adminNotebook.nodeSelector` | Node labels for pod assignment | `{}`
`adminNotebook.affinity` | Pod affinitiy | `[]`
`adminNotebook.tolerations` | Node taints to tolerate| `{}`
`keycloakGateway.image.repository` | The keycloak gateway image repository| `infuseai/primehub-admin-notebook`
`keycloakGateway.image.tag` | The keycloak gateway image tag | Please see [values.yaml](values.yaml)
`modelDeployment.enabled` | Enable the model deployment | `false`
`store.enabled` | If the PrimeHub store is enabled. If enabled, the MinIO and csi-rclone would be installed as well. | `false`
`store.accessKey` | The access key for the PrimeHub store | `AKIAIOSFODNN7EXAMPLE`
`store.secretKey` | The secret key for the PrimeHub store | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`
`store.bucket` | The bucket name the PrimeHub store use | `primehub`
`store.logPersistence.enabled` | If the log persistence feature is enabled. If enabled, the fluentd would be installed as well. | `true` if the PrimeHub store is enabled.
`store.phfs.enabled` | If the PHFS feature is enabled.  | `true` if the PrimeHub store is enabled.
`minio.ingress.enabled` | Enable the MinIO UI at `/minio` | `false`
`minio.ingress.maxBodySize` | The max body size for uploading | `8192m`
`minio.persistence.enabled` | If MinIO PVC for MinIO standalone mode is enabled | `true` if no gateway is enabled.
`minio.persistence.storageClass` | The storage class of PVC | null
`minio.persistence.accessMode` | The access mode of PVC | `ReadWriteOnce`
`minio.persistence.size` | The PVC size | `10Gi`
`minio.s3gateway.enabled` | Use MinIO as a S3 gateway | `false`
`minio.s3gateway.replicas` | Number of s3 gateway instances to run in parallel | `1`
`minio.s3gateway.accessKey` | Access key of S3 compatible service | `""`
`minio.s3gateway.secretKey` | Secret key of S3 compatible service | `""`
`minio.gcsgateway.enabled` | Use MinIO as a Google Cloud Storage gateway | `false`
`minio.gcsgateway.replicas` | Number of gcs gateway instances to run in parallel | `1`
`minio.gcsgateway.projectId` | Google cloud project id | `""`
`minio.gcsgateway.gcsKeyJson` | credential json file of service account key | `""`
`fluentd.flushAtShutdown` | Flush when flunetd is shutdown. Please see `flush_interval` setting in [flunetd buffer document](https://docs.fluentd.org/configuration/buffer-section) | `false`
`fluentd.flushInterval` | The flush interval. Please see `flush_interval` in [flunetd buffer document](https://docs.fluentd.org/configuration/buffer-section) |  `3600s`
`fluentd.chunkLimitSize` | The max size of each chunks. Please see `chunk_limit_size` setting in [flunetd buffer document](https://docs.fluentd.org/configuration/buffer-section) | "256m"
`fluentd.storeAs` | The log format stored in the store. We supports `txt` or `gzip`. Please see `store_as` setting in [flunetd s3 plugin document](https://docs.fluentd.org/output/s3) | `txt`
`rclone.kubeletPath` | The csi kubelet registration path. Please see [node-driver-registrar document](https://github.com/kubernetes-csi/node-driver-registrar) <br> For microk8s, please set this path to `/var/snap/microk8s/common/var/lib/kubelet` | `/var/lib/kubelet`
  # use /var/snap/microk8s/common/var/lib/kubelet with microk8s
  kubeletPath:


## Advanced Settings

### Start Notebook Script
To run a script for each notebook startup, you can configure in this way. Note that this script is run under `root` user
```
jupyterhub:
  primehub:
    startnotebook:
      hello.sh: |
        echo "hello"
        echo "world"
```

### Registry Password for Image Builder

If the registry password contains multiple lines, for example, the json keyfile from GCR (Google Container Registry). You can configure in this way.

```
customImage:
  registryEndpoint: https://gcr.io
  registryUsername: _json_key
  registryPassword: |-
    password_line_1
    password_line_2
```

Please note the `|-` string, it's required for multiple line string in yaml format.
