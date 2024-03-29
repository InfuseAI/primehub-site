---
id: version-3.5-model-deployment-language-wrapper-reusable-base-image-cht
title: 透過預建置 Base Image 加速流程
description: 透過預建置 Base Image 加速流程
original_id: model-deployment-language-wrapper-reusable-base-image-cht
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="deploy-only tooltip">Deploy
    <span class="tooltiptext">Applicable to Deploy Edition</span>
  </div>
</div>

此教學介紹如何建置一個 Base Image 並基於此映像檔來建立模型映像檔。這樣的方式有下列好處：

1. 如果程式中載入和使用模型的方式是一樣的，不同的模型可以共用相同的 Base Image
2. 當只需要更新模型檔時，使用 Base Image 可以加速流程

概念上是當寫模型服務的程式時，假設模型檔是放在固定的路徑，當模型檔準備好時，用 `docker build` 搭配 base image 來產生模型映像檔。

下列方式可以準備 base image

1. 利用 Language Wrapper 建立 Base image
2. 利用 pre-packaged server 作為 Base Image

## 軟體需求

請先安裝好以下軟體

- Docker: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

## 利用 Language Wrapper 建立 Base image

此範例採用 Tensorflow 2 ； 範例程式 [Github](https://github.com/InfuseAI/model-deployment-examples/tree/master/tensorflow2_prepackage)。

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

### 建立模型映像檔

當模型檔產出:

```python
model.save(export_path)
```

基於 base image 我們可以生成模型映像檔。

首先建立 `Dockerfile`:

```txt
FROM tensorflow2-prepackage
COPY export_path model
```

>(置換 `export_path` 為實際路徑)

上述指複製模型檔到 base image 內指定的路徑

然後，建立模型映像檔

```bash
docker build . -t tensorflow2-prepackage-model
```

### 驗證模型映像檔

執行驗證指令

```bash
docker run -p 5000:5000 --rm tensorflow2-prepackage-model
```

送出 post 請求

```bash
curl -X POST localhost:5000/api/v1.0/predictions \
    -H 'Content-Type: application/json' \
    -d '{ "data": {"ndarray": [${INPUT_DATA}] } }'
```

`${INPUT_DATA}` 為帶入請求的資料送至模型服務取得預測結果。

>帶入資料的 **dimension** 須與模型程式的 shape 相同。

例如1：建立模型並指定 `input_shape=(4,)` 如定義

```python
model = tf.keras.models.Sequential([
    keras.layers.Dense(64, activation='relu', input_shape=(4,)),
    ...
    ...
])
```

然後送出 post 請求帶入的 `${INPUT_DATA}` 為 shape 4。

```bash
curl -X POST localhost:5000/api/v1.0/predictions \
    -H 'Content-Type: application/json' \
    -d '{ "data": {"ndarray": [[5.1, 3.3, 1.7, 0.5]] } }'
```

例如2：建立模型並指定  `input_shape=(2,2)` 如定義

```python
model = tf.keras.models.Sequential([
    keras.layers.Dense(64, activation='relu', input_shape=(2,2)),
    ...
    ...
])
```

然後送出 post 請求帶入的 `${INPUT_DATA}` 為 shape (2,2)

```bash
curl -X POST localhost:5000/api/v1.0/predictions \
    -H 'Content-Type: application/json' \
    -d '{ "data": {"ndarray": [[[5.1, 3.3], [1.7, 0.5]]] } }'
```

post 請求送出後，獲得的回應格式如下

```bash
{"data":{"names":[],"ndarray":[${PREDICTION_RESULT}]},"meta":{}}
```

>`${PREDICTION_RESULT}` 為一個 list 存有 prediction value

例如，下列輸出結果顯示每個 class 三個 prediction values

```bash
{"data":{"names":[],"ndarray":[[3.093,-0.519,-8.918]]},"meta":{}}
```

驗證過的模型映像檔就可以透過 PrimeHub model deployment 來部署

## 利用 pre-packaged server 作為 Base Image

範例採用 [tensorflow2 pre-packaged server](model-deployment-prepackaged-server-tensorflow2-cht.md)。

### Build the Model Image

首先準備模型檔。 採用 github 裡的模型檔，其位於 `tensorflow2/example_model/mnist`

```bash
git clone git@github.com:InfuseAI/primehub-seldon-servers.git
cd primehub-seldon-servers
```

建立 Dockerfile 指示複製模型檔至 `/mnt/models` 並指定 pre-packaged server 用此路徑作為 `model_uri`

```dockerfile
FROM infuseai/tensorflow2-prepackaged:v0.1.0
COPY tensorflow2/example_model/mnist /mnt/models
ENV PREDICTIVE_UNIT_PARAMETERS='[{"name":"model_uri","value":"/mnt/models","type":"STRING"}]'
```

利用 Dockerfile 建立 image

```
docker build . -t tensorflow2-prepackage-model
```

### 驗證模型映像檔

啟動 model server
```
docker run -p 9000:9000 --rm tensorflow2-prepackage-model
```

驗證 model server

```bash
curl -X POST http://localhost:9000/api/v1.0/predictions \
-H 'Content-Type: application/json' \
-d '{ "data": {"ndarray": [[[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.32941176470588235, 0.7254901960784313, 0.6235294117647059, 0.592156862745098, 0.23529411764705882, 0.1411764705882353, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8705882352941177, 0.996078431372549, 0.996078431372549, 0.996078431372549, 0.996078431372549, 0.9450980392156862, 0.7764705882352941, 0.7764705882352941, 0.7764705882352941, 0.7764705882352941, 0.7764705882352941, 0.7764705882352941, 0.7764705882352941, 0.7764705882352941, 0.6666666666666666, 0.20392156862745098, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2627450980392157, 0.4470588235294118, 0.2823529411764706, 0.4470588235294118, 0.6392156862745098, 0.8901960784313725, 0.996078431372549, 0.8823529411764706, 0.996078431372549, 0.996078431372549, 0.996078431372549, 0.9803921568627451, 0.8980392156862745, 0.996078431372549, 0.996078431372549, 0.5490196078431373, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.06666666666666667, 0.25882352941176473, 0.054901960784313725, 0.2627450980392157, 0.2627450980392157, 0.2627450980392157, 0.23137254901960785, 0.08235294117647059, 0.9254901960784314, 0.996078431372549, 0.41568627450980394, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3254901960784314, 0.9921568627450981, 0.8196078431372549, 0.07058823529411765, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.08627450980392157, 0.9137254901960784, 1.0, 0.3254901960784314, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5058823529411764, 0.996078431372549, 0.9333333333333333, 0.17254901960784313, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.23137254901960785, 0.9764705882352941, 0.996078431372549, 0.24313725490196078, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5215686274509804, 0.996078431372549, 0.7333333333333333, 0.0196078431372549, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.03529411764705882, 0.803921568627451, 0.9725490196078431, 0.22745098039215686, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.49411764705882355, 0.996078431372549, 0.7137254901960784, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.29411764705882354, 0.984313725490196, 0.9411764705882353, 0.2235294117647059, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.07450980392156863, 0.8666666666666667, 0.996078431372549, 0.6509803921568628, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.011764705882352941, 0.796078431372549, 0.996078431372549, 0.8588235294117647, 0.13725490196078433, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.14901960784313725, 0.996078431372549, 0.996078431372549, 0.30196078431372547, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.12156862745098039, 0.8784313725490196, 0.996078431372549, 0.45098039215686275, 0.00392156862745098, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5215686274509804, 0.996078431372549, 0.996078431372549, 0.20392156862745098, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.23921568627450981, 0.9490196078431372, 0.996078431372549, 0.996078431372549, 0.20392156862745098, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.4745098039215686, 0.996078431372549, 0.996078431372549, 0.8588235294117647, 0.1568627450980392, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.4745098039215686, 0.996078431372549, 0.8117647058823529, 0.07058823529411765, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]]] } }'
```

回應類似如下
```bash
{"data":{"names":[],"ndarray":[[2.2179543179845496e-07,1.2331367038598273e-08,2.5685820219223388e-05,0.0001267448824364692,3.67312957827437e-10,8.802280717645772e-07,1.7313700820253963e-11,0.9998445510864258,5.112406711305084e-07,1.4923076605555252e-06]]},"meta":{}}
```

## 分享 Base Image

上載 Base image 至 docker registry 來分享，如此其它使用者可以再利用 model serving 程式，並共享 base image， 透過 `docker`來建立模型映像檔。