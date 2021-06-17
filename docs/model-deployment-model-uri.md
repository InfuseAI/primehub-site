---
id: model-deployment-model-uri
title: Model URI
description: Model URI
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="deploy-only tooltip">Deploy
    <span class="tooltiptext">Applicable to Deploy Edition</span>
  </div>
</div>

## Supported URIs

Type | Format | Note
-----|--------|------
Google Cloud Storage | `gs://mybucket/path/to/my/model` | Please make sure your google cloud storage bucket is public.
PHFS | `phfs:///path/to/my/model` | This path is mapped to `/phfs/path/to/the/model` path in the PrimeHub Notebook.
MLflow Model | `models:/model-name/version` | It maps to the MLflow Model Registry. The version could be either a version number or the stage of a model.
NFS | `nfs://1.2.3.4/to/my/model` | This path is mapped to `/nfs/to/my/model` in the Model Deployment containers

## How does the Model URI work?

If a PrimeHub Deployment runs with a **Model URI**, it will start a model downloader before a deployment gets ready to serve.

The deployment and its model downloader will share the same volume `/mnt/models`. When the downloader finished its job, the deployment could load and create a model to serve.

## Test GCS Model URI by Docker

In model deployment, we use the `gcr.io/kfserving/storage-initializer` image to download the model files into the `/mnt/models` folder.

You can use the following command to test if the download process is work as expected.

```bash
docker run -v ${PWD}/models:/mnt/models --rm  \
  gcr.io/kfserving/storage-initializer \
  gs://primehub-models/pytorch/CIFAR10 \
  /mnt/models
```