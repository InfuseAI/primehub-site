---
id: admin-uploader
title: Upload Server
---

In terms of type `pv`, `nfs` and `hostpath` dataset, we can use `Upload Server` feature that allows users to upload files to a dataset volume.

**Editing** a created type `pv`, `nfs` and `hostpath` dataset, we should see `Enable Upload Server` toggle and `Regenerate Secret` button.

![](assets/dataset_pv_v2_upload_server.png)

Toggle `Enable Upload Server` on, and click `Confirm`. There is a pop-up showing the credential (`Username` / `Password`) for the uploader access.

![](assets/dataset_pv_v2_credential.png)

Since the credential shows once only, you **must** keep it in a memo before clicking `OK`.

**Note: if credential is lost**
you can go back to dataset editing page and click `Regenerate Secret` button again to have a new pair of credential.

You can see a `Link` created in `Upload Server` field of the dataset.

![](assets/dataset_pv_v2_upload_server_enable.png)

Clicking the link, and input the credential you keep in the memo.

![](assets/dataset_pv_v2_upload_server_login2.png)

After login the upload server, it displays a file list and click `Upload Data`.

![](assets/dataset_pv_v2_file_manager_upload.png)

A upload dialogue appears.

![](assets/dataset_pv_v2_upload_dialogue.png)

Dragging files for uploading, files are not uploaded yet at this moment.

>Uploader supports **auto-unzip** to a zip file. Dragging a **zip** file in, the file will be **unzip automatically** and the directory structure is remained.

![](assets/dataset_pv_v2_drag_file.png)

Click `Upload n files` to trigger the upload. It shows **Complete** at bottom of the uploader once finished.

![](assets/dataset_pv_v2_upload_button.png)

Close the uploader and back to the file list, uploaded files are listed.

![](assets/dataset_pv_v2_file_uploaded.png)

You can find these uploaded files in the dataset volume which is mounted on the hub in your jupyter notebook. Currently these files can be removed only via notebook.