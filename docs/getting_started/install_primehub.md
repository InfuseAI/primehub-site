---
id: install_primehub
title: Install PrimeHub Enterprise
description: Install PrimeHub Enterprise
sidebar_label: Install PrimeHub EE
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
</div>

>Check the [prerequisites](prerequisites) for PrimeHub first before preceding to the PrimeHub installation.

This document will guide you how to install **PrimeHub EE (Trial license)** by **Helm**.

## Add InfuseAI Chart repo

```bash
helm repo add infuseai https://charts.infuseai.io
helm repo update
```

## Prepare the Value File

Prepare the value file `primehub-values.yaml` for helm installation. 

Key | Description
----|------------------------------------
`PRIMEHUB_DOMAIN` | The domain name of primehub. It can be the same as primehub's one.
`PRIMEHUB_PASSWORD` | The password for primehub admin. (The default username of admin is `phadmin`)
`GRAPHQL_SECRET_KEY` | The graphql API secret key
`HUB_AUTH_STATE_CRYPTO_KEY` | The jupyterhub crypo key. Please reference the [z2jh document](https://zero-to-jupyterhub.readthedocs.io/en/latest/reference/reference.html#auth-state-cryptokey).
`HUB_PROXY_SECRET_TOKEN` | The jupyterhub secret. Please reference the [z2jh document](https://zero-to-jupyterhub.readthedocs.io/en/latest/reference/reference.html#proxy-secrettoken).

Modify the environment variables below and execute the commands to generate the value file.

```
PRIMEHUB_DOMAIN=1.2.3.4.nip.io
PRIMEHUB_PASSWORD=__my_password__
GRAPHQL_SECRET_KEY=$(openssl rand -hex 32)
HUB_AUTH_STATE_CRYPTO_KEY=$(openssl rand -hex 32)
HUB_PROXY_SECRET_TOKEN=$(openssl rand -hex 32)

cat <<EOF > primehub-values.yaml
primehub:
  domain: ${PRIMEHUB_DOMAIN}
ingress:
  annotations:
    kubernetes.io/ingress.allow-http: "true"
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
  hosts:
  - ${PRIMEHUB_DOMAIN}
bootstrap:
  password: ${PRIMEHUB_PASSWORD}
graphql:
  sharedGraphqlSecret: ${GRAPHQL_SECRET_KEY}
jupyterhub:
  auth:
    state:
      cryptoKey: ${HUB_AUTH_STATE_CRYPTO_KEY}
  proxy:
    secretToken: ${HUB_PROXY_SECRET_TOKEN}
EOF
```

## Install

1. Run helm command to install primehub

   ```
   helm upgrade \
     primehub infuseai/primehub \
     --install \
     --create-namespace \
     --namespace hub \
     --values primehub-values.yaml \
     --values https://raw.githubusercontent.com/InfuseAI/primehub/master/examples/ee-values.yaml
   ```

   > In the first time installation, it may take a longer time to pull images. You can add `--timeout 10m` to change the default timeout duration.

2. Label the nodes which can be assigned for jupyterhub servers

   ```
   kubectl label node component=singleuser-server --all
   ```

## Verify the Installation

1. Run this command to wait for PrimeHub ready

   ```
   kubectl -n hub rollout status deploy/primehub-console
   ```

2. Open `http://${PRIMEHUB_DOMAIN}` and log in by the admin username and password.

   ![](assets/install_primehub1.png)

3. Enter `Notebooks` for launching a JupyterHub.

## Apply License Key (Optional)

>By default, a trial license is applied. See [trial license limitations](../license).
>Please contact InfuseAI for the license inquiry for a valid commercial license.

If you have a valid license file from InfuseAI, run this command to apply a license key. 

```
kubectl -n hub apply -f path/to/license_key_yaml_file
```

You can check the license status from [System Management](../guide_manual/admin-system#primehub-license) in the admin dashboard.

## Troubleshooting

1. If there is something run when installing, you can check the bootstrap job log to see what's going on

   ```
   kubectl -n hub logs jobs/primehub-bootstrap
   ```

## New to PrimeHub

Initially, PrimeHub has a built-in *user* `phadmin`, a built-in *group* `phusers`, several *instance types*/*image* which are available to *Global* ready to use. `phadmin` can launch a notebook quickly by using these resources. 

Now PrimeHub CE is ready, see [Launch Notebook](../quickstart/launch-project) to launch your very first JupyterNotebook on PrimeHub. Also see [User Guide](../quickstart/login-portal-user) to have the fundamental knowledge of PrimeHub.