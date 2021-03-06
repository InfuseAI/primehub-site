---
id: version-3.0-ssh-vscode-cht
title: VSCode 透過 SSH 遠端存取 Jupyter Notebook
sidebar_label: VSCode 遠端存取 Notebooks
original_id: ssh-vscode-cht
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

>此指南需要 SSH Server 相關設定已經完成並啟動的 Notebook； 尚未設定的話，請先參考 [SSH Server feature](ssh-config-cht)。


## Steps

1. 安裝 VSCode 套件 [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)。
   
   ![](assets/ssh-remote-ext.png)

2. 按下 `Cmd+Shift+p`， 並輸入 `Remote-SSH:Connect to Host...` 且執行。

   ![](assets/ssh-remote-cmd.png)

3. 從選單中選擇 `jupyter`，將會開啟新 VSCode 視窗。
   
   ![](assets/ssh-remote-host.png)

4. 一旦 SSH 連線成功，從檔案瀏灠點擊 `Open Folder`。
   
   ![](assets/ssh-remote-folder.png)

5. 選擇開啟 `/home/jovyan`。
   
   ![](assets/ssh-remote-jovyan.png)

6. 顯示位於遠端 Jupyter Notebook 下的 `/home/jovyan` 檔案。
   
   ![](assets/ssh-remote-files.png)