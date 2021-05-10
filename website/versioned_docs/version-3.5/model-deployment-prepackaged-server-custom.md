---
id: version-3.5-model-deployment-prepackaged-server-custom
title: Custom Pre-packaged Server
description: Custom Pre-packaged Server
original_id: model-deployment-prepackaged-server-custom
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="deploy-only tooltip">Deploy
    <span class="tooltiptext">Applicable to Deploy Edition</span>
  </div>
</div>

For better flexibility, we can also build our pre-packaged server which can load models from the model URI. Here are the recommended steps to build your first pre-packaged server.


1. Read the document [Package from Language Wrapper for python](model-deployment-language-wrapper-intro). This is the fundamental of a pre-packaged server.
1. Reference existing [pre-packaged servers](https://github.com/InfuseAI/primehub-seldon-servers). Try to build and push the same pre-packaged server to your container registry (e.g. Dockerhub).
1. In the `__init__()` method of the model class, add the parameter `model_uri` to load the model. The value is a string that contains the path where the model files are downloaded. Currently, it is always `/mnt/models` rather than the actual model URI the user configure.

    ```
    def __init__(self, model_uri):
        super().__init__()
        self.model = load_model(model_uri)
    ```
