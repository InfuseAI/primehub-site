---
id: kc-brute-force-detection
title: Lock down accounts after several login failures
---

If you are looking for a measurement that locking down accounts after several PrimeHub login failure to avoid **brute force attacks**, we can utilize the `Brute Force Detection` feature of Keycloak to achieve it.

## Steps

1. Login Keycloak of PrimeHub with a Keycloak admin account.

2. Make sure it is under **Primehub** realm (it should show **Primehub** at top left corner, change to Primehub if not.), like the screenshot below.

3. Goes to **Authentication** and select **Password Policy** tab.

4. Click **Add policy** drop list and select the policy.
   
5. We can set the detail of rules.
   
6. Click **Save**.

![brute_force](assets/kc_brute_force_detection.png)

## Reference

[Keycloak Brute Force Detection](https://www.keycloak.org/docs/latest/server_admin/#password-guess-brute-force-attacks)

