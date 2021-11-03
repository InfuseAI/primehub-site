---
id: admin-volume-cht
title: Volume Management
description: Volume Management
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

Volume management 提供管理者 Volume 資源管理能力，如：新增、刪除、編輯 volumes 來源及群組權限。

## 創建 Volumes


![](assets/dataset_5_v26.png)

點選 `Add` 新增 Volumes，會跳出編輯該 Volume 的畫面。

![](assets/admin_dataset_v3.png)

需填入以上畫面中的各個欄位：

+ `Name` 必填，只能填寫小寫字母、數字、點（“.”）、連接號（“-”）。

+ `Display name` 顯示名稱。

+ `Description`

+ `Mount Root` 此唯讀欄位會顯示 volumes 資料夾路徑。

+ `Global` 啟用時，所有群組皆能讀取，此時我們可以進一步設定有寫入權限的群組；關閉時，只有藉由 `Edit groups` 指定 groups 及權限 才能讀取或寫入。

+ `Type` volume 型別。

+ `Edit Groups` 當 `Global` 關閉時，可指定 groups 和存取權限。

`Type` 有以下幾種類型：

### persistent volume

+ `Provisioning`: `Auto`, `Manual`.

#### Auto

![](assets/dataset_pv_auto.png)

指定 `volume size` 。一旦確認後，會有一個固定大小的 volume 被創建出來；此後該 volume 就不能透過編輯來改變大小。

#### Manual

![](assets/dataset_pv_manual.png)

當管理者需要自行手動設定 persistent volume 時，請選擇 `Manual` 。具體來說，當管理者想綁定的儲存空間，其型別並非 PrimeHub 已內建的型別，便需要手動設定。 請參考 [Kubernetes 的官方文件](https://kubernetes.io/docs/concepts/storage/persistent-datasets/)來設定。

唯一有所規範的是，手動設定的 `PersistentVolumeClaim` ，名稱必須為 `volume-{透過 UI 設定的 "Name" 欄位}` 。

最後點選 `confirm` 完成新增。

---

### nfs

![](assets/dataset_nfs.png)

NFS volume 允許掛載 NFS(Network File System) 系統中分享的檔案及目錄至 Pod。存放在 NFS volume 的資料，即使卸下掛載後，資料依舊存在。NFS volume 同時也允許掛載至多個群組。

新增之後可做編輯更動。

>必須先有可以存取的 NFS Server 及分享出來可以存取的檔案/目錄及對應權限；若存取失敗，則會有不可預期的行為，其行為根據實際環境而有異。。
>請見 [trouble-shooting](../../trouble/dataset-failure)。

+ `NFS Server` 輸入 NFS Server URL。

+ `NFS Path` 輪入 NFS 檔案/目錄。

---

### hostPath

![](assets/dataset_hostpath.png)

hostPath 可以掛載 Node 檔案系統中指定的檔案/目錄夾至 Pod，做為存取資料之用。新增之後可編輯更動。

>hostPath 指向的檔案/目錄必須已存在於 Node 且具有相對應的讀寫權限；若存取失敗，則會有不可預期的行為，其行為根據實際環境而有異。
>請見 [trouble-shooting](../../trouble/dataset-failure)。

+ `HostPath` 輸入 Node 檔案系統中目錄夾路徑。

---

### git

![](assets/dataset_git.png)

在 `Url`填入可存取該 Volume 的連結位置。

![](assets/dataset_secret_list.png)

若需要指定 `pull secret`，點選 `Change` 按鈕並指定 `secret`。

---

### env

![](assets/dataset_env.png)

若 Volume 非檔案型式，僅為字串，則可選擇 `env` 後，點選 `+ Add field` 新增多筆，在 `Variables` 填入該 variable 的 `key` 跟 `value` 。

>請注意，任何`-`字符會自動地被置換成`_`！環境變數的全名將是 `<volume_name>_<variable_key>`。

---

### 群組存取權限

![](assets/edit_groups.png)

`Type`, `Global` 及 `edit groups`為連動的：
+ 若`Type` 本身為可寫入的，`Global`開啟時，可另指定有寫入權限的群組，其餘群組皆為唯讀；`Global`關閉時，須分別指定唯讀權限及寫入權限群組。
+ 若`Type` 本身為唯讀的，`Global`開啟時，不須指定群組，皆唯讀；`Global`關閉時，須指定唯讀權限群組。

## 刪除 Volumes

![](assets/actions.png)

點選 `Delete`，會跳出確認對話框，確認是否刪除該 Volume。

## 編輯 Volumes

![](assets/actions.png)

點選 `edit` 進入該 Volume 的編輯頁面。

當編輯的資料集型別為`pv`、`nfs`、`hostpath`時，我們可以開啟 [Upload Server](admin-uploader-cht) 功能來協助資料上傳。
