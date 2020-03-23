---
id: version-2.5-release-note
title: 2.5 Release Notes
original_id: release-note
---

### PrimeHub-Ready Kubernetes

We have simplified our overall PrimeHub installation process! Simply use the new `helm install` command. To equip you with what you need to get started, please view our documentation here.

**Documentation:**

- [PrimeHub Installation](dev-introduction)

---

### Job Scheduler (Alpha)

Our Job Scheduler feature now gives users an option to set a recurrence when creating a new job. Users can also create jobs in advance to run them manually at a later time. 

**Documentation:**

- [Job Schduler (Alpha)](job-scheduling-feature)
- Setup `PRIMEHUB_FEATURE_JOB_SUBMISSION` flag to enable the Job Scheduler feature

**Note: This is an alpha version that it is subject to changes in another release in the near future.**

---

### Job Submission

This is our beta release! Users are able to submit time-consuming jobs to run in the background. Users will now also be able to see scheduled jobs triggered by the Job Scheduler (Alpha) in the jobs list. 

**Job Submission Documentation:** 

- [Job Submission (Beta) tutorial](job-submission-tutorial-simple)
- [Job Submission feature](job-submission-feature)