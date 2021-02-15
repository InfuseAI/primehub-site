---
id: components
title: Components
description: Components
---

## Notebooks

Notebook is [Jupyter Notebook](https://jupyter.org/) which is a well-known open-source web application in data science area that empowers users to create and share interactive documents that contain live code, equations, visualizations and description.

On PrimeHub, users have to choose an image containing valid Jupyter environment with a specified instance type (requested resources) to launch a Notebook. From Notebook, users can access associated user volume, group volume, datasets and PHFS storage.

See [Notebook](quickstart/launch-project).

## Jobs

Besides Notebook, users are able to launch an environment to accomplish certain tasks through executing given commands, it is called **Job**. Same as Notebook, users have to choose an image and an instance type for a job.

By using Jobs, user can turn a workflow into a pipeline of automatic tasks which are time-consuming that users can check the result once jobs finish, in the meantime, users can continue works on Notebook. Also by PrimeHub Notebook Extension, Notebooks are able to be submitted as Jobs.

See [Jobs](job-submission-feature), [PrimeHub Notebook Extension](ph-notebook-extension).

## Schedule

Jobs are one-time jobs, sometimes, users may want to automate jobs regularly; **Schedule** feature, could create a schedule which can arrange the submission of a same job recursively.

See [Schedule](job-scheduling-feature).

## Models

One of the last stages in the MLOps is Model Deployment that by integration of a machine learning model into an environment which can retrieve query data and respond with an inference/prediction. By serving models, scientists can also learn the performance of trained models in a practical circumstance.

By Models feature of PrimeHub, users can deploy a model file directly with a specified image of pre-packaged server or can deploy a model image which already packages a model file into.

See [Models](model-deployment-feature), [Tutorials](model-deployment-tutorial-concepts).
