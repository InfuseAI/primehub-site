---
id: admin-image-cht
title: Image Management
description: Image Management
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>
Image management 提供管理者 Image 的管理能力，如：新增、刪除、編輯及群組權限。

## Creating New Image

![](assets/image_3_v26.png)

點選 `Add` 新增 Image，會跳出該 Image 的編輯畫面。

![](assets/admin_img_v26.png)

需填入以上畫面中的各個欄位：

+ `Name` 必填，只能填寫小寫字母、數字、點（“.”）、連接號（“-”）。

+ `Display name`

+ `Description`

+ `Container image url` 填入該 Image 的 連結位置。

+ `Use Image Pull Secret` 勾選是否需要指定 pull-secret ，並從選單指定該 secret。

   ![](assets/images_pull_secret_v26.png)

+ `Global` 開啟後，所有人皆可使用此 Image；若關閉，則需在 `edit groups` 連結有權限使用的 Group 。

最後點選 `confirm` 完成新增。

![](assets/image_type.png)

需要為 image 指定 Type 屬性。如此，使用者試著起始 hub 時，會先指定 `Instance Type`，只有符合該 Instance Type 需求 (`CPU`, `GPU`) 的 image 才能被選擇。

+ `Type`: 指定該 Image 的 Type。

  + `cpu`: 此 image 環境僅支援 CPU 運算。
  + `gpu`: 此 image 環境支援 CPU 運算。
  + `universal`: 此組 image 設定分別包括 CPU image 環境及 GPU image 環境； PrimeHub 當下會依據選擇的 Instance Type 來載入對應的環境。

+ `Container image url` 填入該 Image 的連結位置。

+ `Specific container image url for GPU` 當 Type 為 `universal` 時，可以勾選為 `GPU` 指定不同的 image。未勾選時，預設為跟 `Container image url` 一樣。

## Deleting Image

![](assets/actions.png)

點選 `Delete`，會跳出確認對話框，確認是否刪除該 Image 。

## Editing Image

![](assets/actions.png)

點選 `edit` 進入該 Image 的編輯頁面。

## Editing Groups

![](assets/edit_groups.png)

若未開啟 `Global` 開放給所有使用者使用該 Image，在編輯 Image 的畫面下方點選`edit groups`，即可從現有的 Groups 列表中選取有權限使用該 Image 的 Group，將它們連結在一起。

![](assets/image_8_v26.png)

## 參考

+ [Add InfuseAI Images](../quickstart/add-infuseai-image)
