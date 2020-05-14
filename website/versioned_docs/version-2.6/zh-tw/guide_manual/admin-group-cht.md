---
id: version-2.6-admin-group-cht
title: Group Management
original_id: admin-group-cht
---

## Creating New Group

![](assets/group_12_v26.png)

點選 `Add` 新增 Group，會跳出該 Group 的編輯畫面。

![](assets/group_shared_volume_v26.png)

需填入以上畫面中的各個欄位：

+ `Name`必填，只能填寫小寫字母、數字、連接號（“-”）和底線（“_”）。

+ `Display name`

`Model Deployment`(*Alpha*) 此功能為 alpha 階段，需要將 [feature flag](../references/feature-flag) 設為`True`，才能體驗；開啟後， Groups 可以使用[佈署模型](../model-deployment-feature)功能來提供服務。

`Shared Volume`開啟時

+ `Shared Volume Capacity` 設定共享空間配額，預設為 `1GB` 。

+ `Launch Group Only` 當開啟此選項時，只有當使用者在 PrimeHub 頁面選擇同一 Group 進行專案時，Shared Volume 才會被掛載。

**User Quota** 設定 Group 中每個用戶的配額

+ `CPU Quota` 當使用者選擇此 Group 時，能夠使用的 CPU 數量。預設值為 `0.5`。

+ `GPU Quota` 當使用者選擇此 Group 時，能夠使用的 GPU 數量。當此數值為 0 時，表示使用者無法使用 GPU。預設值為 `0`。

+ `Memory Quota` 當使用者選擇此 Group 時，能夠使用的記憶體配額。預設值為沒有限制。

+ `Disk Quota` 當使用者選擇此 Group 時，能夠使用的磁碟配額。預設值為 `20GB`。

**Group Quota** 設定 Group 的總配額

+ `CPU Quota` 當使用者選擇此 Group 時，使用者可以共享多少 CPU。預設值為沒有限制。

+ `GPU Quota` 當使用者選擇此 Group 時，使用者可以共享多少 GPU。預設值為沒有限制。

+ `Memory Quota` 當使用者選擇此 Group 時，使用者可以共享多少 GPU。預設值為沒有限制。

點選 `confirm` 完成新增。

**Datasets**

![](assets/admin_group_ds_v25.png)

這裡會列出所有此群組可以讀取或寫入的 Datasets；我們甚至可以由此進入 Dataset 編輯。

**Editing Users**

![](assets/edit_users.png)

在編輯 Group 的畫面下方點選 `edit users`，即可從現有的 Users 列表中點選該 Group 的 user，將它們連結在一起。

## Deleting Group

點選 Actions 的`Delete`，會跳出確認對話框， 點選 `OK` 後即可刪除該 Group 。

## Editing Group

點選 Actions 的`Edit` 進該 Group 的編輯頁面。
