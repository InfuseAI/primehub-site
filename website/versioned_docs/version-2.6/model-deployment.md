---
id: version-2.6-model-deployment-feature
title: Model Deployment (Alpha)
original_id: model-deployment-feature
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Available in Enterprise tier only</span>
</div>

>Please be noticed! This document is still **Working-in-Progress**!

Model Deployment feature that users are allowed to manage model deployment endpoints within Group Management with CRUD operations. If the feature is enabled within a group, end-users of the group are allowed to deploy models obeying the restriction of the group quota. While a deployed model serves, administrators are able to monitor the status of model service such service health and resources usage information; moreover, end-users are able to check deployment history and log.

## Enable Model Deployment in Group Management

First, we have to turn on **Model Deployment** in groups.

![](assets/mdeploy_enable.png)

## List

This page indicates all of deployed services status.

![](assets/mdeploy_grid.png)

|Status   |Color|
|---------|-----|
|**Deployed** |Green |
|**Failed**   |Red   |
|**Deploying**|Yellow|
|**Stopped**  |Grey  |

### Cell

Each cell represents a deployment. Clicking on a cell to view the detail; Clicking on `View` link of a cell to view the metadata.

|Info        |Description|
|------------|-----------|
|Title       | Deployment name|
|Group       | Deployment's owner group.|
|Endpoint    | Where the model is deployed and serve.|
|Metadata    | View the meta |
|Last Updated| Last updated time.|

**Tips**: Cursor hovering over endpoint links show entire links and clicking links make a copy to the clipboard.

+ `Create Deployment` button: Clicking for a deployment creation.

+ `Refresh` button: Clicking to retrieve the latest statuses of deployments.
  
## Create

![](assets/mdeploy_create.png)

### Environment Settings

+ `Group`: Select a group where the the job belongs to; if it shows *"No group is configured for you to launch a server. Please contact admin."*, contact administrators to enable this features for groups.

+ `InstanceTypes`: Select a instance type which allocates resources for the job.

+ `Replicas`: How many replicas for the service.

### Deployment Details

+ `Deployment Name`: The name of the deployment.

+ `Deployment ID`: An unique ID.

+ `Model Image`: The image which the model is based on.

+ `Image Pull Secret`: a pull secret for the model image if required.

+ `Descriptions`: User input description.

### Metadata

We can add key-value pairs.

+ `Name`: The name of key.
+ `Value`: The value.

Click `Deploy` button to start the deployment.

One the deployment is triggered, there is a notification popping up, we can click on it to view the deployment detail.

## Deployment Detail

![](assets/mdeploy_detail.png)

### Information

|Info           |Description|
|---------------|-----------|
|Status         |The status of the deployment.|
|Message        |The message related to the deployment if any.|
|Endpoint       |Where the model is deployed and serve.|
|Model Image    |The image which the model is based on.|
|Replicas       |The replicas of the deployment.|
|Deployment Name|The name of the deployment.|
|Group          |The owner group.|
|Instance Type  |The resources allocation which is requested for the deployment.|
|Creation Time  |Timestamps|
|Last Updated   |Timestamps|
|Description    |The description which users input during the creation. |
|Run an Example |Verifying the service by using `curl` querying the service.|

### Logs

+ `Filters`: Select a replica.

![](assets/mdeploy_log.png)

In Logs tab, the logs of current deployment are displayed here.

### History

In History tab, we can view the detail of historical deployments.

![](assets/mdeploy_history.png)

Clicking on the `View` link for the detail of each deployment.

![](assets/mdeploy_history_view.png)

| Info   | Description     |
|---------------|----------|
| User          | Who triggered this deployment|
| Stop          | *true* or *false*|
| Model Image   | The model image url|
| Replicas      | The amount of replicas|
| Group         | The deployment's owner group|
| Instance Type | The instance type is selected|
| Timestamp     | Last updated time|
| Description   | User input description |
| Metadata      | Metadata mappings table|


---

## Update

On a deployment detail page, clicking `Update` button to enter the deployment editing.

There are `Instance Type`, `Replicas`, `Model Image`, `Image Pull Secret`, `Description` and `Metadata` allowed to be modified in a update once the initial deployment is created.

![](assets/mdeploy_update.png)

---

## Delete

Clicking on the cell of the deployment which we want to delete.

On a deployment detail page, clicking `Delete` button at top-right for the deployment deletion.

---

## Stop

Clicking on the cell of the deployment which we want to stop.

On a deployment detail page, clicking `Stop` button at top-right to stop the current deployed service.

---

## Monitor

PrimeHub provides a monitoring dashboard based on **Seldon Core Analytics** on Grafana, we are able to monitor metrics of **deployment**/**model**/**model version**.

1. Accessing the Grafana from the user portal

2. Selecting `PrimeHub / Model Deployments` dashboard, it lists deployment which are providing services.

    ![](assets/mdeploy_grafana_list.png)

3. Selecting a deployment and monitoring metrics on the board.

    ![](assets/mdeploy_grafana_metrics.png)



Default Metrics:

+ QPS (Queries Per Second)

+ Success rate

+ 4xx, error if any

+ 5xx, error is any

+ Predict QPS

+ Reward

  >The reward is interpreted as the proportion of successes in the batch of data samples. Thus this implementation inherently assumes binary rewards for each sample in the batch. The helper function *n_success_failures* calculates the number of successes and failures given the batch of data samples and the reward. -[Reference](https://github.com/SeldonIO/seldon-core/blob/master/components/routers/epsilon-greedy/README.md).

+ Latency

The board is based on **Seldon Core Analytics**, it can be advanced customized. Please see the [document](https://docs.seldon.io/projects/seldon-core/en/v0.3.0/analytics/analytics.html) and [code](https://github.com/SeldonIO/seldon-core/tree/master/helm-charts/seldon-core-analytics).
