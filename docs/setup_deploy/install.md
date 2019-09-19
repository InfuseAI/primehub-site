---
id: installation 
title: Installation & Setup
---
## Prerequisites

- A Kubernetes Cluster
- Dynamic Volume Provisioner (e.g. ceph, cloud storage providers)

## Install PrimeHub

```
make primehub-install DOMAIN=$(YOUR_PRIMEGHUB_DOMAIN) KC_USER=$(YOUR_KEYCLOAK_ADMINISTRATOR_ID) KC_PASSWORD=$(YOUR_KEYCLOAK_ADMINISTRATOR_PASSWORD) SCHEME=(http|https) PRIMEHUB_CONSOLE_DOCKER_USERNAME=$(PROVIDED_PRIMEHUB_CONSOLE_DOCKER_USERNAME) PRIMEHUB_CONSOLE_DOCKER_PASSWORD=$(PROVIDED_GITLAB_DEPLOY_PASSWORD)
```

Once the task is completed, please wait for the PrimeHub related pods become ready, you may observe them by running

```
watch make get-all-pods
```

## Upgrade Primehub

1. Check Helm difference
   ```
   make component-diff-primehub
   ```
1. Upgrade
   ```
   make primehub-upgrade
   ```

## Install additional components

### Grafana

1. Create Grafana Keycloak client:

   ```
   make create-grafana-keycloak-client
   ```

   > Don't forget to update `.env` about your `GRAFANA_KEYCLOAK_PROXY_CLIENT_SECRET`.

1. Set environment `GRAFANA_ADMIN` & `GRAFANA_PASSWORD` in `.env` file

   > Never forget to assign there values, or it will be hard for you to login as `GRAFANA_ADMIN` since Grafana will pick a random password if we didn't assign it before.

1. Check Helm difference:

   ```
   make component-diff-prometheus-operator
   ```

1. Install applications:
   ```
   make component-install-prometheus-operator
   ```
1. Check your Grafana ingress by running:
   ```
   kubectl get ingresses -n monitoring prometheus-operator-grafana
   ```

### Kibana

1. Create Kibana KeyCloak client:
   ```
   make create-kibana-keycloak-client KC_USER=$(YOUR_KEYCLOAK_ADMINISTRATOR_ID) KC_PASSWORD=$(YOUR_KEYCLOAK_ADMINISTRATOR_PASSWORD)
   ```
1. Set environment `KIBANA_KEYCLOAK_PROXY_CLIENT_SECRET` in `.env` file, the variable value should be available from step 1.

1. Check Helm difference:
   ```
   make component-diff-efk
   ```
1. Install components:
   ```
   make component-install-efk
   ```
1. Check your Kibana ingress by running

   ```
   kubectl get ingresses -n logging kibana
   ```

   You may login Kibana by using the same account of `admin-ui`, which is available at the output of _Install PrimeHub_ stage.

## Upgrade individual helm Release

1. Get the releases in helm

   ```
   helm ls
   ```

1. Check the different

   ```
   make release-diff-<release name>
   ```

1. Upgrade
   ```
   make release-install-<release name>
   ```
