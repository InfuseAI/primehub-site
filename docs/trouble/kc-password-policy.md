---
id: kc-password-policy
title: Password Policy
---

If you want to enforce PrimeHub users setting strict passwords, we can utilize `Keycloak Password Policy` feature to achieve it.

## Steps

1. Login Keycloak of PrimeHub with a Keycloak admin account.

2. Make sure it is under **Primehub** realm (it should show **Primehub** at top left corner, change to Primehub if not.), like the screenshot below.

3. Goes to **Realm Settings** and select **Security Defenses** tab.

4. Select **Brute Force Detection**, toggle the **Enabled**
   
5. We can set the detail of failure tolerance and rules.
   
6. Click **Save**.

![brute_force](assets/kc_password_policy.png)

## Reference

[Keycloak Password Policy](https://www.keycloak.org/docs/latest/server_admin/#_password-policies)