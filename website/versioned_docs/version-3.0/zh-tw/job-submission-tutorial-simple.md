---
id: version-3.0-job-submission-tutorial-simple
title: 初階範例
original_id: job-submission-tutorial-simple
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

透過`Job submission`功能，我們可以把需要長時間工作的 ML training 交付到背景執行，同時我們可以進行其它分析工作；讓專案進行更有效率。

在接下來的基本教學，我們以簡單的 python 程式為例，示範如何運用`job submission`以及介紹此功能如何跟 PrimeHub 其它功能聯結互動。

## 先決條件

### Group Volume

為了能充分使用 job submission 功能，我們必須要在所屬群組內開啟`group volume`。

`Job`執行時，很有可能需要讀取資料及保存輸出結果，但是`job`無法存取「使用者家目錄」以及`job`自身的工作目錄為暫存(`job`結束即消失)，所以最簡單的方法就是利用`group volume`來保存輸出結果；我們更可以將`job`本身要執行的程式存放於此。

請先確保已有`group volume`，才能進行接下來的教學；如果沒有開啟，請洽管理者協助開啟。

![jobsub-tt-p1-1.png](assets/jobsub-tt-p1-1.png)


### Image and Instance Type

此教學只需少量的運算資源即可(如：CPU: 0.5 / Memory: 1G / GPU: 0) 以及 jupyter/base-notebook image.

請準備好所需的`image`及`instance type`；如果沒有此環境，請洽管理者協助設定。

### Group Quota and User Quota

此教學所屬群組需運算資源為 1 virtual cpu 和 2GB RAM；請確保使用的群組有足夠的`group quota`及`user quota`以利進行教學；如果沒有此環境，請洽管理者協助設定。

## 教學步驟

我們會將下列的程式交付給 Job 來執行；此簡單程式會用到 python 套件`camelcase`，用其函式工具將一句小寫的句子的每個單字，第一個字母大寫化成`This Method Capitalizes The First Letter Of Each Word.`，並每秒印出一句，共印出十次；因此我們需要安裝此套件。

```
import time
import camelcase

camel = camelcase.CamelCase()

txt = "this method capitalizes the first letter of each word."


start = 1
end = 10

print("Counting from 1 to 10:")
for num in range(start, end + 1): 
    time.sleep(1)
    print('{}: {}'.format(num, camel.hump(txt)))
```

1. 登入`PrimeHub`後，點擊`Notebooks`。

2. 選擇`instance type`及`image`啟始 Notebook。

3. 啟動後，從左方檔案工作區雙擊我們的 group volume 資料夾進入。

    ![image](assets/jobsub-tt-p2-2.png)

4. 從右方工作區的`Other`下，點擊`Text File`。

5. 按右鍵選擇`rename`將`untitled.txt`改名為`interval.py`.

6. 輸入要執行的程式碼並儲存。

到此我們已經在 group volume 下，新增一個 python 程式檔；此時就算關閉 Notebook 對接下來的`Job Submission`也不會有影響。

### Submit Job

請確認目前預先決定的專案群組，是否為設想的群組；切換專案群組請用下拉選單 `Group:`。

1. 回到`User Portal`開啟 `Jobs` 並點擊右上方的`Create Job`進入 Job 新增頁。

2. 從左方選擇 `instance type`及`image`；確保跟我們先前用來起始`Notebook`的環境一致。

3. 在右方將 Job 命名為`counting`。
   
4. 因為我們的範例程式存放在 group volume 且 group volume 會被掛載在`/home/jovyan/<group name> -> /project/<group name>`，而且 Job 的預設路徑是在 `/homve/jovyan`；在`Commnad`欄位輸入下方指令一， 請置換 `<group name>` 為實際選擇 group 名稱。[Job 可存取工作目錄、專案目錄及資料集目錄](job-submission-cht#job-可存取工作目錄-專案目錄及資料集目錄)
    
    `<group name>` 大小寫有差別；

    程式中有用到`camelcase`套件，因此 Job 第一行執行安裝此套件。

    >注意：Job 的預設路徑是在 `/homve/jovyan`，但這是在 Job Pod 裡的環境，不是 JupyterHub Pod 裡！
    所以 JupyterHub `/home/jovyan`下的其它檔案並 **不存在** 此時 Job Pod 的`/home/jovyan`。Job 這裡只會有掛載的`<group volume>`及`<dataset>`。

    ```
    pip install camelcase
    cd <group name>/
    python -u interval.py
    ```

#### Command 範例說明：

   - 因為`interval.py`程式碼存在 group volume 相對路徑，所以我們需要先`cd <group name>`。
   - `<group name>` 大小寫有差別；
   - python command 參數`-u` 強制 python 直接輸出 log 不要先 buffer；在 logs 頁籤可以更即時看到 log。
   - Job Submission 會依序執行一行一行的指令，如同執行 script 般。
   - 滑鼠指標移到小圖示`?`上方，可以看到更多提示。

5. 送出 Job 回到 Jobs 列舉頁，點擊`Job name`為我們剛才新增的 Job，並觀察其`Status`欄位及 Log。

### Jobs 列舉及 refresh 按鈕

當 job 遞交後，起初會在`Pending`狀態；點擊右上方`Refresh`按鈕可以更新其狀態。

### Logs 頁籤

點擊`Logs`頁籤可以查看 job 即時執行記錄。此時 job 正在背景執行；我們可以離開此頁面去做其它事，不必開啟頁面等候；事後回來查看狀態及記錄。

我們會在`Logs`看到類似的畫面；訊息中我們可以得知 Job 先安裝`camelcase`套件，然後執行`interval.py`印出十次大寫開頭的句子。
   
   ![image](assets/jobsub-tt-simple-log.png)

到此，我們成功的將存放在 group volume 下的程式碼，交付 Job 來代為執行，並且學得如何從 Job 的 `command`欄與在 group volume 下的檔案互動。

## 更多關於 Job Submission

[Job Submission (Beta) 功能](job-submission-cht)
