---
id: qs-primehub
title: PrimeHub Community/Enterprise
sidebar_label: PrimeHub CE/EE
description: Quick-start: PrimeHub CE/EE
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

## Brief

In this quick-start we will learn how to train/generate a simple model on Notebook, in the follow-up, we will learn how to submit a parameter-tuning job for the model tuning from same Notebook.

- **Notebook** is a fundamental feature of Community/Enterprise editions.
- **Jobs** is a feature of Enterprise edition.

## Training a model on Notebook

### What we need?

- The image `infuseai/docker-stacks:tensorflow-notebook-v2-4-1-5b5a244c`
- An instance type >= minimal requirement (CPU=1, GPU=0, Mem=2G)
- The prepared notebook file of the example

    Download [my_model.ipynb](assets/my_model.ipynb)

- Choose a group with enabled Shared Volume (a.k.a Group Volume)

>Please have the image, the instance type on PrimeHub or request administrators for the assistance before we start.

### Steps

1. Enter Notebook from User Portal, select the image, the instance type and [start a notebook](launch-project).

![](assets/qs_notebook.png)
    
2. From File Browser of Notebook, navigate into the directory of `<group_name>`  which is a Group Volume; here **data-team** is our working group.

3. While inside the group volume, copy/drag the downloaded  `my_model.ipynb` there in File Browser and open it.

4. **Run All Cells**, it will save the model file `my_model.h5` at the local.

    ![](assets/qs_trained_model.png)

We so far have trained and generated a model file on Notebook. This is achievable to Community/Enterprise users.

The next follow-up, *parameter-tuning job*, is for Enterprise users. Remain the Notebook environment open, let's go to the next.

## Parameter-tuning Job

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
</div>

### What we need?

- The same image as above
- The same instance type as above
- API Token
- The prepared notebook file of the example

    Download [tune_params.ipynb](assets/tune_params.ipynb)

### Steps

1. While inside the group volume, copy/drag the downloaded `tune_params.ipynb` and open it.
    - Click on Cell 4, from Property Inspector, we can see the notebook has set `epoch` as a `parameter`

        See [Papermill site &neArr;](https://papermill.readthedocs.io/en/latest/usage-parameterize.html) for the detail of *Parameterize*.

    ![](assets/qs_tune_job_parameter.png)

2. Back to PrimeHub tab, hover over Profile icon, generate a API Token and copy it.

    ![](assets/qs_api_token.png)

3. Back to Notebook tab, click `PrimeHub` dropdown on the toolbar of the opened notebook, select API Token and paste the generated token here.

    ![](assets/qs_primehub_ext.png)

    ![](assets/qs_ext_api_token.png)

4. Click `PrimeHub` dropdown again and select `Submit Notebook as Job` this time.

5. Select the instance type and the image; fill in `Job Name` tune_params_epoch_tf and 

    ![](assets/qs_notebook_job.png)

    Fill in`Notebook Parameters` with the code below due to `epoch` is *parameterized*.

    ```
    epoch = 2
    ```

6. Back to PrimeHub tab, enter **Jobs** and check the job `tune_params_epoch_tf` we submitted.

    ![](assets/qs_tune_job_detail.png)

7. Once the job succeeded, back to Notebook, we can find a notebook `tune_params-<datetime>` of output by the job and the overwritten `my_model.h5` after tuning.

    ![](assets/qs_tune_job_output.png)

We now have walked through a typical flow of training and saving a simple model file, then submitting a job of tuning the generated on Notebook. In a real project, we may want to use various combinations of jobs and notebooks to pipeline repeatable workflows.
