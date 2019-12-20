---
id: admin-group-cht
title: Group Management
---

## Creating New Group

![](assets/group_12.png)

點選 `Add` 新增 Group，會跳出該 Group 的編輯畫面。

![](assets/group_shared_volume.png)

需填入以上畫面中的各個欄位：

+ `Name`必填，只能填寫小寫字母、數字、點（“.”）、連接號（“-”）和底線（“_”）。

+ `Display name`

`Shared Volume`開啟時

+ `Shared Volume Capacity` 設定共享空間配額，預設為 `1GB` 。

+ `Launch Group Only` 當開啟此選項時，只有當使用者在 PrimeHub 頁面選擇同一 Group 進行專案時，Shared Volume 才會被掛載。

![](assets/group_user_quota.png)

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

## Deleting Group

![](assets/group_14.png)

點選`Delete`，會跳出確認對話框， 點選 `OK` 後即可刪除該 Group 。

## Editing Group

![](assets/group_13.png)

點選 `Edit` 進該 Group 的編輯頁面。

## Connecting Existed Users

![](assets/group_8.png)

在編輯 Group 的畫面下方點選 `connect existed Users`，即可從現有的 Users 列表中點選該 Group 的 user，將它們連結在一起。
