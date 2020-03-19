---
id: version-2.5-job-scheduling-feature
title: Job Scheduler (Alpha)
original_id: job-scheduling-feature
---

PrimeHub has Job Submission feature that we can submit a one-time job immediately for running asynchronously; however, we sometimes want to submit certain jobs regularly according schedules. PrimeHub, hence, provides another feature, **Job Scheduler** that we can create Schedules which are responsible for submitting jobs regularly according to the recurrence setting for us.

We can find Job Scheduler from user portal.

## Schedules List

![](assets/jscheduler_main_beta.png)

In the Schedule list, there are some information of each Schedule:

|Column|Description|
|------|-----------|
|`Name`|The name of the Schedule.|
|`Group`|The group where the triggered job runs.|
|`Recurrence`| The recurrence of the trigger if any.|
|`Next Run`| time when a job will be triggered next time.|
|`Created By`| The owner of job/Schedule.|
|`Action`|The action buttons are `trigger`, `edit` and `delete` in sequence. ![action](assets/jscheduler_action.png)|

+ `Schedule Job` button: Click the button to create a Schedule.

+ `Refresh` button: Click the button to refresh the list.

### Filter

+ `Select all`: If checked off, it lists all of Schedules from groups where the user *belongs* to, in other words, Schedules from other groups are not listed.

+ `Filter by Group`: Groups which the user belongs are criteria. Checking off groups to filter out Schedules from other groups.

+ `Filter by Submitted`: If `Submitted by Me` is checked off, it lists Schedules **ONLY** are created by the user.

## Create Schedule

![](assets/jscheduler_create_beta.png)

Creating a Schedule is almost as same as creating a job, in addition to the settings of `Group`, `InstanceTypes`, `Images`, `Command`, we can set extra `Recurrence Options` setting.

+ `Group`: Select a group where the the job belongs to.

+ `InstanceTypes`: Select a instance type which allocates resources for the job.

+ `Images`: Select an image which the job run bases on.

+ `Schedule name`: The name of the Schedule.

+ `Command`: The sequential commands of the job context.

+ `Recurrence Options`: The rule of trigger recurrence if active.

    we can select one of presets of rules or customize a rule based on [`Cron` syntax [Reference]](https://en.wikipedia.org/wiki/Cron).
  
  |Options                            |Description                     |
  |-----------------------------------|--------------------------------|
  |`Inactive`                         | Deactivate the Schedule; a inactive Schedule cannot trigger jobs.|
  |`Every Day (at 4:00am)`            | A preset; trigger a job at 4 AM everyday.|
  |`Every Week (Sunday at 4:00am)`    | A preset; trigger a job at 4 AM on Sunday every week.|
  |`Every Month (on the 1st at 4:00am`| A preset; trigger a job at 4 AM on 1st every month.|
  |`Custom`                           | Customize the rule of the trigger recurrence; "`minute` `hour` `day of the month` `month` `day of the week`"; `0 4 * * *` represents 4 AM every day.|

## Edit Schedule

Clicking the action button of `edit`  to enter the Schedule editing page.

## Delete Schedule

Clicking the action button of `delete` to delete the Schedule.

## Jobs triggered by Schedule

Schedules are responsible for submitting jobs according the recurrence setting. Once jobs are submitted by Schedules, they will be listed in **Job Submission** list. We can notice these jobs with `Schedule` info.

![jsub_main_beta.png](assets/jsub_main_beta.png)
