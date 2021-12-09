---
id: version-3.10-job-submission-cht
title: Job Submission
sidebar_label: Overview
description: Job Submission
original_id: job-submission-cht
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

## Job

我們有時會需要批次完成特定工作。特別是需要長時間運算的工作，使用者又無法一直監視著整個過程的時候，我們可以利用`Job Submission`創建一個`Job`把工作指令項目批次地加入，再將`Job`送出於背景執行，隨時地監視執行的過程及結果。如果我們想要的是週期性自動發動的`job`，我們可以利用 [**Job Scheduler**](job-scheduling-feature-cht) 來創建這類型 job 及設定其週期性。

### Lifetime

+ `job`最長可以執行 **24** 個小時。一旦超過 24 小時後，會被中止宣告失敗。

+ 結束`job`的工作日誌基本上會被保留 **7** 天；超過 7 天後，`job`還是會在列表中，但`Logs`資訊會被刪除；另外，結束`job`預設只會保留 **30** 天，30 天後會從列表及系統中移除。
  >***由於 Job 容器有可能提早被其執行環境給回收，因此`Logs`有可能在 7 天內被刪除。***

+ 系統預設只保留最後 **4000** 筆 Job 記錄；總數超過 4000 時，系統會從最舊的記錄開始刪除。

## Job 列表

此頁列出已創建 Jobs 及其對應資訊。

![](assets/jsub_main_beta_v31.png)

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

+ `New Job`: 點擊按鈕，創建`job`。

+ `Refresh`: 點擊按鈕，刷新`job`列表。

+ `Job name` link: 點擊名稱連結，進入 Job 詳細頁。

+ `Schedule` link: 點擊名稱連結，進入 Job Scheduler 詳細頁。

+ `Submitted by Me`勾選，只列出該使用者創建的`job`。

+ `Search job name` 關鍵字搜尋。

## 創建 Job

請確認目前預先決定的專案群組，是否為設想的群組；切換專案群組請用下拉選單 `Group:`。

![](assets/jsub_create_v33.png)

+ `InstanceTypes`: 選擇`job`所需`instance type`資源佈屬。

+ `Images`: 選擇`job`的執行環境。

+ `Job name`: 指定`job`名稱。

+ `Command`: 指定`job`批次工作項目。


### Command

使用者可以在任務內執行 `sudo apt <command>` 安裝軟體套件。

例如：

```
sudo apt update
sudo apt install <package> --assume-yes
```

### Job 可存取工作目錄、專案目錄及資料集目錄

 >注意：Job 的預設路徑是在 `/home/jovyan`，但這是在 Job Pod 裡的環境，不是 JupyterHub Pod 裡！
 所以 JupyterHub `/home/jovyan`下的其它檔案並 **不存在** 此時的 Job Pod 的`/home/jovyan`。Job 這裡只會有掛載的`<group volume>`及`<data volume>`。

 |目錄|描述|
 |---------|-----------|
 |`/home/jovyan`|`job`執行時的暫存工作目錄。***注意:** 如果輸出 data 於此，此 data 將會著`job`結束而消失，只能做為暫存之用。 不再是~~`/workingdir`~~*！|
 |`/home/jovyan/<group> -> /project/<group>/`|用此路徑(或 Symbolic link)，存取群組目錄，可以做為讀取及輸出常態性資料，即使`job`已經結束。***注意：** `group volume`必須要事存在，請洽系統管理員。*|
 |`/home/jovyan/datasets/<data volume> -> /datasets/<data volume>`|用此路徑(或 Symbolic link)，存取群組資料集。***注意：** `data volume`必須要事先存在，請洽系統管理員。*|

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

> 有時我們會發現重覆安裝常用的套件在每次的執行環境，此時我們可以請 Group admin/Admin 客製映像檔包函這些常用套件，或是我們可以自行有程度地客製執行環境來減少重覆安裝常用套件的情況。 參照 [Reference](#reference).

## 查看 Job

在列表上點擊想要查看的`job`名稱，查看內容資訊及執行記錄；可以`Rerun`或`Clone`此 Job。

### Panel

It shows the brief information of the job.

![](assets/jsub_panel.png)

|Field|Description|
|-----|-----------|
|`Status`|狀態，`Pending`,`Preparing`, `Running`, `Failed`, `Succeeded` 及 `Cancelled`|
|`Duration`|執行時間|
|`Finished`|多久前結束|
|`Schedule`|如果此 Job 是被 scheduler 根據排程時間發動的話，這裡會顯示 Scheduler 名稠；反之顯示`-`；點擊名稱連結，進入 Job Scheduler 詳細頁。|
|`User`|所有者|

---

### Tabs

![](assets/jsub_view_tabs_v32.png)

### Information


`Job`記載內容資訊如下：

|Field|Description|
|-----|-----------|
|`Message`|執行回傳訊息|
|`Job ID`|ID|
|`Job name`|名稱|
|`Creation Time`|創建時間|
|`Start Time`|開始時間|
|`Finished Time`|結束時間|
|`Group`|所屬群組|
|`Instance type`|所佈屬 `instance type`資源|
|`Image`|所屬執行環境|
|`Command`|批次工作項目內容|

### Artifacts

如果工作在執竹的過程中有產出資料 (Artifacts) 存放在 `artifacts/`，這裡會列舉出在此 [PHFS 儲存空間](../design/phfs) 下的所有檔案；同時，在 Notebook 裡這些 artifacts 是位在此路徑  `/phfs/jobArtifacts/job-xxxxx`。請參照 [Job Artifacts 初階範例](job-artifacts-simple-cht)。

### Monitoring

>此功能需要 [PHFS](../design/phfs) 開啟；當 PHFS 功能未開啟時，顯示訊息 "feature not enabled, please contact admin".

監測表顯示此 Job 所用到的資源。

+ `15 mins`, `1 hour`, `3 hours`, `Lifetime`: 15mins 顯示最近 15 分內的數據， Lifetime 顯示從開始到結束的數據。請見各區間[取樣刷新頻率設計](../design/job-monitoring#data-format)。

  >選擇「最近時間區間內」顯示的平均數據；

+ `Overall Usage`: CPU 及 Memory(MB).
+ `GPU Device Usage`: 當此 Job 有配置到 GPU 時才顯示 GPU 及 Memory(MB)。

![](assets/jsub-monitoring-15m.png)

### Logs

>預設此頁只顯示**最新的 2000 行**資訊；按下`Download`下載完整記錄。


當工作執行「成功」或「失敗」，我們可以由此查看整個執行過程、結果、甚至除錯。

當工作是被「取消」或「中止」，無法由此查到任何記錄！因為此時的 Pod 已被刪除回收。

有時，我們只想看最後的輸出結果，可以點擊`Scroll to Bottom`跳過攏長記錄直接到記錄尾端。

另外，由於介面上只顯示最後的 2000 行記錄，我們可以點擊`Download`下載完整的記錄檔來檢查。


## Reference

+ [Customize Runtime Environment](../tasks/customize-job-runtime)