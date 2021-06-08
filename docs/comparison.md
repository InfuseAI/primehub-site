---
id: comparison
title: Tiers Feature Comparison
description: Tiers Feature Comparison
---


**PrimeHub** has three tiers: **Enterprise**, **Deploy**, **Community**.

+ <span class="ee-only">Enterprise</span>: fully complete features.
+ <span class="deploy-only">Deploy</span>: mandatory features dedicated to Model Deployment. See [PrimeHub Deploy](deploy-index).
+ <span class="ce-only">Community</span>: fundamental features provided to the community. See [Community Edition &neArr;](https://github.com/InfuseAI/primehub) GitHub repo.

Here we list the features comparison among tiers.

## User Feature

| Features |  <span class="ce-only">Community</span> | <span class="ee-only">Enterprise</span> |<span class="deploy-only">Deploy</span> |
|----------|-----------|------------------------------------------|----------------------------------------|
| [Notebooks](quickstart/launch-project)| ✅️ | ✅️ ||
| [Jobs](job-submission-feature) |  | ✅️ ||
| [Schedule](job-scheduling-feature) |  | ✅️ ||
| [Models (Beta)](model-management) |  | ✅️ | ✅️ |
| [Deployments](model-deployment-feature) |  | ✅️ | ✅️ |
| [Shared Files](shared-files) | ✅️ | ✅️ |✅ |
| [Apps (Beta)](primehub-app) | ✅️ | ✅️ ||
| [Images](group-image) | ✅️ | ✅️ ||
| [Settings](group-setting) | ✅️ | ✅️ | ✅️|

## Administration Feature

| Features | <span class="ce-only">Community</span> | <span class="ee-only">Enterprise</span> | <span class="deploy-only">Deploy</span> |
|----------|-----------|-----------------------------------------|--------|
| [System Management](guide_manual/admin-system)  | ✅️ | ✅️ | 🔵 |
| [Users Management](guide_manual/admin-user)    | ✅️ | ✅️ | 🔵|
| [Groups Management](guide_manual/admin-group)   | ✅️ | ✅️ | 🔵 |
| [Instance Types Management](guide_manual/admin-instancetype)  | ✅️ | ✅️ |🔵 |
| [Images Management](guide_manual/admin-image) | ✅️ | ✅️ ||
| [Datasets Management](guide_manual/admin-dataset)  | ✅️ | ✅️ ||
| [Secrets Management](guide_manual/admin-secret) | ✅️ | ✅️ |🔵  |
| [Image Builder](guide_manual/admin-build-image)  |  | ✅️ ||
| [Usage Report](guide_manual/admin-report)  |  | ✅️ ||
| [Maintenance Notebook](maintenance) |  | ✅️ ||


## Connectivity

| Features | <span class="ce-only">Community</span> | <span class="ee-only">Enterprise</span> |<span class="deploy-only">Deploy</span> |
|----------|-----------|-----------------------------------------|----------------------------------------|
| [SSH Server](guide_manual/ssh-config)| ✅️ | ✅️ ||
| Self-Signed Certificate| ✅️ | ✅️ ||


## Miscellaneous

| Features | Category  | <span class="ce-only">Community</span> | <span class="ee-only">Enterprise</span> |<span class="deploy-only">Deploy</span> |
|----------|-----------|-----------|-----------------------------------------|----------------------------------------|
| [PrimeHub Store](design/primehub-store)| Storage| ✅️ | ✅️ | ✅️ |
| [Submit Notebooks As Jobs](ph-notebook-extension)  | PrimeHub Extension |  | ✅️ ||


🔵  &NonBreakingSpace; indicates the feature is a partial feature where redundant functions are removed from Enterprise edition.

---

## License Limitations

Beside feature limitations, license limitations are also varied in licenses.

| Limitation | EE Trial |  EE Licensed | Deploy Licensed |
|------------|----------|--------------|-----------------|
| Add new groups|| ✅️ |✅️|
| Add new instance types| ✅️ | ✅️ | ✅️|
| Add new images| ✅️ | ✅️ ||
| Maximum Nodes|`-`|🌟|🌟|
| Maximum Model Deployments|`0`|🌟|🌟|

🌟  &NonBreakingSpace; indicates that the maximum depends on the license purchased from InfuseAI.


### License warning

A license issued by InfuseAI contains `Expiration Date`, `Maximum Nodes`, `Maximum Models`.

+ When a license has expired, a warning message appears.

  >Your license has expired. Please contact your sales team to extend your license.

+ When used node amount > granted node amount, a warning message appears.

  > You are using more nodes than your license allows. Please contact your system administrator.

+ when used model amount > granted model amount + 10%, a warning message appears.

  >Please contact your system administrator for assistance to upgrade your license to run more models.