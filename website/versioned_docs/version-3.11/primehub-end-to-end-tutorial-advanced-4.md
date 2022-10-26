---
id: version-3.11-primehub-end-to-end-tutorial-advanced-4
title: Advanced 4 PrimeHub SDK/CLI Tools
sidebar_label: Advanced - PrimeHub SDK/CLI
description: PrimeHub SDK/CLI Tools
original_id: primehub-end-to-end-tutorial-advanced-4
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
</div>

## Introduction

PrimeHub Python SDK is the PrimeHub AI Platform Software Development Kit (SDK) for Python, allowing Python developers to write software that uses services like Job and Deployment.

## Prerequisites

Assuming that you have Python, you can install the library using pip:
    
```bash
$ pip install primehub-python-sdk
```
    
Or try the latest from our source code:

```bash
$ pip install git+https://github.com/InfuseAI/primehub-python-sdk.git@main
```
    

## End-to-end Step

### Step 1: Initial the PrimeHub CLI/SDK
    
```bash
PRIMEHUB_CLUSTER = <PrimeHub-cluster-url>

import os
from primehub import PrimeHub, PrimeHubConfig
ph = PrimeHub(PrimeHubConfig())
ph.config.generate(PRIMEHUB_CLUSTER)

ph.config.set_group(<group-name>)
```
    
### Step 2: Get the authorization code

If you see the content that want us to insert the authorization code, please click the url to get the token.
        
![](assets/primehub-end-to-end-tutorial-auth-code.png)

![](assets/primehub-end-to-end-tutorial-paste-code.png)
        

### Step 3: Check the group information
    
```bash
if ph.is_ready():
    print("PrimeHub Python SDK setup successfully")
    print("Current Group:", ph.primehub_config.current_group)
else:
    print("PrimeHub Python SDK couldn't get the group information, please check the configuration.")
```

```bash
Current Group: {'id': <group-id>, 'name': 'InfuseAI', 'displayName': 'InfuseAI'}
```
    
### Step 4: Use Primehub python SDK to submit the PrimeHub job.
    
```bash
# Submit a job
config = {
    "instanceType": "cpu-1",
    "image": "base-notebook",
    "displayName": "PrimeHub SDK: Model Training",
    "command": "echo 'We can do the model training in PrimeHub Jobs.'",
}

short_job = ph.jobs.submit(config)
print(short_job)
```
    
### Step 5: Submit the job

Submit the job and check the logs.
    
```bash
# Wait the job to be done
print('[ Waiting ]')
ph.jobs.wait(short_job['id'])
print('[ Job Done ]')

# Get logs
logs = ph.jobs.logs(short_job['id'])
print('[ Job Logs ]')
for l in logs:
    print(l)
```

You can use other python SDK methods to control the PrimeHub. This tool can help you build an automatic ML pipeline with CI/CD pipeline.

## Reference

- GitHub: [InfuseAI/primehub-python-sdk](https://github.com/InfuseAI/primehub-python-sdk)
    
