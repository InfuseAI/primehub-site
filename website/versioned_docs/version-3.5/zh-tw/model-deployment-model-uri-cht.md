---
id: version-3.5-model-deployment-model-uri-cht
title: Model URI 路徑
description: Model URI 路徑
sidebar_label: Model URI
original_id: model-deployment-model-uri-cht
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="deploy-only tooltip">Deploy
    <span class="tooltiptext">Applicable to Deploy Edition</span>
  </div>
</div>

## 已支援 URIs

Type | Format | Note
-----|--------|------
Google Cloud Storage | `gs://mybucket/path/to/my/model` | google cloud storage bucket 需設為公開
PHFS | `phfs:///path/to/my/model` | 此路徑對應到 PrimeHub Notebook 為 `/phfs/path/to/the/model` 路徑。

## 以 Docker 來測試

Model deployment 採用 `gcr.io/kfserving/storage-initializer` 映像檔來下載位於 `gs://` 模型檔至 `/mnt/models` 目錄。

範例指令，測試實際網路環境下載是否如預期：

```bash
docker run -v ${PWD}/models:/mnt/models --rm  \
  gcr.io/kfserving/storage-initializer \
  gs://primehub-models/pytorch/CIFAR10 \
  /mnt/models
```
