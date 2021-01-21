---
id: version-3.3-group-image-cht
title: Images
description: Images
sidebar_label: Images
original_id: group-image-cht
---

**Images** 提供 Group Admin 針對其管理的群組，管理群組限定的映像檔資源的功能。

>Images 為 [Group Admin](guide_manual/admin-group-cht#members) 層級才能存取的功能；請洽管理者。


![](assets/group-image-list.png)

+ `Search Image`: 關鍵字搜尋。

## Adding New Image

點擊 `New Image` 加入映像檔

![](assets/group-image-new.png)

#### 欄位

+ `Display name`: 必填，只能填寫小寫字母、數字、點（“.”）、連接號（“-”）。

+ `Image name`: 依據 Display name 自動產生。

+ `Description`: 描述。

+ `Type`: `cpu`, `gpu` and `universal`: 指定該 Image 的 Type。

+ `Container image url`: 填入該 Image Url 的位置。[參考](#reference)

+ `Image Pull Secret` 勾選是否需要指定 pull-secret ，並從選單指定該 secret。

   ![](assets/images_pull_secret_v26.png)

+ `Specific container image url for GPU`: 當 Type 為 `universal` 時，可以勾選為 `GPU` 指定不同的 image。未勾選時，預設為跟 `Container image url` 一樣。

Click `Create` to complete the addition.

### Group Image

當在選擇映像檔的場合時，`i` 提示該映像檔從屬於 `Group` 或 `System`。

![](assets/group-image-hint.png)

## Deleting Image

![](assets/actions.png)

點擊「筆」圖示來編輯。

## Editing Image

![](assets/actions.png)

點擊「垃圾桶」圖示來刪除。


## Reference

+ [Available images provided by InfuseAI](guide_manual/images-list)