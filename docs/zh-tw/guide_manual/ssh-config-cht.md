---
id: ssh-config-cht
title: SSH Server 功能
---

**PrimeHub v3.0+** 提供新功能 SSH Server，允許使用者透過 SSH 方式來存取遠端已啟動的 JupyterHub。實際的應用情境是使用者可以使用熟悉且較強大的開發工具(如：**VSCode + Remote-SSH**)來進行遠端開發；提供使用者更多開發工具的選擇。

## 啟用 SSH Server

>為了能讓使用者開啟 SSH Server 功能前， 管理者須先設定 PrimeHub 的 SSH Server 配置。 請洽管理者及參考設定文件 [Configure SSH Server](../../getting_started/configure-ssh-server)。

> 在我們啟用此功能前，請先確保您有可使用的**公私金鑰**，若您尚未有金鑰請參考 [SSH 金鑰產生](ssh-keygen-cht)在本地端產生一組可用金鑰。

1. 從側選單進入`JupyterHub`，展開`Show advanced settings`並勾選`Enable SSH Server`。

    ![](assets/ssh-enable.png)

2. 將滑鼠移至設定代碼上，點擊複製圖示將代碼複製於剪貼簿，稍候需要用到此代碼。

3. 點擊`Start Notebook`啟動 JupyterHub。

4. 回到本機端，編輯 `~/.ssh/config` 將先前複製代碼貼上，並確認或修改代碼中 `jupyter-<username>` 及 `~/.ssh/id_rsa`(私鑰) 是否指到正確的檔案及路徑。

    >如果您想指定其它金鑰，請修改代碼中出現的 `~/.ssh/id_rsa`；如果您的金鑰需要 passphrase，您可以考慮將其加入 [ssh-agent](https://www.ssh.com/ssh/agent)。

## 複製公鑰至 JupyterHub

JupyterHub 啟動後，

> User Portal 上 JupyterHub 選單頁上會顯示一樣的指示及設定供參考。

![](assets/ssh-server-instruction.png)

5. 以拖曵方式將公鑰 (e.g. `id_rsa.pub`) 從本地端複製到啟動 JupyterHub 的 `File Browser` 。

    ![](assets/ssh-dragdrop-pub.png)

6. 於 JupyterHub 開啟 `Terminal`， 執行
   
    ```bash
    mkdir -p ~/.ssh
    mv ~/id_rsa.pub ~/.ssh/authorized_keys
    ```

7. 回到本地端執行，來驗證

    ```bash
    ssh jupyter
    ```

    SSH 登入 JupyterHub 成功後，應見到提示符號：

    ```
    jovyan@jupyter-<your_username>:~$
    ```

>一旦初次設定成功後，日後只需要**步驟1**，即可透過 SSH 連線 JupyterHub。

## 實際應用 - VSCode

請見指南 [VSCode + Remote-SSH](ssh-vscode-cht)。
