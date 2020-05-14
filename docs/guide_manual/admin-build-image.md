---
id: admin-build-image
title: Image Builder
---

Administrators are able to create custom images with pre-installed tools and libraries which are required for users.

## Custom Image List

![](assets/build_img_main_v26.png)

In `Image Builder` section, there is a list of created custom image specs with several fields as below:

+ `Name` The name of image spec.

+ `Status` The status of the latest custom built image.

+ `Image` The url of the latest built image once it is built successfully.

+ `Actions` - `Edit` and `Delete`.

## Create Custom Image Spec

Click `+ Add` button to enter the creation page.

![](assets/build_img_create_v26.png)

Fill in the fields, some are required:

+ `Name` (required) A unique name, it's not able to be modified once created. *(Only lowercase letters, numbers, hyphen `-` and a dot `.` can be filled in.)*

+ `Base image` (required) The url of the base image; we can use any valid image URLs or we can choose images which are added via Image Management from autocompletion.

+ `Use Image PullSecret` Checked off if a pull secret is required.

+ `Packages` choose packages installer/management and fill in packages requirement.

  + `APT` Packages management of Debian, Ubuntu and related Linux distribution.

  + `Conda` A packages management supports multiple programming language. [[Reference]](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-pkgs.html#installing-packages)

  + `Pip`  Using python packages installer. [[Reference]](https://packaging.python.org/tutorials/installing-packages/#use-pip-for-installing)

**Note**:
*In case of multiple packages, please using the **line break** for each package instead of putting them in one line.*

Click `Confirm` to complete the addition.

![](assets/build_img_url.png)

Once the image is built successfully, the url of the image will be listed.

---

### Conda Package Match Specification

We want to mention specially that Conda supports to specify `channel` where the package is sourced from and [match specification](https://docs.conda.io/projects/conda-build/en/latest/resources/package-spec.html#package-match-specifications) of the package. So we can specify images more precisely. The syntax is 

```txt
(channel(/subdir):(namespace):)name(version(build))[key1=value1,key2=value2]
```

For example, we want to install `numpy` package which is sourced from the channel,`conda-forge`, [here](https://anaconda.org/conda-forge/numpy).

We can use `conda-forge::` to specify the channel:

```bash
conda install conda-forge::numpy==1.17*
```

---

## Edit Custom Image Spec

![](assets/edit_button.png)

Click the button to enter the edit page of the custom image spec.

![](assets/build_img_edit_v26.png)

On edit page, there are two tabs, `Info` and `Jobs`.
`Info` is exactly same as creation page. We can make modifications to the spec, except the `Name` which is not editable.

Once any modification is confirmed, a job of image build will be triggered and it will be listed in the tab `Jobs`.

### Jobs

A job is an image build job. Once a creation of a custom image spec is confirmed, the first job of image build is triggered automatically. Afterwards, any confirmed modifications of spec will trigger other image build jobs. Each job logs the spec and the progress.

These **jobs**/**image urls** are listed here.

![](assets/build_img_jobs_v26.png)

+ `Updated At` The timestamp when the job is updated.

+ `Image Revision` The revision of an custom image.

+ `Status` The status of the custom image creation job.

+ `Actions` - View the spend and logs of an custom image build.

![](assets/build_img_job_view.png)

Click the button, we can check the log of each job of image build with its spec.

![](assets/build_img_job_v26.png)

It is helpful that when we want to know what made image build fail and what spec the image build is based on.

## Delete Custom Image Spec

![](assets/build_img_del.png)

Click the button, the confirmation dialog will pop up, and the custom image spec will be deleted once you click `OK`.

## Registry Configuration

To use Image Builder, we have to configure PrimeHub with a registry where built images are pushed to.

In terms of enterprise customers, PrimeHub, by default, is already configured with a registry and image builder is ready to use.

Otherwise, we should see the warning, `image registry not found`. Please see [Use DockerHub Registry](../tasks/dockerhub-registry) for the configuration.

![](assets/build_img_warning.png)