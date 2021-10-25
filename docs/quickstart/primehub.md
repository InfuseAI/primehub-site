---
id: qs-primehub
title: PrimeHub Quickstart
sidebar_label: PrimeHub Quickstart
description: PrimeHub Quickstart
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

## 1-Minute PrimeHub Demo

<iframe width="100%" height="360" src="https://www.youtube.com/embed/IEEwL0ISl8E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Brief

In this quickstart, we will learn how to use a Notebook to train/generate a simple model. Then, in the follow-up guide, we will learn how to submit a parameter-tuning job for the model tuning from same Notebook.

- **Notebook** is a fundamental feature of Community/Enterprise editions.

## Training a model on Notebook

### What we need?

- Select a group with Shared Volume enabled.

  ![](assets/primehub-end-to-end-tutorial-shared-volume.png "Enable Shared Volume in Group settings")

### Steps

1. **Open TensorFlow Notebook** from the Home page, then you will be redirected to the Notebooks page.

  ![](assets/quickstart_home.png)

2. Click on **Start Notebook** to spawn a notebook with basic settings. If you want to use different instance types, click on **Change Settings** and [start the notebook](launch-project).

  ![](assets/quickstart_create_notebook.png)

3. Wait for the notebook spawn. When the notebook is ready, you will be redirected to the notebook with prepared example notebook.

  ![](assets/quickstart_notebook_spwaning.png)

  ![](assets/quickstart_notebook_started.png)

4. **Run All Cells**, it will train a classification model for MNIST dataset and save it.

  ![](assets/quickstart_notebook_run_all.png)

So far, we have trained and generated a model file via our Notebook. This is achievable in both Community and Enterprise editions of PrimeHub.

The next stage, _parameter-tuning job_, is for Enterprise users. Keep your Notebook environment open, and let's continue on...

## What's Next?

As Enterprise users we want to verify the performance of our model, in order to do this we can deploy the model as a service and query the it with test data.

- [Quick-start: PrimeHub Model Deployment](qs-primehub-deploy)

## Reference

- [Submit a Notebook as a Job](../notebook-as-job)
- [Jobs Submission](../job-submission-feature)
