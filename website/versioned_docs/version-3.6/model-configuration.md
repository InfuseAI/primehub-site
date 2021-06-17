---
id: version-3.6-model-configuration
title: Configuration of Model Management
description: Configuration of Model Management
sidebar_label: Configuration
original_id: model-configuration
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="deploy-only tooltip">Deploy
    <span class="tooltiptext">Applicable to Deploy Edition</span>
  </div>
</div>
<br>

In order to use the Model Management feature, a running reachable MLflow instance is required. Also, Group Administrator must configure [Group Setting](group-setting#mlflow) with MLflow-related information.

According to a binding MLflow instance, Group Administrators could choose either one of ways:

* installed MLflow server by PrimeHub Apps

* integrate with an external MLflow server


## MLflow instances

There are some key considerations when setting up a MLflow instance to make **Model Management** and **Deployment** working together, especially deploy a model from the `MLflow Model Registry`.

### Installed MLflow server by PrimeHub Apps

The easiest way to set up a MLflow instance is to install a [MLflow instance](primehub-app-builtin-mlflow) from the PrimeHub Apps. 

Requirements (under same group-context):

* enable the **Group Volume** for saving the artifacts.
* install a MLflow App instance

In the default settings, MLflow App uses the path `$(PRIMEHUB_APP_ROOT)/mlruns` as `DEFAULT_ARTIFACT_ROOT` env where it stores artifacts. 

When deploying a registered model from **MLflow Model Registry** according to its **modelUri** `models:/<model-name>/<version-name>`, PrimeHub needs to *copy* artifacts from `$(PRIMEHUB_APP_ROOT)/mlruns`. Which requires this group with enabled **Group Volume** and a **running installed MLflow App**.

#### Optional

>If want to share `MLflow Model Registry` among other groups which have **installed MLflow server by Apps** either. Please prepare and configure proper [Artifact Stores](https://www.mlflow.org/docs/latest/tracking.html#artifact-stores). It is very common to use Amazon S3 and S3-compatible storage to save artifacts.


### Integrate with the external MLflow server

Alternatively, it is possible to bind a self-hosted MLflow instance outside of PrimeHub.

Since you have a running external MLflow server, it should be with an prepared artifact store.

The only one consideration is to make sure that `DEFAULT_ARTIFACT_ROOT`, the path to the artifact store, is available to your MLflow client. 

>Same as the use-case of sharing `MLflow Model Registry` to other groups, it is a good idea to use Amazon S3 and S3-compatible storage.

## Configuration

So far, you supposedly already have a running MLFlow instance, either installed by PrimeHub Apps or externally-hosted. We have to bind the service by configuring Group Setting.

![](assets/group-mlflow-configuration-example.png)

If using **installed MLflow server by Apps**, see [Group Setting - MLflow section](group-setting#mlflow).

Otherwise, in MLflow tab of Group Setting, configure these two settings with the information of externally-hosted MLflow: 

+ `MLflow Tracking URI` where the MLflow instance serves tracking clients. PrimeHub uses it as a corresponding `MLFLOW_TRACKING_URI` environment variable in system. You could use this env in Notebooks and Jobs. 

+ `MLflow UI URI` is a URL to the MLflow web server.

Two groups of environmental variables , `Tracking Environment Variables` and `Artifact Store Environment Variables`:

### Tracking Environment Variables

>Usually, it is for externally-hosted MLflow server.

It is used to set the authentication configuration to your tracking server.

* `MLFLOW_TRACKING_USERNAME` and `MLFLOW_TRACKING_PASSWORD` - username and password to use with HTTP Basic authentication. To use Basic authentication, you must set both environment variables.

* `MLFLOW_TRACKING_TOKEN` - token to use with HTTP Bearer authentication. Basic authentication takes precedence if set.

>Please refer to [MLflow document](https://www.mlflow.org/docs/latest/tracking.html#logging-to-a-tracking-server) to find more information.


### Artifact Store Environment Variables

> Usually, it is for externally-hosted MLflow server or for external artifact stores.

It is used to instruct your client how to connect to the artifact storage. We take `S3-compatible storage` as an example:

* `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are used by the S3 client.
* `MLFLOW_S3_ENDPOINT_URL` is used to tell s3 client to connect your own S3-compatible storage rather than the AWS S3 server.


>Please refer to [MLflow Artifact Storage](https://www.mlflow.org/docs/latest/tracking.html#artifact-stores) to find more information.

