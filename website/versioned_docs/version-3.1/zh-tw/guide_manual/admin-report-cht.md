---
id: version-3.1-admin-report-cht
title: Usage Reports
original_id: admin-report-cht
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

PrimeHub v3.1 導入新功能 `Usage Reports`，藉此管理者可以下載每月報表，透過月報表對專案群組及資源使用狀況有著更清楚的掌握。

>請注意：報告裡的使用量是根據 Pod 的生命期及**要求配置**的資源來定義，而非程式實際運算使用到的資源; 如果有個開啟閒置的 Jupyter Notebook，其佔據的資源是會被列入計算的。

## Download Report

![](assets/usage-list.png)

從想要的月份下，選擇 **Detailed Report** 或 **Summary Report** 下載 csv 檔 或可用 `Date` 搜尋欄位指定年月；格式： `YYYY/M` (e.g. 2020/7, 2020/12)。

管理者甚至可以下載目前當月份報表，對話框會跳出提醒您，此月報告只包括到今日的資訊；點擊 `Confirm` 下載。

![](assets/usage-popup.png)

## Detailed Report

月報表中有以下資訊：

|項目|描述|
|-   |-          |
|**report_month**| 此報表的年月|
|**group**|component 所屬專案群組|
|**user**|使用者|
|**component**| 類別 如： `job`, `notebook`, `model_deploy`|
|**component_name**| component 實際名稱|
|**cpu_core_hours**| 1CPU 使用時數|
|**gpu_core_hours**| 1GPU 使用時數|
|**gb_memory_hours**| 1GB 使用時數|
|**usage_hours**| 總共時數|
|**instance_type**   |使用的 instance type 名稱 |
|**instance_cpu_core**| 使用的 instance 的 最多可用 vCPU 核數          |
|**instance_gpu_core**| 使用的 instance 的 可用 GPU 核數          |
|**instance_memory_gb**| 使用的 instance 的 最多可用記憶體大小        |
|**pod_name**| pod 名稱         |
|**k8s_uid**| K8S uid          |
|**start_time**| 起始時間          |
|**end_time**| 結束時間          |
|**running**| 是否正在執行中          |


## Summary Report

月報表中有以下資訊：

|項目|描述|
|-   |-          |
|**report_month**| 此報表的年月|
|**group**|component 所屬專案群組|
|**user**|使用者|
|**component**|如： `job`, `notebook`, `model_deploy`|
|**gpu_core_hours**| 1GPU 使用時數|
|**cpu_core_hours**| 1CPU 使用時數|
|**gb_memory_hours**| 1GB 使用時數|
|**usage_hours**| 總共時數|
|**running**| 是否正在執行中          |
