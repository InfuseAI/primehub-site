---
id: guideline-custom-image
title: Custom image guideline
---

## Preface

This document is a guideline of building images for PrimeHub.

## Context

You can build images on top of an existing Docker image from official `jupyter/docker-stacks` or from `infuseai/docker-stacks`.

### From Jupyter

E.g. a Dockerfile using a existing Jupyter image.

    FROM jupyter/minimal-notebook:177037d09156
    # Get the latest image tag at:
    # https://hub.docker.com/r/jupyter/minimal-notebook/tags/
    # Inspect the Dockerfile at:
    # https://github.com/jupyter/docker-stacks/tree/master/minimal-notebook/Dockerfile
    
    
    # install additional package for customization
    RUN pip install --no-cache-dir astropy

Here you can find the Jupyterhub [Customization guide](https://zero-to-jupyterhub.readthedocs.io/en/latest/customizing/user-environment.html#customize-an-existing-docker-image) for detail and [Jupyter/docker-stacks](https://github.com/jupyter/docker-stacks) for the reference.

### From InfuseAI

Note: A read_registry token is required to access the registry, please contact InfuseAI to acquire the token.

InfuseAI docker images are stored on gitlab `registry.gitlab.com/infuseai/docker-stacks/[image]` , the images are provided in the hierarchy.

- **base-notebook:** conda, jupyter
    - **minimal-notebook:** OS packages
        - **scipy-notebook:** python packages
            - **datascience-notebook:** R and Julia
            - **tensorflow-notebook:** tensorflow
            - **pytorch-notebook:** pytorch
    - **r-notebook:** R

You can pull these existing images and build own images on top of them.

Please check [how to access a private registry on gitlab](https://docs.gitlab.com/ee/user/packages/container_registry/#using-with-private-projects).

## Reference

For more about docker registry, you can check [Docker Registry](https://docs.docker.com/registry/introduction/).

For more about Dockerfile, you can check the [**Dockerfile reference**](https://docs.docker.com/engine/reference/builder/) and [**Best practices**](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/).
