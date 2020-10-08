---
id: version-3.0-launch-project
title: 啟始 Notebook
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

## 起始

![](assets/spawner_v3.png)

1. 用使用者帳號登入 `User Portal` 後，並選擇 `Notebooks` 及點擊 `Start My Server 進入 spawner 頁。
2. 請確認目前預先決定的專案群組，是否為設想的群組；切換專案群組請用下拉選單 `Group:`。

3. 指定 `Instance Type` 為此專案配置所需的運算資源。

4. 指定專案採用 `Image` 環境。

   只有 Image 的 `Types`符合指定`Instance Type`才能被選擇，如此確保起始環境符合需求。 

5. 點擊`Start Notebook` 進行環境初始化；完成後，瀏灠器會以新頁面自動開啟 Notebook。

>第一次操作的使用者，瀏灠器預設地阻擋此新分頁，請設定瀏灠器一律允許由 PrimeHub 開啟的新分頁，再來按下 `My Server` 開啟 Notebook 新分頁。

![](assets/v3-jupyter-popup-block.png)

## 關閉

點擊 `Stop My Server`，稍待後會關閉。

## 提醒

>如果在 Notebook 啟動後切換工作專群組，頁面會顯示 Notebook 原先是啟動於其它專案群組。

![](assets/v3-jupyter-other-group.png)
