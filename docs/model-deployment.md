---
id: model-deployment-feature
title: Model Deployment (Alpha)
---

Model Deployment feature that administrators are allowed to manage model deployment endpoints within Group Management with CRUD operations. If the feature is enabled within a group, end-users of the group are allowed to deploy models obeying the restriction of the group quota. While a deployed model serves, administrators are able to monitor the status of model service such service health and resources usage information; moreover, end-users are able to check deployment history and log.

## Enable Model Deployment in Group Management


## List

|Status   |Color|
|---------|-----|
|Deployed |Green |
|Failed   |Red   |
|Deploying|Yellow|
|Stopped  |Grey  |

### Cell

|Info        |Description|
|------------|-----------|
|Name        | Model name|
|Group       | Model's owner group.|
|Endpoint    | Where the model is deployed and serve.|
|Metadata    | View the detail of model deployment.|
|Last Updated| Last updated time.|

**Tips**: Cursor hovering over endpoint links show entire links and clicking links make a clipboard copy.

+ `Create Deployment` button:
+ `Refresh` button:
  

## Create

### Environment Settings

+ `Group`: Select a group where the the job belongs to.

+ `InstanceTypes`: Select a instance type which allocates resources for the job.

+ `Replicas`:

### Deployment Details

+ `Deployment Name`:

+ `Deployment ID`:

+ `Model Image`:

+ `Image Pull Secret`:

+ `Descriptions`:

### Metadata

We can add key-value pairs.

+ `Name`: The name of key.
+ `Value`: The value.

Click `Deploy` button to start the deployment.

Click `Here` on the pop-up to view the deployment detail page.

## Deployment Detail

### Information

|Info           |Description|
|---------------|-----------|
|Status         |The status of the deployment.|
|Message        |The message related to the deployment if any.|
|Endpoint       |Where the model is deployend and serve.|
|Model Image    |The image which the model is based on.|
|Replicas       |The replicas of the deployment.|
|Deployment Name|The name of the deployment.|
|Group          |The owner group.|
|Instance Type  |The resources allocation which is requested for the deployment.|
|Creation Time  |Timestamps|
|Last Update    |Timestamps|
|Description    |The description which users input during the creation. |
|Run an Example |Using `Curl` to query the service.|


### Logs

+ `Filters`: Select replica.

Logs are displayed here.

### History

| Info   | Description     |
|---------------|----------|
| Description   | User input description |
| User          | Owner |
| Timestamp     | Creation time|
| Detail        | View the detail of the versioned deployment |


---

## Update


---

## Delete

---

## Monitor


### Deployment/Service Health

### Resource Usage Metrics

1. rps
2. qps
3. gpu
4. mem
