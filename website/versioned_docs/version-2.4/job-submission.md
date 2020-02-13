---
id: version-2.4-job-submission-feature
title: Job Submission (Alpha)
original_id: job-submission-feature
---

## Job

We sometimes have time-consuming tasks which have to be run sequentially, because tasks take considerable time to complete, users are not able to engage with the whole of the progress. In this case, we can use **Job Submission** to create a job of sequential multiple tasks and submit the job for execution at background, meanwhile we can monitor the progress from the log.

### Lifetime

+ A running job can run for **24 hours** and it will be failed if the job doesn't finish within 24 hours.

+ Basically, An ended job record is saved for **7 days**. Once expired, The job still is listed without logs since the logs is wiped out. ***NOTE: According to the container runtime, the job container is possibly recycled within 7 days so that the logs doesn't exist anymore.***

## Jobs List

There is a list showing created jobs with relevant information.

![](assets/jsub_main.png)

There are several informative columns of the job list:

|Column|Description|
|------|-----------|
|`Status`|The status of the job. `Pending`,`Preparing`, `Running`, `Failed`, `Succeeded`, `Cancelled` and `Unknown`.|
|`Job name`|The name of the job.|
|`User`|The owner who submits the job.|
|`Group`|The group where the job runs.|
|`Timing`|The duration of the running job.|
|`Action`|The action buttons, `Cancel` and `Rerun`.|

+ `Create Job`: Click the button to create the job.

+ `Refresh`: Click the button to refresh the list.

### Filter

+ `Select all`: If checked off, it lists all of jobs submitted from groups where the user *belongs* to, in other words, jobs from other groups are not listed.

+ `Filter by Group`: Groups which the user belongs are criteria. Checking off groups to filter out jobs from other groups.

+ `Filter by Submitted`: If `Submitted by Me` is checked off, it lists jobs **ONLY** are submitted by the user.

## Create Job

![](assets/jsub_create.png)

+ `Group`: Select a group where the the job belongs to.

+ `InstanceTypes`: Select a instance type which allocates resources for the job.

+ `Images`: Select an image which the job run bases on.

+ `Job name`: The name of the job.

+ `Command`: The sequential commands of the job context. 
  
    **Directories/paths** the job can access if directories exits:

    |Directory|Description|
    |---------|-----------|
    |`/workingdir`|A temporary working directory while jobs running. ***Note**: saving data here will be lost when jobs finished.*|
    |`/project/<group>`|Using this path to access a group volume, load files and save output persistently. ***Note:** a group volume is required, please consult administrators.*|
    |`/datasets/<dataset>`|Using this path to access a dataset volume, load datasets which connect to the group. ***Note:** a dataset volume is reqiured, please consult administrators.*|

    **Environmental variables**:

    |Env Variable|Description|
    |------------|-----------|
    |`$PRIMEHUB_USER`|Job's owner|
    |`$PRIMEHUB_GROUP`|Job's group|

    **Python command option**

    `python -u` we can use `-u` to force stdin, stdout and stderr to be totally unbuffered, so we can see logs in real time.

    **Example 1**: There is a file, `train_mint.py`, stored in group volume, `research`, then we can execute the python file as a job like below. Since the python file is executed under `/project/research`, the data output by the job is saved under the path relatively.

    ```bash
    cd /project/research/
    python -u train_minst.py
    ```

    **Example 2**: If we execute the job like below, the output data will be saved under `/workingdir` which is a *temporary* directory while the job is running. In other words, data saved under `/workingdir` will be lost.

    ```bash
    python -u /project/research/train_minst.py
    ```

`Submit`: Click the button to submit the job.

## View Job

Click the job name on the list to view the job information and logs.

### Information

![](assets/jsub_info.png)

Here are the information of the job:

|Field|Description|
|-----|-----------|
|`Status`|The status of the job. `Preparing`, `Running`, `Failed`, `Succeeded`, `Cancelled` and `Unknown`.|
|`Message`|Messages returned from job running.|
|`Job ID`|The unique id of the job.|
|`Job name`|The name of the job.|
|`User`|The owner who submits the job.|
|`Start Time`|The time the job starts at.|
|`Finished Time`|The time the job finishes at.|
|`Duration`|The duration of the job running.|
|`Group`|The group where the the job belongs to.|
|`Instance type`|The instance type which the job uses.|
|`Image`|The image which the job run based on.|
|`Command`|The context of the job.|

### Logs

![](assets/jsub_log.png)

It logs whole of job running progress. This is where we can check the progress and shoot troubles if failed.
