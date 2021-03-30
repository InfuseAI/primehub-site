---
id: version-3.1-ph-notebook-extension
title: PrimeHub Notebook Extension
sidebar_label: PrimeHub Extension
original_id: ph-notebook-extension
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

**PrimeHub Extension** is an extension of *Jupyter Notebook* developed for PrimeHub. We plans to roll out more features to enhance user's ML workflow and experience from Notebook.


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

Users could submit their Notebook to the PrimeHub Jobs. See [Simple UseCase](notebook-as-job).

>However, there are differences between jobs from Notebook and jobs from Job Submission directly:

* A job submitted by PrimeHub Extension (a.k.a Notebook Job) *always uses the directory where the notebook locates as its working directory*, whereas a job submitted by Job Submission uses `/home/jovyan` instead.
* A notebook has to locate inside a group volume.

Path, for example:

There is a group volume `phusers` and a notebook, `my-notebook.ipynb`, in the sub path `experiment-1`

```bash
/home/jovyan/phusers/experiment-1/my-notebook.ipynb
```

When the notebook `my-notebook.ipynb` is submitted into a job, the job takes `/home/jovyan/phusers/experiment-1/` as the *working directory* and run all of cells of the notebook.

### Job Artifacts with a Notebook Job

In terms of a Notebook Job, users could store outputs either in the group volume or in the `Job Artifacts` but different working directories as we mention above have to be taken into consideration. Since working directories are different, `relative path` in code may cause problems.

For example,

The code snippet works in a Job but not in a Notebook Job, because the working director is at `/home/jovyan` and it put data relatively into `/home/jovyan/artifacts` which is a **correct path**.

```
mkdir -p artifacts/
cp my_model.h5 artifacts/
cp -r logs artifacts/
```

However, a *Notebook Job* starts at `/home/jovyan/<group_volume>/path/to/` where the notebook locates, the *relative path* of same codes above becomes `/home/jovyan/<group_volume>/path/to/artifcats` **incorrectly**. 

>Hence, we encourage using *absolute path* in both of cases instead to avoid the mistake and the confusion.

```
mkdir -p /home/jovyan/artifacts/
cp my_model.h5 /home/jovyan/artifacts/
cp -r logs /home/jovyan/artifacts/
```

### Job Artifacts is optional

We also encourage using *group volume* to store persistent data.

Using `Job Artifacts` is optional when we expect

* Download artifacts from PrimeHub Job without opening a Notebook
* Artifacts will be cleaned automatically