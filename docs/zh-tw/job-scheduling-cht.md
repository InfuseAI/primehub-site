---
id: job-scheduling-feature-cht
title: Job Scheduler (Beta)
---

PrimeHub 提供 Job Submission 功能讓我們可以把耗時的任務交付到背景執行；有時候這類型的 Job 是需要根據排程時間而週期性執行的。因此 PrimeHub 提供另一個功能 Job Scheduler，透過此功能創建出 Schedule ，而其會根據 Recurrence 設定負責發動 Job 至背景執行。

我們可以從 User Portal 上進入 **Job Scheduler** 功能。

## 列舉 Schedules

![](assets/jscheduler_main_beta.png)

在列舉中，每個 Schedule 帶有下列資訊：

|Column|Description|
|------|-----------|
|`Name`|名稱|
|`Group`|所屬群組|
|`Recurrence`| 週期性設定|
|`Next Run`| 下次 Job 發動時間|
|`Created By`| 所有者|
|`Action`|![action](assets/jscheduler_action.png) `發動`・`編輯`・`刪除` 按鈕。 |

+ `Schedule Job`：點擊按鈕，創建 Schedule.

+ `Refresh`: 點擊按鈕，刷新列舉。

### 篩選


利用 Group 選取作為篩選。

![](assets/jsub_filter_beta_v26.png)

+ 預設 (Group 選取為空白)： 列舉所有使用者所屬群組創建的`schedule`。非所屬群組的，則不在此列。

+ 指定 Group： 指定群組，只列舉指定所屬群組創建`schedule`。

+ 該使用者創建： 勾選`Submitted by Me`只列舉該使用者創建的`schedule`。

## 創建 Schedule

![](assets/jscheduler_create_beta.png)

創建 Schedule 跟創建 Job 幾乎一樣，我們需先設定`Group`, `InstanceTypes`, `Images`, `Command`；差別在於我們可以設定其發動 Job 的週期性`Recurrence Options`。

+ `Group`: 選擇 Schedule 發動 Job 所屬群組。

+ `InstanceTypes`: 選擇 Schedule 發動 Job 所需`instance type`資源佈屬。

+ `Images`: 選擇 Schedule 發動 Job 的執行環境。

+ `Schedule name`: 指定 Schedule 名稱。

+ `Command`: 指定 Schedule 發動 Job 批次工作項目。

+ `Recurrence Options`: Schedule 週期性設定。

  我們可以從內建的週期選項中選擇，或是依照 [`Cron` 語法 [參考]](https://en.wikipedia.org/wiki/Cron) 客製週期性。
  
  |Options                            |Description                     |
  |-----------------------------------|--------------------------------|
  |`Inactive`                         | 設定 Schedule 有效性；`Inactive` Schedule 無法發動 Job。|
  |`Every Day (at 4:00am)`            | 內建選項； 每天 4 AM 發動 Job。|
  |`Every Week (Sunday at 4:00am)`    | 內建選項； 每星期天 4 AM 發動 Job。|
  |`Every Month (on the 1st at 4:00am`| 內建選項； 每月第一天 4 AM 發動 Job。|
  |`Custom`                           | 客製週期性； "`minute` `hour` `day of the month` `month` `day of the week`"；`0 4 * * *` 表示每天 4 AM。|

## 編輯 Schedule

點擊`編輯`動作按鈕，進入 Schedule 編輯頁。

## 刪除 Schedule

點擊`刪除`動作按鈕，刪除 Schedule。

## 由 Schedule 發動的 Job

Schedules 會根據週期性設定來發動 Job；若 Job 是由 Schedule 發動的，我們可以從 **Job Submission** 列舉中得知，這些 Job 的`Schedule`欄位會有指向 Schedule 的連結。

![jsub_main_beta.png](assets/jsub_main_beta_v26.png)
