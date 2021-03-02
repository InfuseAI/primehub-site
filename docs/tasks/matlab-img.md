---
id: matlab-img
title: How to launch MATLAB on PrimeHub
sidebar_label: MATLAB Image
---

InfuseAI has provided the PrimeHub-compatible [image of MATLAB environment on DockerHub](https://hub.docker.com/layers/infuseai/custom-image/matlab-proxy-r2020b/images/sha256-d30d67bcbe9f3d130e00d999d7ec569214058da950382aeb211f04b0574d77f9?context=explore), the upstream image is from https://ngc.nvidia.com/catalog/containers/partners:matlab. Which we could launch a MATLAB environment on PrimeHub.

The steps of launching MATLAB by using the image is below,


## Steps

1. Add a new image (e.g. name: matlab) with this image url, `infuseai/custom-image:matlab-proxy-r2020b`, via Images (Admin/Group admin).

2. Add a dataset of type `env` with the following information, replace `<your_PrimeHub_domain>` with the full domain name of PrimeHub in your circumstance, e.g. `ai.company.com.tw`.

    ![](assets/dataset_primehub_config.png)

3. At Notebook, select the newly added image (e.g. matlab) with an instance type to start a Notebook. If you are unfamiliar with launching a Notebook. Please see [Notebook](quickstart/launch-project).

    > Image-pulling could take a while due toe the image size, please retry it if timeout at the very firs time.

4. Once Notebook is launched, start a Terminal session from Launcher.

    ![](assets/notebook_launcher.png)

5. Type `start-matlab` and press *Enter*; the output looks like below, just skip to check the last line at the bottom showing a url. e.g. `https://<your_domain/user/<username>/proxy/6080/matlab.html`.

    Output example:

    ```text
    $ start-matlab
    Would you like to enter a view-only password (y/n)?
    Welcome to the MATLAB Deep Learning Container on NVIDIA GPU Cloud

    ...(skipped)
    ...(skipped)
    ...(skipped)

    RUNNING: cat "/home/matlab/MATLAB.txt"
    Please use the follow URL to access Matlab Desktop, after ssh tunnel stepped up
        https://<your_domain/user/<username>/proxy/6080/matlab.html
    
    ```

6. Browse the url `https://<your_domain>/user/<username>/proxy/6080/matlab.html` in a new tab.

    ![](assets/matlab_screen.png)

## Notice

This ia a commercial software, a valid license is compulsory for the use.

>This container includes commercial software products of The MathWorks,
Inc. ("MathWorks Programs") and related materials. MathWorks Programs are
licensed under the MathWorks Software License Agreement, available in the
MATLAB installation in this container. Related materials in this
container are licensed under separate licenses which can be found in
their respective folders.
