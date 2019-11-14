---
id: version-2.1.0-admin-secret-cht
title: Secret Management
original_id: admin-secret-cht
---

Secret management 提供管理者 Secret 管理能力，如：新增、刪除、編輯。

## Creating New Secrets

![](assets/secret_add.png)

點選 `Add` 新增 Secret，會跳出編輯該 Secret 的畫面。

![](assets/secret_empty.png)

需填入下列各個欄位：

+ `Name` 必填，只能填寫小寫字母、數字、點（“.”）、連接號（“-”）和底線（“_”）。

+ `Display Name` 顯示名稱。

+ `Type` `Opaque`, `kubernetes.io/dockerconfigjson`

### Type Opaque

![](assets/secret_opaque_key.png)

+ `Secret`: Opaque 的 secret 用來認證授權透過 git 下載 dataset；內容為已登錄 ssh 公開金鑰對應的私人鑰匙。請見 Dataset Management 如何指定 pull-secret。

### Type dockerconfigjson

![](assets/secret_dockerconfigjson.png)

Secret 用 docker-registry 型別做為藉以從 registry host 下拉 Image 的認證授權。Registry host 及帳號密碼為必填欄位。請見 [Image Management](admin-image-cht) 如何指定 pull-secret。

+ `Registry Host`: Registry host URL。

+ `Username`

+ `Password`

最後點選 `confirm` 完成新增。

## Deleting Secrets

![](assets/secret_delete.png)

點選 `Delete`，會跳出確認對話框，確認是否刪除該 Secret。

## Editing Secrets

![](assets/secret_edit.png)

點選 `edit` 進入該 Secret 的編輯頁面。
