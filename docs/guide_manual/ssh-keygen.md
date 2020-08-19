---
id: ssh-keygen
title: Generating a new SSH key
sidebar_label: SSH key generation
---

Run the command with your email.

```bash
ssh-keygen -t rsa -b 4096 -C <your_username>
```

You will be prompted to change the file/the location and passphrase if required. Just press "enter" for default without a required passphrase. By default, the generated key files are located at `$HOME/.ssh/id_rsa` (private key) and `$HOME/.ssh/id_rsa.pub` (public key).


