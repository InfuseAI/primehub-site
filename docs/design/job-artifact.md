---
id: job-artifact
title: Job Artifact
---

Allows users to store the job output and can be downloaded from the job UI.


## Prerequisites

PrimeHub store and PHFS should be enabled

## User Journey

### Create artfiacts from job
1. Create a job with the command

    ```
    mkdir -p artifacts/sub
    echo "hello" > artifacts/test.txt
    echo "hello" > artifacts/sub/test.txt
    ```

1. Go to the newly created job detail page.
1. Wait for the job completed
1. Go to the **Artifacts** tab, and we will see all the two artifacts we just created

### Artifact retention
1. After the job completed for 7 days (the default artifact retention)
1. Go to the job detail page.
1. Go to the **Artifacts** tab
1. We will see no artifacts anymore. The artifacts are automatically deleted.

## Design

### Artifact Copy
1. Use a new `run-job.sh` script to run the job pod
1. In this script, it will run the command and then copy the files from `/home/jovyan/artifacts` to `/phfs/jobArtifacts/<jobname>/`
1. At the same time, check if the artifacts folder execced the maximum size and maximum file counts
1. The `phjob` resource in GraphQL API provides a new `artifact` field. The resolver would iterate all the files under `/groups/<group>/jobArtifacts/<jobname>`


### Artifact Retention
1. In the `run-job.sh` script, store the expiration time to `/phfs/jobArtifacts/<jobname>/.primehub/metadata/expiredAt`
1. In the GraphQL, run the cleanup script periodically (per day)

   ```
   for group in store groups folder
    for job in `groups/${group}/jobArtifacts`
        expiredAt = get(`${job}/.metadata/expiredAt`)
        if (now > expiredAt)
          removeAll(job)
   ```
1. In the GraphQL, Provide an additional GraphQL mutation to run the cleanup

### Components

**Controller**

PhJob Reconciliation

1. Use the configmap to mount the `run-job.sh` script
1. Add new env vars to the job pod for artifact settings
1. Run the job by the new `run-job.sh` script

Artifact copy script

1. User copy the artifacts to `/home/jovyan/artifacts` (or create symbolic link)
1. Once the job is completed (or failed), the script will copy files from `/home/jovyan/artifacts`  (can be symbolic link or a real folder) to `/phfs/jobArtifacts/<jobname>/`
1. The script also checks if the file size exceeds the limit.
1. The script also stores expiration time (UNIX time in second) at `/phfs/jobArtifacts/<jobname>/.primehub/metadata/expiredAt`

**GraphQL**

1. In the original phjob type, add `artifact` field
    ```
    query {
      phJob(where: {id: "job-202009250153-34s0ti"}) {
        id
        artifact {
          prefix
          items {
            name
            size
            lastModified
          }
        }
      }
    }
    ```

1. Delete outdated artifacts folder manually
1. Provide GraphQL API to delete outdated artifacts folder manually
    ```
    mutation {
      cleanupPhJobArtifact
    }
    ```

**Client**

1. Add additional artifact tab in the job detail page.
1. The tab is only enabled when the job is completed.
1. When the tab is clicked, query the GraphQL artifact resource.
1. Show the artifact list. It should include the path and file size.
1. Click the path to download the artifact.