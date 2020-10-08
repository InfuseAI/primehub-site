---
id: howto-check-group-vol
title: HOWTO - Check Group Volume Usage
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

## Group Volume Usage

1. Determine a group name for checking.

2. Substitute `project-<group>` with `project-xxxx` in the command and run it to gain the pod name.
   
    ```bash
    kubectl -n hub get pod | grep project-<group>
    ```

    Note down the pod name like xxx-project-xxxx

3. Substitute `<pod-name>` with the real pod name in the command and run it to learn the usage info.
   
   ```bash
   kubectl -n hub exec <pod-name> -- sh -c 'df -h | grep rbd'
   ```

   We should see a similar output of usage info:

   ```text
   Filesystem                   Size  Used  Avail  Capacity    Mounted on
   /dev/rbd11                    196G   3.9M   182G   3%       /project/xxx
   ```
