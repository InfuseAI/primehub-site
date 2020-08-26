---
id: index-zh
title: 說明
---

>關於 PrimeHub 的所有文件都是以英文撰寫為主，一部分文件會經翻譯繁體中文化。
>這裡列出已中文化的文件，如需更多技術資訊請參照英文文件。

## PrimeHub 管理者

**PrimeHub v3.0** 將管理者功能從原先 **User Portal** 獨立於管理者專有 `Admin Portal`。 如果您本是 PrimeHub v2.x 管理者，請先參考重大改進。

### 重大改進

+ `Admin Portal`。

+ `JupyterHub Admin` 功能、 `Maintenance` 功能及 `Grafana`連結整合進 Admin Portal。

+ `System` 功能更名為 `System Settings`。

+ `Usage Reports` 新功能導入。

針對 PrimeHub 管理者，可以參考：

+ [透過 Admin Portal 管理 PrimeHub](zh-tw/quickstart/login-portal-admin#功能選單)

+ [快速上手操作](zh-tw/quickstart/create-user)

---

## 資料科學家|工程師

**PrimeHub v3.0** 在使用者體驗及介面有著重大的改進；其中以「專案群組先決」的概念上，我們重新設計了 User Portal，有別於過往進入各功能頁後，再選擇操作所針對的專案群組，如此讓使用者以專案群組的角度可以更直覺的操作。如果您本是 PrimeHub v2.x 使用者，請先參考重大改進。

### 重大改進

+ 專案群組先決的設計下，使用者可以輕易切換專案群組。

+ 專案群組先決的設計下，使用者的一切操作均在預先決定的專案群組下發生。

+ 專案群組先決的設計下， `Jobs`、 `Schedule`及 `Models` 等各功能列舉的項目也都限於同一預先決定專案群組發生的項目。功能上的操作也均是在預先決定的專案群組下發生，如 jobs submission、 job schedule 及 模型部署；

+ 專案群組先決的設計下，JupyterHub 會於預先決定的專案群組下啟動。

針對 Data Scientist / ML Engineer 可以參考如何使用 PrimeHub 平台上進行研究：

+ [操作登入及啟始專案](zh-tw/quickstart/login-portal-user)

+ [Job Submission/Scheduler 使用及教學 (Beta)](zh-tw/job-submission-cht)

+ [Model Deployment 使用 (Alpha)](zh-tw/model-deployment-feature)

