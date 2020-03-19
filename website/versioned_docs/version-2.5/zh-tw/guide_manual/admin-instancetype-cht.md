---
id: version-2.5-admin-instancetype-cht
title: Instance Type Management
original_id: admin-instancetype-cht
---

Instance type management 提供給管理者 Instance 運算資源管理能力，如：新增、刪除、編輯運算資源分配及群組權限。

## Creating New Instance Types

![](assets/instancetype_3.png)

點選 `Add` 新增 Instance Type，會跳出編輯該 Instance Type 的畫面。

![](assets/admin_inst_v25.png)

需填入以上畫面中 `Basic Info` 的各個欄位：

+ `Name` 必填，只能填寫小寫字母、數字、點（“.”）、連接號（“-”）和底線（“_”）。

+ `Display name` 顯示名稱。

+ `Description`

+ `CPU Limit` 填入分配給該 Instance Type 的 CPU 使用上限，當 `CPU Request` 沒有啟用時，該上限值同樣預設給 `CPU Request` 。

+ `Memory Limit` 填入分配給該 Instance Type 的 Memory 使用上限，當 `Memory Limit` 沒有啟用時，該上限值同樣預設給 `Memory Limit` 。

+ `GPU Limit` 填入分配給該 Instance Type 的 GPU 使用上限 。

### Overcommitting

+ `CPU Request` 填入分配給該 Instance Type 所請求的 CPU 使用量。啟用時，Instance 保證會分配到所請求的 CPU 使用量。當 `CPU Request < CPU Limit` 時，系統會在上限內分配閒置的 CPU 。

+ `Memory Request` 填入分配給該 Instance Type 所請求的 Memory 使用量。啟用時，Instance 保證會分配到所請求的 Memory 使用量。當 `Memory Request < Memory Limit` 時，系統會在上限內分配閒置的 Memory 。

細節請見 [Resource QoS](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/node/resource-qos.md#resource-quality-of-service-in-kubernetes).

+ `Global`  開啟後，所有人皆可使用此 Instance Type；若關閉，則需在 `edit groups` 連結有權限使用的 Group 。

最後點選 `confirm` 完成新增。

## Toleration

當 node 帶有 `taint` 時，instance 並不會被排程到此 node 上運作。但您可以用 toleration 來設定 `taint` 容忍條件，允許排程到滿足條件的 node 上運作。在此，我們僅會說明如何新增 toleration。

關於 `kubectl taint` 用法及更多細節請參照 [Tolerations concept](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/).

![](assets/instance_type_toleration0.png)

在 `Toleration` 頁籤中，您可以點選 `Add` 新增 `Toleration` 。

![](assets/instance_type_toleration1.png)

需填入以上畫面中的各個欄位：

+ `Key` 此為想容忍 `taint` 之 Key 值。

+ `Value` 如果選取 `Operator` 為 `Equal` ，則須填入想容忍 `taint` 之 Value 值。

+ `Operator` 必填， 選取  `Equal` 或 `Exists` 。

+ `Effect` 選取 `None` 、 `NoSchedule` 、 `PreferNoSchedule` 及 `NoExecute` 。

關於 Operator , Effect 選項，請參照 [Taints and Tolerations](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/).

點選 `OK` 新增。

最後點選 `confirm` 完成新增。

關於使用案例，請見 [Toleration 使用案例](usecase-toleration-cht)。

## NodeSelector

您可以限制 instance 只能排程在帶有特定 labels 的 nodes 上運作。`Label` 是一對 key-value 值。

在此，我們僅會說明如何新增 NodeSelector。

關於 kubectl label 用法及更多細節請參照[ Assigning Pods to Nodes 概念](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/)

![](assets/instance_type_nodeselector.png)

在 `NodeSelector` 頁籤中，您可以點選 `+ Add field` 新增 `NodeSelector` 。

填入您想要選取的 Label 的 `key/value` 後，點選 `Confirm` 以完成新增。

關於使用案例，請見 [NodeSelector 使用案例](usecase-nodeselector-cht).

## Deleting Instance Types

![](assets/instancetype_5.png)

點選 `Delete`，會跳出確認對話框，確認是否刪除該 Instance Type。

## Editing Instance Types

![](assets/instancetype_4.png)

點選 `edit` 進該 Instance Type 的編輯頁面。

## Editing Groups

![](assets/edit_groups.png)

若未開啟 `Global` 開放給所有使用者使用，在編輯 Instance Type 的畫面下方點選`edit groups`，即可從現有的 Groups 列表中選取有權限使用該 Instance Type 的 Group，將它們連結在一起。
