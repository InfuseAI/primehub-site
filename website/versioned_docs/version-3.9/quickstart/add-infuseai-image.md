---
id: version-3.9-add-infuseai-image
title: Add InfuseAI Image
description: Add InfuseAI Image
original_id: add-infuseai-image
---


<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

InfuseAI provides and maintain a serious of public images on DockerHub.
This document shows how to add images provided by InfuseAI.

First of all we check and pick up a pari of images from [Availabe Image List](../guide_manual/images-list). 

They are `TensorFlow 2.1/CPU/Python3.7` and `TensorFlow 2.1/GPU CUDA 10.1/Python3.7`.

We can learn URLs respectively from the list.

+ **TensorFlow 2.1/CPU/Python 3.7**:
`infuseai/docker-stacks:tensorflow-notebook-tf-v2-3f48358e`

+ **TensorFlow 2.1/GPU CUDA10.1/Python 3.7**:
`infuseai/docker-stacks:tensorflow-notebook-3f48358e-gpu-cuda-10`

## Steps

1. Log in as a Group admin or as an Administrator.
   
2. Enter `Image` Management from User Portal/[Admin Portal](login-portal-admin) respectively and click `+ Add`.

3. Fill in `Name`: such as `tf-21`.

4. Fill in `Description`: such as `TensorFlow 2.1 + Cuda10.1 + Python3.7`.
   
   1. Select `Type`: `Universal`。
        
        In terms of  `Universal`, we can assign a CPU-only image and a GPU-supported image respectively. When spawning a Notebook, PrimeHub will pick up the corresponding image according to the specified instance type (CPU-only or GPU-required).


5. Fill in `Container image url`: CPU-only `infuseai/docker-stacks:tensorflow-notebook-tf-v2-3f48358e` 

6. Check off `Specific container image url for GPU` and fill in GPU-supported`infuseai/docker-stacks:tensorflow-notebook-3f48358e-gpu-cuda-10`.

7. Because InfuseAI's registry on DockerHub is public, there is no need of `Use Image Pull Secret`.

8. `Global` or specify accessing `Groups`.


## Verify

1. Enter `Notebook` from User Portal.
   
2. Select a group which can utilize the newly added image.
   
3. Select an instance type which requires small **CPU** resource. (just for verification)

4. Select the newly added Image `tf-21`.

5. `Start Notebook`. It takes time to pull off the newly added image for the first time; As long as a Notebook is launched successfully, the image is pulled successfully.

#### Verify GPU Image (Please avoid affecting users )：

1. Close/Stop previously launched Notebook. [REF](launch-project#stop)

2. Enter `Notebook` from User Portal.
   
3. Select a group which can utilize the newly added image.
   
4. Select an instance type which requires small **GPU** resource. (just for verification)

5. Select the newly added Image `tf-21`.

6. `Start Notebook`. It takes time to pull off the newly added image for the first time; As long as a Notebook is launched successfully, the image is pulled successfully.
