---
id: image-builder
title: Image Builder (obsolete)
---

Provide a way for admin to build images with custom packages.

## Design

![](assets/custom-image-flow-diagram.png)

We use a CRD ImageSpec to get specific definition of our image setup, [primehub-controller](https://github.com/InfuseAI/primehub-controller) will base on it to generate a CRD ImageSpecJob for an image building job, ImageSpecJob likes a revision of ImageSpec. Then the controller will convert package manifest to a Dockerfile and create a corresponding pod to build the Dockerfile through [buildah](https://github.com/containers/buildah). Once the status of building pod changes, it will be updated back to `.status` in ImageSpecJob and ImageSpec. Once the building job succeeded, the built image will be pushed to the container registry that we configured.

### Image Builder (obsolete) spec

[An ImageSpec example](https://github.com/InfuseAI/primehub-controller/blob/master/config/samples/primehub_v1alpha1_imagespec.yaml). You can modify `.spec.baseImage` value to extend exisiting docker image with custom packages, we support `.spec.packages.apt`, `.spec.packages.pip` and `.spec.packages.conda`.

### Check building job status

Job's current status will update `.status` in ImageSpecJob and the status of the newest ImageSpecJob will be updated to ImageSpec that we created before.

### Update spec and rebuild image

Primehub-controller keeps watching ImageSpecs. When you update values about `.spec.baseImage`, `.spec.packages` in ImageSpec, primehub-controller will create a new ImageSpecJob and start a new building job automatically.

