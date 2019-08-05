---
id: howto2
title: HOWTO Backup User Group Volume 
---
## 備份使用者資料

以下步驟會需要 `sudo` 權限

1. 透過 pvc 找到 pv name。假設使用者是 phadmin，則 pvc 是 `claim-phadmin`，而 pv name 就是 `pvc-14bb5395-1e1c-11e9-ad78-42010a28000c`

        $ kubectl -n hub get pvc

    ![](/img/Untitled-a31474f5-0ef8-45c2-aaf6-d4d1966c18f7.png)

2. 匯出 pv Image

        $ PV_NAME=pvc-14bb5395-1e1c-11e9-ad78-42010a28000c
        $ kubectl -n rook exec rook-tools -- rbd export replicapool/${PV_NAME} - \
          > /tmp/backup_image

3. 掛載 Image

        sudo mkdir -p /mnt/backup_image
        sudo mount -t ext4 /tmp/backup_image /mnt/backup_image

4. 備份資料，此時資料會在 `/mnt/backup_image`
5. 卸載資料

        sudo umount /mnt/backup_image
        rm /tmp/backup_image

## 備份 Group/Dataset 資料

以下步驟會需要 `sudo` 權限

1. 找出 NFS Pod 的 IP。如果是 group volume，則 pod name 會是 `nfs-project-<volume-name>-xxxxx`。如果是 dataset 會是 `nfs-dataset-<volume-name>-xxxxxaf` 。

        $ kubectl -n hub get pods -l app=primehub-group -o wide

    ![](/img/Untitled-f2e2bc6f-47ae-43da-8251-8f3b6eae2812.png)

2. 找到對應的 ip ，以下面的例子是 `10.233.66.24`
3. 掛載 NFS

        $ NFS_POD_IP=10.233.66.24
        $ sudo mkdir -p /mnt/backup_image
        $ sudo mount -t nfs ${NFS_POD_IP}:/exports /mnt/backup_image

4. 備份資料，此時資料會在 `/mnt/backup_image`
5. 卸載 NFS

        $ sudo umount /mnt/backup_image