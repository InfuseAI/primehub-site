---
id: install
title: PrimeHub Installation & Setup Guide
---

## Prerequisites

1. A Kubernetes Cluster
1. Helm is installed. Please follow the instruction [here](https://helm.sh/docs/using_helm/)
1. Domain name for keycloak and primehub (e.g. id.example.com, primehub.example.com)
1. [Dynamic Volume Provisioner](https://kubernetes.io/docs/concepts/storage/dynamic-provisioning/) (e.g. ceph, cloud storage providers)
1. [Cert-manager](https://github.com/jetstack/cert-manager) if https is required
1. [NGINX Ingress Controller for Kubernetes ](https://github.com/kubernetes/ingress-nginx)

## Install PrimeHub

Please clone the primehub repository or untar the primehub release

1. Init the configuration.

   ```
   export PRIMEHUB_SCHEME=https
   export PRIMEHUB_DOMAIN=primehub.example.com
   export PRIMEHUB_CONSOLE_DOCKER_USERNAME=<the primehub console repo user>
   export PRIMEHUB_CONSOLE_DOCKER_PASSWORD=<the primehub console repo password>
   export KC_USER=<user>
   export KC_PASSWORD=<password>
   export KC_SCHEME=https
   export KC_DOMAIN=id.example.com
   export PRIMEHUB_STORAGE_CLASS=<the storage class of RWO PVCs>

   make init
   ```
   
1. Configure PrimeHub for advanced features. Please reference the [configuration document](configuration.md)
1. Install the keycloak

   ```
   make keycloak-install
   ```
   
1. Install the primehub

   ```
   make primehub-install
   ```

Once complete, please check the `http(s)://primehub.example.com/`

## Upgrade Primehub

1. Diff and install keycloak

   ```
   make release-diff-keycloak
   make release-install-keycloak
   ```

1. Diff and install primehub

   ```
   make release-diff-primehub
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

> Kibana is no longer supported.

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
