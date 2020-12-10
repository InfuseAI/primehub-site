---
id: model-deployment-prediction-apis
title: Prediction APIs
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

### tensor

**Format**
```bash
curl -X POST http(s)://${endpoint} \
    -H 'Content-Type: application/json' \
    -d '{ "data": {"tensor": {"shape":[1,4],"values":[5.964,4.006,2.081,1.031]}} }'
```

### strData

**Format**
```bash
curl -X POST http(s)://${endpoint} \
    -H 'Content-Type: application/json' \
    -d '{ "strData": "any string" }'
```

### binData

**Format**
```bash
curl -X POST http(s)://${endpoint} \
    -F 'binData=@your_image.jpg'
```