---
id: version-2.6-install_helper
title: Install Helper (Advanced)
original_id: install_helper
---

Install Helper is an advanced way to install PrimeHub and relative components. It uses environment variables to share common settings for multiple helm charts. Such as,

- Host name for ingress
- Airgap relative settings
- Keycloak settings
- Storage class


## How to Use

Please clone the primehub repository or untar the primehub release

1. Init the configuration.

   ```bash
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
   then the configuration is generated to `~/.primehub/config/<cluster-name>` or `bin/phenv --path`

1. Configure PrimeHub for advanced features. Please reference the [environment variables](../references/dotenv.md) and [primehub chart configuration](../references/primehub_chart.md).

   > For more detail of the configuration structure, please see [install helper design](../design/install-helper-design.md)

1. Install the metacontroller

   ```bash
   make metacontroller-install
   ```

1. Install the keycloak

   ```bash
   make keycloak-install
   ```

1. Install the primehub

   ```bash
   make primehub-install
   ```

Once complete, please check the `http(s)://primehub.example.com/`

## Upgrade Primehub

1. Diff and install keycloak

   ```bash
   make release-diff-keycloak
   make release-install-keycloak
   ```

1. Diff and install primehub

   ```bash
   make release-diff-primehub
   make primehub-upgrade
   ```

## Install Grafana

1. Create Grafana Keycloak client:

   ```bash
   make create-grafana-keycloak-client
   ```

   > Don't forget to update `.env` about your `GRAFANA_KEYCLOAK_PROXY_CLIENT_SECRET`.

1. Set environment `GRAFANA_ADMIN` & `GRAFANA_PASSWORD` in `.env` file

   > Never forget to assign their values, or it will be hard for you to log in as `GRAFANA_ADMIN` since Grafana will pick a random password if we didn't assign it before.

1. Check Helm difference:

   ```bash
   make component-diff-prometheus-operator
   ```

1. Install applications:

   ```bash
   make component-install-prometheus-operator
   ```

1. Check your Grafana ingress by running:

   ```bash
   kubectl get ingresses -n monitoring prometheus-operator-grafana
   ```

## Upgrade individual helm Release

1. Get the releases in helm

   ```bash
   helm ls
   ```

1. Check the different

   ```bash
   make release-diff-<release name>
   ```

1. Upgrade

   ```bash
   make release-install-<release name>
   ```

