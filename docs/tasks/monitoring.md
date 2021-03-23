---
id: monitoring
title: Grafana PrimeHub Dashboard
sidebar_label: Grafana PrimeHub Dashboard
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>


This document show you how to integrate Grafana with KeyCloak OIDC and install the Grafana PrimeHub Dashboard. We will walk throught

1. create a KeyCloak OIDC client
2. modify the values file of the prometheus-operator helm chart
3. Install PrimeHub Grafana dashboard

We assume some precondition:

1. You already have a KeyCloak and `primehub` realm
2. PrimeHub domain is `example.primehub.io` and the Grafana will be `http://example.primehub.io/grafana`
3. Use `nfs-client` as the storageClassName

If any settings are not fit in your cluster, please feel free to update it.


## Prometheus/Grafana

1. Generate Grafana OIDC client
2. Instal Prometheus-Operator
3. Grafana integration: primehub-grafana-dashboard (TBD)

### Generate Grafana OIDC client

In the KeyCloak management console: http://example.primehub.io/auth/admin/primehub/console, open the `Clients` and use the `Create` function:

![keycloak create the new client](assets/monitoring-keycloak-create-client.png)

Name the new client `grafana-proxy`, we will use the **Client ID** later:

![keycloak add grafana-proxy](assets/monitoring-keycloak-add-client.png)

Update client settings

- Access Type should be `confidential`
- Valid Redirect URIs: `http://example.primehub.io/grafana/*`
- Web Origins: `http://example.primehub.io`

![keycloak update client](assets/monitoring-update-client-settings.png)

Because **Access Type** changed, there is a new `Credentials` tab, open it and copy the `Secret` value, we will use it later (`GF_AUTH_GENERIC_OAUTH_CLIENT_SECRET` environment variable for grafana):

![keycloak get client secret](assets/monitoring-keycloak-client-secret.png)

### Prometheus-Operator values file

Here is an example values file, you have to update it before applying.

- update the `slack_api_url` to your slack webhook, or remove `alertmanager` and `additionalPrometheusRules` when the alert is not required
- replace `example.primehub.io` to your domain
- set `GF_AUTH_GENERIC_OAUTH_CLIENT_SECRET` to the right client secret that we created in the KeyCloak console
- save the configuration to `prometheus-operator-values.yaml`

