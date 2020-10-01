---
id: version-3.0-add-instance-type
original_id: add-instance-type
title: 新增/計劃 Instance Type
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

這份文件說明如何新增 instance type 以及建議初次使用時如何根據實際環境 (CPUs/MEM/GPUs) 著手開始規劃要哪些 instance types。

## 規劃建議

在實際情況中，我們會需要管理及分配 CPUs/MEM/GPUs 資源給不同的專案；透過`Instance Type Management`，我們可以開始規劃資源配置的選項，讓不同專案/群組可以一起有效率地運用整體資源，也可以避免單一專案佔掉大部分的資源。

PrimeHub cluster 本身會需要用到部分資源維持自身的運作，所以我們無法將 100% 資源都用在專案上，建議保留整體資源 10%-15% 留給 cluster 之用。

不同專案對運算資源有不同需求，我們可以依照需求大小來制定 instance type 選項 （如：small/medium/large)；使用者可以依據專案資源需求來選擇合適的 instance type 請求所需的資源。

以實際環境的整體資源的比例做為考量，來規劃我們的 instance type 配置選項；初次使用時，可以以此為規劃出發點。

**假設實際環境配置 *CPU 40 / MEM 512GB / GPU 4*:**

### CPU-Only instance type

|Scale|CPU|Mem|% of Total|
|-----|---|---|----------|
|Small|4|128G|10-25|
|Medium|16|256G|40-60|
|Large|32|420G|80+|

### GPU-Equipped instance type

|Scale|CPU|Mem|GPU|% of Total|
|-----|---|---|---|----------|
|Small|4|128G|1|10-25|
|Medium|16|256G|2|40-60|
|Large|32|420G|4|80+|

## 新增

根據我們規劃讓我們來新增一個「medium-with-GPU」instance type。

1. 以管理者帳號登入後[切換至 Admin Portal](login-portal-admin)。

2. 在側邊選單上，點擊 `Instance Types`進入管理介面，點擊`+ Add`按鈕，新增 instance type。

3. `Name`：輸入 *medium-with-gpu*。

4. `CPU Limit`：輸入 *16*； `Memory Limit`：輸入 *256GB*。

5. `GPU Limit`：輸入 *2*。

6. (非必要) `Overcommitting`： 如果需要啟用； `CPU Request`：輸入 *14*； `Memory Request`：輸入 *200GB*. [詳細資訊請見 [Overcommitting]](https://docs.primehub.io/docs/guide_manual/admin-instancetype#overcommitting-advanced-feature)。

7. 點擊`edit groups` 並選擇可以使用此 instance type 的群組（專案）。

8. 點擊`Confirm`儲存。

我們已經新增一個「中級資源配置需求」的 「medium-with-gpu」instance type ；屬於指定群組（專案）的使用者就可以指定此配置需求來啟始 jupyterhub 進行專案。
