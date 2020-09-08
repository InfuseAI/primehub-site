---
id: index-zh
title: 說明
---

>關於 PrimeHub 的所有文件都是以英文撰寫為主，一部分文件會經翻譯繁體中文化。
>這裡列出已中文化的文件，如需更多技術資訊請參照英文文件。

## 資料科學家|工程師

**PrimeHub v3.0** 在使用者體驗及介面有著重大的改進；其中以「專案群組先決」的概念上，我們重新設計了 User Portal；有別於過往 PrimeHub v2 進入各功能頁後，每次操作都需要另外選擇針對的群組；由於 **PrimeHub v3** 「專案群組先決」的設計，使用者預先指定目前工作中的專案群組，所有的資訊及操作都是自動地限於此專案群組的範籌下，不需每一動都再額外指定，如此讓使用者可以更直覺以專案群組的角度來操作。如果您本是 PrimeHub v2.x 使用者，請先參考「專案群組先決」。

### 專案群組先決

+ 專案群組先決的設計下，使用者需先指定工作專案群組；使用者也可輕易切換至其它專案群組。

+ 專案群組先決的設計下，使用者的一切操作均指定工作專案群組的範籌下發生。

+ 專案群組先決的設計下， `Jobs`、 `Schedule`及 `Models` 等各功能列舉的事件/資訊/項目也都限於屬於目前工作專案群組。功能上的操作也均是在工作專案群組下發生，如任務遞交、 任務排程及模型部署。

+ 專案群組先決的設計下，JupyterHub 會於工作專案群組下啟動。

### 針對 Data Scientist / ML Engineer 可以參考如何使用 PrimeHub 平台上進行研究：

+ [操作登入及啟始專案](zh-tw/quickstart/login-portal-user)

+ [Job Submission/Scheduler 使用及教學 (Beta)](zh-tw/job-submission-cht)

+ [模型部署 (Alpha)](zh-tw/model-deployment-feature)

+ [遠端 SSH 連線 Jupyter Notebook](zh-tw/guide_manual/ssh-config-cht)

---

## PrimeHub 管理者

**PrimeHub v3.0** 將管理者功能從原先 **User Portal** 獨立於管理者專有 `Admin Portal`。 如果您本是 PrimeHub v2.x 管理者，請先參考 Admin Portal。

### Admin Portal

+ `Admin Portal` 請見 [透過 Admin Portal 管理 PrimeHub](zh-tw/quickstart/login-portal-admin)。

+ `Notebooks Admin` 功能、 `Maintenance` 功能及 `Grafana`連結整合進 Admin Portal。

+ `JupyterHub Admin` 功能更名為 `Notebooks Admin`

+ `System` 功能更名為 `System Settings`。

+ `Usage Reports` 新功能導入。

### 針對 PrimeHub 管理者，可以參考：

+ [進入 Admin Portal](zh-tw/quickstart/login-portal-admin)

+ [設定 PrimeHub 系統參數](zh-tw/guide_manual/admin-system-cht)

+ [管理使用者及群組](zh-tw/guide_manual/admin-user-cht)

+ [管理 Instance types/映像檔/資料集](zh-tw/guide_manual/admin-instancetype-cht)

+ [為使用者客製映像檔](zh-tw/guide_manual/admin-build-image-cht)
  + [客製映像檔指南](zh-tw/guide_manual/custom-image-guideline)

+ [管理 secrets](zh-tw/guide_manual/admin-secret-cht) 

  + [GitLab Pull Secret](zh-tw/quickstart/secret-pull-image)
  + [GitHub gitsync secret](zh-tw/quickstart/secret-gitsync)

+ [檢視使用量月報表](zh-tw/guide_manual/admin-report-cht)
  
+ [維運用 Maintenance Notebook](zh-tw/maintenance-cht)

+ [快速上手操作](zh-tw/quickstart/create-user)

