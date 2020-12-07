---
id: admin-group-cht
title: Group Management
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

## Groups List

![](assets/group_12_v27.png)

## Creating New Group

點選 `Add` 新增 Group，會跳出該 Group 的編輯畫面。

![](assets/group_add_v31.png)

需填入以上畫面中的各個欄位：

+ `Name`必填，只能填寫小寫字母、數字、連接號（“-”）和底線（“_”）。

+ `Display name`

### Model Deployment

`Model Deployment` 此功能為 Beta 階段，需要將 [feature flag](../references/feature-flag) 設為`True`，才能體驗；開啟後， Groups 可以使用[佈署模型](../model-deployment-feature)功能來提供服務。

### Shared Volume

`Shared Volume`開啟時

+ `Shared Volume Capacity` 設定共享空間配額，預設為 `1GB` 。

+ `Launch Group Only` 當開啟此選項時，只有當使用者在 PrimeHub 頁面選擇同一 Group 進行專案時，Shared Volume 才會被掛載。

### Job Default Timeout Setting

+ `Default Timeout Setting` 設定 Minutes / Hours / Days.

Job 預設逾時期限，此設定套用至同群組遞出的所有 Job；系統預設值為 7 天。若期限內該 Job 尚未完成，該 Job 會被強制中斷。另外，此設定可被每次遞出 Job 時覆寫。

### User Quota

設定 Group 中每個用戶的配額

+ `CPU Quota` 當使用者選擇此 Group 時，能夠使用的 CPU 數量。預設值為 `0.5`。

+ `GPU Quota` 當使用者選擇此 Group 時，能夠使用的 GPU 數量。當此數值為 0 時，表示使用者無法使用 GPU。預設值為 `0`。

+ `Memory Quota` 當使用者選擇此 Group 時，能夠使用的記憶體配額。預設值為沒有限制。

### Group Quota

設定 Group 的總配額

+ `CPU Quota` 群組 CPU 總配額。預設值為沒有限制。

+ `GPU Quota` 群組 GPU 總配額。預設值為沒有限制。

+ `Memory Quota` 群組 Memory 總配額。預設值為沒有限制。

點選 `confirm` 完成新增。

### Users

![](assets/edit_users.png)

列出此群組所有使用者，並可透過`edit users`編輯，加入/移除使用者。

---

### Datasets

![](assets/admin_group_ds_v25.png)

列出所有此群組可以讀取或寫入的 Datasets；我們甚至可以由此進入 Dataset 編輯。

### Images

![](assets/admin_group_img_v27.png)

列出所有此群組可以使用的 Image。

### Instance Types

![](assets/admin_group_it_v31.png)

列出所以此群組可以使用的 Instance Types。

## Deleting Group

點選 Actions 的`Delete`，會跳出確認對話框， 點選 `OK` 後即可刪除該 Group 。

## Editing Group

點選 Actions 的`Edit` 進該 Group 的編輯頁面。
