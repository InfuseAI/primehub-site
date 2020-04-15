---
id: model-deployment
title: Model Deployment (Alpha)
---

Allow users to deploy a model as a service. 


## Features

1. **Multiple ML Framework Support:** Supports Tensorflow 1, Tensorflow 2, Keras, Pytorch, XGBoost, MXNet, Scikit-learn, LightGBM
1. **Multiple Language Support:** Supports Python, Java, R, NodeJS, Go (Please see the seldon wrapper in the seldon wrapper document)
1. **Horizontal scaleout:** The deployed model service can be scaled to multiple replicas of the model service. So that it can achieve load balancing and fault tolerance easily.
1. **Deployment history:** Track the deployment history.
1. **Resource quota:** The usage of resource for the model deployment is constrainted by group resource quota.

## User Journey

Deploy a model
- (Admin) Enable model deployment for one group
- Create a deployment. Select the instance type, model image, and number of replicas.
- Wait for the deployment ready
- Use `curl` to test against the model deployment endpoiont

Package a model 
- Train a model for some ML framework and select the best model for deployment
- Wrap the model file and build the image by `s2i`
- Test the packaged image locally
- Push the image to docker registry

Update a deployment
- Select a deployment
- Click the update button
- Change the image and deploy

## Configuration

Please add this variable to the `.env` file. 

Name | Value 
--- | ----- 
`PRIMEHUB_FEATURE_MODEL_DEPLOYEMNT` | `true`

Chart value

Path | Description | Default Value 
--- | ----- | -----------------------
`modelDeployment.enabled` | Enable the model deployment | `false`

## Design

## Seldon

The reason we choose seldon is because it is a popular model serving solution in the community. It provides a common way to package different framework's by differect programming language into a docker image.

Seldon also provide a operator under `seldon-core` project to manage a `SeldonDeployment` resource and reconcile it to the underlying deployments and services. However, for simplicity, we decide not to use the `SeldonDeploymnet`. Instead, we create the `Deployment` and `Service` directly in our controller.

## Custom Resource

A [custom resource](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) `PhDeployment` is defined for PrimeHub-defined model deployment. The deployment is very similar to the kubernetes native deployment, the controller would spawn a deployment for the phdeployment's spec. The difference is that the spec contains the PrimeHub-specific concept, like user, group, instanceType.

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

The controller will reconcile and create the following resource

- **Ingress:** The ingress resource to route the traffic to given model deployment
- **Service:** The service resource of a given deployment
- **Deployment:** The deployment of the user's image.

## API Endpoint

By seldon rest api, the endpoint of prediction is 

```
<prefix>/api/v1.0/predictions

```

For a primehub model deployment, the prefix would be 

```
https://<primehub-domain>/deployment/<deployment-name>/api/v1.0/predictions
```

Basically, the input and output of the prediction endpoint is *tensor*. The API definition is [here](https://docs.seldon.io/projects/seldon-core/en/latest/reference/apis/internal-api.html)

## Deployment Phases

There are 5 phases in the `PhDeployment`

- **Deploying:** Model is deploying. When a deployment is created, updated, or started, it will go to this phase immediately.
- **Deployed:** Model is deployed successfully. All replicas is in available.
- **Stopping:** The deployment is stopping. When a deployment is stopped, it will go to this phase immediately.
- **Stopped:** The deployment is stopped successfully.
- **Failed:** The model deployment is failed.

There are several reasons for `Failed` phase. They includes

- Group, or instance type not found
- Image invalid or cannot be pulled successfully
- Group resource not enough
- Cluster resource not enough
- Deploying more than 5 minutes

## Resource Constraint

A model deployment consume only group quota. 

The pod of the model deployment has the label `primehub.io/group=<group>`. The primenhub resource validating admission webhook would invalidate the pod creation if the new pod exceeds the group resource. 

Once the resource exceeds, the deployment would changes to phase `Failed` with "group resource not enough" error message.

## Replicas Log

The pod of the model deployment has the labels

- `app = primehub-group`
- `primehub.io/phdeployment = <deployment-id>`

The graphql server would list the pod by these labels and show the log for the container name `model`

## Deployment History 

Whenever the `.spec` changes, there appends a new record under `.status.history`. It contains `time` for update time and `spec` for snapshot of the current new updated `.spec`.

The history array only keep the latest 32 records.

## Monitoring

We use [seldon-engine](https://github.com/SeldonIO/seldon-core/tree/master/engine) to export prometheus metrics. Under the hood, it accepts the prediction request and forward to user wrapped model container. At the same time, it keep track the count and time for each request. The metrics details is described in [seldon metrics](https://docs.seldon.io/projects/seldon-core/en/latest/analytics/analytics.html)

seldon has a project names [seldon-analytics](https://github.com/SeldonIO/seldon-core/tree/master/helm-charts/seldon-core-analytics). In which, it installs the prometheus and grafana. However, our preferred prometheus/grafana installation is [prometheus-operator](https://github.com/coreos/prometheus-operator). To adapt the metrics to promethues-operation, we implement our own [PodMonitoring](https://github.com/coreos/prometheus-operator#customresourcedefinitions) and grafana dashbaord to visualize the collected metrics.



