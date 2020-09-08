---
id: version-3.0-job-submission-cht
title: Job Submission (Beta)
original_id: job-submission-cht
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Available in Enterprise tier only</span>
</div>

## Job

我們有時會需要批次完成特定工作。特別是需要長時間運算的工作，使用者又無法一直監視著整個過程的時候，我們可以利用`Job Submission`創建一個`Job`把工作指令項目批次地加入，再將`Job`送出於背景執行，隨時地監視執行的過程及結果。如果我們想要的是週期性自動發動的`job`，我們可以利用 [**Job Scheduler**](job-scheduling-feature-cht) 來創建這類型 job 及設定其週期性。

### Lifetime

+ `job`最長可以執行 **24** 個小時。一旦超過 24 小時後，會被中止宣告失敗。

+ 結束的`job`記錄基本上會被保留 **7** 天；超過 7 天後，`job`還是會在列表中，但`Logs`資訊會被刪除。
    ***請注意：由於 Job 容器有可能提早被其執行環境給回收，因此`Logs`有可能在 7 天內被刪除。***

## Job 列表

此頁列出已創建 Jobs 及其對應資訊。

![](assets/jsub_main_beta_v3.png)

列表中的`Job`對應資訊欄位：

|欄位|描述|
|------|-----------|
|`Status`|狀態， `Pending`, `Preparing`, `Running`, `Failed`, `Succeeded` 及 `Cancelled`|
|`Job name`|名稱|
|`Schedule`|如果此 Job 是被 scheduler 根據排程時間發動的話，這裡會顯示 Scheduler 名稱；反之顯示`-`。|
|`User`|所有者|
|`Group`|所屬群組|
|`Timing`|執行時間|
|`Action`|我們可以<ul><li>`Rerun`已結束的工作</li><li>`Cancel`正在執行的工作</li><li>`Clone`複製同樣設定的工作來建立新的</li></ul>|

+ `Create Job`: 點擊按鈕，創建`job`。

+ `Refresh`: 點擊按鈕，刷新`job`列表。

+ `Job name` link: 點擊名稱連結，進入 Job 詳細頁。

+ `Schedule` link: 點擊名稱連結，進入 Job Scheduler 詳細頁。

+ `Submitted by Me`勾選，只列出該使用者創建的`job`。

## 創建 Job

請確認目前預先決定的專案群組，是否為設想的群組；切換專案群組請用下拉選單 `Group:`。

![](assets/jsub_create_v3.png)

+ `InstanceTypes`: 選擇`job`所需`instance type`資源佈屬。

+ `Images`: 選擇`job`的執行環境。

+ `Job name`: 指定`job`名稱。

+ `Command`: 指定`job`批次工作項目。

### Job 可存取工作目錄、專案目錄及資料集目錄

 >注意：Job 的預設路徑是在 `/homve/jovyan`，但這是在 Job Pod 裡的環境，不是 JupyterHub Pod 裡！
 所以 JupyterHub `/home/jovyan`下的其它檔案並 **不存在** 此時的 Job Pod 的`/home/jovyan`。Job 這裡只會有掛載的`<group volume>`及`<dataset>`。

 |目錄|描述|
 |---------|-----------|
 |`/home/jovyan`|`job`執行時的暫存工作目錄。***注意:** 如果輸出 data 於此，此 data 將會著`job`結束而消失，只能做為暫存之用。 不再是~~`/workingdir`~~*！|
 |`/home/jovyan/<group> -> /project/<group>/`|用此路徑(或 Symbolic link)，存取群組目錄，可以做為讀取及輸出常態性資料，即使`job`已經結束。***注意：** `group volume`必須要事存在，請洽系統管理員。*|
 |`/home/jovyan/datasets/<dataset> -> /datasets/<dataset>`|用此路徑(或 Symbolic link)，存取群組資料集。***注意：** `dataset volume`必須要事先存在，請洽系統管理員。*|

### Job 可存取環境變數

|變數名稱|描述|
|------------|-----------|
|`$PRIMEHUB_USER`|Job 所有者|
|`$PRIMEHUB_GROUP`|Job 所屬群組|

**Python command option**

+ `python -u` 我們可以用 `-u` 強制輸出訊息不經由緩衝，如此可以在`Logs`看到即時訊息。
**Example 1**: 假設`train_mint.py`事先存在名叫`research`的`group volume`，我們可以進`/project/research`下，執行該 python file 做為一個`job`。`job`執行期間輸出的 data 則存在此路徑的相對位置。

```bash
cd /project/research/
python -u train_minst.py
```

**Example 2**: 如果我們直接執行下列指令，沒有變更路徑，`job`的工作目錄位在`/home/jovyan` job 執行期間輸出的 data 則會存在此路徑的相對位置。但此為暫存目錄，換而言之， 輸出在`/home/jovyan`的 data 資料會隨著`job`結束而消失。

```bash
python -u /project/research/train_minst.py
```

`Submit`: 點擊按鈕，送出工作執行。

## 查看 Job

在列表上點擊想要查看的`job`名稱，查看內容資訊及執行記錄；可以`Rerun`或`Clone`此 Job。

### Information

![](assets/jsub_info_beta_v28.png)

`Job`記載內容資訊如下：

|Field|Description|
|-----|-----------|
|`Status`|狀態，`Pending`,`Preparing`, `Running`, `Failed`, `Succeeded` 及 `Cancelled`|
|`Message`|執行回傳訊息|
|`Job ID`|ID|
|`Job name`|名稱|
|`Schedule`|如果此 Job 是被 scheduler 根據排程時間發動的話，這裡會顯示 Scheduler 名稠；反之顯示`-`；點擊名稱連結，進入 Job Scheduler 詳細頁。|
|`User`|所有者|
|`Start Time`|開始時間|
|`Finished Time`|結束時間|
|`Duration`|執行時間|
|`Group`|所屬群組|
|`Instance type`|所佈屬 `instance type`資源|
|`Image`|所屬執行環境|
|`Command`|批次工作項目內容|

### 工作記錄

>預設此頁只顯示**最新的 2000 行**資訊；按下`Download`下載完整記錄。

![](assets/jsub_log_v28.png)

當工作執行「成功」或「失敗」，我們可以由此查看整個執行過程、結果、甚至除錯。

當工作是被「取消」或「中止」，無法由此查到任何記錄！因為此時的 Pod 已被刪除回收。

有時，我們只想看最後的輸出結果，可以點擊`Scroll to Bottom`跳過攏長記錄直接到記錄尾端。

另外，由於介面上只顯示最後的 2000 行記錄，我們可以點擊`Download`下載完整的記錄檔來檢查。
