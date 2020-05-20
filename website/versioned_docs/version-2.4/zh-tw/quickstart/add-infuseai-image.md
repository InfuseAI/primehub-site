---
id: version-2.4-add-infuseai-image
original_id: add-infuseai-image
title: 新增 InfuseAI Image
---

InfuseAI 持續提供並維護存在於 DockerHub 上公開的 Images。
這份文件說明我們如何在 PrimeHub 新增一個由 InfuseAI 提供的 Image。

首先我們從 InfuseAI 提供的 [Image 表單 ](https://docs.primehub.io/docs/next/guide_manual/images-list) 中挑選一對 `TensorFlow 2.1/CPU/Python3.7` 及 `TensorFlow 2.1/GPU CUDA 10.1/Python3.7`。

從表單中我們得知其 URL 分別是：

+ **TensorFlow 2.1/CPU/Python 3.7**:
`infuseai/docker-stacks:tensorflow-notebook-tf-v2-3f48358e`

+ **TensorFlow 2.1/GPU CUDA10.1/Python 3.7**:
`infuseai/docker-stacks:tensorflow-notebook-3f48358e-gpu-cuda-10`

## 步驟

1. 登入管理者，進入 Admin Dashboard，進入 Images 管理。

2. 點擊 `+ Add` 新增。

3. 填入 `Name` 為 如：`tf-21`。

4. 填入 `Description` 如：`TensorFlow 2.1 + Cuda10.1 + Python3.7`
   
   1. 選擇 `Type` 為 `Universal`。
        
        選用 `Universal` 並分別加入 CPU 及 GPU Images 的好處是，當使用者起始 JupyterHub 前，會根據選擇的 Instance Type 是否需要 GPU 而**自動地帶入對應的 CPU/GPU Image**。


5. 填入 `Container image url` 為 `infuseai/docker-stacks:tensorflow-notebook-tf-v2-3f48358e`   CPU 版。

6. 勾選 `Specific container image url for GPU` 並填入 `infuseai/docker-stacks:tensorflow-notebook-3f48358e-gpu-cuda-10` GPU 版 。

7. 因為 InfuseAI 提供的 Image 都是公開的，所以不需要 Use Image Pull Secret。

8. `Global` 或是 指定 `Groups` 由您的狀況決定。


## 驗證

1. 進入 JupyterHub
   
2. 選擇可以使用此 Image 的群組
   
3. 選擇只有 CPU (小) 的 Instance Type (驗證用：只需最小資源即可)

4. 選擇剛新增的 Image `tf-21`

5. `Start Notebook`。由於是第一次載入新的 CPU Image 都會比較花時間；正常啟動 JupyterHub 就表示成功。

#### 重複驗證 GPU Image (在不影響使用者的情況下)：

1. 先正確退出關閉先前啟動的 JupyterHub [參考](launch-project#關閉)

2. 選擇可以使用此 Image 的群組

3. 選擇只有 GPU (小) 的 Instance Type

4. 選擇剛新增的 Image

5. `Start Notebook`
同樣，由於是第一次載入新的 GPU Image 都會比較花時間；正常啟動 JupyterHub 就表示成功。
