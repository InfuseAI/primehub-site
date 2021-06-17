---
id: version-3.6-admin-system
title: System Settings
description: System Settings
original_id: admin-system
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

+ `License Status`

+ `Utilized Nodes`: Used/Granted; a warning banner appears on User Portal when **Used > Granted**.

+ `Deployed Models`: Used/Granted; a warning banner appears on User Portal when **Used > Granted + 10%**, furthermore, new model creation is disabled.

+ `Expiration Date`

+ `Licensed To`

### License warning

A license issued by InfuseAI contains `Expiration Date`, `Maximum Nodes`, `Maximum Deployments`.

+ When a license has expired, a warning message appears.

  >Your license has expired. Please contact your sales team to extend your license.

+ When used node amount > granted node amount, a warning message appears.

  > You are using more nodes than your license allows. Please contact your system administrator.

+ when used model amount > granted model amount + 10%, a warning message appears.

  >Please contact your system administrator for assistance to upgrade your license to run more models.

## System Settings

![](assets/system_1_v24.png)

+ `Name` your organization.

+ `Logo` Click `+ add Image` to upload the logo.

+ `Default User Volume Capacity` the default disk quota for user.

+ `Timezone` the system timezone.

## Email Settings

![](assets/system_2_v26.png)

+ `SMTP Host` Sends the Sever host location of the email.

+ `SMTP port` Sends the Sever host port of Email.

+ `From Display Name` A user-friendly name for the "From" address.

+ `From` The From field in Email.

+ `Reply To Display Name` A user-friendly name for the "Reply-To" address.

+ `Reply To` The Reply-To field in Email.

+ `Enable SSL` SSL encryption.

+ `Enable StartTLS` Supports extended StartTLS.

+ `Enable Authentication`
