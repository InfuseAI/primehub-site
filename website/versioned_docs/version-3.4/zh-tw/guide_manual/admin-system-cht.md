---
id: version-3.4-admin-system-cht
title: System Management
description: System Management
original_id: admin-system-cht
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

## PrimeHub License

![](assets/license_key_v34.png)

Information of the PrimeHub license:

+ `License Status` 授權狀態

+ `Utilized Nodes`: 已使用數量/授權數量；當已使用數量 > 授權數量，警示訊息會顯示在 User Portal 上。

+ `Deployed Models`: 已使用數量/授權數量；當已使用數量 > 授權數量 + 10%，警示訊息會顯示在 User Portal 上，更進一步，將無法再新增模型部署。

+ `Expiration Date` 授權期限

+ `Licensed To` 授權單位

### 授權警示

InfuseAI 發出的授權包括 `授權期限`、 `最多節點數量`, `最多模型部署數量`。

+ 當授權逾期時，顯示警示訊息

  >Your license has expired. Please contact your sales team to extend your license.

+ 當使用節點數 > 授權節點數量，顯示警示訊息

  > You are using more nodes than your license allows. Please contact your system administrator.

+ 當使用模型部署數量 > 授權模型部署數量 + 10%，顯示警示訊息

  >Please contact your system administrator for assistance to upgrade your license to run more models.

## System Settings

![](assets/system_1_v24.png)

+ `Name` 編輯貴單位名稱。

+ `Logo` 點選`+ add Image`即可上傳貴單位的 Logo。

+ `Default User Disk Quota` 預設使用者的磁碟空間配額。

+ `Timezone` 選擇貴單位所在地的時區。


## Email Settings

![](assets/system_2_v26.png)

另外也需要設定從此平台發出的 Email 設定，包括：

+ `Smtp Host` 發 Email 的 Server 主機位置。

+ `Smtp port` 發 Email 的 Server 主機 port。

+ `From Display Name` 顯示發出 Email的名稱。

+ `From` 發自哪個 Email。

+ `Reply To Display Name` 回覆 Email 的名稱。

+ `Reply To` 回覆至哪個 Email。

+ `Enable SSL` SSL加密。

+ `Enable StartTLS` 支援擴充 StartTLS。

+ `Enable Authentication` 身份認證。
