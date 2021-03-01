---
id: upgrade-ce2ee
title: Upgrade to Enterprise from Community
description: Upgrade to Enterprise from Community
sidebar_label:  From CE to EE
---

<div class="label-sect">
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>
<br>

This document is for Community edition users who wants to upgrade to Enterprise edition without reinstalling whole PrimeHub.

This is only for PrimeHub CE which is installed by [Helm with a prepared value file](install_primehub_ce).

## Prerequisite

### Check Current PrimeHub CE Version

We recommend to remain the same version when upgrade to EE from CE. To do so, we must know what the current CE version is.

Check and note down it. E.g. `v3.2.1`

```bash
helm ls -A -f primehub
```

### Prepare Your Own Value File

You will need the same `primehub-values.yaml` [value file prepared](install_primehub_ce#prepare-the-value-file) in the first install of PrimeHub CE.

To check if the value file is valid by using [helm-diff](https://github.com/databus23/helm-diff) plugin. Check the diff output to see if the value file is correct.

Replace `<current_version>` and `/path/to/primehub-values.yaml`.


```bash
# Optional
# Use helm-diff to verify applied values

$APP_VERSION=<current_version>
$VALUE_FILE_PATH=/path/to/primehub-values.yaml

helm diff upgrade primehub infuseai/primehub \
  --namespace hub \
  --version $APP_VERSION \
  --values $VALUE_FILE_PATH
```

### Valid License

Prepare the license file if you have it from InfuseAI.

>You could conduct the upgrade without a license file for the purpose of evaluation of PrimeHub Enterprise. However, please be noticed, *there are limitations imposed on PrimeHub Enterprise trial*.


## Upgrade to EE

There are two values files needed. Besides the original `primehub-values.yaml`, you'll need a `ee-values.yml` file for EE version upgrade. 

You can modify the template `https://raw.githubusercontent.com/InfuseAI/primehub/<current_version>/examples/ee-values.yaml` here for components activation, or use it directly.

Then we pass these two value files to `helm upgrade`.

Replace `<current_version>` and `/path/to/primehub-values.yaml`.

```bash
$APP_VERSION=<current_version>
$VALUE_FILE_PATH=/path/to/primehub-values.yaml

helm upgrade primehub infuseai/primehub \
  --namespace hub \
  --version $APP_VERSION \
  --values $VALUE_FILE_PATH \
  --values https://raw.githubusercontent.com/InfuseAI/primehub/$APP_VERSION/examples/ee-values.yaml
```

### New to Enterprise

What differences between Community and Enterprise are!? Check the [comparison](../comparison) to learn more Enterprise-only features!

## Apply EE License

A valid license file can be applied anytime to remove the limitations of PrimeHub Enterprise trial.

>Please contact sales from InfuseAI for the purchase/license after PrimeHub Enterprise evaluation.


```bash
kubectl apply -n hub -f license_crd.yml
```

After applying the license file, it would take around 30 seconds for our components to reload the license status. Check the pod status to see if they are restarted successfully.

```bash
kubectl get pod -n hub -w
```

Once the license is loaded, the license is reflected on [PrimeHub License of System setting](../guide_manual/admin-system#primehub-license).
