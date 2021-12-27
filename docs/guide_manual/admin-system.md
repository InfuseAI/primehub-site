---
id: admin-system
title: System Settings
description: System Settings
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
  <div class="deploy-only tooltip">Deploy
    <span class="tooltiptext">Applicable to Deploy Edition</span>
  </div>
</div>

## PrimeHub License

![](assets/license_key_v311.png)

Information of the PrimeHub license:

+ `License Status`: `Activated` / `Unauthorized` / `Expired`; status of the license.

+ `Expiration Date`: The expiration date of the license.

+ `Licensed To`: Name of the organization that issued the license.

+ `Nodes`: Used/Granted number of nodes.

+ `Users`: Used/Granted number of users.

+ `Groups`: Used/Granted number of groups.

+ `Deployments`: Used/Granted number of deployed models.



### License warning

A license issued by InfuseAI contains `Expiration Date`, `Maximum Nodes`, `Maximum Users`, and `Maximum Deployments`.

+ When a license has expired, a warning message appears.

  > Your license has expired. Please contact your sales team to extend your license.

+ When used node amount > granted node amount, a warning message appears.

  > You are using more nodes than your license allows. Please contact your system administrator.

+ When used user amount > granted user amount, a warning message appears.

  > Exceed Quota - Number of users exceeds license limitation.

+ When used deployment amount > granted deployment amount + 10%, a warning message appears.

  > Exceed Quota - Group Maximum Deployments exceeded

## System Settings

![](assets/system_1_v24.png)

+ `Name` your organization.

+ `Logo` Click `+ add Image` to upload the logo.

+ `Default User Volume Capacity` the default disk quota for user.

+ `Timezone` the system timezone.

## Email Settings

![](assets/system_2_v26.png)

+ `SMTP Host` Sends the Sever host location of the email.

+ `SMTP Port` Sends the Sever host port of Email.

+ `From Display Name` A user-friendly name for the "From" address.

+ `From` The From field in Email.

+ `Reply To Display Name` A user-friendly name for the "Reply-To" address.

+ `Reply To` The Reply-To field in Email.

+ `Enable SSL` SSL encryption.

+ `Enable StartTLS` Supports extended StartTLS.

+ `Enable Authentication`
