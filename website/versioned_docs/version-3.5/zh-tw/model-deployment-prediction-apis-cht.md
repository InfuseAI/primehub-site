---
id: version-3.5-model-deployment-prediction-apis-cht
title: Prediction APIs
description: Prediction APIs
original_id: model-deployment-prediction-apis-cht
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="deploy-only tooltip">Deploy
    <span class="tooltiptext">Applicable to Deploy Edition</span>
  </div>
</div>

## Endpoint Format

參照 [Seldon 文件](https://docs.seldon.io/projects/seldon-core/en/latest/reference/apis/external-prediction.html#prediction). 

API 格式為 `http(s)://${primehub_domain}/deployment/${deployment_id}/api/v1.0/predictions`.

## Payload Message Format

參照 [Github](https://github.com/SeldonIO/seldon-core/blob/v1.5.0/python/seldon_core/utils.py#L588-L639) L588-L639 行代碼。

### ndarray

**請求格式**

```bash
curl -X POST http(s)://${endpoint} \
    -H 'Content-Type: application/json' \
    -d '{ "data": {"ndarray": [[5.964,4.006,2.081,1.031]]} }'
```

**等同代碼**

```python
X = np.array([[5.964,4.006,2.081,1.031]])
```

### tensor

**請求格式**

```bash
curl -X POST http(s)://${endpoint} \
    -H 'Content-Type: application/json' \
    -d '{ "data": {"tensor": {"shape":[1,4],"values":[5.964,4.006,2.081,1.031]}} }'
```

**等同代碼**

```python
X = np.array([5.964,4.006,2.081,1.031]).reshape([1,4])
```

### strData

**請求格式**

```bash
curl -X POST http(s)://${endpoint} \
    -H 'Content-Type: application/json' \
    -d '{ "strData": "any string" }'
```

**等同代碼**

```python
X = "any string"
```

### binData

**請求格式**

```bash
curl -X POST http(s)://${endpoint} \
    -F 'binData=@your_image.jpg'
```

**等同代碼**

```python
X = bytes(<content of your_image.jpg>)
```

參照 [範例代碼](https://github.com/InfuseAI/model-deployment-examples/blob/36abce467ab321aa4fdfd7dbb075e1532267ba6d/keras_mnist/MyModel.py#L13-L16) 在 `predict` function 中如何處理 `binData`。