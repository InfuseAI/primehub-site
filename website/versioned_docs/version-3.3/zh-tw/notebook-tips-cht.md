---
id: version-3.3-notebook-tips-cht
title: Notebook 小訣竅
description: Notebook 小訣竅
sidebar_label: 小訣竅
original_id: notebook-tips-cht
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

## Install Custom Software

>PrimeHub v3.2+

使用者可以在開啟的 Jupyter 環境內的 Notebook 執行 `!sudo apt <command> --assume-yes` 或是 Terminal 執行 `sudo apt <command>` 臨時來安裝想要的軟體套件。

## Notebook Logs

>PrimeHub v3.3+

Notebooks 有時因為網路環境或是使用者 Jupyter 環境的問題而無法順利啟動。現在使用者在啟動 Notebook 時可以由 [Notebook Logs](quickstart/launch-project#notebook-logs) 查看啟動過程記錄來排查問題。


## Safe Mode

>PrimeHub v2.4+

Notebook 在一般模式下無法啟動時，可以試[安全模式](user-advanced-setting#safe-mode)來啟動「偵錯」。若安全模式可以順利啟動 Notebook，問題多半是使用者 Jupyter 環境 `/home/jovyan`空間已滿，或是使用者自行安裝的套件在啟動時出錯，導致 Jupyter 無法起始；使用者可以試著在安全模式下，清除空間或是清除自行安裝套件來排查問題。
