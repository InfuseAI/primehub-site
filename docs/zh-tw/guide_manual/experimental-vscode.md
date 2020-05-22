---
id: experimental-vscode
title: VS Code 體驗
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Available in Enterprise tier only</span>
</div>

InfuseAI 提供一個內建 [code-server](https://github.com/cdr/code-server) 的 image，讓使用者可以體驗在 JupyterHub 中使用 VS Code。

InfuseAI 提供的 Image URL 為 `infuseai/docker-stacks:vscode-with-tf2-47543bcb-20200311-a`。

1. 新增此 Image 至 Image Management。（請洽 PrimeHub 管理者）

2. 選擇此 Image 起始 JupyterHub。

3. 起始後，我們可以看到右側工作區 Notebook 下 **VS Code** 圖示，點擊開啟 VS Code 新分頁。
   
   ![](assets/vscode_notebook.png)

4. 我們能有近乎一樣的體驗來使用此 VS Code；側邊欄的第一個圖示為 Menu。

    ![](assets/vscode_navigation.png)

5. 同樣地，我們也能更改 VS Code settings。

    ![](assets/vscode_setting.png)

試著體驗吧！
