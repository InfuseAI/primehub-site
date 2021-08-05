---
id: version-3.7-config-prereq
title: How to configure PrimeHub
sidebar_label: How to configure
original_id: config-prereq
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>


## What We Need?

PrimeHub repo clone is supposed to be at the local environment when PrimeHub installation.

```bash
git clone https://github.com/InfuseAI/primehub
```


## Where is Configuration File?

### Multi-nodes

In terms of **multi-node**, the path to `primehub.yaml` is similar to below. Replace `<Kubernetes_cluster>` by the real case.


```bash
# Modify it with values of configuration
~/.primehub/config/<Kubernetes_cluster>/helm_override/primehub.yaml
```

### Single-node

In terms of **single-node**, the path to `primehub.yaml` is as below since using *MicroK8s*

```bash
# Modify it with values of configuration
~/.primehub/config/microk8s/helm_override/primehub.yaml
```

## How to Apply New Configuration?

Run `primehub-install`, it will update PrimeHub according to the `primehub.yaml`. It will take minutes to finish the update.

```bash
# Go to install directory of PrimeHub repo
cd primehub/install
./primehub-install upgrade primehub
```

