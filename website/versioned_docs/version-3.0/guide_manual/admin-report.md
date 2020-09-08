---
id: version-3.0-admin-report
title: Usage Reports
original_id: admin-report
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Available in Enterprise tier only</span>
</div>

From PrimeHub v3.0, the new feature, `Usage Reports`, is introduced that administrators can have a overall insight of who/what consumed resources monthly.

>**Usage** is defined by **allocated** resources, not by actual utilization. For example, when an user opens an Jupyter notebook, the record of the allocated resources is logged in the usage report, *even if the user doesn't run any program actually on it*. The each record includes the lifetime of a pod, and CPU/GPU/Memory are allocated/occupied for a pod.

## Monthly Report

![](assets/usage-list.png)

Click the icon from **Actions** of the month for downloading a csv file or search specific year-month by the format `YYYY/M` (e.g. 2020/7, 2020/12) in `Date` search field.

You even can download the report of the current month which is not over yet. It will have a pop-up to inform you that the data of current month is not intact. Just click `Confirm` for downloading.

![](assets/usage-popup.png)

## Insight

There are some insightful data of usage:

|Item|Description|
|-   |-          |
|component|such as `job`, `jupyter`, `deployment`|
|group_name|which group the component is within|
|user_name|which user|
|gpu_hours| average of gpu usage per hour|
|cpu_hours| average of cpu usage per hour|
|memory_gb_hours| average of memory usage per GB/hour|
|total_hours| total hours of this month|
|report_date| report of year-month|
