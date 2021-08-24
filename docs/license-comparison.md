---
id: license-comparison
title: License Comparison
description: License Comparison
---

In addition to feature differences among tiers, some features are also varied in licenses.

+ <span class="ee-trial">EE Trial</span>: Enterprise Edition with Default License.
+ <span class="ee-licensed">EE Licensed</span>: Enterprise Edition with Authorized License.
+ <span class="deploy-trial">Deploy Trial</span>: Deploy Edition with Default License.
+ <span class="deploy-licensed">Deploy Licensed</span>: Deploy Edition with Authorized License.

Here we list the features comparison among licenses.

|Features|<span class="ee-trial">EE Trial</span>|<span class="ee-licensed">EE Licensed</span>|<span class="deploy-trial">Deploy Trial</span>|<span class="deploy-licensed">Deploy Licensed</span>|
|-|-|-|-|-|
|[Kubernetes Nodes](getting_started/prerequisites)|Maximum: 1 node |Depends on License Detail |Maximum: 1 node |Depends on License Detail |
|[Deployments](model-deployment-feature)|Maximum: 1 deployment running |Depends on License Detail |Maximum: 1 deployment running |Depends on License Detail |
|[Admin > Groups Management](guide_manual/admin-group)|Maximum: 1 group existed|Depends on License Detail |Maximum: 1 group existed |Depends on License Detail |

---

## FAQ

**Q: What is the license detail?**
- For each license, we determine the:
  - \# of nodes allowed
  - \# of groups allowed
  - \# of deployments allowed
  - License Start Time
  - License Expiration Time

**Q: What is the default license?**
- When we install a PrimeHub EE or PrimeHub Deploy, there is a default license installed.
- The detail of default license:
  - 1 node
  - 1 group
  - 1 deployment
  - The license is never expired

**Q: What happens if the license is expired?**
- The normal user cannot create new resources for Jobs, Schedules, and Deployments.
- The existing resources would not be affected.

**Q: What happens if the # of node exceeds the limitation in license?**
- The console would show a warning message:
  > You are using more nodes than your license allows. Please contact your system administrator.

**Q: What happens if I upgrade from CE to EE, and the # of groups exceeds the limitation in license?**
- The existing groups would not be affected, but it is not allowed to create new group.
