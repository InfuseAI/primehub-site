---
id: version-2.0.0-feature-flag
title: Feature Flag
original_id: feature-flag
---

[Feature Flag](https://en.wikipedia.org/wiki/Feature_toggle) a.k.a. Feature Toggle is a technique in software development that attempts to provide an alternative to maintaining multiple source-code branches (known as feature branches), such that a feature can be tested even before it is completed and ready for release.

In PrimeHub, we use environment variables to toggle features.

## Using Alpha Features

In order to introduce users new features as early as possible. We can define features as *alpha* features. The alpha features are enabled by `PRIMEHUB_ENABLE_ALPHA=true` in `.env` or enabled individually.

By default only GA features are enabled, all of alpha features are disabled.

Alpha features are defined in in [bin/phenv](../../bin/phenv).


## Features

Feature|Default|Stage|Since|
-------|-------|-----|-----|
`PRIMEHUB_FEATURE_USER_PORTAL`|false|alpha|1.7.0
`PRIMEHUB_FEATURE_ENABLE_ADMISSION`|false|alpha|1.7.0

- `PRIMEHUB_FEATURE_USER_PORTAL`: Enable [User Portal](user-portal.md) to have a unified domain with a landing page.
- `PRIMEHUB_FEATURE_ENABLE_ADMISSION`: Enable [Admission](admission.md) relative features. [Admission Webhook](https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/) is a mechanism provided by kubernetes to validate and mutate resources when they are created.


## Reference
- [Feature gates in kubernetes](https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/)




