---
id: customization
title: Customization
---

## Helm

PrimeHub is managed by helm. The way to [customize helm installation](https://helm.sh/docs/using_helm/#customizing-the-chart-before-installing) is to provide values in the installation command. 

PrimeHub provide default values to override. We use them to provide

- Common jupyterhub customization (e.g authenticator, spawner)
- Default behaviors
- Ingress settings
- Airgap relative settings

These helm values reside at `helm/primehub/*`

## Make Helm Installation Easy

In the common helm installation, it may look like the following command.

```
helm install \
  --name primehub \
  --namespace hub \
  --values value.yaml \
  modules/charts/primehub
```

However, it is not convenient to issue this long command for each installation and not easy to be source-controlled as well. To solve this problem, we make use of [helmfile](https://github.com/roboll/helmfile). The above command would turn into the yaml file below.

```
charts:
  - name: primehub
    namespace: primehub
    chart: ../../modules/charts/primehub
    version: ~0.1.0
    values:
      - values.yaml
```

and the install command would change to

```
helmfile -f primehub.yaml
```

In this way, we make the installation declarative and easy to run. All these helmfiles are located at `helm/helmfile.d`. 

As more and more releases need to be installed, we also categorize these releases [by label](https://github.com/roboll/helmfile#labels-overview). There are two labels defined

Label | Description
--- | --- 
`app`| The component. (e.g. primehub, prometheus-operator, efk)
`release`| The individual release (e.g. keycloak, hub, admin-ui, ...)


Here are the available releases

Release |App | Description
--- | ---  | ---
primehub | primehub | Primehub
keycloak | keycloak | Keycloak. The identify service
elasticsearch | efk | ElasticSearch
elasticsearch-curator | efk | Tool to manage ElasticSearch
fluentd-elasticsearch | efk | Fluentd. Log collector
kibana| efk | Kibana. Dashboard for Elasticsearch
prometheus-operator | prometheus-operator | Prometheus, Grafana, and Exporters
primehub-grafana-dashboard-basic | prometheus-operator | Dashboard for PrimeHub
primehub-grafana-dashboard-rook | prometheus-operator | Dashboard for rook
cert-manager | cert-manager | Certification Manager 
rook-operator | rook-operator | Rook 

To diff, install/upgrade the helm release, we can use these commands

```
helmfile -f helm/helmfile.d -l release=<release> diff
helmfile -f helm/helmfile.d -l release=<release> charts
helmfile -f helm/helmfile.d -l app=<app> diff
helmfile -f helm/helmfile.d -l app=<app> charts
```

or these equivalent make commands

```
make release-diff-<release>
make release-install-<release>
make component-diff-<app>
make component-install-<app>
```

## Template the Value

Helm provides a great way to template the kubernetes resources. In the helm installation or upgrade, helm consolidates all the values to single value tree, and use it to generate the final resource yaml and apply them to cluster.

However, helm [does not provide a way to template the value](https://github.com/helm/helm/issues/2492), this is why helmfile templating comes in. Helmfile provides a way to [template the value files by environment valuable](https://github.com/roboll/helmfile#templates).

We can notice that in the `helm/<component>/*`, these values file have `.yaml.gotmpl` file extension. When helmfile is run, it would template these value files and output the final plain values.

The environment variable is from the `<config-path>/.env`. And the config path is searched in the following order

- `~/.primehub/config/<cluster name>/`  (<cluster name> is `kubectl config current-context` )
- `./etc`

The helper script `bin/phenv` would find if `${CONFIG_PATH}/.env` is in the folder and determine if it is qualified as a config folder.

## Configuration Files

In the previous section, we talk about the config folder. In addition to `.env` file, the folder also contain these files and folders.

File| Description
--- | ---
`.env` | The environment variables for helmfile templating
`helm_override/*.yaml` | The final value file to override. All customization for helm values should go here.
`inventory.yaml` | The ansible inventory file if any
`cluster.yml` | The rke configuration file if any
`cluster-bootstrap.yml`| The rke configuration file (for bootstrapping) if any





## Features and Feature Toggle

Please see [Feature Flag](feature-flag.md).
