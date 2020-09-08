---
id: ssh-vscode
title: VSCode SSH Jupyter Notebook Remotely
sidebar_label: VSCode Remote-SSH Notebook
---

> This guide requires prerequisites of Notebook with enabled SSH Server feature and key-pair. Please go to [SSH Server feature](ssh-config) if it hasn't been set up yet.


## Steps

1. Install the extension, [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) on VSCode.
   
   ![](assets/ssh-remote-ext.png)

2. Press `Cmd+Shift+p`, type `Remote-SSH:Connect to Host...` and run it.

   ![](assets/ssh-remote-cmd.png)

3. Select `jupyter` from listed hosts, it will open a new VSCode window.
   
   ![](assets/ssh-remote-host.png)

4. Once SSH succeeds, open file explorer and click `Open Folder`
   
   ![](assets/ssh-remote-folder.png)

5. Open the folder, `/home/jovyan`.
   ![](assets/ssh-remote-jovyan.png)

6. It shows files from `/home/jovyan` of remote Notebook.
   
   ![](assets/ssh-remote-files.png)