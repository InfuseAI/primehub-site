---
id: model-deployment-model-uri
title: Model URI
description: Model URI
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

## Supported URIs

Type | Format | Note
-----|--------|------
Google Cloud Storage | `gs://mybucket/path/to/my/model` | Please make sure your google cloud storage bucket is public.
PHFS | `phfs:///path/to/my/model` | This path is mapped to `/phfs/path/to/the/model` path in the PrimeHub Notebook.

## Test by Docker

In model deployment, we use the `gcr.io/kfserving/storage-initializer` image to download the model files into the `/mnt/models` folder.

You can use the following command to test if the download process is work as expected.

```bash
docker run -v ${PWD}/models:/mnt/models --rm  \
  gcr.io/kfserving/storage-initializer \
  gs://primehub-models/pytorch/CIFAR10 \
  /mnt/models
```