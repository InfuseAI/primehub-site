---
id: version-3.10-custom-image-guideline
title: Custom Image Guideline
description: Custom Image Guideline
original_id: custom-image-guideline
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

## Build Custom Images

With `Image` feature, administrators can build custom images for users according to requirements of environment such as pre-installed python packages, environmental variables configurations, and so on. Those prerequisites which were required to set up manually every time can be set up once in images. Users are able to re-use images to proceed to projects without spending time on environment setup after images are instantiated as containers.

Basically, we can use `Images` to build any images we want; in terms of images for PrimeHub, we use images for two conditions, one is for **Job Submission**, the other is for **JupyterHub**.

### For Job Submission

Since requirements for running jobs are varied with tasks. As long as images are valid to be instantiated as containers, we can select those images as environments for running jobs.

### For JupyterHub

Only images which are installed with JupyterHub environment are able to be used for launching JupyterHub in PrimeHub. PrimeHub expects installed JupyterHub inside the image; after starting the container, PrimeHub tries to launch Jupyter environment.

For the sake of building images with JupyterHub, we must use base images which are JupyterHub-compatible; we can have them from official registries.

### Official Registry

There are two official registries where we can have JupyterHub-compatible base images, one is from **Jupyter**, the other is from **InfuseAI**.

Please refer to the [Available Images List](images-list) for details on images maintained by InfuseAI.

|Provider|Registry|Reference|
|------|--------|----|
|Jupyter|`jupyter/docker-stacks`|[Jupyter Docker Stacks](https://jupyter-docker-stacks.readthedocs.io/en/latest/using/selecting.html)|
|InfuseAI|`registry.gitlab.com/infuseai/docker-stacks/`|A **read_registry token** is required to access the registry, please contact **InfuseAI** to acquire the token.|
|InfuseAI|`infuseai/docker-stacks/`|[InfuseAI Docker Stacks](https://hub.docker.com/r/infuseai/docker-stacks/tags)|


## Build Images via Images

We can build images via `Images` by specification of a base image with required packages, please goes to [Images](admin-image#build-custom-image) feature for details and try a [build image](../quickstart/build-image) quickstart.

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
