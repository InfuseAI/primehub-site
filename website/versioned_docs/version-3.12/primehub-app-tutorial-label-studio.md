---
id: version-3.12-primehub-app-tutorial-label-studio
title: Label Dataset by Label Studio
description: Label Dataset by Label Studio
original_id: primehub-app-tutorial-label-studio
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>
<br>

This tutorial covers the basic flow to help you get started with Label Studio in PrimeHub.

## Install Label Studio
First, you need to install it in the `Apps` tab. Please check the [Overview](primehub-app) section to learn how to install an App. 

In the installing process, you can change the environment variables.

`DEFAULT_USERNAME` and `DEFAULT_PASSWORD` are the login account information. You can change them and use them to log into Label Studio after installed.

If you don't know the meaning of other environment variables, you can use the default values or check the [Label Studio Official Doc](https://labelstud.io/guide/start.html#Command-line-arguments-for-starting-Label-Studio) or the tooltip beside the environment variable for more details.

## Label Studio UI
PrimeHub shows the app's state in the `Apps` tab. You can open the Label Studio UI by clicking `Open` after the state becomes `Ready`.

![](assets/app_tutorial_labelstudio_login_page.png)

It will open a new window and show the Label Studio UI. You can find your login information by clicking `Manage` in the `Apps` tab and then clicking the eyes icon. The `$(PRIMEHUB_GROUP)` is the group name.

![](assets/app_tutorial_labelstudio_login_info.png)

## Label Dataset
### What we need?

- The [data volume](guide_manual/admin-volume) in PrimeHub you want to label (we use `/datasets/dog-demo` in this tutorial)
- The directory in group volume that you want to save the labeled results (we use `/project/<group_name>/dog-demo-labeled` in the tutorial)

>Please have the dataset, group volume, or request administrators for assistance before we start.

### Steps

1. After login, please click `Create` button.

    ![](assets/app_tutorial_labelstudio_create.png)

2. Enter your `Project Name`. Skip the `Data Import` step. And choose the `Labeling Setup`. Here we choose `Semantic Segmentation with Polygons`.

3. Delete the original `Labels` settings and `Add` our own label names.

    ![](assets/app_tutorial_labelstudio_labeling_setup.png)

4. Click the `Settings` on the upper-right. Click `Cloud Storage` and `Add Source Storage` to sync the `/datasets/dog-demo` data volume to label. You need to set `Local path` to `/datasets/dog-demo`, turn on toggle of `Treat every bucket object as a source file` and click `Sync Storage`

    ![](assets/app_tutorial_labelstudio_sync_source.gif)

5. Click `Add Target Storage` to sync to labeled results to `/project/<group_name>/dog-demo-labeled`. You need to set `Local path` to `/project/<group_name>/dog-demo-labeled`.

    ![](assets/app_tutorial_labelstudio_sync_target.gif)

6. Back to the project in Label Studio. The data in the data volume has been shown on the UI. And you can click each row of data to label.

    ![](assets/app_tutorial_labelstudio_sync_result.png)
    ![](assets/app_tutorial_labelstudio_labeled.png)

7. After you submit the labeled result, the labeled json file will be under the `/project/<group_name>/dog-demo-labeled`.
    ![](assets/app_tutorial_labelstudio_labeled_json.png)

That's the basic use of how to label the dataset by using Label Studio and PrimeHub. Enjoy it!

## How to Use Labeled Data to Train a Model

In the last section, we show you how to label the dataset. Now, we want to demonstrate how you can use the labeled data to train a model.

For simplicity, the model will be a classification model and you also only need to label the class of the image. The model classifies whether the screw is good or bad.

Here are examples of good and bad screws. The first image is the good screw. The second image is the bad screw and you can see the there is a manipulated front.

![](assets/app_tutorial_labelstudio_screw_good.png)
![](assets/app_tutorial_labelstudio_screw_bad.png)

### What we need?

- Create a [data volume](guide_manual/admin-volume) in PrimeHub called `screw`, and set the read/write permission to your group. Please download the [app_tutorial_labelstudio_screw_dataset.zip](assets/app_tutorial_labelstudio_screw_dataset.zip), unzip it and upload images to the `~/datasets/screw` folder by the [notebook](quickstart/launch-project)
- Create a directory `/project/<group_name>/screw-labeled` in group volume to save the labeled results
- The image `infuseai/docker-stacks:pytorch-notebook-v1-7-0-04b2c51f`
- An instance type >= minimal requirement (CPU=1, GPU=0, Mem=2G)
- The prepared python file of the example [app_tutorial_labelstudio_screw_prepare.py](assets/app_tutorial_labelstudio_screw_prepare.py) and upload it to `~/screw_train` by the [notebook](quickstart/launch-project)
- The prepared notebook file of the example [app_tutorial_labelstudio_screw_train.ipynb](assets/app_tutorial_labelstudio_screw_train.ipynb) and upload it to `~/screw_train` by the [notebook](quickstart/launch-project)

>Please have the data volume, group volume, or request administrators for assistance before we start.

>To use the new data volume, you cannot use the label studio app that has been created before you created the new data volume. You need to create a new label studio app.

### Steps

1. Follow the previous `Label Dataset` section to use the label studio. This time in `Labeling Setup`, we should choose `Image Classification`.

2. Delete the original `Labels` settings and `Add` our own label classes: `bad`, `good`.
    ![](assets/app_tutorial_labelstudio_screw_label_classes.png)

3. Click the `Settings` on the upper-right. Click `Cloud Storage` and `Add Source Storage` to sync the `/datasets/screw` data volume to label. Set `Local path` to `/datasets/screw`, set `File Filter Regex` to `.*png`, turn on toggle of `Treat every bucket object as a source file`. After added, click `Sync Storage`.

4. Click `Add Target Storage` to sync to labeled results to `/project/<group_name>/screw-labeled`. You need to set `Local path` to `/project/<group_name>/screw-labeled`.

5. Back to the project in Label Studio. The data in the data volume has been shown on the UI. And you can click `Label` to start labeling. (Tip: you can use number to select the class)
    ![](assets/app_tutorial_labelstudio_screw_label_start.png)

> After you labeled all images, you may see the following message. This is a known issue. Please click `OK`, click your project name and refresh the page.
    ![](assets/app_tutorial_labelstudio_screw_label_completed.png)

6. Now you have labeled all data by the label studio. We can go back to our [notebook](quickstart/launch-project) to train the model.

7. Open a terminal.
    ```bash
      cd ~/screw_train
      python app_tutorial_labelstudio_screw_prepare.py --path /project/<group_name>/screw-labeled/
    ```
    After executed, it will create a folder named `data` and place the labeled images into the correct folder inside `data` folder.

8. Open the notebook `app_tutorial_labelstudio_screw_train.ipynb` and execute all cells. In the last cell, you will see the result which is similar to the following image. 
    ![](assets/app_tutorial_labelstudio_screw_train_completed.png)

We successfully use our labeled data to train a model which can classify whether the screw is good or bad!