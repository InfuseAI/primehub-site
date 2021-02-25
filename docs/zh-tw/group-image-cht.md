---
id: group-image-cht
title: Images
description: Images
sidebar_label: Images
---

**Images** 提供 Group Admin 針對其管理的群組來管理群組限定的映像檔資源的功能。

>Images 為 [Group Admin](guide_manual/admin-group-cht#members) 層級才能存取的功能；請洽管理者取得此權限。

群組映像檔列表可依據 **Name**、**Display Name**、**Description**、**Type** 欄位排序。

![](assets/group-image-list.png)

+ `Search Image`: 關鍵字搜尋。

## Add New Image

點擊 `New Image` 加入映像檔

![](assets/group-image-info.png)

+ `Display name`: 必填，只能填寫小寫字母、數字、點（“.”）、連接號（“-”）。

+ `Image name`: 依據 Display name 自動產生。

+ `Description`: 描述。


選擇加入映像檔方式 `Use existing image` 或 `Build custom image`。

## Use Existing Image

為群組加入已存在的映像檔。

![](assets/group-image-existing.png)

+ `Type`: `cpu`, `gpu` and `universal`: 指定該 Image 的 Type。

+ `Container image url`: 填入該 Image Url 的位置。[參考](#reference)

+ `Image Pull Secret` 勾選是否需要指定 pull-secret ，並從選單指定該 secret。

   ![](assets/images_pull_secret_v26.png)

+ `Specific container image url for GPU`: 當 Type 為 `universal` 時，可以勾選為 `GPU` 指定不同的 image。未勾選時，預設為跟 `Container image url` 一樣。

點擊 `Create` 加入。

## Build Custom Image

為群組創建客製映像檔並加入。

![](assets/group-image-custom.png)

+ `Type`: `cpu`, `gpu` and `universal`: 指定該 Image 的 Type。

+ `Base image` 必填，base image 的 url。我們可以輸入任何有效的 Image URL，或是可以從自動列舉清單中選擇，已經透過 Image 管理加入至 PrimeHub 的 Image。

+ `Image PullSecret` 如果 pull secret 為必要，請勾選。

+ `Packages` 於對應的套件管理下輸入要預先安裝的套件名稱。

  + `APT` Debian, Ubuntu 及其它相關的 linux distribution 的套件管理。

  + `Conda` 多樣程式語言套件管理。 [[參考]](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-pkgs.html#installing-packages)

  + `Pip`  Python 套件管理。 [[參考]](https://packaging.python.org/tutorials/installing-packages/#use-pip-for-installing)

   > 如果需安裝複數個套件時，請輸入一行為一套件，換行後輸入下一個套件

最後點選 `Create` 啟始創建工作。

### 指定 Conda 套件符合條件

特別提及： Conda 支援指定套件的來源 `channel`，並可以進一步指定套件符合條件 [[參考]](https://docs.conda.io/projects/conda-build/en/latest/resources/package-spec.html#package-match-specifications)。 語法如下：

```txt
(channel(/subdir):(namespace):)name(version(build))[key1=value1,key2=value2]
```

例： 安裝由`conda-forge` channel 提供的`numpy`套件，如同[原始頁面](https://anaconda.org/conda-forge/numpy)。

指定`-c conda-forge::` channel 再配合其進階條件：

```bash
-c conda-forge::numpy==1.17*
```

---

### Building in progress

創建中的映像檔名稱旁會有個三角提示，提示此映像檔尚未創建完成。

![](assets/group-image-not-ready.png)

點擊 `Image building in progress` 檢視 `Build Details` 及 `Log`。

![](assets/group-image-building-detail.png)

點擊 `Cancel Build` 撤消創建。

### Building finish

創建完成後，映像檔名稱的三角提示即消失。映像檔則可從各個映像檔清單選用；

### View build details and Rebuild

![](assets/group-image-built.png)

點擊 `View build details` 檢視客製映像檔規格內容及創建過程記錄；進一步可編輯內容來重新創建映像檔。

![](assets/group-image-rebuild.png)

更新內容且點擊 `Rebuild` 即可重新創建映像檔。

## Group Image

加入的群組映像檔，不論是現有映像檔或是創建映像檔，則都可從映像檔清單選用；`i` 提示該映像檔從屬於 `Group`。

![](assets/group-image-selection.png)

## Actions

![](assets/actions.png)

點擊「筆」圖示來編輯；點擊「垃圾桶」圖示來刪除。

## Reference

+ [Available images provided by InfuseAI](guide_manual/images-list)