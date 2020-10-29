---
id: version-3.1-job-artifacts-simple-cht
title: Job Artifacts 初階範例
original_id: job-artifacts-simple-cht
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

這個範例介紹任務執行過程中產出的資料 (Artifacts)，將其存放在同群組共享的 `/phfs` [（PHFS 空間）](../design/phfs) 下的 `artifacts/`，並可從 Notebook 來存取在此空間 `/phfs/jobArtifacts` 的產出資料，由此繼續下一步研究工作。。

## Steps

1. 從 User Portal 進入 Jobs。
2. 確認目前所在的工作群組。
3. 新增 Job。
4. 將 *artifacts-simple* 填入 `Job name`。
5. 將下列指令填入 `Command`; 新增`artifacts/`資料夾，須指定將產出資料存放在 `artifacts/`路徑；或是建立 Symbolic link 將任意資料夾指向 `artifacts/`。

    ```bash
    mkdir -p artifacts/simple
    date > artifacts/date.txt
    date > artifacts/simple/date.txt
    ```

6. 採用預設 timeout 值並遞送 Job。

一旦任務成功，我們可以查看此任務及從 Artifacts 頁籤查看產出資料。

![](assets/jart_simple_file.png)

記下 *Job ID*。

![](assets/jart_simple_job.png)

## From Notebook

從 Notebook 我們也可以存取此任務產出的 artifacts，其位於  `phfs/jobArtifacts/<JOB_ID>/` ，由此繼續下一步研究工作。

同群組其它成員遞出任務的產出 artifacts 也能存取，找到我們先前的 JOB ID。

![](assets/jart_simple_nb_1.png)

任務產出的目錄結構及檔案就位於此。

![](assets/jart_simple_nb_2.png)