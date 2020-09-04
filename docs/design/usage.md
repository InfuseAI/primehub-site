---
id: usage
title: PrimeHub Usage
---

PrimeHub Usage allows the PrimeHub administrator to know the usage of the PrimeHub platform.

*Usage* is about resource allocation. For example, an user open an jupyter notebook, there will be a record in the usage data. The usage data keeps how long does a pod allocate, how many CPU, GPU and memory does a pod allocate.

# Features

- PrimeHub administrator can download monthly usage report (CSV format)

# Non-Goal

* Utilization is not covered in this scope.

Utilization is talking about how many ratio a resource used in an allocation.

# Configruation

To enable PrimeHub Usage, set the `usage.eanbled` to `true`.

Path | Description | Default Value
--- | ----- | -----------------------
`usage.enabled` | If the PrimeHub Usage is enabled | `false`

# Design

![](assets/primehub-usage-design.png)

PrimeHub Usage is made of five components:

* Usage
    * API: a rest API to query data from the usage database
    * Prober: a watcher to save pod events to the usage database
* Database: a postgresql database saves data to a pvc created by StatefulSet
* Reportint: a cronjob to generate monthly reports daily, it generate two reports (this month and last month) each time.
* Monitor: similiar to Prober, but it only cares pod events not updated recently. If a pod never changed again, it will mark the pod finished. In general case, the finished state should be handled by Prober. However, we do a final check in a seperated process to deal with edge cases.

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

- A pod scheduled
- Terminated time of the last container

## API


Usage API is an internal API consumed by GraphQL.


### Avaliable months


```
curl http://primehub-usage-api/report/monthly
```

```
["2020/8","2020/9"]
```

### Get report from a month


```
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

A cluster might have lots of resources created before PrimeHub Usage installed. There is a tool to migrate legacy resources by patching their `primehub.io/usage` annotation.

There is a `primehub-usage-legacy-pods-helper.py` in the prober pod:

```
kubectl -n hub exec -it primehub-usage-prober-it-is-an-example -- primehub-usage-legacy-pods-helper.py
```


After execution, it will generate patch commands if some resources are needed to patch:


```sh
# patch jupyter pod: jupyter-foo
kubectl -n hub patch pod jupyter-foo --type='json' -p '[{"op": "add", "path": "/metadata/annotations/primehub.io~1usage", "value": "{\"component\": \"jupyter\", \"component_name\": \"jupyter-foo\", \"group\": \"phusers\", \"user\": \"foo\", \"instance_type\": \"cpu-1\"}"}]'

# patch phdeployment deployment: tmp-1gawm, it might restart pods if anything have changed
kubectl -n hub patch deployment tmp-1gawm --type='json' -p '[{"op": "add", "path": "/spec/template/metadata/annotations/primehub.io~1usage", "value": "{\"component\": \"deployment\", \"component_name\": \"tmp-1gawm\", \"group\": \"model-deployment-test-group\", \"user\": \"ericy\", \"instance_type\": \"cpu-tiny\"}"}]'
```

Please review the commands before applying them.