---
id: log-persistence
title: Log Persistence
---

Allows users to persists the job submission logs. By default, the job log is retrieved from the underlying pod. As the pod is deleted, the log is no longer accessed by the user.

# Prerequisites

The [PrimeHub Store](primehub-store) feature must be enabled

# Features

- The job log can be still accessible even the underlying pod is deleted.
- Support to store on s3 or gcs
- Support flush interval and max buffer size
- Support txt and gzip format

# Configruation
To enable PHFS, set the `store.eanbled` and `store.logPersistence.enabled` to `true`.

Path | Description | Default Value
--- | ----- | -----------------------
`store.enabled` | If the PrimeHub store is enabled | `false`
`store.logPersistence.enabled` | If the log persistence is enabled | `true`
`fluentd.flushAtShutdown` | Flush when flunetd is shutdown. Please see `flush_interval` setting in [flunetd buffer document](https://docs.fluentd.org/configuration/buffer-section) | `false`
`fluentd.flushInterval` | The flush interval. Please see `flush_interval` in [flunetd buffer document](https://docs.fluentd.org/configuration/buffer-section) |  `3600s`
`fluentd.chunkLimitSize` | The max size of each chunks. Please see `chunk_limit_size` setting in [flunetd buffer document](https://docs.fluentd.org/configuration/buffer-section) | "256m"
`fluentd.storeAs` | The log format stored in the store. We supports `txt` or `gzip`. Please see `store_as` setting in [flunetd s3 plugin document](https://docs.fluentd.org/output/s3) | `txt`
`fluentd.*` | The other fluentd settings | Please see the [chart configuration](../references/primehub_chart)

# Design

- **Flunetd:** The log collector to collect pod logs to PrimeHub store
- **GraphQL server:** The log endpoint retrieve the log from PrimeHub store if pod does not exist
- **Console:** Get the log from graphql server

**Fluentd**

Fluentd is based on [fluentd kuberentes dameonset](https://github.com/fluent/fluentd-kubernetes-daemonset). The behavior is

- Get the logs from `/var/log/containers`
- Get the pod metadata from kubernetes API
- Filter the log by label
- Flush the log to minio by s3 plugin

**GraphQL**

- Enhance the original log endpoint
- Add a new query parameter `persist=true`. If it marked as true, the log is retrieve from persistent log

**Console**

- The log UI would try to get the log from pod `persist=false`
- Once the response has code 404, it will continue to get the persistent log by `persist=true`

## Prefix in primehub store

- The prefix of log persistence is `/logs`
- The output of one job is `/logs/phjob/<phjob>/<date>/` (e.g `/logs/hub/job-202006030120-gxpavy/2020-06-03/log-*.txt`)


## Limitation

The default flush time of fluentd is 1 hour. So the log may have 1 hour delay from persistent log. It is possible to shorten the flush interval in configuration. However, it may generate more files in the storage and lead to more query overhead.