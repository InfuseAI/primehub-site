---
id: md-secret-cht
title: Secret Management
description: Secret Management
---
<div class="label-sect">
  <div class="deploy-only tooltip">Deploy
    <span class="tooltiptext">Applicable to Deploy Edition</span>
  </div>
</div>
<br>

Secret management 提供管理者 Secret 管理能力，如：新增、刪除、編輯。前提我們需要先有從其它服務產生取得的 Secrets；請參照[取得參考](#取得參考)。

## 新增 Secrets

![](assets/secret_add_v310.png)

點選 `Add` 新增 Secret，會跳出編輯該 Secret 的畫面。

![](assets/secret_empty_v310.png)

需填入下列各個欄位：

+ `Name` 必填，只能填寫小寫字母、數字、點（“.”）、連接號（“-”）。

+ `Display Name` 顯示名稱。

+ `Type` `Git Volume`, `Image Pull`

### Type Git Volume

![](assets/secret_git_volume.png)

+ `Secret`: Git Volume 的 secret 用來認證授權透過 git 下載 data volume；內容為已登錄 ssh 公開金鑰對應的私人鑰匙。請見 Volume Management。

### Type Image Pull

![](assets/secret_dockerconfigjson_v26.png)

Secret 用 docker-registry 型別做為藉以從 registry host 下拉 Image 的認證授權。Registry host 及帳號密碼為必填欄位。請見 [Image Management](admin-image-cht)。

+ `Registry Host`: Registry host URL。

+ `Username`

+ `Password`

最後點選 `confirm` 完成新增。

## 刪除 Secrets

![](assets/actions.png)

點選 `Delete`，會跳出確認對話框，確認是否刪除該 Secret。

## 編輯 Secrets

![](assets/actions.png)

點選 `edit` 進入該 Secret 的編輯頁面。

## 取得參考

+ [GitLab 用 pull secret](../quickstart/secret-pull-image)

+ [GitHub 用 gitsync secret](../quickstart/secret-gitsync)
  
+ [其它 secrets](../quickstart/secret-pull-image#其它)
