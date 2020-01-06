---
id: usecase-toleration-cht
title: Toleration
---

在實際環境中，我們可能有數個配置不同 GPU 運算能力的 nodes。  舉例來說，我們有 nodes 分別配置 **Nvidia Tesla V100(high)**、**Tesla M60(Medium)** 及 **Tesla K80(Low)** 的環境，且有個專案 *cancer_prediction* (instance type) 需求 Tesla M60 至少以上的 GPU 運算能力，因此我們可以標記  taint 在配備 Tesla K80 node 上 gpu=low 。

```
kubectl taint nodes node1 gpu=low:NoSchedule
```

之後，於 *cancer_prediction* 啟始的專案，只會被排入在配備 V100(High) 或 Tesla M60(Medium) 的 nodes 上運行，避開帶有標記 taint 的 node。

![](assets/toleration_case.png)

同時，我們有另一個對 GPU 運算能力要求相對低的專案 *age_of_consumers* ，也就是說，該專案能接受配備低階 GPU 的 node，當然如果能被排入閒置可用中高階 GPU 的 nodes 的話，更能加速運算結果。因此，我們在 Admin Dashboard 的 Instance Type 編輯頁面，藉由新增 Toleration 來表明該專案能夠容忍低階 GPU。

![](assets/toleration_ex.png)

如此一來，該專案不只能夠被排入中高階 GPU 的 nodes，而且也能排入配備低階 GPU 的 node 上運行。

![](assets/toleration_case_with.png)
