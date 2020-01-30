---
id: version-2.3-launch-project
title: 啟始專案
original_id: launch-project
---

這份文件說明如何啟始/關閉一個專案。

## 起始

1. 用使用者帳號登入 `User Portal` 後，並點擊 `JupyterHub` 進入 spawner。

2. 指定 `Instance Type` 為此專案配置所需的運算資源。

3. 指定專案採用 `Image` 環境。

   只有 Image 的 `Types`符合指定`Instance Type`才能被選擇，如此確保起始環境符合需求。 

4. 點擊`Start` 進行環境初始化，完成後，自動導向 Jupyterhub 頁面。

![](assets/spawner_v23.png)

## 關閉

1. 在`JupyterHub`頁面, 在功能列上選擇 `File` > `Control Panel`。 

 ![](assets/Hub_control_panel.png)

2. 點擊 `Stop My Server`.

![](assets/navbar_stop_server.png)

3. 原先啟始的 jupyterhub 分頁，即可手動關閉。
