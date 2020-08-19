---
id: ssh-cp-pub-key
title: Copying a public key into Jupyter
sidebar_label: Public key for Jupyter
---

1. Launching a JupyterHub with enabled SSH Server on PrimeHub.

2. Drag-n-drop a public key (e.g. `id_rsa.pub`) from your local to the `File Browser` of the opened JupyterHub tab on browser.

    ![](assets/ssh-dragdrop-pub.png)

3. Open `Terminal` on JupyterHub.

    ```bash
    mkdir -p ~/.ssh
    mv ~/id_rsa.pub ~/.ssh/authorized_keys
    ```

