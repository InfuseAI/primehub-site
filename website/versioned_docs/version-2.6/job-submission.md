---
id: version-2.6-job-submission-feature
title: Job Submission (Beta)
original_id: job-submission-feature
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

## Job

We sometimes have time-consuming tasks which have to be run sequentially, because tasks take considerable time to complete, users are not able to engage with the whole of the progress. In this case, we can use **Job Submission** to create a job of sequential multiple tasks and submit the job for execution at background, meanwhile we can monitor the progress from the log. If we want to create routine jobs that we can achieve it by [**Job Scheduler**](job-scheduling-feature).

### Lifetime

+ A running job can run for **24 hours** and it will be failed if the job doesn't finish within 24 hours.

+ Basically, An ended job record is saved for **7 days**. Once expired, The job still is listed without logs since the logs is wiped out. ***NOTE: According to the container runtime, the job container is possibly recycled within 7 days so that the logs doesn't exist anymore.***

## Jobs List

There is a list showing created jobs with relevant information.

![](assets/jsub_main_beta_v26.png)

There are several informative columns of the job list:

|Column|Description|
|------|-----------|
|`Status`|The status of the job. `Pending`,`Preparing`, `Running`, `Failed`, `Succeeded`, `Cancelled` and `Unknown`.|
|`Job name`|The name of the job.|
|`Schedule`|The name of the job scheduler if the job is triggered by the scheduler, otherwise it shows `-`.|
|`User`|The owner who submits the job.|
|`Group`|The group where the job runs.|
|`Timing`|The duration of the running job.|
|`Action`|The action buttons, `Cancel` and `Rerun`.|

+ `Create Job` button: Click the button to create the job.

+ `Refresh` button: Click the button to refresh the list.

+ `Job name` link: Click the name to enter the job detail page.

+ `Schedule` link: Click the name to enter the scheduler detail page if any.

### Filter

Using Group selection as a filter.

![](assets/jsub_filter_beta_v26.png)

+ **Default** (when Group selection is blank): it lists all of jobs submitted from groups where the user *belongs* to, in other words, jobs from other groups are not listed.

+ **Filter by Group**: Selects Groups and it lists jobs **ONLY** belonging to these groups.

+ **Filter by Submitted**: If `Submitted by Me` is checked off, it lists jobs **ONLY** submitted by the user.

## Create Job

![](assets/jsub_create.png)

+ `Group`: Select a group where the the job belongs to.

+ `InstanceTypes`: Select a instance type which allocates resources for the job.

+ `Images`: Select an image which the job run bases on.

+ `Job name`: The name of the job.

+ `Command`: The sequential commands of the job context. 
  
### Directories/paths the job can access if directories exits:

>**Notice**：The default working directory of a Job is under `/home/jovyan`; This is `/home/jovyan` inside Job Pod *rather than `/home/jovyan` inside JupyterHub Pod*, therefore, *files are located under `/home/jovyan` of JupyterHub **don't exist** here*! There are `<group volume>` and `<dataset>` only mounted here in Job Pod.

|Directory|Description|
|---------|-----------|
|`/home/jovyan`|A **temporary working directory** while jobs running. ***Note**: saving data here will be lost when jobs finished; NOT ~~`/workingdir`~~ anymore!*|
|`/home/jovyan/<group> -> /project/<group>`|Using this path (or Symbolic link) to access a group volume, load files and save output persistently. ***Note:** a group volume is required, please consult administrators.*|
|`/home/jovyan/datasets/<dataset> -> /datasets/<dataset>`|Using this path (or Symbolic link) to access a dataset volume, load datasets which connect to the group. ***Note:** a existing dataset volume is required, please consult administrators.*|

### Environmental variables:

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

**Example 2**: If we execute the job like below, the output data will be saved under `/home/jovyan` which is a *temporary* directory while the job is running. In other words, data saved under `/home/jovyan` will be lost.

```bash
python -u /project/research/train_minst.py
```

`Submit`: Click the button to submit the job.

## View Job

Click the job name on the list to view the job information and logs.

### Information

![](assets/jsub_info_beta.png)

Here are the information of the job:

|Field|Description|
|-----|-----------|
|`Status`|The status of the job. `Preparing`, `Running`, `Failed`, `Succeeded`, `Cancelled` and `Unknown`.|
|`Message`|Messages returned from job running.|
|`Job ID`|The unique id of the job.|
|`Job name`|The name of the job.|
|`Schedule`|The name of the job scheduler if the job is triggered by the scheduler; clicking the name to enter the scheduler detail page.|
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
