---
id: primehub-end-to-end-tutorial-1
title: 1 - Label Data
description: Using PrimeHub from Training to Serving the Model
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
</div>
<br>

The dataset labeling is the critical part of AI / ML model development. Data scientists cannot make good models without well-defined data because we all know “garbage in, garbage out”. 

[Label Studio](https://labelstud.io/) is a useful open-source data labeling tool. In [PrimeHub Apps](primehub-app), it provides an easy way for setting up Label Studio in a cloud-ready environment for your team.

In this tutorial, we will use `PrimeHub Apps` with `Label Studio` to label the screw data for further training works.

## What we need?

- Enable [Shared Volume](guide_manual/admin-group#shared-volume) in your group.
![](assets/primehub-end-to-end-tutorial-shared-volume.png)

- Install [Label Studio]() in PrimeHub Apps.
    1. Click `Install to PrimeHub` in Label Studio.
    ![](assets/primehub-end-to-end-tutorial-install-label-studio-1.png)
    2. Fill in `Name` with `label-studio`.
    ![](assets/primehub-end-to-end-tutorial-install-label-studio-2.png)
    3. Click `Create` button.
    ![](assets/primehub-end-to-end-tutorial-install-label-studio-3.png)
    4. The `Label Studio` app is installed successfully.
    ![](assets/primehub-end-to-end-tutorial-install-label-studio-4.png)

## Use `Label Studio` to label data

We will use the good/bad screw images as our dataset (the screw images are collected from [MVTEC AD](https://www.mvtec.com/company/research/datasets/mvtec-ad/)).

The example image on the left side is the good screw; and the example image on the right side is the bad screw since you can see there is a manipulated front.
![](assets/app_tutorial_labelstudio_screw_good_bad.png)

Go to Notebooks tab in the PrimeHub UI to start a notebook server.
- Choose Instance Type: CPU 1 (CPU: 1 / Memory: 3G/ GPU: 0)
- Choose Image: TensorFlow 2.4.1
![](assets/primehub-end-to-end-tutorial-start-notebook.png)

After went into the notebook environment, now create a folder `screw` under our group shared volume `~/<group_name>/`. In this example, the <group_name> is `phusers`.
![](assets/primehub-end-to-end-tutorial-create-folder.png)

Next, download [tutorial_screw_train.ipynb](assets/tutorial_screw_train.ipynb) and upload it to `~/<group_name>/phusers`.

Please run the `Prepare Data` section in the notebook file to download all necessary data. And don’t run the cells after `Start Training` section.
![](assets/primehub-end-to-end-tutorial-prepare-data.png)

Back to PrimeHub UI and go to Apps page, we can open the Label Studio UI by clicking `Open`.
![](assets/primehub-end-to-end-tutorial-open-label-studio.png)

Click `Create` button to create a new project in the Label Studio.
![](assets/app_tutorial_labelstudio_create.png)

Enter project name `screw`. Skip the `Data Import` step. In the `Labeling Setup`, we choose `Image Classification`.
![](assets/app_tutorial_labelstudio_screw_create_project.png)

Delete the original choices and add our own label classes: `good/bad`, then click `Save` to create the project.
![](assets/app_tutorial_labelstudio_screw_label_classes.png)

Every group members can access the `Group Shared Volume`, and it is also accessible in the PrimeHub App. Since we installed the Label Studio by PrimeHub App, we can start to sync the data between `Group Shared Volume` and `Label Studio`.

Go to `Settings` -> `Cloud Storage` to set up `Source` and `Target` storages.
![](assets/primehub-end-to-end-tutorial-add-storage.png)

Click `Add Source Storage` to configure following settings, then click `Add Storage` -> `Sync Storage`.
- Storage Type: `Local files`
- Storage Title: `screw`
- Absolute local path: `/project/<group_name>/screw/screw-unlabeled` (in this example, the `<group_name>` is `phusers`).
- File Filter Regex: `.*png`
- Turn on toggle of `Treat every bucket object as a source file`
![](assets/primehub-end-to-end-tutorial-source-storage.png)

Click `Add Target Storage` and configure following settings, then click `Add Storage`.
- Storage Type: `Local files`
- Storage Title: `screw-labeled`
- Absolute local path: `/project/<group_name>/screw/screw-labeled` (in this example, the `<group_name>` is `phusers`).
![](assets/primehub-end-to-end-tutorial-target-storage.png)

After added storage, now you can go back to the project view in Label Studio. Click `Label` to start labeling.
![](assets/app_tutorial_labelstudio_screw_label_start.png)

You can type keyboard numbers (`good: 1`; `bad: 2`) to select the class or click the checkbox directly. Click `Submit` to confirm your selected class.
![](assets/primehub-end-to-end-tutorial-label-data.png)

Successfully labeled all the screw images!
![](assets/primehub-end-to-end-tutorial-labeled-completed.png)

All the labeled results are saved in JSON format and located under `~/<group_name>/screw/screw-labeled`.
![](assets/primehub-end-to-end-tutorial-labeled-json.png)

In the next tutorial, we will organize the labeled data into the format that we can continue to train a good/bad screw classifier.
