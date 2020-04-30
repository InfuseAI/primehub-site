---
id: version-2.6-feature-flag
title: Feature Flags
original_id: feature-flag
---

[Feature Flag](https://en.wikipedia.org/wiki/Feature_toggle) a.k.a. Feature Toggle is a technique in software development that attempts to provide an alternative to maintaining multiple source-code branches (known as feature branches), such that a feature can be tested even before it is completed and ready for release.

In PrimeHub, we use environment variables to toggle Alpha, Beta features.

## Using Features

To introduce users with new experimental features and to collect feedback from users early. We can define features as *Alpha* or *Beta* features according to PrimeHub versions. The Alpha features and Beta are enabled by `PRIMEHUB_ENABLE_ALPHA=true` and `PRIMEHUB_ENABLE_BETA=true` in `.env` respectively or enabled individually. Features are defined in in [bin/phenv](../../bin/phenv).

### Alpha feature

- Disabled by default.
- Buggy possibly, this feature may result in bugs/unstable systems.
- The feature may be dropped or changed without notice.
- The feature may not be compatible with later release onward.

### Beta feature

- Enabled by default unless extra config required.
- The feature is tested and verified.
- The detail of the feature might be changed in the subsequent beta or stable releases so that the migrating actions may be required.

### GA feature

- A GA feature is well tested.
- Enabled by default for general availability.

## Features flags for Alpha, Beta, GA features

Feature|Default|Stage|Since|
-------|-------|-----|-----|
`PRIMEHUB_FEATURE_USER_PORTAL`|false|alpha|1.7.0
`PRIMEHUB_FEATURE_USER_PORTAL`|true|ga|2.1.0
`PRIMEHUB_FEATURE_ENABLE_ADMISSION`|false|alpha|1.7.0
`PRIMEHUB_FEATURE_ENABLE_ADMISSION`|true|ga|2.2.0
`PRIMEHUB_FEATURE_DATASET_UPLOAD`|false|alpha|2.0.0
`PRIMEHUB_FEATURE_DATASET_UPLOAD`|false|beta|2.2.0
`PRIMEHUB_FEATURE_CUSTOM_IMAGE`|false|alpha|2.2.0
`PRIMEHUB_FEATURE_ENABLE_KERNEL_GATEWAY`|false|alpha|2.0.0
`PRIMEHUB_FEATURE_JOB_SUBMISSION`|false|alpha|2.3.0
`PRIMEHUB_FEATURE_CUSTOM_IMAGE`|false|beta|2.3.0
`PRIMEHUB_FEATURE_MODEL_DEPLOYMENT`|false|alpha|2.7.0

- `PRIMEHUB_FEATURE_USER_PORTAL`: Enable [User Portal](../design/user-portal.md) to have a unified domain with a landing page.
- `PRIMEHUB_FEATURE_ENABLE_ADMISSION`: Enable [Admission](../design/admission.md) relative features. [Admission Webhook](https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/) is a mechanism provided by kubernetes to validate and mutate resources when they are created. Been removed.
- `PRIMEHUB_FEATURE_DATASET_UPLOAD`: Enable [Dataset Upload](../design/dataset-upload.md) so that users can upload data to pv type dataset through a server.
- `PRIMEHUB_FEATURE_CUSTOM_IMAGE`: Enable [Image Builder](../design/image-builder.md) so that admin can build images with custom packages.
- `PRIMEHUB_FEATURE_ENABLE_KERNEL_GATEWAY`: Enable experimental [jupyter kernel gateway](../design/notebook-kernel-process.md), it runs notebook and kernel in the different container.
- `PRIMEHUB_FEATURE_JOB_SUBMISSION`: Enable [Job Submission](../design/job-submission.md) so that users can submit jobs.
- `PRIMEHUB_FEATURE_MODEL_DEPLOYMENT`: Enable [Model Deployment](../design/model-deployment.md) so that users can deploy a model as service.

## Reference

- [Feature gates in kubernetes](https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/)
