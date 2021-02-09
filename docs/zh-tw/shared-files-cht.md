---
id: shared-files-cht
title: Shared Files
sidebar_label: Introduction
description: Shared Files
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>
<BR>

**Shared Files** 基於利用 [PHFS Store](quickstart/nb-data-store-cht#phfs-storage) 空間存放群組共享檔案，使用者可以瀏灠管理、上傳群組共享檔案；只有同群組的成員才能瀏灠存取。

![](assets/shared-file-list.png)

## Browse

表列出所有群組共享檔案/目錄及其 `Name`、 `Size`、 `Last Modified` 欄位資訊；可依據欄位來排序。

+ `<Directory>/`: 點擊目錄進入瀏灠。

  > 部分目錄為 PrimeHub 自動建立，如： `jobArtifacts/`。

+ `<File>`: 檔案；針對檔案可進行下列操作。
  
  ![](assets/shared-file-actions.png)

  + `View file`: 檢視檔案；支援檔案格式，如 jpg, png, txt。
  + `Download file`：下載
  + `Copy PHFS URI`: 複製檔案 URI，如： `phfs:///<path/to/file>` (三個 `/`)；此 URI 可用在 Jobs。
  + `Delete`： 刪除

## Upload

點擊 `Upload` 彈出上傳對話框。

![](assets/files-uploader.png)

拖拉檔案、複製或是點擊 `Browse files` 選擇檔案上傳。

![](assets/files-uploaded.png)

點擊 `OK` 結束對話框或是 `Done`/`+` 選擇更多檔案上傳。

> 上傳的檔案只限上傳時該群組的群組成員才能存取；若在環境下沒看到檔案，請確認是否位於同一群組。

### Create directory

![](assets/shared-file-directory-icon.png)

點擊圖示輸入想建立的目錄名稱，按下 `Enter`。

![](assets/shared-file-create-directory.png)

甚至可輸入想建立目錄路徑，如： `path/to/file`，按下 `Enter`。

![](assets/shared-file-directory-path.png)

點擊 `Upload` 上傳檔案。

> 目錄路徑下的所有目錄，只有當檔案上傳後才會建立，換而言之，顯示 `No data`的當下，並不會建立任何目錄。
