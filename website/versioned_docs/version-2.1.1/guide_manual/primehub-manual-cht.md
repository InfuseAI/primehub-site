---
id: version-2.1.1-primehub-manual-cht
title: PrimeHub Console 手冊
original_id: primehub-manual-cht
---

## 登入與登出 

![](assets/login_1.png)

在登入畫面選擇您使用的`語言` 。 輸入您的帳號及密碼後，點選`Log in`。

![](assets/user_portal.png)

登入後若要登出，點擊右上方`Logout`即可登出，並回到登入畫面。

---

## 使用者主頁

![](assets/landing_page.png)

登入後會顯示首頁，首頁上有捷徑引導至各個功能頁：

*一般使用者*：

+ **JupyterHub**
   頁面會引導至`JupyterHub`頁，使用者在此可以啟始專案。

+ **Support**
   頁面會引導至`Zendesk Support`頁，使用者在此可以閱讀支援文件及發問。

*管理者*：

+ **JupyterHub Admin**
   頁面會引導至`hub`管理者頁，管理者在此可以一覽管理使用者 hub 。
+ **Admin Dashboard**
頁面會引導至`PrimeHub Admin`管理者頁，管理者在此可以管理 PrimeHub 系統。
[Reference: Admin Manual](admin-manual-cht.md)

+ **Maintenance Notebook**
   頁面會引導至`Maintenance Notebook`頁，管理者在此可以執行內建常用的作業指令。

---

## 開始進行你的專案 

![](assets/spawner.png)

### 步驟

1. `Group`選擇你要進行的專案所屬的`Group`。

2. 接著會看到該`Group`可以使用的`Instance Type`，選擇你要使用的`Instance Type`。

3. 選擇要使用的`Image`。

   依據所選擇的`Instance Type`，只有`Type`符合的 Image 才能被選擇。藉此可以保證起始 hub 用的 Image 是符合需求的。關於 image type 請參考 Image Management。

4. 最後點選`Spawn`，即會開啟你可使用的 Sever 環境。

   ![](assets/spawn_1.png)

   進入到 Jupyter Hub，即可開始進行你的工作。

   ![](assets/Hub_JL.png)

---

## 關閉／結束正在進行的專案

`Control Panel`位在 menu 列`File`下.

![](assets/Hub_control_panel.png)

在 Jupyter Hub 上方點選`File`再點選 `Hub Control Panel` 。

![](assets/navbar_stop_server.png)

---

## 參考

[Jupyter documentation](https://jupyterlab.readthedocs.io/en/stable/)
