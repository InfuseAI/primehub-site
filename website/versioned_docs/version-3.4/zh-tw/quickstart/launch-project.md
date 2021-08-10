---
id: version-3.4-launch-project
title: Start Notebook
description: 啟始 Notebook
sidebar_label: Start Notebook
original_id: launch-project
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

這份文件說明如何啟始/關閉一個 Notebook。

## 縱觀

![](assets/spawner_v33.png)

+ `Instance Types`: 此群組可選擇的 instance type
+ `Images`: 此群組可選擇的 images
+ `User Limits`: 此使用者可利用運算資源的限制
+ `Group Resources`: 此群組運算資源的可用狀態，包括目前使用量及群組整體限制量
+ `Dataset`: 此群組可存取的 dataset
+ `Show advanced settings`: 起始 Notebook 的進階設定


### 起始

1. 用使用者帳號登入 `User Portal` 後，並選擇 `Notebooks` 及點擊 `Start My Server 進入 spawner 頁。
2. 請確認目前預先決定的專案群組，是否為設想的群組；切換專案群組請用下拉選單 `Group:`。

    ![](assets/group_context.png)

3. 指定 `Instance Type` 為此專案配置所需的運算資源。

4. 指定專案採用 `Image` 環境。

   只有 Image 的 `Types`符合指定`Instance Type`才能被選擇，如此確保起始環境符合需求。

   #### Group/System Image

    當在選擇映像檔的場合時，`i` 提示該映像檔從屬於 `Group` 或 `System`。

    ![](assets/group-image-hint.png)

5. 點擊`Start Notebook` 進行環境初始化；完成後，瀏灠器會以新頁面自動開啟 Notebook。

>第一次操作的使用者，瀏灠器預設地阻擋此新分頁，請設定瀏灠器一律允許由 PrimeHub 開啟的新分頁，再來按下 `My Server` 開啟 Notebook 新分頁。

![](assets/v34-jupyter-popup-block.png)

## 啟動

從 Notebook 頁籤可以看到啟始進度。

![](assets/spawner_cancel_v33.png)

啟動過程可以按 `Cancel` 取消 。

## Notebook Logs

Logs 自 Jupyter pod 接收來的，從 Notebook 一關始啟動到結束關閉。因此，在 Notebook 運作的情況下 `Logs` 都可以閱覽並可以下載成檔案。一旦 Notebook 正常結束/被強制結束， Logs 就隨 pod 消失。所以，若是無預警結束的情況，我們就只能查看當下 UI 畫面暫存的最後資訊。

![](assets/spawner_log.png)

>當 Notebook 正在啟動或是運行時，Logs 才有資訊顯示；如果沒有正在啟動的 Notebook，畫面顯示預設訊息 `Error: cannot get log due to pods "jupyter-xxxx" not found`。

## 關閉

點擊 `Stop My Server`，稍待後會關閉。

## 提醒

>如果在 Notebook 啟動後切換工作專群組，頁面會顯示 Notebook 原先是啟動於其它專案群組。

![](assets/v3-jupyter-other-group.png)

## 參考

[Notebook 可存取的資料儲存空間](nb-data-store-cht)