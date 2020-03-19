---
id: version-2.5-job-scheduler
title: Job Scheduler
original_id: job-scheduler
---

Allow users to schedule regular and repetitive [jobs](job-submission.md).

# Features

1. **Job:** It has all the features that Job Submission has.
2. **Recurrence:** Allow to set Inactive, Daily, Weekly, Monthly, Custom Cron Format.
3. **Run Manually:** Allow to run scheduled jobs manually.

# Configuration


Please add this variable to the `.env` file. 

Name | Value 
--- | ----- 
`PRIMEHUB_FEATURE_JOB_SUBMISSION` | `true`

# Design

## Custom Resource

A [custom resource](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) `PhSchedule` is defined for PrimeHub-defined scheduled job. It utilizes the [PrimeHub-defined job](job-submission.md). It will submit a job regularly based on recurrence settings and job settings.

Here is an example of `PhSchedule`.

```
apiVersion: primehub.io/v1alpha1
kind: PhSchedule
metadata:
  name: schedule-qm42d
  namespace: hub
spec:
  recurrence:
    type: "custom"
    cron: "*/1 * * * *"
  jobTemplate:
    metadata:
      annotations: {}
      labels: {}
    spec:
      command: |-
        echo "start"
      displayName: Test Job
      userId: 619156fe-43c6-44f3-b20e-2d5f96e4df96
      userName: user  
      groupId: d8257cb0-3c89-4243-98c2-cdc737ec61d3
      groupName: test-job-submission
      image: base-notebook
      instanceType: cpu-tiny
status:
  invalid: false
  nextRunTime: "2020-03-01T00:00:00Z"
  message: ""
  
```  

### Recurrence
* Inactive
* Every Day (at 4:00am)
* Every Week (Sundays at 4:00am)
* Every Month (on the 1st at 4:00am)
* Custom: needs an additional [cron](https://en.wikipedia.org/wiki/Cron) field.


### Invalid State

When a schedule contains a non-existing user/group/instancetype/image or the custom cron format is wrong, it would be marked as an invalid schedule.


## Timezone
The timezone depends on the system timezone setting. If the system timezone changes, the schedule's cron setting would not change. However, the next run time would change because of timezone change. 

The controller reconciles every 10mins so that the timezone setting would reflect in 10 mins.

## Job Concurrency
When a schedule is triggered, it will not spawn a new job if the previous job is still running. 

If a job is manually run against the schedule, it can run multiple jobs. And the scheduled job will also run no matter the manually ran job is completed or not. Because the manually spawned job is not associated with the schedule.

## Job Label
If a job is spawned by the job scheduler, it will have a label:
```
phjob.primehub.io/scheduledBy: schedule-qm42d
```