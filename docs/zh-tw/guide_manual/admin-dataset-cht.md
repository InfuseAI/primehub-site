---
id: admin-dataset-cht
title: Dataset Management
---

Dataset management 提供管理者 Dataset 資源管理能力，如：新增、刪除、編輯 datasets 來源及群組權限。

## 創建 Datasets


![](assets/dataset_5_v26.png)

點選 `Add` 新增 Datasets，會跳出編輯該 Dataset 的畫面。

![](assets/admin_dataset_v26.png)

需填入以上畫面中的各個欄位：

+ `Name` 必填，只能填寫小寫字母、數字、點（“.”）、連接號（“-”）。

+ `Display name` 顯示名稱。

+ `Description`

+ `Mount Root` 此唯讀欄位會顯示 datasets 資料夾路徑。

+ `Global` 啟用時，所有群組皆能讀取，此時我們可以進一步設定有寫入權限的群組；關閉時，只有藉由 `Edit groups` 指定 groups 及權限 才能讀取或寫入。

+ `Launch Group Only` 只有當`Global`關閉時，我們可以設定`Launch Group Only`；啟用時，該 dataset 只會被指定 group 存取或寫入；因此，我們可以進一步指定唯讀群組或是寫入群組。

+ `Type` 資料集 volume 型別。

+ `Edit Groups` 當 `Global` 關閉時，可指定 groups 和存取權限。

`Type` 有以下幾種類型：

### git

![](assets/dataset_git.png)

在 `Url`填入可存取該 Dataset 的連結位置。

![](assets/dataset_secret_list.png)

若需要指定 `pull secret`，點選 `Change` 按鈕並指定 `secret`。

---

### env

![](assets/dataset_env.png)

若 Dataset 非檔案型式，僅為字串，則可選擇 `env` 後，在 `Variables` 填入該 variable 的 `key` 跟 `value` 。若不只一個 variable，可以點選 `+ Add field` 新增多筆。

---

### pv

![](assets/dataset_pv_v2.png)

指定 `volume size` 。一旦確認後，會有一個固定大小的 volume 被創建出來；此後該 volume 就不能透過編輯來改變大小。

最後點選 `confirm` 完成新增。

---

### hostPath

![](assets/dataset_hostpath.png)

hostPath 可以掛載 Node 檔案系統中指定的目錄夾至 Pod，做為存取資料之用。此設定之後可做編輯更動。

>因為安全性考量，此選項預設為關閉；若需要協助開啟，請洽 InfuseAI。

+ `HostPath` 輸入 Node 檔案系統中目錄夾路徑。

---

### nfs

![](assets/dataset_nfs.png)

NFS volume 允許掛載 NFS(Network File System) 系統中分享的檔案及目錄至 Pod。存放在 NFS volume 的資料，即使卸下掛載後，資料依舊存在。NFS volume 同時也允許掛載至多個群組。

設定之後可做編輯更動。

>設定此 dataset 前，必須先有可以存取的 NFS Server 及可以存取的檔案/目錄。

+ `NFS Server` 輸入 NFS Server URL。

+ `NFS Path` 輪入 NFS 檔案/目錄。

---

![](assets/edit_groups.png)

如果 `Group` 啟用，則需在下方 `edit groups` 設定可存取的 Groups。 點選 `edit groups`，即可從現有的 Groups 列表中選取有權限使用該 Dataset 的 Group，將它們連結在一起。

## 刪除 Datasets

![](assets/actions.png)

點選 `Delete`，會跳出確認對話框，確認是否刪除該 Dataset。

## 編輯 Datasets

![](assets/actions.png)

點選 `edit` 進入該 Dataset 的編輯頁面。

當編輯的資料集型別為`pv`時，我們可以開啟 [Upload Server](admin-uploader-cht) 功能來協助資料上傳。
