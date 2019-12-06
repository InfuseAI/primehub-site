---
id: version-2.1.0-meta-chart
title: Primehub Meta Chart
original_id: meta-chart
---

Primehub meta chart is a helm chart to install Primehub.

# Background

In 1.x, to install PrimeHub, we need to install these charts.

Chart | Description
--- | ---
keycloak | The identify server solution.
primhub-prerequisite | The CRD, CRUD, ConfigMaps for jupyterhub customizatino.
primehub-console | The primehub UI and graphql server
jupyterhub | The solution to run multi-user jupyter servers on kubernetes
admin-notebook | The primehub operation notebook.

Besides these, we still need a bootstrap script to setup the keycloak.

# Goal

Aggregate all the primehub relative charts into one meta chart.

Chart | Description
--- | ---
keycloak | The identify server solution.
primehub | The chart to install primehub


# Requirements

1. Single chart to install PrimeHub
1. Single `helm install` can install PrimeHub. No extra bootstrap script is required.
1. The keycloak can be installed externally. 
1. Provide a way to migrate to meta chart.


# Implementation
1. Create a primehub chart at `modules/charts/primehub`
2. Move `primehub-prerequisite`, `primehub-console`, `jupyterhub`, `admin-notebook` into the charts folder of the primehub chart
3. Merge all the old charts helm values to `helm/primehub/*.yaml.gotmpl`
4. Create a bootstrap job in the chart template and it is triggered by [helm install and upgrade](https://github.com/helm/helm/blob/master/docs/charts_hooks.md)
5. Provide a migration script to merge helm overrides value files to the new primehub helm override value file.

## Bootstrap
Primehub highly integrating keycloak. As primehub is installed, there are a lot of keycloak resources neeed to be created. Bootstrap script is designed to do this job.

In the meta chart, the bootstrap script is put in a kubernetes job and run whenever helm installation or upgrade. 

There are two responsibility for bootstrap script.

1. Initiate or upgrade the keycloak settings, including realm, clients, everyone group. Whenever the helm release is upgraded, the bootstrap script would run an idempotent update against the client and make sure the protocol mappers and redirect URIs are configured correctly. 

   > Note that the client attributes would not updated in the current version. If there are new added attribute, please make sure to enhance the logic here.
2. Create default resources in the very beginning installation, including default users/group and default CRDs, like cpu-only instance type and base notebook image.


Currently, the default resource creation is only run when there are no user in the target realm.

## Simplify the PrimeHub Installation

In old bootstrap script, it create the keycloak clients, output the client secret to `.env` file, and then use `.env` to install `primehub-console` and `jupyterhub`. The multi-stages make the primehub installation diffcult.

In the new meta-chart, the bootstrap is run in the job and the client secrets are generated and put in the kuberentes secret. It makes the installation process much simpler.

# Migration From 1.x
Please follow the instructions in the [migration document](modules/upgrade/migrate-v2.0/migrate-v2.0.md)


# Release

The meta chart is released since v2.0.0
