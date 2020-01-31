---
id: user-advanced-setting
title: Spawner 進階設定 
---

在 Jupyter Spawner 頁面下方，有個`advanced settings`其中包含些進階選項，我們可以考慮在某些特殊狀況下起始 jupyter 時，啟用這些選項。

![img](assets/advancedSetting_v24.png)

## Safe Mode

安全模式，當某些情況下我們無法成功起始 jupyter 時，我們可以考慮啟用安全模式進行「偵錯」。如果此時安全模式下可以正常起始 jupyter ，那有可能是因為`/home/jovyan`空間已滿，導致 jupyter 無法寫入資料，進而無法起始。

一般模式下起始 jupyter 時，使用者的 home 目錄是掛載在`/home/jovyan`； jupyter 同時也將其檔案放在此目錄下。所以「空間不足」時（使用者生成的檔案過多、`pip install`套件佔過多空間），jupyter 就無法將起始所需的資料成功寫入在該目錄下，導致起始失敗。

安全模式下起始 jupyter 時，使用者的 home 目錄則是掛載在`/home/jovyan/user`; `/home/jovyan`則是歸在`/`下，其檔案則使用不同的空間。

因此，此時我們可以針對使用者 home 目錄(`~/user`)下的檔案及套件進行清理騰出空間，關閉安全模式下的 jupyter ，以一般模式重啟 jupyter。

## (Experimental) JupyterLab 1.0 with kernel gateway

>Jupyter Kernel Gateway is a web server that provides headless access to Jupyter kernels. Your application communicates with the kernels remotely, through REST calls and Websockets rather than ZeroMQ messages.

如果我們需要啟用 **Jupyter Kernel Gateway** 功能，可以啟用該選項；想要了解更多關於，請參考 [[Jupyter Kernel Gateway]](https://jupyter-kernel-gateway.readthedocs.io/en/latest/index.html)。
