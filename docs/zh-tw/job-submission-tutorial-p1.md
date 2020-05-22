---
id: job-submission-tutorial-p1
title: (Part1) MNIST classifier 訓練範例程式
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Available in Enterprise tier only</span>
</div>

透過`Job submission`功能，我們可以把需要長時間工作的 ML training 交付到背景執行，同時我們可以進行其它分析工作；讓專案進行更有效率。

在接下來的基本教學，我們以 MNIST 為例，示範如何運用`job submission`以及介紹此功能如何跟 PrimeHub 其它功能聯結互動。

## 先決條件

### Group Volume

為了能充分使用 job submission 功能，我們必須要在所屬群組內開啟`group volume`。

`Job`執行時，很有可能需要讀取資料及保存輸出結果，但是`job`無法存取「使用者家目錄」以及`job`自身的工作目錄為暫存(`job`結束即消失)，所以最簡單的方法就是利用`group volume`來保存輸出結果；我們更可以將`job`本身要執行的程式存放於此。

請先確保已有`group volume`，才能進行接下來的教學；如果沒有開啟，請洽管理者協助開啟。

![jobsub-tt-p1-1.png](assets/jobsub-tt-p1-1.png)

### Image and Instance Type

此教學使用 Tensorflow 1.14 來訓練 MNIST 手寫數位辨別，以及需要至少 1 virtual cpu 和 2GB RAM 的運算資源。

請準備好所需的`image`及`instance type`；如果沒有此環境，請洽管理者協助設定。

### Group Quota and User Quota

此教學整體所需運算資源至少為 2 virtual cpu 和 4GB RAM；請確保有足夠的`group quota`及`user quota`以利進行教學；如果沒有此環境，請洽管理者協助設定。
