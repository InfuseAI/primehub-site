---
id: custom-image-guideline
title: Custom Image Guideline
description: Custom Image Guideline
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

## Build Images

Before `Image Builder` feature is released, administrators can only add images from valid registries on Image Management of PrimeHub.

With `Image Builder` feature, administrators can build custom images for users according to requirements of environment such as pre-installed python packages, environmental variables configurations, and so on. Those prerequisites which were required to set up manually every time can be set up once in images. Users are able to re-use images to proceed to projects without spending time on environment setup after images are instantiated as containers.

Basically, we can use `Image Builder` to build any images we want; in terms of images for PrimeHub, we use images for two conditions, one is for **Job Submission**, the other is for **JupyterHub**.

### For Job Submission

Since requirements for running jobs are varied with tasks. As long as images are valid to be instantiated as containers, we can select those images as environments for running jobs.

### For JupyterHub

Only images which are installed with JupyterHub environment are able to be used for launching JupyterHub in PrimeHub. PrimeHub expects installed JupyterHub inside the image; after starting the container, PrimeHub tries to launch Jupyter environment.

For the sake of building images with JupyterHub, we must use base images which are JupyterHub-compatible; we can have them from official registries.

### Official Registry

There are two official registries where we can have JupyterHub-compatible base images, one is from **Jupyter**, the other is from **InfuseAI**.

|Provider|Registry|Reference|
|------|--------|----|
|Jupyter|`jupyter/docker-stacks`|https://github.com/jupyter/docker-stacks|
|InfuseAI|`registry.gitlab.com/infuseai/docker-stacks/`|A **read_registry token** is required to access the registry, please contact **InfuseAI** to acquire the token.|
|InfuseAI|`infuseai/docker-stacks/`|https://hub.docker.com/r/infuseai/docker-stacks/tags|

**Images provided by InfuseAI are:**

|Base|image|Description|
|----|-----|-----------|
|N/A|`base-notebook`|Conda, Jupyter|
|base-notebook|`r-notebook`|R|
|base-notebook|`minimal-notebook`|OS packages|
|minimal-notebook|`scipy-notebook`|Python packages|
|minimal-notebook|`datascience-notebook`|R and Julia|
|minimal-notebook|`tensorflow-notebook`|TensorFlow|
|minimal-notebook|`pytorch-notebook`|Pytorch|

## Build Images via Image Builder

We can build images via `Image Builder` by specification of a base image with required packages, please goes to [Image Builder](admin-build-image) feature for details and try a [build image](../quickstart/build-image) quickstart.<span class="ee-only">Enterprise</span>

### Use DockerHub Registry

Once images are built via **Image Builder**, they will be pushed to a specified repositories of a registry. Here we have a document introducing [How to configure PrimeHub using a DockerHub registry for Image Builder](../tasks/dockerhub-registry.md).

## Build Images via Dockerfile

### From Jupyter

E.g. a Dockerfile using a existing Jupyter image.

``` dockerfile
FROM jupyter/minimal-notebook:177037d09156
# Get the latest image tag at:
# https://hub.docker.com/r/jupyter/minimal-notebook/tags/
# Inspect the Dockerfile at:
# https://github.com/jupyter/docker-stacks/tree/master/minimal-notebook/Dockerfile


# install additional package for customization
RUN pip install --no-cache-dir astropy
```

### From InfuseAI

E.g. a Dockerfile using a existing image provided by InfuseAI.

``` dockerfile
FROM infuseai/docker-stacks/<image>
```

### Dockerfile Reference

1. [Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
2. [Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)


## Images Built by repo2docker 

For tech savvy users who want to try [repo2docker](https://repo2docker.readthedocs.io/en/latest/) for building images. Please see our technical document [repo2docker image](../tasks/repo2docker.md) to make sure it can be used by PrimeHub.
