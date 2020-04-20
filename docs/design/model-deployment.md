---
id: model-deployment
title: Model Deployment (Alpha)
---

Allow users to deploy a model as a service. 


## Features

1. **Multiple ML framework support:** Supports Tensorflow 1, Tensorflow 2, Keras, Pytorch, XGBoost, MXNet, Scikit-learn, LightGBM
1. **Multiple language support:** Supports Python, Java, R, NodeJS, Go (Please see the Seldon wrapper in the Seldon wrapper document)
1. **Horizontal scaleout:** The deployed model service can be scaled to multiple replicas of the model service. So that it can achieve load balancing and fault tolerance easily.
1. **Deployment history:** Track the deployment history.
1. **Resource constraint:** The usage of resources for model deployment is constrained by group resource quota.
1. **Ingress:** Create the ingress resource to redirect external requests to internal model service.

## User Journey

Deploy a model
- (Admin) Enable a model deployment for one group
- Create a deployment. Select the instance type, model image, and the number of replicas.
- Wait until the deployment is ready
- Use `curl` to test against the model deployment endpoint

Package a model 
- Train a model for some ML framework and select the best model for deployment
- Wrap the model file and build the image by `s2i`
- Test the packaged image locally
- Push the image to docker registry

Update a deployment
- Select a deployment
- Click the Update button
- Change the image and deploy

# Configuration

Please add this variable to the `.env` file. 

Name | Value 
--- | ----- 
`PRIMEHUB_FEATURE_MODEL_DEPLOYEMNT` | `true`

Chart value

Path | Description | Default Value 
--- | ----- | -----------------------
`modelDeployment.enabled` | Enable the model deployment | `false`

# Design

## Seldon

