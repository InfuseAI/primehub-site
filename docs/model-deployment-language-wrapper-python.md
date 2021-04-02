---
id: model-deployment-language-wrapper-python
title: Package a Model Image for Python
description: Package a Model Image for Python
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="deploy-only tooltip">Deploy
    <span class="tooltiptext">Applicable to Deploy Edition</span>
  </div>
</div>

This doc shows how to package a model into a format-valid docker image for the PrimeHub model deployment feature.

The PrimeHub model deployment feature is based on Seldon. This doc takes [reference](#reference) from Seldon official documentations and other resources which are listed in the last part.

## Prerequisites

- Docker: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

## Prepare the Model and Code (Python)

- Create a `requirements.txt` file and write down all required packages.
    ```text
    seldon-core
    keras
    tensorflow
    numpy
    ...
    ```

- Create a `Dockerfile` with the following content.
    ```text
    FROM python:3.7-slim
    COPY . /app
    WORKDIR /app
    RUN pip install -r requirements.txt
    EXPOSE 9000

    # Define environment variable
    ENV MODEL_NAME MyModel
    ENV SERVICE_TYPE MODEL
    ENV PERSISTENCE 0

    CMD exec seldon-core-microservice $MODEL_NAME --service-type $SERVICE_TYPE --persistence $PERSISTENCE --access-log
    ```

- Create a `MyModel.py` file with the following example template.
    ```python
    class MyModel(object):
        """
        Model template. 
        You can load your model parameters in __init__ from a location accessible at runtime.
        """
    
        def __init__(self):
            """
            Add any initialization parameters. These will be passed at runtime from the graph definition parameters 
            defined in your seldondeployment kubernetes resource manifest.
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

    - File and class name `MyModel` should be the same as **MODEL_NAME** in `Dockerfile`
    - Load or initiate your model under the `__init__` function
    - The predict method takes a numpy-array `X` and list of string `feature_names` (optional), then returns an array of predictions (the return array should be at least 2-dimensional)

    More detailed information on how to write the Python file for model deployment in different frameworks, please refer to the section [Example Codes for Different Frameworks](#optional-example-codes-for-different-frameworks).

## Build the Image

- Make sure you are in the folder that includes `requirements.txt`, `Dockerfile`, `python file for model deployment`, and `model file`.

- Execute following command to install environment and package our model file into the target image `my-model-image`.
    ```bash
    docker build . -t my-model-image
    ```

- Then check the image by `docker images`.
    ```bash
    REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
    my-model-image      latest              f373fdcc10c5        3 minutes ago       2.46GB
    python              3.7-slim            ea12296513d7        2 weeks ago         112MB
    ```

## Test the Image

- In order to make sure your model image is well packaged, you can run your model as a Docker container locally.
    ```bash
    docker run -p 9000:9000 --rm my-model-image
    ```

- And curl (replace `ndarray` content in curl example according to your application).
    ```bash
    curl -X POST localhost:9000/api/v1.0/predictions \
        -H 'Content-Type: application/json' \
        -d '{ "data": { "ndarray": [[5.964,4.006,2.081,1.031]]}}'
    ```

You have successfully built the docker image for the PrimeHub model deployment.

## Push the Image

- Next, push the image into the docker hub (or other docker registries) and check PrimeHub tutorial to serve the model under PrimeHub.

    Tag your docker image.
    ```bash
    docker tag my-model-image test-repo/my-model-image
    ```

    Then push to docker registry.
    ```bash
    docker push test-repo/my-model-image
    ```

## (Optional) Example Codes for Different Frameworks

Here are some Python snippets of how to export a model file then load it and run the prediction in another file. By following the Python wrapper format, PrimeHub supports various popular ML frameworks to serve models.

### Tensorflow 1

- Output a model file `model/deep_mnist_model`
    ```python
        saver = tf.train.Saver()
        saver.save(sess, "model/deep_mnist_model")
    ```

- `MyModel.py`, load a model and run a prediction
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

- Output a model file `1`
    ```python
        model.save("1")
    ```

- `MyModel.py`, load a model and run a prediction
    ```python
        import tensorflow as tf
        
        class MNISTModel:
            def __init__(self):
                self.loaded = False

            def load(self):
                self._model = tf.keras.models.load_model('1')
                self.loaded = True
        
            def predict(self, X, feature_names=None, meta=None):
                if not self.loaded:
                    self.load()
                output = self._model.predict(X)
                probability = output[0]
                predicted_number = tf.math.argmax(probability)
                return {"predicted_number": predicted_number.numpy().tolist(), "probability": probability.tolist()}
    ```

### Keras

- Output a model file `keras-mnist.h5`
    ```python
        model.save('keras-mnist.h5')
    ```

- `MyModel.py`, load a model and run a prediction
    ```python
        from keras.models import load_model
        from PIL import Image
        from io import BytesIO
        import numpy as np
        
        class MyModel(object):
            def __init__(self):
                self.loaded = False

            def load(self):
                self.model = load_model('keras-mnist.h5')
                self.loaded = True
                
            def predict(self,X,features_names):
                if not self.loaded:
                    self.load()
                imageStream = BytesIO(X)
                image = Image.open(imageStream).resize((28, 28)).convert('L')
                data = np.asarray(image)
                data = np.expand_dims(data, axis=0)
                data = np.expand_dims(data, axis=-1)
                return self.model.predict(data)
    ```

### Scikit-learn

- Output a model file `IrisClassifier.sav`
    ```python
        joblib.dump(p, "IrisClassifier.sav")
    ```

- `MyModel.py`, load a model and run a prediction
    ```python
        from sklearn.externals import joblib
        
        class IrisClassifier(object):
        
            def __init__(self):
                self.model = joblib.load('IrisClassifier.sav')
        
            def predict(self,X,features_names):
                return self.model.predict_proba(X)
    ```

### Pytorch

- Output a model file `mnist_cnn.pt`
    ```python
        torch.save(model.state_dict(), "mnist_cnn.pt")
    ```

- `MyModel.py`, load a model and run a prediction
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

- Output a model file `xgboost.model`
    ```python
        bst = xgb.train(...)
        bst.save_model('xgboost.model')
    ```

- `MyModel.py`, load a model and run a prediction
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

- Output a model file `mx-model___`
    ```python
        model_prefix = 'mx-model'
        checkpoint = mx.callback.do_checkpoint(model_prefix)
        mod.fit(..., epoch_end_callback=checkpoint)
    ```

- `MyModel.py`, load a model and run a prediction
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

- Output a model file `model.pkl`
    ```python
        gbm = lgb.train(...)
        with open('model.pkl', 'wb') as fout:
            pickle.dump(gbm, fout)
    ```

- `MyModel.py`, load a model and run a prediction
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

- [https://docs.seldon.io/projects/seldon-core/en/latest/python/python_wrapping_docker.html](https://docs.seldon.io/projects/seldon-core/en/latest/python/python_wrapping_docker.html)
- [https://github.com/SeldonIO/seldon-core/tree/master/examples](https://github.com/SeldonIO/seldon-core/tree/master/examples)
- [https://docs.seldon.io/projects/seldon-core/en/latest/wrappers/language_wrappers.html](https://docs.seldon.io/projects/seldon-core/en/latest/wrappers/language_wrappers.html)
- [https://docs.seldon.io/projects/seldon-core/en/latest/python/python_component.html](https://docs.seldon.io/projects/seldon-core/en/latest/python/python_component.html)
- [https://docs.seldon.io/projects/seldon-core/en/latest/workflow/serving.html](https://docs.seldon.io/projects/seldon-core/en/latest/workflow/serving.html)