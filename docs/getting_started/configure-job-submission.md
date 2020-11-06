---
id: configure-job-submission
title: Configure Job Submission
sidebar_label: Job Submission
---


<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
</div>

# Installation

For Primehub EE, the job submission is enabled by default. Here is the advanced configuration for job submission

# Job Settings

Path | Description | Default Value
--- | ----- | -----------------------
`jobSubmission.workingDirSize` | The size of ephemeral storage for working directory. The format of unit is defined in [kubernetes document](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/) | `5Gi`
`jobSubmission.defaultActiveDeadlineSeconds` | Default timeout (seconds) for a running job | `86400`
`jobSubmission.defaultTTLSecondsAfterFinished` | Default TTL (seconds) to delete the pod for a finished job | `604800`
`jobSubmission.nodeSelector` | The default [node selector](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector) for the underlying pod | `{}`
`jobSubmission.affinity` | The default [affinity](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity) setting for the underlying pod | `{}`
`jobSubmission.tolerations` | The default [tolerations](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/) setting for the underlying pod | `[]`
`jobSubmission.jobTTLSeconds` | the retention of a job that it will be kept in PrimeHub after the job (succeeded, failed, cancelled). The default value is 30 days. Zero value means unlimited. | `2592000`
`jobSubmission.jobLimit` | The limit of total amount of jobs, the oldest job will be removed if the limit is exceeded; Zero value means unlimited. | `4000`

Example:

``` yaml
jobSubmission:
  workingDirSize: '5Gi'
  defaultActiveDeadlineSeconds: 86400
  defaultTTLSecondsAfterFinished: 604800
  nodeSelector: {}
  affinity: {}
  tolerations: []
```

# Job Artifacts

Path | Description | Default Value
--- | ----- | -----------------------
`jobSubmission.artifact.enabled` | If the job artifact feature is enabled | `true`
`jobSubmission.artifact.limitSizeMb` | The total size of artifacts a job can upload | `100`
`jobSubmission.artifact.limitFiles` | The total files a job can upload | `1000`
`jobSubmission.artifact.retentionSeconds` | How long would the artifacts preserve | `604800`

Example:

``` yaml
# Job artifact feature require primehub store and PHFS
store:
  enabled: true
  phfs:
    enabled: true
jobSubmission:
  artifact:
    enabled: true
    limitSizeMb: 100
    limitFiles: 1000
    retentionSeconds: 604800
```

# Log Persistence.

By default, the job submission log is persistent for 7 days (configured by `jobSubmission.defaultTTLSecondsAfterFinished`). The log is removed once the underlying pod is deleted. Log persistence feature allows to upload log to primehub store.

Path | Description | Default Value
--- | ----- | -----------------------
`store.enabled` | If the PrimeHub store is enabled | `false`
`store.logPersistence.enabled` | If the log persistence is enabled | `true`
`fluentd.flushAtShutdown` | Flush when flunetd is shutdown. Please see `flush_interval` setting in [flunetd buffer document](https://docs.fluentd.org/configuration/buffer-section) | `false`
`fluentd.flushInterval` | The flush interval. Please see `flush_interval` in [flunetd buffer document](https://docs.fluentd.org/configuration/buffer-section) |  `3600s`
`fluentd.chunkLimitSize` | The max size of each chunks. Please see `chunk_limit_size` setting in [flunetd buffer document](https://docs.fluentd.org/configuration/buffer-section) | "256m"
`fluentd.storeAs` | The log format stored in the store. We supports `txt` or `gzip`. Please see `store_as` setting in [flunetd s3 plugin document](https://docs.fluentd.org/output/s3) | `txt`
`fluentd.*` | The other fluentd settings | Please see the [chart configuration](../references/primehub_chart)


``` yaml
store:
  enabled: true
  logPersistence:
    enabled: true
fluentd:
  # Buffer configuration: https://docs.fluentd.org/configuration/buffer-section
  flushAtShutdown: false
  flushInterval: "3600s"
  chunkLimitSize: "256m"
  # S3 Configuration: https://docs.fluentd.org/output/s3
  storeAs: "txt"
```