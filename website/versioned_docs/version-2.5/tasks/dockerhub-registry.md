---
id: version-2.5-dockerhub-registry
title: Use DockerHub Registry
original_id: dockerhub-registry
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
</div>

## Use DockerHub Registry For Image Builder

PrimeHub provides `Image Builder` feature to let administrators build custom images. Once images are built successfully, they will be pushed into specified repositories of a registry. Here we show to how to configure PrimeHub using **DockerHub** registry for it.

## Prerequisites

It requires to have authorized permissions of accessing PrimeHub folder, `.env` file in the real circumstance and authorized permissions of accessing the DockerHub account.

## Steps

### Set up DockerHub registry 

1. Sign in DockerHub.
    
2. Go to `Account Settings`/`Security`/`Access Tokens` Generate new access token and save it. (REF: [Managing access tokens](https://docs.docker.com/docker-hub/access-tokens/)).

3. Create a repository and note down the `<namespace>` and `<repo name>`; we need them for `.env` variables.

4. Edit `.env` and set up environmental variables; if some variables don't exist in the file, please add them back.
    |ENV                             |Value|
    |--------------------------------|-----|
    |`PRIMEHUB_FEATURE_CUSTOM_IMAGE`|`true`|
    |`PRIMEHUB_CUSTOM_IMAGE_REGISTRY_ENDPOINT`|`docker.io`|
    |`PRIMEHUB_CUSTOM_IMAGE_REGISTRY_USERNAME`|`<your_docker_hub_username>`|
    |`PRIMEHUB_CUSTOM_IMAGE_REGISTRY_PASSWORD`|`<your_access_token>`|
    |`PRIMEHUB_CUSTOM_IMAGE_REPO_PREFIX`|`docker.io/<namespace>`|

5. Run commands to install the component according to `.env`.

    ```bash
    cd ${PRIMEHUB_REPO}
    make component-diff-primehub # check diff
    make component-install-primehub # apply
    ```

We have configured PrimeHub using DockerHub registry, from then images which are built via Image Builder will be pushed into specified repositories on DockerHub.

### Build Image via Image Builder

When creating an image spec in `Image Builder`, fill existing `<repo name>` identically in `Name` field of image spec with other specifications. Once the image is built successfully, it will be pushed into the `<repo name>` we have specified and created.

**Be cautious: "repo name" and "image spec name" must be identical.** The image will be push into identical repository.

1. Add Image Spec via Image Builder

    + `Name`: `test-build` is our `<repo-name>` on DockerHub.
  
    + `Base Image`: `registry.gitlab.com/infuseai/docker-stacks/scipy-notebook` is one of base images provided by InfuseAI officially; Please see [Custom Image Guideline](../guide_manual/custom-image-guideline.md).

    + `Use Image PullSecret`: Since we use a base image from InfuseAI official registry which is not open to public, which means we have to choose the proper secret for accessing the registry; Please see [Pull secret for GitLab](../quickstart/secret-pull-image.md) and contact InfuseAI for the secret.

    ![](assets/dockerhub-image-builder.png)

2. Once the image is built and published successfully, the image url shows **registry/namespace/repository** `docker.io/gabrielxinfuseai/test-build`.

    ![](assets/dockerhub-job-image-build.png)

3. From DockerHub, it shows the image is published from **Image Builder of PrimeHub**.

    ![](assets/dockerhub-test-build.png)

### Utilize Image

We can let users utilize the image by adding the image with url on Image Management; Please see [Image Management](../guide_manual/admin-image) and quickstart [Add Image](add-image.md).
