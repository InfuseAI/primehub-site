---
id: version-3.5-model-deployment-prepackaged-server-sklearn
title: SKLearn server
description: SKLearn server
original_id: model-deployment-prepackaged-server-sklearn
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="deploy-only tooltip">Deploy
    <span class="tooltiptext">Applicable to Deploy Edition</span>
  </div>
</div>

## Model Information

### Basic

Property    | Description
------------|------
Model Image | `seldonio/sklearnserver_rest:1.3.0`
Input       | ndarray
Output      | ndarray
Repository | [Link](https://github.com/SeldonIO/seldon-core/tree/master/servers/sklearnserver)

### Model URI Structure

```bash
<model uri>
└── model.joblib
```

1. **model.joblib**: The model file should be saved by the `joblib` format. For more information, please see scikit-learn [Model persistence](https://scikit-learn.org/stable/modules/model_persistence.html) document


### How It Works

You can check the detailed code in the [Github](https://github.com/SeldonIO/seldon-core/blob/master/servers/sklearnserver/sklearnserver/SKLearnServer.py).
Here, we demonstrate by the pseudo-code.

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

The example uses the [scikit-learn iris dataset](https://scikit-learn.org/stable/auto_examples/datasets/plot_iris_dataset.html)

Property    | Description
------------|------
Model Image | `seldonio/sklearnserver_rest:1.3.0`
Model URI   | `gs://seldon-models/sklearn/iris`

**Test Request**

```bash
curl -X POST http://localhost:5000/api/v1.0/predictions \
    -H 'Content-Type: application/json' \
    -d '{ "data": {"tensor": {"shape": [1, 4], "values": [5.3, 3.5, 1.4, 0.2]}} }'
```

**Test Result**

```bash
{"data":{"names":["t:0","t:1","t:2"],"tensor":{"shape":[1,3],"values":[0.8700986370655746,0.1298937698872714,7.593047154034911e-06]}},"meta":{}}
```

