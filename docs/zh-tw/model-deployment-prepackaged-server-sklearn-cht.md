---
id: model-deployment-prepackaged-server-sklearn-cht
title: SKLearn Model Server
description: SKLearn Model Server
sidebar_label: SKLearn server
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

## Model Information

### 基本資訊

Property    | Description
------------|------
Model Image | `seldonio/sklearnserver_rest:1.3.0`
Input       | ndarray
Output      | ndarray
Repository | [Link](https://github.com/SeldonIO/seldon-core/tree/master/servers/sklearnserver)

### Model URI 檔案結構

```bash
<model uri>
└── model.joblib
```

1. **model.joblib**: `joblib` 輸出模型檔。 詳細資訊，請見 scikit-learn [Model persistence](https://scikit-learn.org/stable/modules/model_persistence.html)。


### How It Works

完整範例代碼，請見 [Github](https://github.com/SeldonIO/seldon-core/blob/master/servers/sklearnserver/sklearnserver/SKLearnServer.py)。

#### 摘要代碼

**Load the model**
```python
def __init__(self, model_uri):
    model_file = load_from_model_uri(model_uri)
    self._joblib = joblib.load(model_file)
```

**Predict**
```python
def predict(self, X):
    return self._joblib.predict_proba(X)
```

## Example

範例採用 [scikit-learn iris dataset](https://scikit-learn.org/stable/auto_examples/datasets/plot_iris_dataset.html)

Property    | Description
------------|------
Model Image | `seldonio/sklearnserver_rest:1.3.0`
Model URI   | `gs://seldon-models/sklearn/iris`

**請求範例**

```bash
curl -X POST http://localhost:5000/api/v1.0/predictions \
    -H 'Content-Type: application/json' \
    -d '{ "data": {"tensor": {"shape": [1, 4], "values": [5.3, 3.5, 1.4, 0.2]}} }'
```

**回應範例**

```bash
{"data":{"names":["t:0","t:1","t:2"],"tensor":{"shape":[1,3],"values":[0.8700986370655746,0.1298937698872714,7.593047154034911e-06]}},"meta":{}}
```
