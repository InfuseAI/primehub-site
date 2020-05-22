---
id: build-image
title: Build Image
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Available in Enterprise tier only</span>
</div>

This quickstart shows how to build a custom image by the feature of `Image Builder`. Here we are going to build an image with **fastai v1 library for PyTorch** provided by [Fast.ai](https://www.fast.ai/) based on the [Jupyter base-notebook](https://github.com/jupyter/docker-stacks/tree/master/base-notebook). Fast.ai is a well-known for free online A.I. courses, please check its site if any interest.

## Steps

1. Goes to `Admin Dashboard` from the portal and `Image Builder` management.

2. Click `+ Add` for adding a custom image spec.

3. Fill `Name` with `fastai-v1` (or other name you like).

4. Fill `Base Image` with `jupyter/base-notebook`.

5. Don't check off `Use Image PullSecret`, a pull-secret is unnecessary since it is a public repository.

6. Fill `Conda` field with `-c pytorch -c fastai fastai` [[REF]](https://docs.fast.ai/index.html#Installation-and-updating) 

    (*Due to the full command is `conda install -c pytorch -c fastai fastai`*).

7.  **(Optional)** Fill `APT` field with `vim` (or other tools).

    (Due to base image is `Ubuntu` base, `APT` is its package management tool.)

8.  Click `Confirm` to save the custom image spec.

    ![](assets/qs-img-build-spec.png)

9.  A job is created with the pending status until the image-build job is triggered.

10. Once the status of job turns into `Succeeded`, we can copy the url of image for adding the image later on `Images` management so that users are able to use this image with built-in fastai v1 library. (*The url varies according to your circumstance.*)

    ![](assets/qs-img-build.png)

Alright, we have built our image successfully and gain the url of it. Go to [[quickstart] add image](add-image) to see how we add the image to be available for users on PrimeHub.

## Next

When we add images or assign base images, pulling these images may require secrets to have the permission. Next, let's try to add these secrets on Secret Management.
