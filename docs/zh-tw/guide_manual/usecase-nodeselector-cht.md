---
id: usecase-nodeselector-cht
title: [使用案例] NodeSelector
---

提到服務維運，我們可能一年中有幾次需要進行系統維護。為了降低對現行服務的衝擊，我們會採取部分 nodes 離線，維持一定數量 nodes 繼續提供服務。一旦離線 nodes 維護作業完成，再度回歸服務，直到所有 nodes 作業完成。因此，我們可以先在所有 nodes 標記 `service=on`，

```
kubectl label nodes node1 service=on
```

且在 Admin Dashboard 上對每個專案 instance types 套上對應 nodeSelector，如此專案可以排入在所有 nodes。  

![](assets/nodeSelector_add.png)

![](assets/nodeSelector_use_case_on.png)

等系統維護時間到了，我們標記部分 nodes `service=off`，暫時不提供服務。

```
kubectl label nodes node5 service=off
```

之後生成的專案依照 nodeSelector 就不會排入在這些 nodes 上，因此我們可以對其進行系統維護作業。

![](assets/nodeSelector_use_case_off.png)

一旦離線 nodes 作業完成，我們再標記回 `service=on` ，回歸提供服務。

```
kubectl label nodes node5 service=on
```

針對一部分的 nodes 持續重複同樣的流程，標記 `service=off/service=on`，直到所有 nodes 維護作業完成。藉以達到服務不中斷。
