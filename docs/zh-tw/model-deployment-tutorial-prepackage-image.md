---
id: model-deployment-tutorial-prepackage-image
title: 透過預建置 Base Image 加速流程
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Available in Enterprise tier only</span>
</div>

此教學介紹如何建置一個 Base Image 並使用它，這樣的方式有兩個主要的好處：

1. 如果程式中讀取和使用模型的方式是一樣的，許多不同的模型可以共用相同的 Base Image
2. 當只需要更新模型時，使用 Base Image 可以加速流程

基本的概念是，先寫一個較通用的模型讀取和使用程式，讀取模型時假設模型會放在一個固定的路徑上。然後用 `s2i` 建置出 Base Image 。

之後每當要更換模型時，只需要用 `docker` 將模型移動到正確的路徑上，並建置出最後的 Image 即可以使用。

以下的章節，使用 Tensorflow 2 當作範例，完整的程式可以在 [Github](https://github.com/InfuseAI/model-deployment-examples/tree/master/tensorflow2_prepackage) 中找到。

## 軟體需求

請先安裝好以下軟體

- docker: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
- s2i: [https://github.com/openshift/source-to-image#installation](https://github.com/openshift/source-to-image#installation)

安裝完成後，下達以下指令確認一切正常：
```bash
s2i usage seldonio/seldon-core-s2i-python3:0.18
```

## 建置 Base Image (Python)

- 建議使用 Python 3.6 

- 建立 `Model.py` 檔，內容可以參考以下的格式內容
    ```python
    import tensorflow as tf

    class Model:
        def __init__(self):
            self._model = tf.keras.models.load_model('model')

        def predict(self, X, feature_names=None, meta=None):
            output = self._model.predict(X)
            return output
    ```

- 產生 `requirements.txt` 檔，並在其中寫下所需套件
    ```txt
    tensorflow==2.1.0
    ```

- 建立 `.s2i` 資料夾後建立 `.s2i/environment` 檔案，並在其中寫下以下內容
    ```script
    MODEL_NAME=Model
    API_TYPE=REST
    SERVICE_TYPE=MODEL
    PERSISTENCE=0
    ```

建置 Base Image
```bash
 s2i build . seldonio/seldon-core-s2i-python3:0.18 tensorflow2-prepackage
```
(當為 Python 3 而非 Python 3.6 時使用 seldonio/seldon-core-s2i-python3)

## 使用 Base Image 建置最後模型部署之 Image

依我們 Base Image 的撰寫方式，假設模型是使用以下方式輸出
```python
model.save(export_path)
```
皆可以使用此 Base Image 來建置模型部署的 Image 。

首先, 產生 `Dockerfile`
```txt
FROM tensorflow2-prepackage
COPY export_path model 
```
(請取代 `export_path` 成為模型的路徑)

這代表將模型拷貝進 Base Image 所預先定義的模型路徑上。

接著便可以透過 `docker` 建置模型部署的 Image ：
```bash
docker build -t tensorflow2-prepackage-model .
```

建置完成後，將其跑起來，測試剛剛建置好的 Image。
```bash
docker run -p 5000:5000 --rm tensorflow2-prepackage-model
```

送出 Post Request 並觀察回傳的訊息是否符合預期。
```bash
curl -X POST localhost:5000/api/v1.0/predictions \
    -H 'Content-Type: application/json' \
    -d '{ "data": {"ndarray": [your data format] } }'
```

確認符合預期後，便可以將這個 Image 用在 PrimeHub 的模型部署功能上。

## 共用 Base Image

只需要將 Base Image 推送到 Docker Registry 就可以跟其他人共用。

因此，其他人不需要再自己重寫一次模型讀取和使用的程式，他們只需要將模型用 `docker` 拷貝到正確的路徑上，然後建置出模型部署 Image 就可以了。
