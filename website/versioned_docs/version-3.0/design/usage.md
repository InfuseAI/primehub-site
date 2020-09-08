---
id: version-3.0-usage
title: PrimeHub Usage
original_id: usage
---

PrimeHub Usage provides administrators a overall insight of the usage of the PrimeHub.

*Usage* is about **allocated** resources, not about actual utilization. For example, when an user opens an Jupyter notebook, the record of the allocated resources is logged in the usage data, *even if the user doesn't run any program actually on it*. The each record includes the lifetime of a pod, and CPU/GPU/Memory are allocated/occupied for a pod.

## Features

- PrimeHub administrator can download monthly usage report (CSV format)

## Non-Goal

- Actual utilization is not covered in this scope.

The utilization describes the ratio of actual utilized resources to allocated resources.

## Configuration

To enable PrimeHub Usage, set the `usage.enabled` to `true`.

Path | Description | Default Value
--- | ----- | -----------------------
`usage.enabled` | If the PrimeHub Usage is enabled | `false`

## Design

![](assets/primehub-usage-design.png)

PrimeHub Usage is made of five components:

* Usage
    * API: a Rest API to query data from the usage database
    * Prober: a watcher to save pod events in the usage database
* Database: a Postgresql database saves data of a pvc created by StatefulSet
* Reporting: a cronjob to generate monthly reports daily, it generates two reports (this month and last month) each time.
* Monitor: similar to Prober, but it only monitors pod events if it is not updated recently. If a pod hasn't been changed for a while, it will mark the pod finished. In general case, the finished state should be handled by Prober. However, we do a final check in a separated process to deal with edge cases.

## Prober

```yaml
apiVersion: v1
kind: Pod
metadata:
  annotations:
    primehub.io/usage: '{"component": "jupyter", "component_name": "jupyter-foo",
      "group": "phusers", "user": "foo", "instance_type": "cpu-1"}'
  creationTimestamp: "2020-08-31T17:51:31Z"
  labels:
    app: jupyterhub
    chart: jupyterhub-0.9-dev
...
```

A prober watches pod events and filtering events in specific namespace (e.g. `hub`) with annotation  `primehub.io/usage`. It defines the lifetime of a pod between

- A pod when scheduled
- Terminated time of the last container

## API

Usage API is an internal API consumed by GraphQL.

### Available months

```bash
curl http://primehub-usage-api/report/monthly
```

```
["2020/8","2020/9"]
```

### Get report from a month

```bash
curl http://primehub-usage-api/report/monthly/2020/9
```

```csv
component,group_name,user_name,gpu_hours,cpu_hours,memory_gb_hours,total_hours,report_date
jupyter,phusers,foo,0.00,4320.00,2160.00,2160.00,202009
deployment,phusers,,0.00,720.00,720.00,720.00,202009
jupyter,phusers,phadmin,0.00,4320.00,2160.00,2160.00,202009
jupyter,phusers,foo,0.00,720.00,720.00,720.00,202009
jupyter,phusers,phadmin,0.00,720.00,720.00,720.00,202009
```

## Legacy resources migration

A cluster might have lots of resources created before PrimeHub Usage enabled. There is a tool to migrate legacy resources by patching their `primehub.io/usage` annotation.

There is a `primehub-usage-legacy-pods-helper.py` in the prober pod:

```bash
kubectl -n hub exec -it primehub-usage-prober-it-is-an-example -- primehub-usage-legacy-pods-helper.py
```

After execution, it generates patch commands if some resources are needed to patch:

>Please review the commands before applying them.

```sh
# patch jupyter pod: jupyter-foo
kubectl -n hub patch pod jupyter-foo --type='json' -p '[{"op": "add", "path": "/metadata/annotations/primehub.io~1usage", "value": "{\"component\": \"jupyter\", \"component_name\": \"jupyter-foo\", \"group\": \"phusers\", \"user\": \"foo\", \"instance_type\": \"cpu-1\"}"}]'

# patch phdeployment deployment: tmp-1gawm, it might restart pods if anything have changed
kubectl -n hub patch deployment tmp-1gawm --type='json' -p '[{"op": "add", "path": "/spec/template/metadata/annotations/primehub.io~1usage", "value": "{\"component\": \"deployment\", \"component_name\": \"tmp-1gawm\", \"group\": \"model-deployment-test-group\", \"user\": \"ericy\", \"instance_type\": \"cpu-tiny\"}"}]'
```
