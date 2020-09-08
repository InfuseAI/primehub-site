---
id: version-3.0-ssh-keygen-cht
title: 生成 SSH 金鑰
sidebar_label: SSH 金鑰生成
original_id: ssh-keygen-cht
---

## Steps

1. 在本地端執行帶入 `<your_username>`.

    ```bash
    ssh-keygen -t rsa -b 4096 -C <your_username>
    ```

2. 將會被提示更改檔案名稱/路徑，以及是否需要 passphrase；建議直接按下 `Enter`採用預設設定及不需 passphrase。生成金鑰檔會置於 `$HOME/.ssh/id_rsa` (私鑰) and `$HOME/.ssh/id_rsa.pub` (公鑰)。

## Reference
+ [ssh-keygen](https://www.ssh.com/ssh/keygen/)
+ [ssh-agent](https://www.ssh.com/ssh/agent)