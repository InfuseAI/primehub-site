---
id: build-image
title: Build Image
description: Build Image
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

This quickstart shows how to build a custom image by the feature of `Images`. Here we are going to build an image with **fastai v1 library for PyTorch** provided by [Fast.ai](https://www.fast.ai/) based on the [Jupyter base-notebook](https://github.com/jupyter/docker-stacks/tree/master/base-notebook). Fast.ai is a well-known for free online A.I. courses, please check its site if any interest.

## Steps

1. `User Portal > Images` or `Admin Portal > Images`

2. Enter `Images` management and click `+ New Image` for adding a custom image spec.

3. Fill `Name` with `group-image-sample` (or other name you like).

4. Choose `Build Custom Image`

5. Fill `Base Image` with `jupyter/base-notebook`.

6. Don't check off `Use Image PullSecret`, a pull-secret is unnecessary since it is a public repository.

7. Fill `Conda` field with `-c pytorch -c fastai fastai` [[REF]](https://docs.fast.ai/index.html#Installation-and-updating) 

    (*Due to the full command is `conda install -c pytorch -c fastai fastai`*).

8. **(Optional)** Fill `APT` field with `vim` (or other tools).

    (Due to base image is `Ubuntu` base, `APT` is its package management tool.)

9. Click `Create` to save the custom image spec.


10. Once building is started, click `Image building in progress` to check the build details and log.

![](assets/group-image-building.png)


11. Once the building finishes successfully, there is no triangular exclamation mark as a postfix to the image name. The image is added automatically and becomes available from image selection. Anytime we can click `View build details` to check the specification.

![](assets/group-image-built.png)

