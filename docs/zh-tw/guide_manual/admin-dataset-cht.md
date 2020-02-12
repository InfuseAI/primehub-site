---
id: admin-dataset-cht
title: Dataset Management
---

Dataset management 提供管理者 Dataset 資源管理能力，如：新增、刪除、編輯 datasets 來源及群組權限。

## Creating New Datasets

![](assets/dataset_5.png)

點選 `Add` 新增 Datasets，會跳出編輯該 Dataset 的畫面。

![](assets/admin_dataset_v25.png)

需填入以上畫面中的各個欄位：

+ `Name` 必填，只能填寫小寫字母、數字、點（“.”）、連接號（“-”）和底線（“_”）。

+ `Display name` 顯示名稱。

+ `Description`

+ `Mount Root` 此唯讀欄位會顯示 datasets 資料夾路徑。

+ `Launch Group Only` 啟用時，該 dataset 只會被使用者指定的啟始 group 存取。

+ `Global` 啟用時，所有使用者皆能讀取；關閉時，只有藉由 `edit groups` 指定 groups 才能存取。

+ `Type` `git`, `env` 及 `pvc`.

+ `Edit groups` 當 `Global` 關閉時，可設定 groups 存取權限。

### `Type` 有以下三種類型

#### git

![](assets/dataset_git.png)

在 `Url`填入可存取該 Dataset 的連結位置。

![](assets/dataset_secret_list.png)

若需要指定 `pull secret`，點選 `Change` 按鈕並指定 `secret`。

#### env

![](assets/dataset_env.png)

若 Dataset 非檔案型式，僅為字串，則可選擇 `env` 後，在 `Variables` 填入該 variable 的 `key` 跟 `value` 。若不只一個 variable，可以點選 `+ Add field` 新增多筆。

#### pv

![](assets/dataset_pv_v2.png)

v2.0 之後，可以指定 `volume size` 。一旦確認後，會有一個固定大小的 volume 被創建出來，此後該 volume 就不能透過 Admin UI 來改變大小。

最後點選 `confirm` 完成新增。

## Upload Server

`Upload Server` 功能在 v2.0 之後可以被啟用。使用者可以透過 upload server 事先上傳檔案至 pv 型 dataset volume。

選擇一個已被創建的 pv 型 dataset 進入其編輯頁，會顯現出 `Enable Upload Server` 開關和 `Regenerate Secret` 按鈕。

![](assets/dataset_pv_v2_upload_server.png)

開啟 `Enable Upload Server` 並按下 `Confirm` 後，會跳出顯示進入 uploader 需要的帳號密碼。

![](assets/dataset_pv_v2_credential.png)

因為該帳號密碼只會顯示一次，請在按下 `OK` 前，務必記住其內容。

**Note: 如果帳密不慎遺失**

回到該 dataset 的編輯頁，再次按下 `Regenerate Secret` ，就可以得到一組新的帳密。

在 dataset 列表，可以看到該 dataset 列上的 upload server 欄位上有個 `Link`。

![](assets/dataset_pv_v2_upload_server_enable.png)

點選該 Link 並輸入先前記住的帳密登入。

![](assets/dataset_pv_v2_upload_server_login2.png)

登入後，可以看到檔案列表；點選左上方的 `Upload Data`。

![](assets/dataset_pv_v2_file_manager_upload.png)

顯示檔案上傳對話框。

![](assets/dataset_pv_v2_upload_dialogue.png)

拖拉要上傳的檔案進對話框，此時檔案尚未開始上傳。

![](assets/dataset_pv_v2_drag_file.png)

按下 `Upload n files` 開始上傳。一旦完成，對話框的下方會顯示 `Complete`。

![](assets/dataset_pv_v2_upload_button.png)

關掉上傳對話框，回到檔案列表，可見到已上傳檔案列在其中。

![](assets/dataset_pv_v2_file_uploaded.png)

一旦 hub 啟動後，可以在 jupyter notebook 環境中，看到已上傳檔案在掛載 dataset volume 中。目前 upload server 並無提供檔案刪除功能，已上傳檔案只能透過 jupyter notebook 刪除。

## Deleting Datasets

![](assets/dataset_9.png)

點選 `Delete`，會跳出確認對話框，確認是否刪除該 Dataset。.

![](assets/dataset_11.png)

點選 `edit` 進入該 Dataset 的編輯頁面。

![](assets/dataset_7.png)

如果 `Group` 啟用，則需在下方 `edit groups` 設定可存取的 Groups。 點選 `edit groups`，即可從現有的 Groups 列表中選取有權限使用該 Dataset 的 Group，將它們連結在一起。
