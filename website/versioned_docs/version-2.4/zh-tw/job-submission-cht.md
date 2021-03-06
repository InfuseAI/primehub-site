---
id: version-2.4-job-submission-cht
title: Job Submission (Alpha)
original_id: job-submission-cht
---

## Job

我們有時會需要批次完成特定工作。特別是需要長時間運算的工作，使用者又無法一直監視著整個過程的時候，我們可以利用`Job Submission`創建一個`Job`把工作指令項目批次地加入，再將`Job`送出於背景執行，隨時地監視執行的過程及結果。

### Lifetime

+ `job`最長可以執行 **24** 個小時。一旦超過 24 小時後，會被中止宣告失敗。

+ 結束的`job`記錄基本上會被保留 **7** 天；超過 7 天後，`job`還是會在列舉中，但`Logs`資訊會被刪除。
    ***請注意：由於 Job 容器有可能提早被其執行環境給回收，因此`Logs`有可能在 7 天內被刪除。***

## 列舉 Job

此頁列舉已創建 Jobs 及其對應資訊。

![](assets/jsub_main.png)

列舉中的`Job`對應資訊欄位：

|欄位|描述|
|------|-----------|
|`Status`|狀態， `Pending`, `Preparing`, `Running`, `Failed`, `Succeeded` 及 `Cancelled`|
|`Job name`|名稱|
|`User`|所有者|
|`Group`|所屬群組|
|`Timing`|執行時間|
|`Action`|`Cancel`或`Rerun`|

+ `Create Job`: 點擊按鈕，創建`job`。

+ `Refresh`: 點擊按鈕，刷新`job`列舉。

### 篩選

+ `Select all`: 勾選，列舉所有使用者所屬群組創建的`job`。非所屬群組的，則不在此列。

+ `Filter by Group`: 勾選指定群組，只列舉指定所屬群組創建`job`。

+ `Filter by Submitted`: 勾選`Submitted by Me`只列舉該使用者創建的`job`。

## 創建 Job

![](assets/jsub_create.png)

+ `Group`: 選擇`job`所屬群組。

+ `InstanceTypes`: 選擇`job`所需`instance type`資源佈屬。

+ `Images`: 選擇`job`的執行環境。

+ `Job name`: 指定`job`名稱。

+ `Command`: 指定`job`批次工作項目。

    **Job 可存取工作目錄、專案目錄及資料集目錄**

    |目錄|描述|
    |---------|-----------|
    |`/workingdir`|`job`執行時的暫存工作目錄。***注意:** 如果輸出 data 於此，此 data 將會隨著`job`結束而消失，只能做為暫存之用。*|
    |`/project/<group>`|用此路徑，存取群組專案目錄，可以做為讀取及輸出常態性資料，即使`job`已經結束。***注意：** `group volume`必須要事先存在，請洽系統管理員。*|
    |`/datasets/<dataset>`|用此路徑，存取群組所屬的資料集目錄。***注意：** `dataset volume`必須要事先存在，請洽系統管理員。*|

    **Job 可存取環境變數**:

    |變數名稱|描述|
    |------------|-----------|
    |`$PRIMEHUB_USER`|Job 所有者|
    |`$PRIMEHUB_GROUP`|Job 所屬群組|

    **Python command option**

    + `python -u` 我們可以用 `-u` 強制輸出訊息不經由緩衝，如此可以在`Logs`看到即時訊息。

    **Example 1**: 假設`train_mint.py`事先存在名叫`research`的`group volume`，我們可以進入`/project/research`下，執行該 python file 做為一個`job`。`job`執行期間輸出的 data 則會存在此路徑的相對位置。

    ```bash
    cd /project/research/
    python -u train_minst.py
    ```

    **Example 2**: 如果我們直接執行下列指令，沒有變更路徑，`job`的工作目錄位在`/workingdir`，`job`執行期間輸出的 data 則會存在此路徑的相對位置。但此為暫存目錄，換而言之， 輸出在`/workingdir`的 data 資料會隨著`job`結束而消失。

    ```bash
    python -u /project/research/train_minst.py
    ```

`Submit`: 點擊按鈕，送出工作執行。

## 查看 Job

在列舉上點擊想要查看的`job`名稱，查看內容資訊及執行記錄。

### Information

![](assets/jsub_info.png)

`Job`記載內容資訊如下：

|Field|Description|
|-----|-----------|
|`Status`|狀態，`Pending`,`Preparing`, `Running`, `Failed`, `Succeeded` 及 `Cancelled`|
|`Message`|執行回傳訊息|
|`Job ID`|ID|
|`Job name`|名稱|
|`User`|所有者|
|`Start Time`|開始時間|
|`Finished Time`|結束時間|
|`Duration`|執行時間|
|`Group`|所屬群組|
|`Instance type`|所佈屬 `instance type`資源|
|`Image`|所屬執行環境|
|`Command`|批次工作項目內容|

### 工作記錄

![](assets/jsub_log.png)

記錄批次工作執行從開始到結束，可以由此查看執行過程。一旦執行失敗，可以由此除錯。
