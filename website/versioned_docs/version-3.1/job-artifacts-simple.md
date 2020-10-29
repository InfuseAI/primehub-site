---
id: version-3.1-job-artifacts-simple
title: Job Artifacts Simple Usecase
original_id: job-artifacts-simple
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

This simple tutorial shows where to store generated data so called job artifacts during a job execution in `artifacts/` which is under a [PHFS storage](design/phfs) `/phfs/`. This storage is shared among same group members.

## Steps

1. Go to Jobs from User Portal and create a new job.
2. Confirm the current working group.
3. Select a instance type and image for a job.
4. Fill in `Job name` with *artifacts-simple*.
5. Fill in `Command`; it creates a directory `artifacts/` which must be specified for storing generated artifacts. (Or creating a symbolic link of the other directory points to `artifacts/` works as well.)

    ```bash
    mkdir -p artifacts/simple
    date > artifacts/date.txt
    date > artifacts/simple/date.txt
    ```

6. Use default timeout setting and submit the job.

Once the job succeeded. View the job and generated data from tab Artifacts. Here right click on a link to view the content or to download a file.

![](assets/jart_simple_file.png)

Memorize the *Job ID*.

![](assets/jart_simple_job.png)

## From Notebook

From Notebook we can check these artifacts under `phfs/jobArtifacts/<JOB_ID>/`.

We also can see other job artifacts which are submitted by same group members. Under our JOB.

![](assets/jart_simple_nb_1.png)

We can find these generated directories/files (job artifacts).

![](assets/jart_simple_nb_2.png)