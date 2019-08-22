---
id: version-0.0.1-customization
title: Customization
original_id: customization
---
## Helm

PrimeHub customization is based on helm. In the core PrimeHub component, we integrate these helm charts

- Primehub Prerequsites
- Keycloak
- z2jh (zero-to-jupyterhub)
- admin-ui
- admin maintenance notebook

The way to [customize helm installation](https://helm.sh/docs/using_helm/#customizing-the-chart-before-installing) is to provide values in the installation command. PrimeHub provide default values to override. We use them to provide

- Common jupyterhub customization (e.g authenticator, spawner)
- Default behaviors
- Ingress settings
- Airgap relative settings

These helm values reside at `helm/<component>/*`

## Make Helm Installation Easy

In the common helm installation, it may look like the following command.

```
helm install \
  --name primehub-prerequisite \
  --namespace primehub \
  --version=~0.1.0 \
  --values value.yaml \
  ../../modules/charts/primehub-prerequisite 
```

However, it is not convenient to issue this long command for each installation and not easy to be source-controlled as well. To solve this problem, we make use of [helmfile](https://github.com/roboll/helmfile). The above command would turn into the yaml file below.

```
charts:
  - name: primehub-prerequisite
    namespace: primehub
    chart: ../../modules/charts/primehub-prerequisite
    version: ~0.1.0
    values:
      - values.yaml
```

and the install command would change to

```
helmfile -f primehub-prerequisite.yaml
```

In this way, we make the installation declaritve and easy to run. All these helmfiles are located at `helm/helmfile.d`. 

As more and more releases need to be installed, we also categorize these releases [by label](https://github.com/roboll/helmfile#labels-overview). There are two labels defined

Label | Description
--- | --- 
`app`| The component. (e.g. primehub, promethues-operator, efk)
`release`| The individual release (e.g. keycloak, hub, admin-ui, ...)


Here are the avaiable releases

Release |App | Description
--- | ---  | ---
primehub-prerequisite | primehub | CRD, RBAC, and helper resources for PrimeHub
keycloak | primehub | Keycloak. The identify service
hub | primehub  | JupyterHub
admin-ui | primehub | The administration ui of PrimeHub
admin-notebook | primehub | The jupyter notebook for operations.
elasticsearch | efk | ElasticSearch
elasticsearch-curator | efk | Tool to manage ElasticSearch
fluentd-elasticsearch | efk | Fluentd. Log collector
kibana| efk | Kibana. Dashboard for Elasticsearch
prometheus-operator | prometheus-operator | Promethues, Grafana, and Exporters
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


As for the `.env`, here is a list of configurable keys.

**The Environment Variables for PrimeHub**

Environment | Description | Optional
--- | --- | ---
`PH_DOMAIN`| parent domain name for this installation. (e.g. `example.com`) | No
`PH_SCHEME`| http or https| No
`PH_PORT`| port | Yes
`KC_DOMAIN`| Domain for external keycloak | Yes. default is 'id.$PH_DOMAIN'
`KC_SCHEME`| Scheme for external keycloak | No if KC_DOMAIN defined
`KC_PORT` |Port for external keycloak | Yes
`KC_USER` | Keycloak admin username | No
`KC_PASSWORD` | Keycloak admin passowrd | No
`KC_DB_PASSWORD` | Keycloak DB password | Yes. default is `$KC_PASSWORD`
`KC_REALM` | Keycloak realm to install primehub | Yes. default is `primehub`
`PH_GROUP_EVERYONE_ID` | The group id of group `everyone`. | No. Generated by bootstrap.
`PRIMEHUB_CONSOLE_DOCKER_USERNAME` | image pulling user for admin-ui image |  No
`PRIMEHUB_CONSOLE_DOCKER_PASSWORD` |image pulling password for admin-ui | No
`ADMIN_UI_CLIENT_SECRET` | The secret of keycloak client `admin-ui`. |  No. Generated by bootstrap.
`ADMIN_UI_GRAPHQL_SECRET_KEY` | The secret key for graphql. |No. Generated by bootstrap.
`HUB_CLIENT_SECRET` | The secret of keycloak client `jupyterhub`.  | No. Generated by bootstrap.
`HUB_AUTH_STATE_CRYPTO_KEY` | z2jh [auth state crypto key](https://zero-to-jupyterhub.readthedocs.io/en/latest/reference.html#auth-state-cryptokey)  | No. Generated by bootstrap.
`HUB_PROXY_SECRET_TOKEN` | z2jh [proxy secret token](https://zero-to-jupyterhub.readthedocs.io/en/latest/reference.html#proxy-secrettoken)| No. Generated by bootstrap.
`PRIMEHUB_AIRGAPPED` | If the cluster is in airgap environment | Yes. default is `false`
`PRIMEHUB_FEATURE_USER_PORTAL` | If the user portal is enabled | Yes. default is `false`
`PRIMEHUB_DOMAIN`| Domain for user portal | No if `PRIMEHUB_FEATURE_USER_PORTAL` is enabled
`PRIMEHUB_SCHEME`| Scheme for user portal | No if `PRIMEHUB_FEATURE_USER_PORTAL` is enabled
`PRIMEHUB_PORT` | Port for user portal | Yes
**The Environment Variables for Grafana**

Environment | Description | Optional
--- | --- | ---
`GRAFANA_SCHEME` | The url scheme of grafana | Yes. default is `$PH_SCHEME`
`GRAFANA_DOMAIN` | The url domain of grafana | No
`GRAFANA_KEYCLOAK_PROXY_CLIENT_SECRET` | The secret of keycloak client `grafana-proxy` | No

**The Environment Variables for Kibana**

Environment | Description | Optional
--- | --- | ---
`KIBANA_KEYCLOAK_PROXY_CLIENT_SECRET` | The secret of keycloak client `kibana-proxy` | No


## Features and Feature Toggle


[Feature toggle](https://en.wikipedia.org/wiki/Feature_toggle) is a technique in software development that attempts to provide an alternative to maintaining multiple source-code branches (known as feature branches), such that a feature can be tested even before it is completed and ready for release.

If PrimeHub, we use environment variable to enable a feature. For example, when `PRIMEHUB_FEATURE_USER_PORTAL=true`, The feature of user portal is enabled.

### Alpha Features

In order to test features as early as possible. We can define a feature as alpha feature. The alpha features are enabled by `PRIMEHUB_ENABLE_ALPHA=true` and the alpha feature list is defined in in [bin/phenv](../../bin/phenv)

### Feature Flag Best Practice

- Feature should be prefix with `PRIMEHUB_FEATURE_`
- The application should never depends on `PRIMEHUB_ENABLE_ALPHA`. Instead, please depends on `PRIMEHUB_FEATURE_XXX`
- In `.env` of dev and staging environment, don't define `PRIMEHUB_FEATURE_XXX=true` but use `PRIMEHUB_ENABLE_ALPHA=true` to enable the new alpha features.









