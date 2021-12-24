---
id: shared-files
title: Shared Files
sidebar_label: Overview
description: Shared Files
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
    <div class="deploy-only tooltip">Deploy
    <span class="tooltiptext">Applicable to Deploy Edition</span>
  </div>
</div>
<BR>

**Shared Files** feature is based on [PHFS Storage](quickstart/nb-data-store#phfs-storage) to store shared files. Group members are able to browse shared files and able to upload files for sharing with same group other members.

![](assets/shared-file-list.png)

## Browse

It lists files and directories with columns of `Name`, `Size`, and `Last Modified`. The list can be sorted by these columns.

+ `<Directory>/`: navigate into the directory by clicking it.

  > Some directories are created by PrimeHub automatically, such as  `jobArtifacts/`.

+ `<File>`: there are actions we can perform over files.
  
  ![](assets/shared-file-actions.png)

  + `View file`: view the file in an new tab if the file format is supported. E.g. image, text and notebook(*.ipynb*).
  + `Download file`
  + `Copy PHFS URI`: URI looks like `phfs:///<path/to/file>` (triple `/`); which can be used in Jobs.
  + `Delete`


## Upload

Click `Upload` to pop up an uploader.

![](assets/v311-files-uploader.png)

Click or drag files to start uploading them.

During uploading, the progress bar will show the progress of uploading.

![](assets/files-uploading.png)

We can click `Upload in Background` to move the uploading action to the background.

![](assets/files-uploading-in-background.png)

Once the uploading is done, the file will be listed in the `Shared Files` page.

Click `OK` to close the dialogue or click/drag to upload additional files.

![](assets/v311-files-uploaded.png)

> Uploaded files can been only accessed by same group; please confirm the selected working group if files are not listed.

### Create directory

![](assets/shared-file-directory-icon.png)

Click the icon, then input the name of sub-directory, press `Enter`.

![](assets/shared-file-create-directory.png)

or even a path like `path/to/file`, press `Enter`.

![](assets/shared-file-directory-path.png)

Then upload files.

> The nested directories won't be created until a file is uploaded into, in other words, when showing `No data`, at this moment, no directories is created yet.
