---
id: ph-notebook-extension
title: PrimeHub Notebook Extension
description: PrimeHub Notebook Extension
sidebar_label: PrimeHub Extension
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

**PrimeHub Extension** is an extension of *Jupyter Notebook* developed for PrimeHub. We plans to roll out more features to enhance user's ML workflow and experience from Notebook.

>PrimeHub 3.1+ onwards

>The latest images provided by InfuseAI are built with **PrimeHub Extension** and the corresponding environment to execute extension features smoothly. To Use these features, please make sure the running image is the latest one or is built on top of the latest one from InfuseAI. See the [list](guide_manual/images-list).

> How to build own images including **PrimeHub Extensions**? See the [repo](https://github.com/InfuseAI/primehub-job/tree/master/jupyterlab_primehub).

After opening a Notebook file (*.ipynb), there is **PrimeHub** extension on the menu bar of the Notebook. This document explains these extension features briefly.

![](assets/ph-extension-menu.png)


## API Token

PrimeHub Extension needs an API Token to submit a Job, Please [generate a API Token](tasks/api-token) and setup it.

You could open the PrimeHub Extension dropdown list to find the `API Token` setting:

![](assets/ph-extension-token.png)


## Submit Notebook as a Job

>The working group's Group Volume is required.

Users could submit their Notebook to the PrimeHub Jobs. Please see our demonstration [Simple UseCase](notebook-as-job).

However, there are differences between to submit a Notebook as Job and to submit a Job directly:

* A job submit by PrimeHub Extension always uses the directory of the Notebook as its working directory.
* Notebook should be put into a group volume.

For example: 

There is a group volume `phusers` and a Notebook in the sub path `experiment-1`

```
/home/jovyan/phusers/experiment-1/my-notebook.ipynb
```

When the Notebook `my-notebook.ipynb` submit, the job takes `/home/jovyan/phusers/experiment-1/` working directory. All things work like you running all code blocks in a Notebook.


### Job Artifacts with a Notebook Job

Users could keep their outputs with the `Job Artifacts` feature but they should consider the differences we discussed.

1. Job Artifacts mechanism is an action running after a job finished. `Job Artifacts` uploads any kinds of data in the path `/home/jovyan/artifacts`.
2. a Notebook Job would not start at `/home/jovyan`, it changes directory to where the Notebook located.


The code snippet could work in the Job not submit from Notebook, because it starts at `/home/jovyan` and put data into `/home/jovyan/artifacts`

```
mkdir -p artifacts/
cp my_model.h5 artifacts/
cp -r logs artifacts/
```

We could make it work in both cases, using absolute path:

```
mkdir -p /home/jovyan/artifacts/
cp my_model.h5 /home/jovyan/artifacts/
cp -r logs /home/jovyan/artifacts/
```