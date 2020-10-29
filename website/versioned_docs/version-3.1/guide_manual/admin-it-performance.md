---
id: version-3.1-admin-it-performance
title: Quality of Service
sidebar_label: Quality of Service for Pods
original_id: admin-it-performance
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

If you have ever wondered that the performance of the launching instance doesn't meet the expectation of CPUs request in the setting of the instance type. You many want to learn how Kubernetes manages CPU workload which may affect the performance you .


+ [CPU Management Policies↗](https://kubernetes.io/docs/tasks/administer-cluster/cpu-management-policies/#static-policy)

+ [Quality of Service for Pods↗](https://kubernetes.io/docs/tasks/configure-pod-container/quality-service-pod/)




Basically speaking, if the performance is the concern, we can configure the instance type to meet the conditions to have exclusive CPUs:

1. `cpu-manager-policy`: `static` (If the circumstance is set up by InfuseAI, by default, it is `static`.)

2. `QoS` classes of a Pod: `Guaranteed`; the condition for a Pod in Guaranteed.

    >For a Pod to be given a QoS class of Guaranteed:
    ><br>1. Every Container in the Pod must have a memory limit and a memory request, and they must be the same.
    ><br>2. Every Container in the Pod must have a CPU limit and a CPU request, and they must be the same.

    According to the criteria above, we can set
   + An instance type *must have a **memory limit** and a **memory request**, and they must be the **same***.
   + An instance type *must have a **CPU limit** and a **CPU request**, and they must be the **same***.

3. >Only containers that are both part of a Guaranteed pod and have integer CPU requests are assigned exclusive CPUs.

    According to the suggestion above, we can set

    + An instance type must have **integer CPU requests/limit**.