[Seldon](https://www.seldon.io/) is a model deployment solution in the community. The reason why we select Seldon as the solution is because it provides a common way to package different framework's by different programming languages into a docker image.

Seldon also provides an operator under `Seldon core` project to manage a `SeldonDeployment` resource and reconcile it to the underlying deployments and services. However, for simplicity, we decide not to use the `SeldonDeployment` resource. Instead, we define `PhDeployment` and the controller generate the underlying `Deployment` and `Service` directly.

## Custom Resource

A [custom resource](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) `PhDeployment` is defined for PrimeHub-defined model deployment. The deployment is very similar to the Kubernetes native deployment, the controller would spawn a deployment according to the `PhDeployment`'s spec. The difference is that the spec contains the PrimeHub-specific concept, like User, Group, and InstanceType.

Here is an example of `PhSchedule`.

```
apiVersion: primehub.io/v1alpha1
kind: PhDeployment
metadata:
  name: spam-classifier-abcxy
  namespace: hub
spec:
  displayName: "spam classifier"
  userId: "4d203a08-896a-4aa8-86e2-882f4d4aadec"
  userName: "phadmin"
  groupId: "ca6b032e-b8be-44d2-9646-092622d6ba15"
  groupName: "phusers"  
  stop: false
  description: |
    This is my first deployment.
    This is my first deployment.
    This is my first deployment.
  predictors:
    - name: predictor1
      replicas: 2
      modelImage: sandhya1594/spam-classifier:1.0.0.1
      instanceType: cpu-only
      metadata:
        LEARNING_RATE: "0.02"
        MINI_BATCH: "20"
        ACCURACY: "0.98"
status:
  phase: deploying
  message: "Deploying"
  replicas: 2
  availableReplicas: 2
  endpoint: https://primehub.local/deployment/user-defined-postfix/predict
  history:
    - time: 2020-03-23T02:03:15Z
      spec: <PhDeploymentSpec>
    - time: 2020-03-22T23:45:23Z
      spec: <PhDeploymentSpec>
```  

The `PhSchedule` resource has the following children

- **Ingress:** The ingress resource to route the traffic to given model deployment
- **Service:** The service resource of a given deployment
- **Deployment:** The deployment of the user's image.

## Model Image

For each deployment, it requires to provide the model image. It is responsible to translate the REST request to the internal model prediction call.

In [Seldon documentation](https://docs.seldon.io/projects/seldon-core/en/latest/index.html), there are two ways to prepare the model image

Pre-Packaged Inference Servers

- MLflow Server
- SKLearn server
- Tensorflow Serving
- XGBoost server

Language Wrappers 

- Python Language Wrapper (Production)
- Java Language Wrapper (Incubating)
- R Language Wrapper (ALPHA)
- NodeJS Language Wrapper (ALPHA)
- Go Language Wrapper (ALPHA)

Currently, primehub model deployment ONLY supports the language wrapper solution. In the future, we may provide a guideline to write a Dockerfile to pack the model file in the pre-packaged server image.

## API Endpoint

According to Seldon [external prediction](https://docs.seldon.io/projects/seldon-core/en/latest/reference/apis/external-prediction.html) and [internal microservice](https://docs.seldon.io/projects/seldon-core/en/latest/reference/apis/internal-api.html) API, the endpoint of prediction is 

```
<prefix>/api/v0.1/predictions
# or
<prefix>/api/v1.0/predictions
```

For a primehub model deployment, the prefix would be 

```
https://<primehub-domain>/deployment/<deployment-name>/api/v1.0/predictions
```

And the input and output of the prediction endpoint are *tensor* or *ndarray*.

You can also send an unstructured data (e.g. image file), please find more examples in our [model deployment examples](https://github.com/InfuseAI/model-deployment-examples)

## Deployment Phases

There are 5 phases in the `PhDeployment`

- **Deploying:** Model is deploying. When a deployment is created, updated, or started, it will go to this phase immediately.
- **Deployed:** Model is deployed successfully. All replicas are in available state.
- **Stopping:** The deployment is stopping. When a deployment is stopped, it will go to this phase immediately.
- **Stopped:** The deployment is stopped successfully.
- **Failed:** The model deployment is failed.

There are several reasons for the `Failed` phase. They include

- Group, or instance type not found
- Image invalid or cannot be pulled successfully
- Group resource not enough
- Cluster resource not enough
- Deploying more than 5 minutes

## Resource Constraint

A model deployment consumes only group quota. 

The pod of the model deployment has the label `primehub.io/group=escape(<group>)`. The PrimeHub's validating webhook would invalidate the pod creation if the new pod exceeds the group resource. 

Once the resource exceeds, the deployment would change to phase `Failed` with "group resource not enough" error message.

## Replicas Log

The pod of the model deployment has the labels

- `app=primehub-group`
- `primehub.io/phdeployment=<deployment-id>`

The GraphQL server would list the pod by these labels and show the log for the container name `model`

## Deployment History 

Whenever the `.spec` changes, there appends a new record under `.status.history`. It contains `time` for update time and `spec` for the snapshot of the current new updated `.spec`.

The history array only keeps the latest 32 records.

## Monitoring

We use [Seldon engine](https://github.com/SeldonIO/seldon-core/tree/master/engine) to export Prometheus metrics. Under the hood, it accepts the prediction request and forwards it to the user wrapped model container. At the same time, it keeps track of the count and time for each request. The metrics details are described in [Seldon metrics](https://docs.seldon.io/projects/seldon-core/en/latest/analytics/analytics.html)

Seldon has a project name [Seldon analytics](https://github.com/SeldonIO/seldon-core/tree/master/helm-charts/seldon-core-analytics). In which, it installs the Prometheus and Grafana. However, our preferred Prometheus/Grafana installation is [prometheus-operator](https://github.com/coreos/prometheus-operator). To adapt the metrics to Prometheus-operator, we implement our own [PodMonitoring](https://github.com/coreos/prometheus-operator#customresourcedefinitions) and Grafana dashboard to visualize the collected metrics.



