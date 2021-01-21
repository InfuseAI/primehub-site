---
id: version-3.3-model-deployment-prediction-apis
title: Prediction APIs
description: Prediction APIs
original_id: model-deployment-prediction-apis
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

## Endpoint Format

Follow the [seldon document](https://docs.seldon.io/projects/seldon-core/en/latest/reference/apis/external-prediction.html#prediction). 

The format is `http(s)://${primehub_domain}/deployment/${deployment_id}/api/v1.0/predictions`.

## Payload Message Format

Please check [Github](https://github.com/SeldonIO/seldon-core/blob/v1.5.0/python/seldon_core/utils.py#L588-L639) for more detail.

### ndarray

**Format**
```bash
curl -X POST http(s)://${endpoint} \
    -H 'Content-Type: application/json' \
    -d '{ "data": {"ndarray": [[5.964,4.006,2.081,1.031]]} }'
```

**Equivalent Code**
```python
X = np.array([[5.964,4.006,2.081,1.031]])
```

### tensor

**Format**
```bash
curl -X POST http(s)://${endpoint} \
    -H 'Content-Type: application/json' \
    -d '{ "data": {"tensor": {"shape":[1,4],"values":[5.964,4.006,2.081,1.031]}} }'
```

**Equivalent Code**
```python
X = np.array([5.964,4.006,2.081,1.031]).reshape([1,4])
```

### strData

**Format**
```bash
curl -X POST http(s)://${endpoint} \
    -H 'Content-Type: application/json' \
    -d '{ "strData": "any string" }'
```

**Equivalent Code**
```python
X = "any string"
```

### binData

**Format**
```bash
curl -X POST http(s)://${endpoint} \
    -F 'binData=@your_image.jpg'
```

**Equivalent Code**
```python
X = bytes(<content of your_image.jpg>)
```

Check [our example](https://github.com/InfuseAI/model-deployment-examples/blob/36abce467ab321aa4fdfd7dbb075e1532267ba6d/keras_mnist/MyModel.py#L13-L16) of how to handle the `binData` in the `predict` function.