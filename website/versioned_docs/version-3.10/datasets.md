---
id: version-3.10-datasets
title: Datasets
sidebar_label: Overview
description: Datasets
original_id: datasets
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

Datasets feature provides the capabilities of managing datasets resources such as create, update, and delete actions.

Datasets feature is based on [Shared Files](shared-files) to store dataset files with additional metadata. Group members can browse dataset files and upload files for sharing with other group members.

## Prerequisites

Datasets feature is only enabled if [PHFS](design/phfs) is enabled.

## Creating New Dataset

![](assets/datasets-list.png)

Click `New Dataset` to add a dataset and it will pop up the dialog of **New Dataset**.

### Step 1: Name and Tags

![](assets/datasets-new-dataset-1.png)

+ `Dataset Name`: Name of the dataset (only the alphanumeric characters, hyphen `-`, or underscore `_` are allowed).
+ `Tags`: Tags for the dataset.

### Step 2: Uploading Files

![](assets/datasets-new-dataset-2.png)

Click or drop files to start uploading files. Once the files are uploaded, they will appear in the list of files.

Click `Done` to finish the upload.

![](assets/datasets-data-tab.png)

All uploaded files are stored in the dataset.

## Browse Dataset

### Dataset List

![](assets/datasets-list.png)

+ `Name`: Name of the dataset.
+ `Created By`: User who created the dataset.
+ `Last Modified`: Last modified time of the dataset.
+ `Tags`: Tags for the dataset.
+ `Delete button`: Delete the dataset.

### Dataset - Data Tab

![](assets/datasets-data-tab.png)

The **Data** tab shows the list of files in the dataset.

### Dataset - Information Tab

![](assets/datasets-info-tab.png)

+ `Dataset Name`: Name of the dataset.
+ `Created By`: User who created the dataset.
+ `Last Modified`: Last modified time of the dataset.
+ `Tags`: Tags for the dataset.
+ `Size`: Size of the dataset.
+ `Edit button`: Edit the dataset.

## Access from Jupyter

![](assets/datasets-jupyter.png)

Open a [Notebook](quickstart/launch-project) and access the dataset from the path of `phfs/datasets/<dataset_name>`.

## Editing Dataset

![](assets/datasets-edit.png)

Go to the **Information** tab and click `Edit` to edit the dataset.

## Deleting Dataset

![](assets/datasets-delete.png)

In the **Datasets** list, click `Delete` button to delete the dataset.
