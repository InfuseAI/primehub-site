---
id: notebook-kernel-process
title: Notebook with kernel process
---

We support to start a notebook with a separated kernel process, and it could be enabled by `PRIMEHUB_FEATURE_ENABLE_KERNEL_GATEWAY` flag.

## Basic idea

After notebook 6.0.0, it support the nb2kg (notebook to kernel gateway) feature and we could use different image to serve notebook and kernel process.

The benefit is:

1. keep notebook as view to user, we maintain some front package, such as npm module and notebook extension for notebook.
2. kernel image only to install notebook kernel modules and `jupyter-kernel-gateway` package

To separate frontend (notebook) and backend (kernel) could avoid to maintain lots of combination of software packages and versions.

## Implementation

By default, primehub instance launches a notebook using a image that is a user picked in the spwaner page.

For seperated kernel process:

1. using a user selected image to launch kernel process
  * we install `kernel-gateway` package before launch kernel process
2. launching notebook process with our prebuilt or standard notebook image (any image contains `nb2kg` package)
3. overwrite the annotation `auditing.image` with use selected image

Any resources settings are moving to kernel container's resource spec and unset resource spec in the notebook container.

## Future Work

1. should support air-gap with a prebuilt `kernel-gateway` (for now, we do it by `pip install`)
