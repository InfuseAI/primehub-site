---
id: version-3.11-primehub-end-to-end-tutorial-advanced-3
title: Advanced - How to custom build the Seldon server
sidebar_label: Advanced - Custom Deploy Server
description: How to custom build the Seldon server
original_id: primehub-end-to-end-tutorial-advanced-3
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
</div>

## Introduction

We need to set up the container environment to deploy our registered model. We’ll customize a pre-packaged model image for this step to suit our needs. This will demonstrate how to modify, build, and deploy a custom image using PrimeHub Deployments.

## Requirements

To follow the instructions in this section you should have:

- A docker account
- Familiarity with the command line
- Python version 3 or above
- An x86/64 CPU (Apple M1 currently not supported)

We will be using the screw model prepackage server as a template.

## Step-by-step Method

On your local computer, run the following commands to clone the model server repository:

- Check the deployment/ project:

```bash
$ git clone https://github.com/InfuseAI/primehub-screw-detection.git
$ cd ~/primehub-screw-detection/deployment/
```

In a text editor, open the following file `./tensorflow2/Model.py` and modify the prediction logic.

After editing and saving **Model.py**, build the pre-packaged model image with the following command.

```bash
$ make build
```

Check that the image is listed by running:

```bash
$ docker images
```

The output should look similar to:

```
REPOSITORY                            TAG                               IMAGE ID       CREATED        SIZE
infuseaidev/tensorflow2-prepackaged   screw-classification-v0.0.1       689530dd1ef9   3 minutes ago  1.67GB
```

### **Tag and Push to Docker**

Tag the image into your Docker registry with the **screw-classification** tag, replacing **<username>** with your Docker username.

```bash
$ make push
```

If you’re not logged into docker yet, log in now:

```bash
$ docker login
```

You can see your image in DockerHub web UI.