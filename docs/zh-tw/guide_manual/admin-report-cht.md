---
id: admin-report-cht
title: Usage Reports
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Available in Enterprise tier only</span>
</div>

PrimeHub v3.0 導入新功能 `Usage Reports`，藉此管理者可以下載每月報表，透過月報表對專案群組及資源使用狀況有著更清楚的掌握。

## Monthly Report

![](assets/usage-list.png)

從想要的月份下，點選 **Actions** 下載圖示，下載 csv 檔 或是在 `Date` 搜尋欄位指定年月；格式： `YYYY/M` (e.g. 2020/7, 2020/12)。

管理者甚至可以下載目前當月份報表，對話框會跳出提醒您，此月報告只包括到今日的資訊；點擊 `Confirm` 下載。

![](assets/usage-popup.png)

## Insight

月報表中有以下資訊：

|項目|描述|
|-   |-          |
|component|如： `job`, `jupyter`, `deployment`|
|group_name|component 所屬專案群組|
|user_name|使用者|
|gpu_hours| 平均每小時 GPU 使用量|
|cpu_hours| 平均每小時 CPU 使用量|
|memory_gb_hours| 平均每小時記憶體 GB 使用量|
|total_hours| 此月份共幾小時|
|report_date| 此報表的年月|
