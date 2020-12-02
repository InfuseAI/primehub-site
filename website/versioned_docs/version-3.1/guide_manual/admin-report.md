---
id: version-3.1-admin-report
title: Usage Reports
original_id: admin-report
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

From PrimeHub v3.1, the new feature, `Usage Reports`, is introduced that administrators can have a overall insight of who/what consumed resources monthly.

>**Usage** is defined by **allocated** resources, not by actual utilization. For example, when an user opens an Jupyter notebook, the record of the allocated resources is logged in the usage report, *even if the user doesn't run any program actually on it*. The each record includes the lifetime of a pod, and CPU/GPU/Memory are allocated/occupied for a pod.

## Download Report

![](assets/usage-list.png)

Click **Detailed Report** or **Summary Report** of the month for downloading a csv file or search specific year-month by the format `YYYY/M` (e.g. 2020/7, 2020/12) in `Date` search field.

You even can download the report of the current month which is not over yet. It will have a pop-up to inform you that the data of current month is not intact. Just click `Confirm` for downloading.

![](assets/usage-popup.png)

## Detailed Report

There are some insightful data of usage:

|Item|Description|
|-   |-          |
|**report_month**| the report is for which year and month|
|**group**|which group which component runs at|
|**user**|which user uses resources|
|**component**|such as `job`, `notebook`, `model_deploy`|
|**component_name**| the name of the component|
|**cpu_core_hours**| hours if the computing work runs in a CPU|
|**gpu_core_hours**| hours if the computing work runs in a GPU|
|**gb_memory_hours**| hours if the computing work uses 1 GB memory|
|**usage_hours**| hours the computing work has done|
|**instance_type**   | instance type  |
|**instance_cpu_core**| vCPU cores of the instance |
|**instance_gpu_core**| GPU cores of instance  |
|**instance_memory_gb**| memory of the instance  |
|**pod_name**| name of the pod         |
|**k8s_uid**| Kubernetes object id           |
|**start_time**| time pod began running       |
|**end_time**| time pod finished running         |
|**running**| if it's still running|

## Summary Report

There are some insightful data of usage:

|Item|Description|
|-   |-          |
|**report_month**| the report is for which year and month|
|**group**|which group which component runs at|
|**user**|which user uses resources|
|**component**|such as `job`, `notebook`, `model_deploy`|
|**gpu_core_hours**| hours if the computing work runs in a GPU|
|**cpu_core_hours**| hours if the computing work runs in a CPU|
|**gb_memory_hours**| hours if the computing work uses 1 GB memory|
|**usage_hours**| hours the computing work has done|
|**running**| if it's still running|
