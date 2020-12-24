---
id: nb-phfs-folder-cht
title: PHFS 空間
description: PHFS 空間
---

>PHFS 空間 - 須要先啟用並配置 [PrimeHub Store](design/primehub-store)。

**PrimeHub Store** 啟用後，使用者的 Notebook 會自動掛載`phfs`空間，此空間實際是透過 [PrimeHub File System (PHFS)](design/phfs) 而實現。

PHFS 空間是 PHFS 技術呈現的第一步，此空間是同群組成員的共享空間。目前使用者可以透過 Notebook 或 Job Artifacts 來存取。

PHFS 空間 與 Group Volume 看來類似，但兩者存在差異，請見[差異比較](../design/phfs#comparing-to-group-volume)。除此之外，PHFS 空間也有限制，如：無法設定額度限制及效能，因此我們不建議用此空間`/phfs`來儲存資料集或是其它要求存取效能的資料；資料集還是建議用 Dataset Management 建出的空間來存放。

PrimeHub 持續會開發提供更多利用存取 PHFS 的功能。
