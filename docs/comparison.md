---
id: comparison
title: Features Comparison
---


There are two tiers of **PrimeHub**, **Community** and <span class="ee-only">Enterprise</span>.

Please check our [Community Edition](https://github.com/InfuseAI/primehub) repo on Github to learn more.

Here we list the features comparison between tiers for the reference.

## Admin Portal

| Features | Community | <span class="ee-only">Enterprise</span> | <span class="deploy-only">Deploy</span> |
|----------|-----------|-----------------------------------------|--------|
| [System Management](guide_manual/admin-system)  | ✅️ | ✅️ | 🟢 |
| [Users Management](guide_manual/admin-user)    | ✅️ | ✅️ | 🟢 |
| [Groups Management](guide_manual/admin-group)   | ✅️ | ✅️ | 🟢 |
| [Instance Types Management](guide_manual/admin-instancetype)  | ✅️ | ✅️ | 🟢 |
| [Images Management](guide_manual/admin-image) | ✅️ | ✅️ ||
| [Datasets Management](guide_manual/admin-dataset)  | ✅️ | ✅️ ||
| [Secrets Management](guide_manual/admin-secret) | ✅️ | ✅️ | 🟢 |
| [Image Builder](guide_manual/admin-build-image)  |  | ✅️ ||
| [Usage Report](guide_manual/admin-report)  |  | ✅️ ||
| [Maintenance Notebook](maintenance) |  | ✅️ ||

## User Portal

| Features |  Community | <span class="ee-only">Enterprise</span> |<span class="deploy-only">Deploy</span> |
|----------|-----------|------------------------------------------|----------------------------------------|
| [Notebooks](quickstart/launch-project)| ✅️ | ✅️ ||
| [Jobs](job-submission-feature) |  | ✅️ ||
| [Schedule](job-scheduling-feature) |  | ✅️ ||
| [Models](model-deployment-feature) |  | ✅️ | ✅️ |
| [Images](group-image) | ✅️ | ✅️ ||
| [Shared Files](shared-files) | ✅️ | ✅️ ||

## Connectivity

| Features | Community | <span class="ee-only">Enterprise</span> |<span class="deploy-only">Deploy</span> |
|----------|-----------|-----------------------------------------|----------------------------------------|
| [SSH Server](guide_manual/ssh-config)| ✅️ | ✅️ ||
| Self-Signed Certificate| ✅️ | ✅️ ||


## Miscellaneous

| Features | Category  | Community | <span class="ee-only">Enterprise</span> |<span class="deploy-only">Deploy</span> |
|----------|-----------|-----------|-----------------------------------------|----------------------------------------|
| [PrimeHub Store](design/primehub-store)| Storage|  | ✅️ ||
| [Job Artifacts](job-artifact-feature)  | Job |  | ✅️ ||
| [Submit Notebooks As Jobs](ph-notebook-extension)  | PrimeHub Extension |  | ✅️ ||


🟢  : it indicates the feature is a partial feature from Enterprise edition.
