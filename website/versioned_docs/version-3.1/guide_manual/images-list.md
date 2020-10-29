---
id: version-3.1-images-list
title: Available Images List
original_id: images-list
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

InfuseAI provides and maintains certain images which can be used as base images on [infuseai/docker-stacks↗](https://hub.docker.com/r/infuseai/docker-stacks/tags) on Docker Hub, here available images are:

## TensorFlow

### JupyterLab v2 with PrimeHub Extension

|Framework|Image|CPU / GPU|Python|
|-        |-     |-     |-    |
|TensorFlow 2.2|infuseai/docker-stacks:tensorflow-notebook-tf-v2-b3c52f35|`CPU`|3.7|
|TensorFlow 2.2|infuseai/docker-stacks:tensorflow-notebook-b3c52f35-gpu-cuda-10|`GPU` `CUDA10`|3.7|
|TensorFlow 1.14|infuseai/docker-stacks:tensorflow-notebook-b3c52f35|`CPU`|3.7|
|TensorFlow 1.14|infuseai/docker-stacks:tensorflow-notebook-b3c52f35-gpu|`GPU`|3.7|

### JupyterLab v1 only

|Framework|Image|CPU / GPU|Python|
|-        |-     |-     |-    |
|TensorFlow 2.2|infuseai/docker-stacks:tensorflow-notebook-tf-v2-27d623dc|`CPU`|3.7|
|TensorFlow 2.2|infuseai/docker-stacks:tensorflow-notebook-27d623dc-gpu-cuda-10|`GPU`<br/>`CUDA 10.1`|3.7|
|TensorFlow 2.2|infuseai/docker-stacks:tensorflow-notebook-tf-v2-py3.6-27d623dc|`CPU`|3.6|
|TensorFlow 2.2|infuseai/docker-stacks:tensorflow-notebook-py3.6-27d623dc-gpu-cuda-10|`GPU`<br>`CUDA 10.1`|3.6|
|TensorFlow 2.1|infuseai/docker-stacks:tensorflow-notebook-tf-v2-3f48358e|`CPU`|3.7|
|TensorFlow 2.1|infuseai/docker-stacks:tensorflow-notebook-3f48358e-gpu-cuda-10|`GPU`<br/>`CUDA 10.1`|3.7|
|TensorFlow 1.15|infuseai/docker-stacks:tensorflow-notebook-76482a4c|`CPU`|3.7|
|TensorFlow 1.15|infuseai/docker-stacks:tensorflow-notebook-76482a4c-gpu|`GPU`<br/>`CUDA 9`|3.7|
|TensorFlow 1.14|infuseai/docker-stacks:tensorflow-notebook-27d623dc|`CPU`|3.7|
|TensorFlow 1.14|infuseai/docker-stacks:tensorflow-notebook-27d623dc-gpu|`GPU`<br>`CUDA 9`|3.7|
|TensorFlow 1.14|infuseai/docker-stacks:tensorflow-notebook-py3.6-3f48358e|`CPU`|3.6|
|TensorFlow 1.14|infuseai/docker-stacks:tensorflow-notebook-py3.6-3f48358e-gpu|`GPU`<br>`CUDA 9`|3.6|

---

## PyTorch

### JupyterLab v2 with PrimeHub Extension

|Framework|Image|CPU / GPU|Python|
|-   |-    |-        |-     |
|PyTorch 1.5|infuseai/docker-stacks:pytorch-notebook-b3c52f35|`CPU`|3.7|
|PyTorch 1.5|infuseai/docker-stacks:pytorch-notebook-b3c52f35-gpu|`GPU` `CUDA 9`|3.7|

### JupyterLab v1 only

|Framework|Image|CPU / GPU|Python|
|-        |-     |-      |-    |
|PyTorch 1.5|infuseai/docker-stacks:pytorch-notebook-27d623dc|`CPU`|3.7|
|PyTorch 1.5|infuseai/docker-stacks:pytorch-notebook-27d623dc-gpu|`GPU`<br/>`CUDA 9`|3.7|
|PyTorch 1.4|infuseai/docker-stacks:pytorch-notebook-3f48358e|`CPU`|3.7|
|PyTorch 1.4|infuseai/docker-stacks:pytorch-notebook-3f48358e-gpu|`GPU`<br>`CUDA 9`|3.7|
|PyTorch 1.4|infuseai/docker-stacks:pytorch-notebook-py3.6-3f48358e|`CPU`|3.6|
|PyTorch 1.4|infuseai/docker-stacks:pytorch-notebook-py3.6-3f48358e-gpu|`GPU`<br>`CUDA 9`|3.6|
|PyTorch 1.1|infuseai/docker-stacks:pytorch-notebook-14fb17d1|`CPU`|3.7|
|PyTorch 1.1|infuseai/docker-stacks:pytorch-notebook-14fb17d1-gpu|`GPU`<br>`CUDA 9`|3.7|
|PyTorch 1.1|infuseai/docker-stacks:pytorch-notebook-py3.6-8dd7f89a|`CPU`|3.6|
|PyTorch 1.1|infuseai/docker-stacks:pytorch-notebook-py3.6-8dd7f89a-gpu|`GPU`<br>`CUDA 9`|3.6|

---

## Base

### JupyterLab v2 with PrimeHub Extension

|Name|Image|CPU / GPU|Python|
|-   |-    |-        |-     |
|AI notebook|infuseai/docker-stacks:ai-notebook-b3c52f35|`CPU`|3.7|
|AI notebook|infuseai/docker-stacks:ai-notebook-b3c52f35-gpu|`GPU`|3.7|
|AI notebook|infuseai/docker-stacks:ai-notebook-b3c52f35-gpu-cuda-10|`GPU`<br>`CUDA 10`|3.7|

### JupyterLab v1 only

|Name|Image|CPU / GPU|Python|
|-   |-     |-      |-    |
|AI notebook|infuseai/docker-stacks:ai-notebook-27d623dc|`CPU`|3.7|
|AI notebook|infuseai/docker-stacks:ai-notebook-27d623dc-gpu-cuda-10]|`GPU`<br>`CUDA 10.1`|3.7|
|AI notebook|infuseai/docker-stacks:ai-notebook-27d623dc-gpu]|`GPU`<br>`CUDA 9`|3.7|
|AI notebook|infuseai/docker-stacks:ai-notebook-py3.6-27d623dc]|`CPU`|3.6|
|AI notebook|infuseai/docker-stacks:ai-notebook-py3.6-27d623dc-gpu-cuda-10|`GPU`<br>`CUDA 10.1`|3.6|
|AI notebook|infuseai/docker-stacks:ai-notebook-py3.6-27d623dc-gpu|`GPU`<br>`CUDA 9`|3.6|