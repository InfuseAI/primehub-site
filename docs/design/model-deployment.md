---
id: model-deployment
title: Model Deployment
---

Allow users to deploy a model as a service.


## Features

1. **Multiple ML framework support:** Supports Tensorflow 1, Tensorflow 2, Keras, Pytorch, XGBoost, MXNet, Scikit-learn, LightGBM
1. **Multiple language support:** Supports Python, Java, R, NodeJS, Go (Please see the Seldon wrapper in the Seldon wrapper document)
1. **Horizontal scaleout:** The deployed model service can be scaled to multiple replicas of the model service. So that it can achieve load balancing and fault tolerance easily.
1. **Deployment history:** Track the deployment history.
1. **Resource constraint:** The usage of resources for model deployment is constrained by group resource quota.
1. **Ingress:** Create the ingress resource to redirect external requests to internal model service.
1. **Endpoint Type:** Supports public or private endpoints. For private endpoint, multiple users(clients) is supported.

## User Journey

Build and deploy a model image
- Train a model for some ML framework and select the best model for deployment
- Wrap the model server code and model file and build the image by `s2i`
- Test the packaged image locally
- Push the image to docker registry
- In primehub, create a model deployment
- Select the instance type, model image, and the number of replicas
- Wait until the deployment is ready
- Use `curl` to test against the model deployment endpoint

Build and deploy a model by a pre-packaged model server (since v3.2.0)
- Train a model for tensorflow2 and put the model somewhere in PHFS
- In primehub, create a model deployment
- Set the **tensorflow2 pre-packaged image** as the model image and set the model URI accordingly
- Wait until the deployment is ready
- Use `curl` to test against the model deployment endpoint

Build and deploy a model by a custom pre-packaged model server (since v3.2.0)
- Train a model for some ML framework and put the model somewhere in PHFS
- Wrap the model code and build the image by `s2i`
- Test the custom pre-packaged image along with a model file locally
- Push the image to docker registry
- In primehub, create a model deployment
- Set the **custom pre-packaged image** as the model image, set the model URI accordingly
- Wait until the deployment is ready
- Use `curl` to test against the model deployment endpoint

Update a deployment
- Select a deployment
- Click the Update button
- Change the model image and/or model URI
- Click **Confirm and deploy** to deploy

# Design

## Seldon

