---
id: ssh-keygen
title: Generating a new SSH Key Pair
sidebar_label: SSH Key Generation
---

## Steps

1. At your local, run the command with `<your_username>`.

    ```bash
    ssh-keygen -t rsa -b 4096 -C <your_username>
    ```

2. You will be prompted to change the file/the location and passphrase if required. Just press "enter" for default without a required passphrase. By default, the new key files are generated at `$HOME/.ssh/id_rsa` (private key) and `$HOME/.ssh/id_rsa.pub` (public key).

## Reference
+ [ssh-keygen](https://www.ssh.com/ssh/keygen/)
+ [ssh-agent](https://www.ssh.com/ssh/agent)