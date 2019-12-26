---
id: custom-image
title: Custom Image
---

Provide a way for admin to build images with custom packages.


## Configuration


### Settings
Please add this variable to the `.env` file. 

Name | Value 
--- | ----- 
`PRIMEHUB_FEATURE_CUSTOM_IMAGE` | `true`
`PRIMEHUB_CUSTOM_IMAGE_REGISTRY_ENDPOINT` | The registry the built image to push
`PRIMEHUB_CUSTOM_IMAGE_REGISTRY_USERNAME` | Login user name for registry
`PRIMEHUB_CUSTOM_IMAGE_REGISTRY_PASSWORD` | Login password for registry
`PRIMEHUB_CUSTOM_IMAGE_REPO_PREFIX` | The image prefix for the build image. The result image will be `<repo prefix>/<image>:<tag>`


### Using GCR (Goolge Container Registry)

1. please reference this [official document for GCR](https://cloud.google.com/container-registry/docs/advanced-authentication) to get the username and password

2. The username is always `_json_key`. The password is the keyfile json. Please make it an one-line json string so that we can put it in the environment variable. 

    ```
    cat keyfile | jq -c .
    ```
3. Setup the environment valuable to `.env`. Here is an example

    ```
    PRIMEHUB_FEATURE_CUSTOM_IMAGE=true
    PRIMEHUB_CUSTOM_IMAGE_REGISTRY_ENDPOINT=https://gcr.io
    PRIMEHUB_CUSTOM_IMAGE_REGISTRY_USERNAME=_json_key
    PRIMEHUB_CUSTOM_IMAGE_REGISTRY_PASSWORD='{"type":"service_account","project_id":....gserviceaccount.com"}'
    PRIMEHUB_CUSTOM_IMAGE_REPO_PREFIX=gcr.io/my-private-repo
    ```


## Design

![](assets/custom-image-flow-diagram.png)

We use a CRD ImageSpec to get specific definetion of our image setup, [primehub-controller](https://github.com/InfuseAI/primehub-controller) will base on it to generate a CRD ImageSpecJob for image building job, ImageSpecJob likes a revision of ImageSpec. Then controller will convert package manifest to a Dockerfile and create a corresponding pod to build the Dockerfile through [buildah](https://github.com/containers/buildah). Once the status of building pod changes, it wil be updated back to `.status` in ImageSpecJob and ImageSpec. Once the building job succeeded, the built image will be pushed to container registry that we configured.

### Custom image spec

[An ImageSpec example](https://github.com/InfuseAI/primehub-controller/blob/master/config/samples/primehub_v1alpha1_imagespec.yaml). You can modify `.spec.baseImage` value to extend exisiting docker image with custom packages, we support `.spec.packages.apt`, `.spec.packages.pip` and `.spec.packages.conda`.

### Check building job status

Job's current status will update `.status` in ImageSpecJob and the status of the newest ImageSpecJob will be updated to ImageSpec that we created before.

### Update spec and rebuild image

Primehub-controller keeps watching ImageSpecs. When you update values about `.spec.baseImage`, `.spec.packages` in ImageSpec, primehub-controller will create a new ImageSpecJob and start a new building job automatically.

