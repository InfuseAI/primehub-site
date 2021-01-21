---
id: version-3.3-index-zh
title: PrimeHub v3.3
original_id: index-zh
---

>關於 PrimeHub 的所有文件都是以英文撰寫為主，一部分文件會經翻譯繁體中文化。
>這裡列出已中文化的文件，如需更多最新技術資訊請參照英文文件。

## 簡介

**PrimeHub** 以專案群組的概念為設計中心，每個使用者須關聯至少一個群組才能操作使用者層面的功能。初始時，內建有使用者`phadmin`(「管理者」已開啟)、群組`phusers`及數個 *instance types*/*images*；立即就能利用初始資源啟動 Notebook。

同樣地，*Instance Type*、*Image*、*Dataset*t 等資源也須關聯至少一個群組或設定為 *Global* 才能被使用者選用。

使用者啟用「管理者」功能後，能切換至 Admin Portal 透過其上的管理功能進行新增/刪除/編輯 *User*、*Group*、*Instance Type*、*Image*、*Dataset* 等其它資源其它管理介面。

**PrimeHub v3** 進一步在使用者體驗及介面有著重大的改進；其中以「專案群組先決」的概念上，我們重新設計了 User Portal 的使用者體驗；有別於過往 PrimeHub v2 進入各功能頁後，每次操作都需要另外選擇針對的群組。「專案群組先決」的設計下，使用者先指定目前工作中的專案群組，之後所有的資訊及操作都是自動地限於此專案群組的範籌下，不需每一動都再額外指定，如此讓使用者可以更直覺以專案群組的角度來操作。如果您本是 PrimeHub v2.x 使用者，請先參考[專案群組先決](index-zh#專案群組先決)帶來的改變。

## PrimeHub v3.3+

**群組管理者 (Group Admin)**：以往只有使用者及系統管理者兩個層級，自 v3.3+ 起新增此層級。系統管理者可由 [Group 指定成員為特定群組管理者](zh-tw/guide_manual/admin-group-cht#members)；群組管理者可以自 User Portal 使用此層級的功能如： [Images](zh-tw/group-image-cht)。

---

## 架設安裝

請參照英文文件 [Provision of Kubernetes cluster, Installation of PrimeHub (Community/Enterprise)](dev-introduction).

---

## 使用者功能

### 專案群組先決

![](assets/group_context.png)

+ 專案群組先決的設計下，使用者需先指定工作專案群組；使用者也可輕易切換至其它專案群組。

+ 專案群組先決的設計下，使用者的一切操作均指定工作專案群組的範籌下發生。

+ 專案群組先決的設計下， `Jobs`、 `Schedule`及 `Models` 等各功能列舉的事件/資訊/項目也都限於屬於目前工作專案群組。功能上的操作也均是在工作專案群組下發生，如任務遞交、 任務排程及模型部署。

+ 專案群組先決的設計下，Notebook 於工作專案群組下啟動。

### 功能介紹

+ [操作登入及啟始 Notebook](zh-tw/quickstart/login-portal-user)

+ [Notebook 進階啟動設定](zh-tw/user-advanced-setting)

+ [遞交 Job 及即時監視其資源使用](zh-tw/job-submission-cht)

+ [儲存 Job Artifacts 輸出](zh-tw/job-artifact-cht)

+ [週期性 Job 排程](zh-tw/job-scheduling-feature-cht)

+ [模型部署 (Beta)](zh-tw/model-deployment-feature)

+ [群組限定映像檔](zh-tw/group-image-cht) `New`

+ [上傳群組限定共享檔案](zh-tw/shared-files-cht) `New`

+ [Notebook Extension 及 將 Notebook 遞交至 Job](zh-tw/ph-notebook-extension-cht)

+ [使用者資料儲存](zh-tw/quickstart/nb-data-store-cht)

+ [遠端 SSH 連線 Jupyter Notebook](zh-tw/guide_manual/ssh-config-cht)

+ [切換至 Admin Portal](zh-tw/quickstart/login-portal-admin)

---

## 管理功能

### Admin Portal

**PrimeHub v3** 將管理者功能從原先 **User Portal** 獨立於管理者專有 `Admin Portal`。 如果您本是 PrimeHub v2.x 管理者，請先參考 Admin Portal。

+ `Admin Portal` 請見 [透過 Admin Portal 管理 PrimeHub](zh-tw/quickstart/login-portal-admin)。

+ `Notebooks Admin` 功能、 `Maintenance` 功能及 `Grafana`連結整合進 Admin Portal。

+ `JupyterHub Admin` 功能更名為 `Notebooks Admin`

+ `System` 功能更名為 `System Settings`。

+ `Usage Reports` 新功能導入。

+ [進入 Admin Portal](zh-tw/quickstart/login-portal-admin)

+ [管理使用者、群組](zh-tw/guide_manual/admin-user-cht)

+ [指定群組管理者](zh-tw/guide_manual/admin-group-cht#members) `New`

+ [管理 Instance types/映像檔/資料集](zh-tw/guide_manual/admin-instancetype-cht)

+ [為使用者客製映像檔](zh-tw/guide_manual/admin-build-image-cht)
  + [客製映像檔指南](zh-tw/guide_manual/custom-image-guideline)

+ [管理 secrets](zh-tw/guide_manual/admin-secret-cht)

  + [GitLab Pull Secret](zh-tw/quickstart/secret-pull-image)
  + [GitHub gitsync secret](zh-tw/quickstart/secret-gitsync)

+ [檢視使用量月報表](zh-tw/guide_manual/admin-report-cht)

+ [設定 PrimeHub 系統參數](zh-tw/guide_manual/admin-system-cht)

+ [維運用 Maintenance Notebook](zh-tw/maintenance-cht)

+ [快速上手操作](zh-tw/quickstart/create-user)

---

## 英文技術文件

### Components Configuration

+ [SSH Server](getting_started/configure-ssh-server)

### Design Documents

+ [Architecture and more ...](design/architecture)

### Tasks

+ [Build](tasks/build)
+ [Jupyter Images](tasks/repo2docker)
+ [Operations](tasks/benchmark)
+ [API Token](tasks/api-token)

### Reference

+ [PrimeHub Chart Configuration](references/primehub_chart)
+ [Features Comparison](comparison)

### Trouble Shooting

+ [Category](trouble-shoot-guide)