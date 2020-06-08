---
id: non-standard-image
title: Non standard image
---

PrimeHub could support non standard notebook images provided by others:

* Google [Deep Learning Container](https://cloud.google.com/ai-platform/deep-learning-containers/docs/choosing-container#choose_a_container_image_type)
* Nvidia [GPU-optimized containers](https://ngc.nvidia.com/catalog/all)

The images have built with Python 3+ and Jupyter libraries. PrimeHub support it by installing JupyterHub when we are starting a notebook.

## Precaution

There is not the `jovyan` user (uid: 1000) and the `sudo` command in the 3rd-party images. It is not possible to keep directories and files ownership to `jovyan`. The owner will be `root` probably.

When users launch a notebook and create or modify directories and files, their owner would be `root` and might not be accessed from a standard notebook by the `jovyan` user. If you got into trouble, try to fix it by `chown`:

```
chown -R 1000:100 [directory or files]
```