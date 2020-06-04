---
id: admin-uploader-cht
title: Upload Server
---

`Upload Server` 功能允許使用者以透過 upload server 事先上傳檔案至 `pv`型、 `nfs`型、 `hostpath`型 dataset volume。

編輯一個已被創建的 `pv`型、 `nfs`型、 `hostpath`型 dataset，編輯頁會顯現出 `Enable Upload Server` 開關和 `Regenerate Secret` 按鈕。

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