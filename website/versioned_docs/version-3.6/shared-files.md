---
id: version-3.6-shared-files
title: Shared Files
sidebar_label: Overview
description: Shared Files
original_id: shared-files
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

  + `View file`: view the file in an new tab if the file format is supported. E.g. image, text.
  + `Download file`
  + `Copy PHFS URI`: URI looks like `phfs:///<path/to/file>` (triple `/`); which can be used in Jobs.
  + `Delete`


## Upload

Click `Upload` to pop up a uploader.

![](assets/files-uploader.png)

Drop files, paste or click `Browse files` to start uploading files.

![](assets/files-uploaded.png)

Click `OK` to close the dialogue or click `Done`/`+` to upload additional files.

> Uploaded files can been only accessed by same group; please confirm the selected working group if files are not listed.

### Create directory

![](assets/shared-file-directory-icon.png)

Click the icon, then input the name of sub-directory, press `Enter`.

![](assets/shared-file-create-directory.png)

or even a path like `path/to/file`, press `Enter`.

![](assets/shared-file-directory-path.png)

Then upload files.

> The nested directories won't be created until a file is uploaded into, in other words, when showing `No data`, at this moment, no directories is created yet.
