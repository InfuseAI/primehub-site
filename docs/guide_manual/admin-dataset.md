---
id: admin-dataset
title: Dataset Management
---

Dataset management provides the capabilities of managing dataset resources such as create, delete, edit datasets and of permission-control so that datasets can be accessed only by specific groups accordingly.

## Creating New Dataset

![](assets/dataset_5_v26.png)

Click `Add` to add a Dataset and it will pop up the edit screen of Datasets.

![](assets/admin_dataset_v26.png)

You need to fill in these fields:

+ `Name` (required): Only lowercase letters, numbers, dash `-` and the bottom line `_` can be filled in.

+ `Display name`

+ `Description`

+ `Mount Root` This field is not editable. It displays the path to datasets.

+ `Global` If enabled, everyone can read this dataset; furthermore, we can set `Writable` groups. If disabled, linking groups with `ReadOnly` or `Writable` permission by `edit groups` is required.

+ `Launch Group Only` When `Global` is disabled, we can set `Launch Group Only` or not. If enabled, the dataset is only visible to specific groups; furthermore, we can set `ReadOnly` groups or `Writable` groups.

+ `Type` `git`, `env` and `pvc`.

+ `Edit Groups` Set accessible groups, when `Global` is disabled.

There are three `type`:

### git

![](assets/dataset_git.png)


Fill the URL of git repo (can be https or git). You can use `#branch` to specify the branch or tag name.

![](assets/dataset_secret_list.png)

Click `Change` to select a secret from the list `if a pull-secret is required`.

### env

![](assets/dataset_env.png)

If dataset is an environment variable, not a file, you can use `env` type. Please fill the `key` and `value` in the `Variables`. If there are more than one variable, you can click `+ Add field` to add more field.

### pv

![](assets/dataset_pv_v2.png)

You can specify the `volume size`, once it is confirmed, there is a fixed-size volume created and the volume size is not able to be changed via Admin Dashboard.

Click `Confirm` to complete the addition.

## Upload Server

`Upload Server` feature is introduced in type `pv` dataset that allows users to upload files to the type `pv` dataset volume via the upload server.

When *editing* a created type pv dataset, `Enable Upload Server` toggle and `Regenerate Secret` button appear.

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

![](assets/dataset_pv_v2_drag_file.png)

Click `Upload n files` to trigger the upload. It shows **Complete** at bottom of the uploader once finished.

![](assets/dataset_pv_v2_upload_button.png)

Close the uploader and back to the file list, uploaded files are listed.

![](assets/dataset_pv_v2_file_uploaded.png)

You can find these uploaded files in the dataset volume which is mounted on the hub in your jupyter notebook. Currently these files can be removed only via notebook.

## Deleting Dataset

![](assets/actions.png)

Click `Delete` in the Datasets list, the confirmation dialog will pop up, and the Dataset will be deleted when you click `OK`.

## Editing Deataset

![](assets/actions.png)

Click `Edit` to enter the edit page of the Dataset.

![](assets/edit_groups.png)

If `Global` is disabled, please click `edit groups` under the edit Dataset page to set accessible groups that have permission to use the Dataset.
