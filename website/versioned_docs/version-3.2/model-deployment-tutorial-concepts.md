---
id: version-3.2-model-deployment-tutorial-concepts
title: Concepts
original_id: model-deployment-tutorial-concepts
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

PrimeHub integrates [Seldon](https://docs.seldon.io/projects/seldon-core/en/latest/) as the model deployment solution. Seldon is a container-based solution and provides a common way to package different ML framework's by different programming languages as container images.

In Seldon, there are two ways to prepare the model image:

1. **Pre-Packaged Inference Servers**: Users can use the pre-packaged model image and provide the model URI for the latest model files.
2. **Language Wrappers for Custom Model**: Users build the model file by different language wrapper. It provides the best flexibility and loading time.

In the following tutorials, we will present two different ways of model deployment.

- [Deploy a Model by Pre-packaged Server](model-deployment-tutorial-prepackaged-image)
- [Deploy a Model by Image built from Language Wrapper](model-deployment-tutorial-model-image)

