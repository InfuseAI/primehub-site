---
id: version-3.10-admin-nb-admin
title: Notebooks Admin
original_id: admin-nb-admin
---


## Notebook Instances

The page represents Hub of all of user Notebook instances; if an instance is running, two action buttons, `Access Server`/`Stop Server` appear. If a user who hasn't launched any Notebook instance since the account creation, the user won't be listed here since Hub doesn't have any relative record.

Platform Admin can take actions against the instance. `Stop All Activities` will stop all of running instances at once.

![](assets/v310-nb-admin-list.png)

## Out of Sync

When Admin notices that status of Notebook instance of a single user is out of sync with output of kubectl.

For example, the page here indicates a user's Notebook instance running, but output of kubectl shows the user pod doesn't exist, i.e., not running.

```bash
kubectl -n hub get pod | grep jupyter-<user_id>
```

In this case, use `Remove From Instance` for the reset of the user. Don't worry, it doesn't *delete user account from PrimeHub*, once the user launches a Notebook instance, the user account is listed here again. It forces Hub to synchronize with Kubernetes  when the user try launching Notebook next time.



## Shutdown Hub

>Before doing it, please make sure why you want to do it and what you are doing.
>If you seen any troubleshooting guide suggesting *Shutdown Hub* measurement. Here steps are.

**Uncheck the two boxes** as below, and click `Shutdown`.

It will take time to restart Hub and traverse all of users for the synchronization, i.e., it takes more time while more user accounts. It usually takes few minutes depending on network and user amount.

![](assets/nb-admin-shutdown.png)
