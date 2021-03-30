---
id: version-3.3-ph-notebook-extension-cht
title: PrimeHub Notebook Extension
description: PrimeHub Notebook Extension
sidebar_label: PrimeHub Extension
original_id: ph-notebook-extension-cht
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

**PrimeHub Extension** 是針對 PrimeHub 在 *Jupyter Notebook* 開發的外掛。我們會持續開發外掛的功能來強化使用者藉由 Notebook 在 ML 流程的流暢度及體驗度。

>InfuseAI 提供最新的映像檔已內建 **PrimeHub Extension** 及對應需要的執行環境。為了能順利使用此外掛功能，請確保選擇的映像檔是 InfuseAI 提供最新的映像檔 或是建立在其上的映像檔。參照[列表](guide_manual/images-list)。

>想要自建映像檔包含 **PrimeHub Extension**? [請見 repo](https://github.com/InfuseAI/primehub-job/tree/master/jupyterlab_primehub)。

開啟 notebook (*.ipynb) 檔，**PrimeHub** 外掛位於在功能列上；在此簡介外掛上的功能。

![](assets/ph-extension-menu.png)

## API Token

為了能使用外掛功能，須先填入使用者 API Token。參照 [How to generate a API Token](../tasks/api-token)。

![](assets/ph-extension-token.png)

## Submit Notebook as a Job

>使用者的工作群組須開啟 Group Volume。

使用者可以將 Notebook 檔當作任務遞出至 PrimeHub Job 執行。執行結果會存為另一個 Notebook 檔，以供檢閱。參照[初階範例](notebook-as-job-cht)。

>Notebook 遞出的 Job 與 Job Submission 遞出的 Job 預設的工作目錄為不同

* Notebook 遞出的 Job (簡稱 Notebook Job) 一律以 Notebook 檔所在的路徑為工作目錄；然而，Job Submission 遞出的 Job 一律以 `/home/jovyan` 為工作目錄。
* Notebook 檔必須位在對應的 group volume 內

路徑範例:

假設 Group volume 為 `phusers` 及 notebook 為位在子目錄  `experiment-1` 下的 `my-notebook.ipynb` 

```bash
/home/jovyan/phusers/experiment-1/my-notebook.ipynb
```

當 notebook `my-notebook.ipynb` 遞交成 Job 時， 此時 Job 執行的工作目錄為 `/home/jovyan/phusers/experiment-1/`。

### Job Artifacts with a Notebook Job

遞交 Notebook Job 時，使用者可以決定將輸出存放在 group volume 或是 `Job Artifacts`。但記得，由於預設工作目錄的不同，程式裡指到的**相對路徑**可能會造成錯誤！

舉例：

此程式在 Job 裡可以正常執行，但在 Notebook Job 裡卻會造成錯誤！原因是 Job 的工作目錄一律為 `/home/jovyan` 所以相對路徑指到正確的 `/home/jovyan/artifacts`。

```
mkdir -p artifacts/
cp my_model.h5 artifacts/
cp -r logs artifacts/
```

但在 *Notebook Job* 工作目錄一律為 Notebook 檔所在的位置 `/home/jovyan/<group_volume>/path/to/` 所以相對路徑指到**不正確**的 `/home/jovyan/<group_volume>/path/to/artifcats`。

>因此我們建議盡量使用「絕對路徑」來避免錯誤及誤解。

```
mkdir -p /home/jovyan/artifacts/
cp my_model.h5 /home/jovyan/artifacts/
cp -r logs /home/jovyan/artifacts/
```


### Job Artifacts is optional

我們建議盡量使用 *group volume* 存放長駐資料。

`Job Artifacts` 選用的時機點為

* 可以從 Job 直接下載 artifact 無須開啟 Notebook 環境
* 期待 artifact 為暫存資料； artifact 會被自動清除
