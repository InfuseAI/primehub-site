---
id: version-2.2.0-create-group
title: 建立群組
original_id: create-group
---

這份文件說明如何建立群組。

群組是以專案為中心的群組，群組成員可以利用共用`Shared Volume`在群組內分享檔案。

另外，使用者可以加入多個專案群組。

1. 以管理者帳號登入`User Portal` 後，點擊`Admin Dashboard`進入管理介面。

2. 在側邊選單上，點擊 `Groups`進入群組管理介面後，點擊`+ Add`按鈕，建立群組。

3. 輸入必要資訊， 如 `Name`.

4. 如果需要群組內共享檔案空間，開啟`Shared Volume`。

   1. 指定`volume capacity` 容量大小。
   2. 如果此共享空間僅限於該群組內存取，開啟`Launch Group Only`;關閉，表示其它群組也可存取該共享空間。

   ![qs-create-group.png](assets/qs-create-group.png)

5. 如果需要限定單一群組使用者可使用的運算資源，請調整`User Quota`。

6. 如果需要限定整體群組可使用的運算資，請調整 `Group Quota`。

7. 點擊`connect existing users` 加入使用者至群組。
    ![qs-create-group2.png](assets/qs-create-group2.png)

8. 點擊 Confirm.
