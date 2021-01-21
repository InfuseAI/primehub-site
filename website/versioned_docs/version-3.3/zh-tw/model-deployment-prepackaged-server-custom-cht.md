---
id: version-3.3-model-deployment-prepackaged-server-custom-cht
title: Custom Pre-packaged Server
description: Custom Pre-packaged Server
original_id: model-deployment-prepackaged-server-custom-cht
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

當現有提供的 Pre-packaged server 滿足不了實際需求時，我們可以進階到為需求客製自己的 Pre-packaged server 由 Model URI 載入模型檔。

以下為新手的建議步驟：

1. 閱讀文件 [Package from Language Wrapper for python](model-deployment-language-wrapper-intro-cht). 此文件敍述基本的 pre-packaged server。
   
2. 仿照現有的 [pre-packaged servers](https://github.com/InfuseAI/primehub-seldon-servers)，試著創建一個相同的 pre-packaged server 映像檔並推傳至自己的 container registry (如： Dockerhub)；演練此流程。
   
3. 於 model class 中 `__init__()` method，增加傳入參數 `model_uri`作為模型載入用。此參數值為指向可載入模型檔所在路徑的字串。 目前設計 Model URI 指向 `/mnt/models`。

    ```
    def __init__(self, model_uri):
        super().__init__()
        self.model = load_model(model_uri)
    ```
