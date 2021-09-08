---
id: admin-image
title: Image Management
description: Image Management
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

## Overview

Images management provides the capabilities of managing image resources such as add, delete, edit images and their permission-control which associates specified-groups with images to give the access. Administrators are even able to build a new custom image which are automatically pushed to the registry and added to the system.


![](assets/image_3_v26.png)

## Add New Image

Click `+ Add` to add an Image.

![](assets/group-image-info.png)

+ `Display name`: (required): Only lowercase letters, numbers, hyphen `-` and a dot `.` can be filled in.

+ `Image name`: an auto-generated name based on Display name.

+ `Description`

Choose `Use existing image` or `Build custom image`.

## Use Existing Image

Add an existing image.

![](assets/admin-image-use-existing.png)

+ `Type`: `cpu`, `gpu` and `universal`: Select what type of the image is.

+ `Container Image URL`: Fill in the Image's url. See [Reference](#reference).

+ `Specific Container Image URL for GPU`: It appears when `universal` is selected. By default, it uses the same url as container image url. Enable it if a specific image url for GPU is desired.

+ `Image Pull Secret`: Enable and select the secret if a pull-secret is required.

+ `Global`: Toggle Global on to allow every group accessing the image; otherwise specifying groups by `Edit Groups`.
  
  ![](assets/admin-image-global.png)

Click `Confirm` to complete the addition.


## Build Custom Image

Instead of adding existing images, Administrators can build custom images and add them.

![](assets/group-image-custom.png)

+ `Type`: `cpu`, `gpu` and `universal`: Select what type of the image is.

+ `Base image url` (required) The url of the base image; we can enter any valid image URLs or we can choose existing images from autocompletion. See [Reference](#reference).

+ `Image Pull Secret` Enable and select the secret if a pull-secret is required.

+ `Packages` choose packages installer/management and fill in packages requirement.

  + `APT` Packages management of Debian, Ubuntu and related Linux distribution.

  + `Conda` A packages management supports multiple programming language. [Ref.&neArr;](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-pkgs.html#installing-packages)

  + `Pip`  Using python packages installer. [Ref.&neArr;](https://packaging.python.org/tutorials/installing-packages/#use-pip-for-installing)

  >In case of multiple packages, please using the **line break** for each package instead of putting them in one line.

  + `Global`: Toggle Global on to allow every group access the image; otherwise specifying groups by `Edit Groups`.
  
  ![](assets/admin-image-global.png)

Click `Confirm` to start the building and the image will be added automatically once it's done.

### Conda Package Match Specification

Conda supports to specify `channel` where the package is sourced from and [match specification](https://docs.conda.io/projects/conda-build/en/latest/resources/package-spec.html#package-match-specifications) of the package. So we can specify images more specifically. 

The syntax is 

```txt
(channel(/subdir):(namespace):)name(version(build))[key1=value1,key2=value2]
```

For example, to install `numpy` package which is sourced from the channel, **conda-forge**, [Ref.&neArr;](https://anaconda.org/conda-forge/numpy).

Use `-c conda-forge::` to specify the channel:

```bash
-c conda-forge::numpy==1.17*
```

---

### Building in progress

While building, the image name is amended with an triangular exclamation mark to indicate the image is not ready.

![](assets/group-image-not-ready.png)


Click the image name to view the detail, it shows `Image building in progress` beside Container image url.

![](assets/group-image-building.png)

Click `Image building in progress` to view the `Build Details` and `Log` of the building.

![](assets/group-image-building-detail.png)

The building progress can be cancelled by `Cancel Build`.


### View build details and Rebuild

Once the building finishes successfully, there is no triangular exclamation mark as a postfix to the image name. The image becomes available from image selection.

![](assets/group-image-built.png)

Click `View build details` to view the detail and logs or to modify the detail for rebuilding.

![](assets/group-image-rebuild.png)


To rebuild a image, by modification to the details and pressing `Rebuild`.


## System Image

Whether adding an existing image or building a custom image by administrators, the image can be selected from image selection; `i` hint indicates a `System` image.

![](assets/system-image-selection.png)

## Actions

![](assets/actions.png)

Click Pen-icon for the **editing**; click Trash-can-icon for the **deletion**.

## Reference

+ [Add InfuseAI Images](../quickstart/add-infuseai-image)
  