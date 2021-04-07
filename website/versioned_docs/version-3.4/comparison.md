---
id: version-3.4-comparison
title: Tiers Feature Comparison
description: Tiers Feature Comparison
original_id: comparison
---


**PrimeHub** has three tiers: **Enterprise**, **Deploy**, **Community**.

+ <span class="ee-only">Enterprise</span>: fully complete features.
+ <span class="deploy-only">Deploy</span>: mandatory features dedicated to Model Deployment. See [PrimeHub Deploy](deploy-index).
+ <span class="ce-only">Community</span>: fundamental features provided to the community. See [Community Edition](https://github.com/InfuseAI/primehub) GitHub repo.

Here we list the features comparison among tiers.

## User Feature

| Features |  <span class="ce-only">Community</span> | <span class="ee-only">Enterprise</span> |<span class="deploy-only">Deploy</span> |
|----------|-----------|------------------------------------------|----------------------------------------|
| [Notebooks](quickstart/launch-project)| ✅️ | ✅️ ||
| [Jobs](job-submission-feature) |  | ✅️ ||
| [Schedule](job-scheduling-feature) |  | ✅️ ||
| [Models](model-deployment-feature) |  | ✅️ | ✅️ |
| [Shared Files](shared-files) | ✅️ | ✅️ ||
| [Images](group-image) | ✅️ | ✅️ ||

## Administration Feature

| Features | <span class="ce-only">Community</span> | <span class="ee-only">Enterprise</span> | <span class="deploy-only">Deploy</span> |
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
o

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


🟢  &NonBreakingSpace; This indicates the feature is a partial feature where redundant functions are removed from Enterprise edition.
