---
id: version-2.2.2-maintenance-resize-user-vol
title: 加大 User Volume
original_id: maintenance-resize-user-vol
---

這份文件介紹如何利用 Maintenance Notebook 來增加 User Volume Size。

>請注意： 目前 **User Volume 只能增加容量**，不能減少；一旦加大，無法還原。
>**PrimeHub v2.0**以上才有**`Resize User Volume`**功能

### 步驟

1. 登入 `User Portal` 後，進入 `Maintenance Notebook`。

2. 至`Resize User Volume`段落，執行第一個`cell`後，會顯示`User vol:`下拉選單。

    ![img](assets/dropdown_user_list.png)

3. 從`User vol:`選單，選擇要變更的使用者。

4. 執行第二個`cell`，顯示`Current Size`及`New Size:`輸入欄位。

    ![img](assets/enlarge_user_vol.png)

5. 輸入期望的`size`後 (**必須大於 current size**)，按下`Update`更新。

6. 一旦更新完成後，可以再次執行第二個`cell`做為驗證。

**Tips: 可用快捷鍵 `Ctrl + Enter` 執行已選擇的 `cell`。**