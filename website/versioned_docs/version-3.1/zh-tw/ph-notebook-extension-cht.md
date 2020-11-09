---
id: version-3.1-ph-notebook-extension-cht
title: PrimeHub Notebook Extension
sidebar_label: PrimeHub Extension
original_id: ph-notebook-extension-cht
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

**PrimeHub Extension** 是針對 PrimeHub 在 *Jupyter Notebook* 開發的外掛。我們會持續開發外掛的功能來強化使用者藉由 Notebook 在 ML 流程的流暢度及體驗度。

>InfuseAI 提供最新的映像檔已內建 **PrimeHub Extension** 及對應需要的執行環境。為了能順利使用此外掛功能，請確保選擇的映像檔是 InfuseAI 提供最新的映像檔 或是建立在其上的映像檔。參照[列表](guide_manual/images-list)。

開啟 notebook (*.ipynb) 檔，**PrimeHub** 外掛位於在功能列上；在此簡介外掛上的功能。

![](assets/ph-extension-menu.png)

## Submit Notebook as a Job

>使用者的工作群組須開啟 Group Volume。

使用者可以將 Notebook 檔當作任務遞出至 PrimeHub Job 執行。執行結果會存為另一個 Notebook 檔，以供檢閱。參照[初階範例](notebook-as-job-cht)。

## API Token

為了能使用外掛功能，須先填入使用者 API Token。參照 [How to generate a API Token](../tasks/api-token).

![](assets/ph-extension-token.png)