---
id: model-deployment-tutorial-concepts-cht
title: Concepts
description: Concepts
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

PrimeHub 整合 [Seldon](https://docs.seldon.io/projects/seldon-core/en/latest/) 作為模型部署功能。 Seldon 提供基於容器技術的方案及針對不同技術語言打包多樣 ML framework 成映像檔的方法。 同時，採用 Seldon Prediction API 作為溝通介面。

模型部署前，我們需要準備可供部署模型映像檔，目前有提供兩種方法：

1. **Pre-Packaged Servers**: 使用者採用 pre-packaged server 做模型映像檔基底，搭配指定的模型檔，透過 Model URI 指定檔案所在路徑； PrimeHub 提供數種可供使用的 pre-packaged servers 映像檔。

2. **Package Model by Language Wrapper**: 使用者依需求自行打包模型檔成可部署模型映像檔，並自行發佈至 registry，此方法較為進階但也較有客製彈性。 Seldon 提供多種技術語言的模型檔打包方法。

以下為提供模型部署教學：

- [透過 Pre-packaged Server 模型部署](model-deployment-tutorial-prepackaged-image-cht)
- [透過 Pre-packaged Server 模型部署 (PHFS)](model-deployment-tutorial-prepackaged-image-phfs-cht)
- [透過 Language Wrapper 打包模型映像檔部署](model-deployment-tutorial-model-image-cht)