[Seldon](https://www.seldon.io/) is a model deployment solution in the community. The reason why we select Seldon as the solution is because it provides a common way to package different framework's by different programming languages into a docker image.

Seldon also provides an operator under `Seldon core` project to manage a `SeldonDeployment` resource and reconcile it to the underlying deployments and services. However, for simplicity, we decide not to use the `SeldonDeployment` resource. Instead, we define PhDeployment and the controller for generating/to generate the underlying **Deployment** and **Service** directly. In addition, we also create an **Ingress** for model serving endpoint.

## Custom Resource

A [custom resource](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) `PhDeployment` is defined for PrimeHub-defined model deployment. The deployment is very similar to the Kubernetes native deployment, the controller would spawn a deployment according to the `PhDeployment`'s spec. The difference is that the spec contains the PrimeHub-specific concept, like User, Group, and InstanceType.

Here is an example of `PhDeployment`.

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
  endpoint:
    accessType: private
    - name: foo
      token: $apr1$sZ55Hcwn$NSHL3Y.HiBBTLQCIIEbUm.
    - name: bar
      token: $apr1$bJ3Ar/uT$BM2iFc6RObu7ZdYffToIQ.
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

The `PhDeployment` resource has the following children

- **Ingress:** The ingress resource to route the traffic to a given model deployment
- **Service:** The service resource of a given deployment
- **Deployment:** The deployment of the user's image.
- **Secret:** The secret for `HTTP basic authentication` of a given private endpoint access type deployment

## Model Image

For each deployment, it requires to provide the model image. It is responsible to translate the REST request to the internal model prediction call.

In [Seldon documentation](https://docs.seldon.io/projects/seldon-core/en/latest/index.html), there are three ways to prepare the model image

1. [Pre-Packaged Inference Servers](https://docs.seldon.io/projects/seldon-core/en/latest/servers/overview.html): Users can use the pre-packaged model image and provide the model URI for the latest model files.

    - MLflow Server
    - SKLearn server
    - Tensorflow Serving (Not supported in PrimeHub)
    - XGBoost server

2. [Language Wrappers for Custom Model](https://docs.seldon.io/projects/seldon-core/en/latest/wrappers/language_wrappers.html): Users build the model file by different language wrapper. It provides the best flexibility and loading time.

    - Python Language Wrapper (Production)
    - Java Language Wrapper (Incubating)
    - R Language Wrapper (ALPHA)
    - NodeJS Language Wrapper (ALPHA)
    - Go Language Wrapper (ALPHA)

3. [Custom Pre-packaged Inference Servers](https://docs.seldon.io/projects/seldon-core/en/latest/servers/custom.html). Like the pre-packaged server, but users can package their reusable pre-packaged server. And deploy by the model URI for the latest model files.

## Model URI

There are two ways to load model files in the model inference server.

1. Pack the model files in the model image
1. Load the model at runtime

If we select the second method, the model image should support to load `model_uri` from the wrapper class. For the detail, you can see the [custom inference server](https://docs.seldon.io/projects/seldon-core/en/latest/servers/custom.html) in the Seldon document. Or reference the [Seldon](https://github.com/SeldonIO/seldon-core/tree/master/servers) and [PrimeHub](https://github.com/InfuseAI/primehub-seldon-servers) pre-packaged servers implementation.

For the implementation, the model URI loading process is described as follows.

1. In the phdeployment spec, there is the `modelURI` specified.
1. When the controller creates the underlying pods, it will create the model container along with a model download init-container.
1. The init-container uses the image `gcr.io/kfserving/storage-initializer` to load the model files. It uses the [KFServing storage API](https://github.com/kubeflow/kfserving/blob/master/python/kfserving/kfserving/storage.py) to download files from `modelURI` to `/mnt/models`
1. The model container shares the same *empytDir* volume and mounted at `/mnt/models` as well. The model wrapper class would read the model path from [wrapper class constructor](https://docs.seldon.io/projects/seldon-core/en/latest/servers/custom.html) and invokes the framework-specific model loading API to load the model.


Currently, the model URI supports

1. **PHFS**: Example, `phfs:///file/to/my/model` (will map to `/phfs/file/to/my/model`)
1. **GCS public bucket**: Example, `gs://seldon-models/sklearn/iris`

We don't support S3, GCS, Azure blob private buckets for now. And we don't support http/https either.

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

You can also send unstructured data (e.g. image file), please find more examples in our [model deployment examples](https://github.com/InfuseAI/model-deployment-examples)

## Endpoint Type

We provide two endpoint types: `public` and `private`. If a deployment is set to `public`, anyone who can connect to the domain(URL) has the privilege to use the model through the API endpoint.

If a deployment is set to `private`, the user must provide the correct `HTTP basic authentication` information when sending the request to the API endpoint. Otherwise, the deployment will return the `401 Unauthorized` error. The `HTTP basic authentication` user name and password(token) can be configured under the UI. We also support multiple user names/passwords configurations.

The underlying technical process when setting the `HTTP basic authentication` under the UI is:
1. Data scientist adds a user client in UI
2. GraphQL generates a random password(token) in `md5` format and it will only show one time in UI
3. GraphQL also update `phdeployment` CRD endpoint information in the spec
4. Primehub-controller update the `phdeployment` `ingress` and `secret` settings for `HTTP basic authentication` configurations

## Deployment Phases

There are 5 phases in the `PhDeployment`

- **Deploying:** Model is deploying. When a deployment is created, updated, or started, it will go to this phase immediately.
- **Deployed:** Model is deployed successfully. All replicas are in the available state.
- **Stopping:** The deployment is stopping. When a deployment is stopped, it will go to this phase immediately.
- **Stopped:** The deployment is stopped successfully.
- **Failed:** The model deployment is failed.

There are several reasons for the `Failed` phase. They include

- Group, or instance type not found
- Image invalid or cannot be pulled successfully
- Group resource not enough
- Cluster resource not enough

## Resource Constraint

A model deployment consumes only the group quota.

The pod of the model deployment has the label `primehub.io/group=escape(<group>)`. The PrimeHub's validating webhook would invalidate the pod creation if the new pod exceeds the group resource.

Once the resource exceeds, the deployment would change to phase `Failed` with the "group resource not enough" error message.

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
