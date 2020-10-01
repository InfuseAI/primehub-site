---
id: model-deployment-tutorial-package-image
title: 建置模型部署所需之映像檔 (Python)
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

此文件說明如何建置映像檔 (Docker Image) ，以利在 PrimeHub 模型部署中使用。

PrimeHub 模型部署功能是基於 Seldon 的開源套件。此文件參考 Seldon 和其他相關的文件，我們皆列在最後一個部分。

## 軟體需求

請先安裝好以下軟體

- docker: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
- s2i: [https://github.com/openshift/source-to-image#installation](https://github.com/openshift/source-to-image#installation)

安裝完成後，下達以下指令確認一切正常：
```bash
s2i usage seldonio/seldon-core-s2i-python3:0.18
```

## 撰寫模型部署程式與設定

- 建議使用 Python 3.6 
- 產生 `requirements.txt` 檔，並在其中寫下所需套件
    ```
    keras
    tensorflow
    numpy
    ...
    ```

- 建立 `.s2i` 資料夾後建立 `.s2i/environment` 檔案，並在其中寫下以下內容
    ```script
    MODEL_NAME=MyModel
    API_TYPE=REST
    SERVICE_TYPE=MODEL
    PERSISTENCE=0
    ```

- 建立 `MyModel.py` 檔，內容可以參考以下的格式內容
    ```python
    class MyModel(object):
        """
        Model template. You can load your model parameters in __init__ from a location accessible at runtime
        """
    
        def __init__(self):
            """
            Add any initialization parameters. These will be passed at runtime from the graph definition parameters defined in your seldondeployment kubernetes resource manifest.
            """
            print("Initializing")
    
        def predict(self, X, features_names=None):
            """
            Return a prediction.
    
            Parameters
            ----------
            X : array-like
            feature_names : array of feature names (optional)
            """
            print("Predict called - will run identity function")
            return X
    ```

    - 檔名和類別名稱 `MyModel` 需與在 `.s2i/environment` 下的 MODEL_NAME 一致
    - 你可以在 `__init__` 初始化或載入你的模型
    - `predict` 會接受 numpy-array `X` 及 `feature_names` (非必須)，並回傳預測結果 (至少需為二維陣列)

    更多如何撰寫 `MyModel.py` 的範例和細節，可以參考 `相關 Frameworks 的範例程式` 。

## 建置映像檔

進入到包含 `requirements.txt` 、 `.s2i/environment` 、 `python file for model deployment` 、 `model file` 的資料夾。

如果該資料夾有使用 `Git` ，需要將所有的改變 Commit 。

我們使用 `seldonio/seldon-core-s2i-python3:0.18` 來安裝與建置模型部署映像檔 `my-model-image`：
```
s2i build . seldonio/seldon-core-s2i-python3:0.18 my-model-image
```

(當為 Python 3 而非 Python 3.6 時使用 seldonio/seldon-core-s2i-python3)

透過 `docker images` 檢查建置完成的映像檔，範例結果如下所示：
```bash
    REPOSITORY                         TAG                 IMAGE ID            CREATED             SIZE
    my-model-image                     latest              4a0f28ee4f4c        3 minutes ago       1.66GB
    seldonio/seldon-core-s2i-python3   0.18                0380e4efa66e        7 weeks ago         794MB
```
## 測試映像檔

為了確保模型映像檔可於後續的模型部署中使用，你可先在本機上透過 Docker 運行 container:
```
docker run -p 5000:5000 --rm my-model-image
```

透過 curl 進行測試：
```bash
    curl -X POST localhost:5000/api/v1.0/predictions \
         -H 'Content-Type: application/json' \
         -d '{ "data": { "ndarray": [[5.964,4.006,2.081,1.031]]}}'
```

其中 `ndarray` 的內容請根據你的應用給予不同的值。

到此我們已經成功建置出可以給 PrimeHub 模型部署功能使用的映像檔。

## 推送映像檔

接下來請將其推送到 docker hub (或其他 docker registry) ，並參考 PrimeHub 的文件繼續將模型部署到 PrimeHub 上

標記模型映像檔:
```
docker tag my-model-image test-repo/my-model-image
```

推送至 docker registry:
```
docker push test-repo/my-model-image
```


## (Optional) 相關 Frameworks 的範例程式

參考以下的範例， PrimeHub 可以部署各種 Frameworks 的模型。

### Tensorflow 1

- Output model example code
    ```python
        saver = tf.train.Saver()
        saver.save(sess, "model/deep_mnist_model")
    ```

- MyModel.py example code
    ```python
        import tensorflow as tf
        import numpy as np
        import os
        
        class DeepMnist(object):
            def __init__(self):
                self.loaded = False
                
            def load(self):
                print("Loading model",os.getpid())
                self.sess = tf.Session()
                saver = tf.train.import_meta_graph("model/deep_mnist_model.meta")
                saver.restore(self.sess,tf.train.latest_checkpoint("./model/"))
                graph = tf.get_default_graph()
                self.x = graph.get_tensor_by_name("x:0")
                self.y = graph.get_tensor_by_name("y:0")
                self.loaded = True
                print("Loaded model")
                
            def predict(self,X,feature_names):
                if not self.loaded:
                    self.load()
                predictions = self.sess.run(self.y,feed_dict={self.x:X})
                return predictions.astype(np.float64)
    ```

### Tensorflow 2

- Output model example code
    ```python
        model.save("1")
    ```

- MyModel.py example code
    ```python
        import tensorflow as tf
        
        class MNISTModel:
            def __init__(self):
                self._model = tf.keras.models.load_model('1')
        
            def predict(self, X, feature_names=None, meta=None):
                output = self._model.predict(X)
                probability = output[0]
                predicted_number = tf.math.argmax(probability)
                return {"predicted_number": predicted_number.numpy().tolist(), "probability": probability.tolist()}
    ```

### Keras

- Output model example code
    ```python
        model.save('keras-mnist.h5')
    ```

- MyModel.py example code
    ```python
        from keras.models import load_model
        from PIL import Image
        from io import BytesIO
        import numpy as np
        
        class MyModel(object):
            def __init__(self):
                self.model = load_model('keras-mnist.h5')
                self.model._make_predict_function()
                
            def predict(self,X,features_names):
                imageStream = BytesIO(X)
                image = Image.open(imageStream).resize((28, 28)).convert('L')
                data = np.asarray(image)
                data = np.expand_dims(data, axis=0)
                data = np.expand_dims(data, axis=-1)
                return self.model.predict(data)
    ```

### Scikit-learn

- Output model example code
    ```python
        joblib.dump(p, filename_p)
    ```

- MyModel.py example code
    ```python
        from sklearn.externals import joblib
        
        class IrisClassifier(object):
        
            def __init__(self):
                self.model = joblib.load('IrisClassifier.sav')
        
            def predict(self,X,features_names):
                return self.model.predict_proba(X)
    ```

### Pytorch

- Output model example code
    ```python
        torch.save(model.state_dict(), "mnist_cnn.pt")
    ```

- MyModel.py example code
    ```python
        import torch
        import torch.nn as nn
        import torch.nn.functional as F
        
        class Net(nn.Module):
            def __init__(self):
                super(Net, self).__init__()
                self.conv1 = nn.Conv2d(1, 32, 3, 1)
                self.conv2 = nn.Conv2d(32, 64, 3, 1)
                self.dropout1 = nn.Dropout2d(0.25)
                self.dropout2 = nn.Dropout2d(0.5)
                self.fc1 = nn.Linear(9216, 128)
                self.fc2 = nn.Linear(128, 10)
        
            def forward(self, x):
                x = self.conv1(x)
                x = F.relu(x)
                x = self.conv2(x)
                x = F.relu(x)
                x = F.max_pool2d(x, 2)
                x = self.dropout1(x)
                x = torch.flatten(x, 1)
                x = self.fc1(x)
                x = F.relu(x)
                x = self.dropout2(x)
                x = self.fc2(x)
                output = F.softmax(x, dim=1)
                return output
        
        class MNISTModel:
            def __init__(self):
                self._model = Net()
                self._model.load_state_dict(torch.load("mnist_cnn.pt"))
                self._model.eval()
        
            def predict(self, x, names):
                output = self._model(torch.from_numpy(x).float())
                return {"probability": output.tolist()}
    ```

### XGBoost

- Output model example code
    ```python
        bst = xgb.train(...)
        bst.save_model('xgboost.model')
    ```

- MyModel.py example code
    ```python
        import xgboost as xgb
        
        class MyModel(object):
            def __init__(self):
                self.bst = xgb.Booster({'nthread':4})
                self.bst.load_model("xgboost.model") 
                
            def predict(self,X,features_names):
                dtest = xgb.DMatrix(X)
                return self.bst.predict(dtest)
    ```

### MXNet

- Output model example code
    ```python
        model_prefix = 'mx-model'
        checkpoint = mx.callback.do_checkpoint(model_prefix)
        mod.fit(..., epoch_end_callback=checkpoint)
    ```

- MyModel.py example code
    ```python
        import mxnet as mx
        from PIL import Image
        import numpy as np
        from io import BytesIO
        
        class MyModel(object):
            def __init__(self):
                model_prefix = 'mx-model'
                epoch_num = 2
                self.model = mx.mod.Module.load(model_prefix, epoch_num)
                
                data_shape = [("data", (1, 28, 28, 1))]
                label_shape = [("softmax_label", (1,))]
                self.model.bind(data_shape, label_shape)
        
            def predict(self,X,features_names):
                imageStream = BytesIO(X)
                image = Image.open(imageStream).resize((28, 28)).convert('L')
        
                data = np.asarray(image)
                data = np.expand_dims(data, axis=0)
                data = np.expand_dims(data, axis=-1)
                return self.model.predict(data).asnumpy()
    ```

### LightGBM

- Output model example code
    ```python
        gbm = lgb.train(...)
        with open('model.pkl', 'wb') as fout:
            pickle.dump(gbm, fout)
    ```

- MyModel.py example code
    ```python
        import pickle
        
        class MyModel(object):
            def __init__(self):
                with open('model.pkl', 'rb') as fin:
                    self.pkl_bst = pickle.load(fin)
        
            def predict(self,X,features_names):
                return self.pkl_bst.predict(X)
    ```

## Reference

- [https://docs.seldon.io/projects/seldon-core/en/latest/python/python_wrapping_s2i.html](https://docs.seldon.io/projects/seldon-core/en/latest/python/python_wrapping_s2i.html)
- [https://github.com/SeldonIO/seldon-core/tree/master/examples](https://github.com/SeldonIO/seldon-core/tree/master/examples)
- [https://docs.seldon.io/projects/seldon-core/en/latest/wrappers/language_wrappers.html](https://docs.seldon.io/projects/seldon-core/en/latest/wrappers/language_wrappers.html)
- [https://docs.seldon.io/projects/seldon-core/en/latest/python/python_component.html](https://docs.seldon.io/projects/seldon-core/en/latest/python/python_component.html)
- [https://docs.seldon.io/projects/seldon-core/en/latest/workflow/serving.html](https://docs.seldon.io/projects/seldon-core/en/latest/workflow/serving.html)