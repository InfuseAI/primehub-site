---
id: model-deployment-tutorial-prepackage-image
title: Prepackage a Base Image and Use It
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

This doc shows how to build a base image and use it. Using the base image has some benefits:

1. If the way you load and use models is the same, these models can share the same base image
2. If you just want to update the model file, a base image can speed up the building process 

The idea is that you write a general model serving code and assume the model file is placed under a certain path. And build it as the base image by `s2i`.

When a model file is ready, use `docker` to copy the model file into the correct path and build the model deployment image.

In the following section, this doc uses Tensorflow 2 as a simple showcase. The code is under [Github](https://github.com/InfuseAI/model-deployment-examples/tree/master/tensorflow2_prepackage).

## Prerequisites

- Docker: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
- S2I (Source-To-Image): [https://github.com/openshift/source-to-image#installation](https://github.com/openshift/source-to-image#installation)

Check everything is ready to go by running:
```bash
s2i usage seldonio/seldon-core-s2i-python3:0.18
```

## Build the Base Image (Python)

- Please use Python 3.6 (Recommended)

- Write a general model serving code `Model.py`
    ```python
    import tensorflow as tf

    class Model:
        def __init__(self):
            self._model = tf.keras.models.load_model('model')

        def predict(self, X, feature_names=None, meta=None):
            output = self._model.predict(X)
            return output
    ```

- Create a `requirements.txt` file and write down all required packages
    ```txt
    tensorflow==2.1.0
    ```

- Create a `.s2i` folder and create a `.s2i/environment` file with the following content:
    ```script
    MODEL_NAME=Model
    API_TYPE=REST
    SERVICE_TYPE=MODEL
    PERSISTENCE=0
    ```

Build the base image by:
```bash
 s2i build . seldonio/seldon-core-s2i-python3:0.18 tensorflow2-prepackage
```
(Using `seldonio/seldon-core-s2i-python3` instead if using Python 3 rather than Python 3.6)


## Use the Base Image to Build the Model Deployment Image

Based on our previous base image, whenever you have a model outputted by:
```python
model.save(export_path)
```
You can use this base image to build your model deployment image.

First, create a `Dockerfile`:
```txt
FROM tensorflow2-prepackage
COPY export_path model 
```
(Please replace the `export_path` to your path)

This means you copy your model files into the path that you pre-defined in the base image code.

Then, you can build the model deployment image by:
```bash
docker build -t tensorflow2-prepackage-model .
```


## Verify Your Model Deployment Image

In order to verify the image, you can run it:
```bash
docker run -p 5000:5000 --rm tensorflow2-prepackage-model
```

And send a post request by the following format:
```bash
curl -X POST localhost:5000/api/v1.0/predictions \
    -H 'Content-Type: application/json' \
    -d '{ "data": {"ndarray": [${INPUT_DATA}] } }'
```
The ${INPUT_DATA} is the data that you can feed into deployed model for prediction.

Note, the dimension of input data must be same as model's input shape. 

For example, if we create our model to specify input_shape=(4,) by the following definition:
```python
model = tf.keras.models.Sequential([
    keras.layers.Dense(64, activation='relu', input_shape=(4,)),
    ...
    ...
])
```

Then, we can send a post request that ${INPUT_DATA} with shape 4.
```bash
curl -X POST localhost:5000/api/v1.0/predictions \
    -H 'Content-Type: application/json' \
    -d '{ "data": {"ndarray": [[5.1, 3.3, 1.7, 0.5]] } }'
```

Or if we create our model to specify input_shape=(2,2) by the following definition:
```python
model = tf.keras.models.Sequential([
    keras.layers.Dense(64, activation='relu', input_shape=(2,2)),
    ...
    ...
])
```

Then, we can also send a post request that ${INPUT_DATA} with shape (2,2).
```bash
curl -X POST localhost:5000/api/v1.0/predictions \
    -H 'Content-Type: application/json' \
    -d '{ "data": {"ndarray": [[[5.1, 3.3], [1.7, 0.5]]] } }'
```

After sent the post request, we can obtain the response output in the following format:
```bash
{"data":{"names":[],"ndarray":[${PREDICTION_RESULT}]},"meta":{}}
```
The ${PREDICTION_RESULT} is a list to represent the prediction value.

For example, the following output shows three prediction values in each class.
```bash
{"data":{"names":[],"ndarray":[[3.093,-0.519,-8.918]]},"meta":{}}
```

After verified your model deployment image, now you can use this image in the PrimeHub model deployment function.

## Share Your Base Image

Share your base image by pushing it to a docker registry.

Therefore, others don't need to write the model serving code again. They can share the same base image and build a model deployment image by `docker`.