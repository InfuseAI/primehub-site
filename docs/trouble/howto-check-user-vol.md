---
id: howto-check-user-vol
title: HOWTO - Check User Volume Usage
---

## User Volume Usage

1. Determine a username for checking.

2. Substitute `<username>` with the username in the command and run it to gain user pod name.
   
    ```bash
    kubectl -n hub get pod | grep <username>
    ```
    Note down the user pod name like `jupyter-<username>-xxxx`.

3. Substitute `jupyter-<username>-xxxx` with the real name in the command and run ti to learn the usage.
   
   ```bash
   kubectl -n hub exec jupyter-<username>-xxx -- sh -c 'df -h | grep rbd'
   ```

   We should see a similar output of usage info:
   ```text
   Filesystem                   Size  Used  Avail  Capacity    Mounted on
   /dev/rbd11                    49G   53M   47G   1%          /home/jovyan
   ```