```yaml
kubelet:
  serviceMonitor:
    https: true

coreDns:
  enabled: true
  service:
    selector:
      k8s-app: kube-dns

kube-state-metrics:
  resources:
    limits:
      memory: 100Mi
      cpu: 50m
    requests:
      memory: 10Mi
      cpu: 50m

prometheus-node-exporter:
  resources:
    limits:
      memory: 100Mi
      cpu: 50m
    requests:
      memory: 10Mi
      cpu: 50m

prometheus:
  prometheusSpec:
    resources:
      limits:
        memory: 4Gi
        cpu: 1000m
      requests:
        memory: 250Mi
        cpu: 50m
    storageSpec:
      volumeClaimTemplate:
        spec:
          storageClassName: nfs-client
          accessModes: ["ReadWriteOnce"]
          resources:
            requests:
              storage: 10Gi
    replicas: 1
    retention: 10d
    podAntiAffinity: hard

prometheusOperator:
  resources:
    limits:
      cpu: 50m
      memory: 100Mi
    requests:
      cpu: 50m
      memory: 50Mi

alertmanager:
  alertmanagerSpec:
    resources:
      limits:
        memory: 1000Mi
        cpu: 500m
      requests:
        memory: 250Mi
        cpu: 100m
    storage:
      volumeClaimTemplate:
        spec:
          storageClassName: nfs-client
          accessModes: ["ReadWriteOnce"]
          resources:
            requests:
              storage: 10Gi
    replicas: 1
    podAntiAffinity: hard
  config:
    global:
      slack_api_url: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX'
    templates:
    - '/etc/alertmanager/template/*.tmpl'
    route:
      group_by: ['alertname', 'cluster', 'service']
      group_wait: 30s
      group_interval: 5m
      repeat_interval: 1h
      receiver: default-receiver
      routes:
      - match:
          alertname: DeadMansSwitch
        receiver: 'null'
      # https://github.com/kubernetes-monitoring/kubernetes-mixin/issues/108
      - match:
          alertname: CPUThrottlingHigh
        receiver: 'null'
    inhibit_rules:
    - source_match:
        severity: 'critical'
      target_match:
        severity: 'warning'
      # Apply inhibition if the alertname is the same.
      equal: ['alertname', 'cluster', 'service']
    receivers:
    - name: default-receiver
      slack_configs:
      - channel: monitor
        color: '{{ if eq .Status "firing" }}danger{{ else }}good{{ end }}'
        fallback: '{{ template "slack.default.fallback" . }}'
        icon_emoji: '{{ template "slack.default.iconemoji" . }}'
        icon_url: '{{ template "slack.default.iconurl" . }}'
        pretext: '{{ .CommonAnnotations.summary }}'
        send_resolved: true
        text: |-
          {{ range .Alerts }}
            {{- if .Annotations.summary }}*Alert:* {{ .Annotations.summary }} - `{{ .Labels.severity }}`{{- end }}
            *Description:* {{ .Annotations.description }}{{ .Annotations.message }}
            *Graph:* <{{ .GeneratorURL }}|:chart_with_upwards_trend:>{{ if or .Annotations.runbook .Annotations.runbook_url }} *Runbook:* <{{ .Annotations.runbook }}{{ .Annotations.runbook_url }}|:spiral_note_pad:>{{ end }}
            *Details:*
            {{ range .Labels.SortedPairs }} * {{ .Name }}:* `{{ .Value }}`
            {{ end }}
          {{ end }}
        title: '[{{ .Status | toUpper }}{{ if eq .Status "firing" }}:{{ .Alerts.Firing | len }}{{ end }}] Prometheus Event Notification'
        title_link: '{{ template "slack.default.titlelink" . }}'
        username: 'Alert Manager'
    - name: "null"

additionalPrometheusRules:
- name: primehub
  groups:
  - name: primehub.rules
    rules:
    - alert: JupyterPodPendingOrUnknown
      expr: sum by (namespace, pod, phase) (kube_pod_status_phase{pod=~"^jupyter-.*", namespace="hub", phase=~"Pending|Unknown"}) > 0
      for: 30s
      labels:
        severity: critical
    - alert: JupyterPageSlow
      expr: (rate(request_duration_seconds_sum{code="302",handler="jupyterhub.handlers.pages.RootHandler"}[1m]) / rate(request_duration_seconds_count{code="302",handler="jupyterhub.handlers.pages.RootHandler"}[1m])) > 3
      for: 10s
      labels:
        severity: warning
      annotations:
        message: JupyterHub root page average response time is slow (> 3 seconds in 10s)
    - alert: JupyterPageSlow
      expr: (rate(request_duration_seconds_sum{code="302",handler="jupyterhub.handlers.pages.RootHandler"}[1m]) / rate(request_duration_seconds_count{code="302",handler="jupyterhub.handlers.pages.RootHandler"}[1m])) > 0.1
      for: 1h
      labels:
        severity: warning
      annotations:
        message: JupyterHub root page average response time is slow (> 0.1 seconds in 1h)
    - alert: JupyterPageSlow
      expr: (rate(request_duration_seconds_sum{code="200",handler="jupyterhub.handlers.pages.SpawnHandler"}[1m]) / rate(request_duration_seconds_count{code="200",handler="jupyterhub.handlers.pages.SpawnHandler"}[1m])) > 3
      for: 10s
      labels:
        severity: warning
      annotations:
        message: JupyterHub spawn page average response time is slow (> 3 seconds in 10s)
    - alert: JupyterPageSlow
      expr: (rate(request_duration_seconds_sum{code="200",handler="jupyterhub.handlers.pages.SpawnHandler"}[1m]) / rate(request_duration_seconds_count{code="200",handler="jupyterhub.handlers.pages.SpawnHandler"}[1m])) > 0.1
      for: 1h
      labels:
        severity: warning
      annotations:
        message: JupyterHub spawn page average response time is slow (> 0.1 seconds in 1h)

grafana:
  adminPassword: your-grafana-password
  adminUser: admin
  enabled: true
  env:
    GF_AUTH_GENERIC_OAUTH_API_URL: http://example.primehub.io/auth/realms/primehub/protocol/openid-connect/userinfo
    GF_AUTH_GENERIC_OAUTH_AUTH_URL: http://example.primehub.io/auth/realms/primehub/protocol/openid-connect/auth
    GF_AUTH_GENERIC_OAUTH_CLIENT_ID: grafana-proxy
    GF_AUTH_GENERIC_OAUTH_CLIENT_SECRET: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    GF_AUTH_GENERIC_OAUTH_ENABLED: "true"
    GF_AUTH_GENERIC_OAUTH_TOKEN_URL: http://example.primehub.io/auth/realms/primehub/protocol/openid-connect/token
    GF_SERVER_ROOT_URL: http://example.primehub.io/grafana
  grafana.ini:
    auth:
      signout_redirect_url: http://example.primehub.io/console/oidc/logout
    server:
      domain: example.primehub.io
      root_url: http://example.primehub.io/grafana
      serve_from_sub_path: "true"
  image:
    tag: 6.3.0
  ingress:
    annotations:
      kubernetes.io/ingress.class: nginx
      kubernetes.io/tls-acme: "true"
    enabled: true
    hosts:
    - example.primehub.io
    path: /grafana
  persistence:
    accessModes:
    - ReadWriteOnce
    enabled: true
    size: 10Gi
    storageClassName: nfs-client
  resources:
    limits:
      cpu: 500m
      memory: 1000Mi
    requests:
      cpu: 100m
      memory: 250Mi
```

### Install Prometheus-Operator

Add prometheus-community repo to helm

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
```

Install with the helm

```bash
helm upgrade prometheus-operator prometheus-community/prometheus-operator \
  --version 8.9.3 \
  -n monitoring --create-namespace --install \
  -f prometheus-operator-values.yaml
```

### PrimeHub Grafana Dashboard

Add infuseai repo to helm if you haven't installed yet

```bash
helm repo add infuseai https://charts.infuseai.io
helm repo update
```

Install PrimeHub Grafana dashboard

```bash
helm install primehub-grafana-dashboard-basic \
  infuseai/primehub-grafana-dashboard-basic \
  --set "modelDeployment.enabled=true"
```

The `modelDeployment.enabled` is required if you need to install dashboard for the model deployment feature as well.
