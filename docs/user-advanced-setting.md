---
id: user-advanced-setting
title: Advanced Settings
---

At bottom of Jupyter Spawner, there are `advanced settings` which we can consider to enable for special purposes.

![img](assets/advancedSetting_v24.png)

## Safe Mode

When a user's jupyter pod cannot be launched successfully, we can consider to enable this setting and try it again for ***troubleshooting***. If the jupyter pod can be launched **with safe mode enabled** this time, which implies that user's home folder is full so that jupyter is not able to write its own files successfully.

Launching jupyter, by default, without safe more, user's home folder is mounted under `/home/jovyan` which is shared with jupyter files. When `no left space` for jupyter writing its own files, jupyter is failed to launch.

Under safe mode, it provides another persistent storage method to launch your notebook; the persistent volume is mounted under `/home/jovyan/user` rather than `/home/jovyan`, meanwhile, jupyter files are located under `/`, in other words, user's home folder and jupyter don't share the same space anymore.

Hence, once the jupyter is launched under safe mode successfully, we can try to clean up files under `~/user` or to uninstall unnecessary pip packages to make more space. Then we can shutdown this jupyter and re-launch jupyter again **without safe mode enabled**.

## (Experimental) JupyterLab 1.0 with kernel gateway

>Jupyter Kernel Gateway is a web server that provides headless access to Jupyter kernels. Your application communicates with the kernels remotely, through REST calls and Websockets rather than ZeroMQ messages.

If **Jupyter Kernel Gateway** is required, enable this setting. Go to [[Jupyter Kernel Gateway]](https://jupyter-kernel-gateway.readthedocs.io/en/latest/index.html) to learn the detail.
