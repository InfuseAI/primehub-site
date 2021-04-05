---
id: model-deployment-language-wrapper-reusable-base-image
title: Package a Model Image from a Reusable Base Image
description: Package a Model Image from a Reusable Base Image
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="deploy-only tooltip">Deploy
    <span class="tooltiptext">Applicable to Deploy Edition</span>
  </div>
</div>

## Overview

This document shows the best practice to reuse a base image and build the model image on top of the base image. Using the base image has some benefits:

1. If the way you load and use models is the same, these models can share the same base image
2. If you just want to update the model file, a base image can speed up the building process

The idea is that you write a general model serving code and assume the model file is placed under a certain path. As a model is ready, use `docker build` to generate the model image from the base image along with the model files.

To prepare the base image, there are two methods

1. Build the base image by Language Wrapper
1. Use pre-packaged server as Base Image

## Prerequisites

- Docker: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

## Build the Base Image by Language Wrapper
Here, we use Tensorflow 2 as a simple showcase. The code is under [Github](https://github.com/InfuseAI/model-deployment-examples/tree/master/tensorflow2_prepackage).

### Build the Base Image

- Write a general model serving code `Model.py`.
    ```python
    import tensorflow as tf

    class Model:
        def __init__(self):
            self.loaded = False

        def load(self):
            self._model = tf.keras.models.load_model('model')
            self.loaded = True

        def predict(self, X, feature_names=None, meta=None):
            if not self.loaded:
                self.load()
            output = self._model.predict(X)
            return output
    ```

- Create a `requirements.txt` file and write down all required packages.
    ```text
    seldon-core==1.6.0
    tensorflow==2.3.1
    ```

- Create a `Dockerfile` with the following content.
    ```dockerfile
    FROM python:3.7-slim
    COPY . /app
    WORKDIR /app
    RUN pip install -r requirements.txt
    EXPOSE 9000

    # Define environment variable
    ENV MODEL_NAME Model
    ENV SERVICE_TYPE MODEL
    ENV PERSISTENCE 0

    CMD exec seldon-core-microservice $MODEL_NAME --service-type $SERVICE_TYPE --persistence $PERSISTENCE --access-log
    ```

- Build the base image.
    ```bash
    docker build . -t tensorflow2-prepackage
    ```

### Build the Model Image

- Based on our previous base image, whenever you have a model outputted by
    ```python
    model.save(export_path)
    ```
    You can use this base image to build your model deployment image.

- First, create a `Dockerfile`.
    ```text
    FROM tensorflow2-prepackage
    COPY export_path model
    ```
    (Please replace the `export_path` to your path)

    This means you copy your model files into the path that you pre-defined in the base image code.

- Then, you can build the model deployment image.
    ```bash
    docker build . -t tensorflow2-prepackage-model
    ```

### Verify the Model Image

- To verify the image, you can run it.
    ```bash
    docker run -p 5000:5000 --rm tensorflow2-prepackage-model
    ```

- And send a post request by the following format.
    ```bash
    curl -X POST localhost:5000/api/v1.0/predictions \
        -H 'Content-Type: application/json' \
        -d '{ "data": {"ndarray": [${INPUT_DATA}] } }'
    ```
    The `${INPUT_DATA}` is the data that you can feed into the deployed model for prediction.

    >The **dimension** of input data must be the same as the model's input shape.

- For example, if we create our model with a specified `input_shape=(4,)` by the following definition.
    ```python
    model = tf.keras.models.Sequential([
        keras.layers.Dense(64, activation='relu', input_shape=(4,)),
        ...
        ...
    ])
    ```

- Then, we can send a post request that ${INPUT_DATA} with shape 4.
    ```bash
    curl -X POST localhost:5000/api/v1.0/predictions \
        -H 'Content-Type: application/json' \
        -d '{ "data": {"ndarray": [[5.1, 3.3, 1.7, 0.5]] } }'
    ```

- Or if we create our model with a specified `input_shape=(2,2)` by the following definition.
    ```python
    model = tf.keras.models.Sequential([
        keras.layers.Dense(64, activation='relu', input_shape=(2,2)),
        ...
        ...
    ])
    ```

- Then, we can also send a post request that ${INPUT_DATA} with shape (2,2).
    ```bash
    curl -X POST localhost:5000/api/v1.0/predictions \
        -H 'Content-Type: application/json' \
        -d '{ "data": {"ndarray": [[[5.1, 3.3], [1.7, 0.5]]] } }'
    ```

- After sending the post request, we can obtain the response output in the following format.
    ```bash
    {"data":{"names":[],"ndarray":[${PREDICTION_RESULT}]},"meta":{}}
    ```
    The `${PREDICTION_RESULT}` is a list to represent the prediction value.

- For example, the following output shows three prediction values in each class.
    ```bash
    {"data":{"names":[],"ndarray":[[3.093,-0.519,-8.918]]},"meta":{}}
    ```

    After verifying your model deployment image, now you can use this image in the PrimeHub model deployment feature.

## Use Pre-packaged Server as Base Image

Here, we use the [tensorflow2 pre-packaged server](model-deployment-prepackaged-server-tensorflow2.md) as an example.

### Build the Model Image

- First, prepare the model files. We can use the example model in github. The model files can be found in `tensorflow2/example_model/mnist`.
    ```bash
    git clone git@github.com:InfuseAI/primehub-seldon-servers.git
    cd primehub-seldon-servers
    ```

- Then, create a Dockerfile, in which we copy the model files into the `/mnt/models` and tell the pre-packaged server to use this path as `model_uri`.
    ```dockerfile
    FROM infuseai/tensorflow2-prepackaged:v0.1.0
    COPY tensorflow2/example_model/mnist /mnt/models
    ENV PREDICTIVE_UNIT_PARAMETERS='[{"name":"model_uri","value":"/mnt/models","type":"STRING"}]'
    ```

- Build the image from the Dockerfile.
    ```bash
    docker build . -t tensorflow2-prepackage-model
    ```

### Verify the Model Image
- Run the model server.
    ```bash
    docker run -p 9000:9000 --rm tensorflow2-prepackage-model
    ```

- Verify the model server.
    ```bash
    curl -X POST http://localhost:9000/api/v1.0/predictions \
        -H 'Content-Type: application/json' \
        -d '{ "data": {"ndarray": [[[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.32941176470588235, 0.7254901960784313, 0.6235294117647059, 0.592156862745098, 0.23529411764705882, 0.1411764705882353, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8705882352941177, 0.996078431372549, 0.996078431372549, 0.996078431372549, 0.996078431372549, 0.9450980392156862, 0.7764705882352941, 0.7764705882352941, 0.7764705882352941, 0.7764705882352941, 0.7764705882352941, 0.7764705882352941, 0.7764705882352941, 0.7764705882352941, 0.6666666666666666, 0.20392156862745098, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2627450980392157, 0.4470588235294118, 0.2823529411764706, 0.4470588235294118, 0.6392156862745098, 0.8901960784313725, 0.996078431372549, 0.8823529411764706, 0.996078431372549, 0.996078431372549, 0.996078431372549, 0.9803921568627451, 0.8980392156862745, 0.996078431372549, 0.996078431372549, 0.5490196078431373, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.06666666666666667, 0.25882352941176473, 0.054901960784313725, 0.2627450980392157, 0.2627450980392157, 0.2627450980392157, 0.23137254901960785, 0.08235294117647059, 0.9254901960784314, 0.996078431372549, 0.41568627450980394, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3254901960784314, 0.9921568627450981, 0.8196078431372549, 0.07058823529411765, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.08627450980392157, 0.9137254901960784, 1.0, 0.3254901960784314, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5058823529411764, 0.996078431372549, 0.9333333333333333, 0.17254901960784313, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.23137254901960785, 0.9764705882352941, 0.996078431372549, 0.24313725490196078, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5215686274509804, 0.996078431372549, 0.7333333333333333, 0.0196078431372549, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.03529411764705882, 0.803921568627451, 0.9725490196078431, 0.22745098039215686, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.49411764705882355, 0.996078431372549, 0.7137254901960784, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.29411764705882354, 0.984313725490196, 0.9411764705882353, 0.2235294117647059, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.07450980392156863, 0.8666666666666667, 0.996078431372549, 0.6509803921568628, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.011764705882352941, 0.796078431372549, 0.996078431372549, 0.8588235294117647, 0.13725490196078433, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.14901960784313725, 0.996078431372549, 0.996078431372549, 0.30196078431372547, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.12156862745098039, 0.8784313725490196, 0.996078431372549, 0.45098039215686275, 0.00392156862745098, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5215686274509804, 0.996078431372549, 0.996078431372549, 0.20392156862745098, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.23921568627450981, 0.9490196078431372, 0.996078431372549, 0.996078431372549, 0.20392156862745098, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.4745098039215686, 0.996078431372549, 0.996078431372549, 0.8588235294117647, 0.1568627450980392, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.4745098039215686, 0.996078431372549, 0.8117647058823529, 0.07058823529411765, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]]] } }'
    ```

- The response would be like
    ```bash
    {"data":{"names":[],"ndarray":[[2.2179543179845496e-07,1.2331367038598273e-08,2.5685820219223388e-05,0.0001267448824364692,3.67312957827437e-10,8.802280717645772e-07,1.7313700820253963e-11,0.9998445510864258,5.112406711305084e-07,1.4923076605555252e-06]]},"meta":{}}
    ```

## Share Your Base Image

- Share your base image by pushing it to a docker registry.

- Therefore, others can re-use the model serving code again. They can share the same base image and build a model image by `docker`.
