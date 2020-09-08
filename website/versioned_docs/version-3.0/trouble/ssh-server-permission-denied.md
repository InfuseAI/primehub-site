---
id: version-3.0-ssh-server-permission-denied
title: Permission Denied
original_id: ssh-server-permission-denied
---

## Advices to Users

- Please check if your public key & private key are matched and placed in the correct place both in your Jupyter notebook and local machine.

- Your old key could be cached, please wait 2~15 minutes until the cache becomes invalid and the bastion server will fetch your new key.

## Advices for Admin

- You could also try to refresh the SSH key cache manually if none of above worked.
