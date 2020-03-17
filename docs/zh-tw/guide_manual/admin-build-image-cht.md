---
id: admin-build-image-cht
title: Image Builder
---

Image Builder 提供管理者可以藉由指定基礎 image 及要安裝工具及套件庫，為使用者提供客製化 image。

## 客製化 Image 列舉

![](assets/build_img_main.png)

進到 `Image Builder`，可以看到一個表單，其中列舉客製化 image spec，欄位分別有下列資訊：

+ `Name` 客製化 image spec 名稱。

+ `Status` 最近一次客製化 image 創建結果.

+ `Image` 最近一次創建成功的 image url 

+ `Actions` - `編輯` and `刪除`.

## 新增客製化 Image Spec

點擊 `+ Add` 進入 image spec 新增頁面。

![](assets/build_img_create.png)

需填入以上畫面中的各個欄位：

+ `Name` 必填，只能填寫小寫字母、數字、點（“.”）、連接號（“-”）和底線（“_”）。

+ `Base image` 必填，base image 的 url.

+ `Use Image PullSecret` 如果 pull secret 為必要，請勾選。

+ `Packages` 選擇使用的套件管理，並在下方輸入要預先安裝的套件名稱。

  + `APT` Debian, Ubuntu 及其它相關的 linux distribution 的套件管理。

  + `Pip`  Python 套件管理。 [[參考]](https://packaging.python.org/tutorials/installing-packages/#use-pip-for-installing)

  + `Conda` 多樣程式語言套件管理。 [[參考]](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-pkgs.html#installing-packages)

**Note**:
*如果需安裝複數個套件時，請輸入一行為一套件，換行後輸入下一個套件*

最後點選 `confirm` 完成新增，Image 創建工作會被自動啟始。

![](assets/build_img_url.png)

一旦創建完成，該 image url 會列在表單欄位。

---

### 指定 Conda 套件符合條件

這裡我們特別提及： Conda 支援指定套件的來源 `channel`，並可以進一步指定套件符合條件 [[參考]](https://docs.conda.io/projects/conda-build/en/latest/resources/package-spec.html#package-match-specifications)。 語法如下：

```txt
(channel(/subdir):(namespace):)name(version(build))[key1=value1,key2=value2]
```

例： 我們想要安裝由`conda-forge` channel 提供的`numpy`套件，如同[原始頁面](https://anaconda.org/conda-forge/numpy)。

我們可以指定`conda-forge::` channel 再配合其進階條件：

```bash
conda install conda-forge::numpy==1.17*
```

---

## 編輯客製化 Image Spec

![](assets/edit_button.png)

點擊編輯按鈕，進入該客製化 image spec 編輯頁。

![](assets/build_img_edit.png)

進入編輯頁後會顯示 `Info` 及 `Jobs` 兩個選單。
`Info` 顯示跟新增頁面時一樣的欄位，除了 `Name` 欄位外，其餘皆可進行編輯。

任何變更一旦確認後，新的創建工作會被自動啟始，並列在 `Jobs` 清單。

### Jobs

*Job* 是指客製化 image 創建的工作。當新的 image spec 新增時，第一次創建工作會自動啟始。之後，每當 spec 有所變更時，會自動起始新的創建工作。每個工作的過程及結果都會被記錄下來。

所有 **jobs**/**image urls** 都會列舉：

![](assets/build_img_jobs.png)

+ `Updated At` 最近更新時間。

+ `Image Revision` 版號。

+ `Status` 狀態。

+ `Actions` - 查看記錄。

![](assets/build_img_job_view.png)

#### 查看工作記錄

點擊按鈕，查看每個工作的記錄及其創建依據的 spec。

![](assets/build_img_job.png)

當某個創建工作失敗，可以查看記錄查明失敗原因。

## 刪除 Image Spec

![](assets/build_img_del.png)

點選 `Delete`，會跳出確認對話框，確認是否刪除該 Image spec。
