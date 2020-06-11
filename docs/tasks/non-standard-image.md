---
id: non-standard-image
title: Non standard image
---

PrimeHub could support non-standard notebook images which are not originated from [Jupyter](https://hub.docker.com/u/jupyter) provided by other sources:

* Google [Deep Learning Container](https://cloud.google.com/ai-platform/deep-learning-containers/docs/choosing-container#choose_a_container_image_type)
* Nvidia [GPU-optimized containers](https://ngc.nvidia.com/catalog/all)

Those images are built with Python 3+ and Jupyter libraries. PrimeHub supports them by installing JupyterHub when starting a notebook.

## Precaution

There is no `jovyan` user (uid: 1000) and no `sudo` command in those 3rd-party images. Therefore, it is not possible to grant ownership of directories and files to `jovyan`. In most of cases, the owner could be `root`. 

When users (as `root`) launch a notebook and create/modify directories/files, owners of directories/files would be `root` so that these directories/files are not able to be accessed by the user `jovyan` from a standard notebook . If you bump into permission troubles, try `chown` for changing the ownership:

```
chown -R 1000:100 [directory or files]
```
