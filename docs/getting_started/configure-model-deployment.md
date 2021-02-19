---
id: configure-model-deployment
title: Configure Model Deployment
description: Configure Model Deployment
sidebar_label: Model Deployment
---


<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
</div>

## Introduction

Here is the advanced configuration for model deployment.

## Increase the Timeout of Model Deployment Endpoint

If you find your endpoint needs more time for each request, you can modify the following timeout settings.

### Increase client-body-timeout

Please check the definition of `client-body-timeout` in the [official doc](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#client-body-timeout).

The setting affects globally of all model deployment endpoints and ingress settings.

Here are the steps to modify this setting:
1. Check the namespace where the ingress pod is running by `kubectl get ns`. The default namespace is `ingress-nginx`.
2. Check the name of the pod by `kubectl get pods -n ${YOUR_NAMESPACE}`. The name is similar to `nginx-ingress-controller-79cfc6dcc5-m2rhw`.
3. Check the name of the configmap by `kubectl get pod -n ${YOUR_NAMESPACE} ${YOUR_POD_NAME} -o yaml | grep configmap`. The result is similar to `--configmap=${YOUR_NAMESPACE}/nginx-ingress-controller` and the name is `nginx-ingress-controller` in this case.
4. Edit the config by `kubectl edit cm -n ${YOUR_NAMESPACE} ${YOUR_CONFIGMAP_NAME}`. Add/Modify the `client-body-timeout` under the `data` section. 
```yaml
apiVersion: v1
data:
  client-header-buffer-size: 16k
  enable-vts-status: "true"
  client-body-timeout: "120" # means the timeout is 120sec
kind: ConfigMap
```

