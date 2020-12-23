---
id: nb-data-store-cht
title: 資料儲存空間
---

PrimeHub 提供使用者幾個從 Notebook 可以存取儲存資料的空間，根據儲存資料空間的屬性有分下列幾種。

## User Volume

每個使用者都有獨立專屬的儲存空間 **User Volume** 。系統預設大小為每人 20 GB，管理者有權加大。實際空間的預設大小及加大空間需求請洽管理者。參照 [System Settings](../guide_manual/admin-system-cht#system-settings).

在 Notebook，其空間位置就是家目錄 `/home/jovyan`。

## Group Volume

每個使用者皆須關聯至一個以上群組。若管理者有開啟關聯群組的 `Shared Volume`並指定空間大小，同群組使用者皆可存取此共享空間 **Group Volume** 共享資料。 請洽管理者詢問此空間大金或為群組開啟此共享空間。 參照 [Group Management](../guide_manual/admin-group-cht#shared-volume)。

在群組`<GroupId>`下啟動的 Notebook，會有掛載的 `groupid`共享資料夾，使用者可存取。例： `InfuseAICat`群組 -> `infuseaicat/`資料夾。

## Dataset Volume

管理者有能力透過 Dataset Management 為使用者新增資料集專用的 **Dataset Volume**，其空間大小為管理者參考上載資料集大小而指定。

如果使用者群組有關聯私有資料集或是公有資料集，使用者由同群組下啟動的 Notebook 可以存取這些資料集空間。

資料集空間的讀寫權限會因資料集的 *type*, *global* 及 關聯 *groups* 而異。 參照 [Dataset - Group Access Control](../guide_manual/admin-dataset#groups-access-control).

在 Notebook， 資料集空間資料夾掛載在 `datasets/<dataset_name>`。請洽管理者新增資料集空間或存取權限。

## PHFS Storage

[PHFS Storage](../../design/phfs) 是基於 [PrimeHub Store](../../design/primehub-store) 技術。此空間共享於同群組成員，也可利用此空間交換使用者資料。 PHFS 空間 與 Group Volume 看來類似，但兩者存在差異，請見[差異比較](../../design/phfs#comparing-to-group-volume)。

>PHFS 目前只支援序列性寫檔；在此限制下，直接寫入 `HDF5` 格式的檔案進 PHFS 會造成寫入錯誤 `Problems closing file (file write failed: ...)`，主因為 `HDF5` 寫檔同時使用 *seek*。

>此情況下，我們建議直接寫入 `HDF5`檔至使用者家目錄，再複製到 PHFS 做為模型部署準備，*避免直接寫入 PHFS*。

除此之外，PrimeHub 功能也會利用到此空間儲放功能相關資料，如：同群組 Job 存放產出的 artifacts 於 `/phfs/jobArtifacts/`；也因為此空間先天的限制，我們不建議存放需求 IO 效能資料集於此，建議放置在專屬資料集空間 Dataset Volume。 PrimeHub 持續會開發提供更多利用存取 PHFS 的功能。

在 Notebook， 此空間位於 `/phfs`。
