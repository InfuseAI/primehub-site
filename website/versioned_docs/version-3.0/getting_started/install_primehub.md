---
id: version-3.0-install_primehub
original_id: install_primehub
title: Install PrimeHub
---

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
`KEYCLOAK_DOMAIN` | The hostname of keycloak. It can be the same as primehub's one.
`KEYCLOAK_PASSWORD` | The master password of keycloak
`STORAGE_CLASS` | The storage class for persistence storage
`GRAPHQL_SECRET_KEY` | The graphql API secret key
`HUB_AUTH_STATE_CRYPTO_KEY` | The jupyterhub crypo key. Please reference the [z2jh document](https://zero-to-jupyterhub.readthedocs.io/en/latest/reference/reference.html#auth-state-cryptokey).
`HUB_PROXY_SECRET_TOKEN` | The jupyterhub secret. Please reference the [z2jh document](https://zero-to-jupyterhub.readthedocs.io/en/latest/reference/reference.html#proxy-secrettoken).

Modify the environment variables below and execute the commands to generate the value file.

```
PRIMEHUB_DOMAIN=1.2.3.4.nip.io
PRIMEHUB_PASSWORD=__my_password__
KEYCLOAK_DOMAIN=1.2.3.4.nip.io
KEYCLOAK_PASSWORD=__my_password__
STORAGE_CLASS=__storage_class__
GRAPHQL_SECRET_KEY=$(openssl rand -hex 32)
HUB_AUTH_STATE_CRYPTO_KEY=$(openssl rand -hex 32)
HUB_PROXY_SECRET_TOKEN=$(openssl rand -hex 32)

cat <<EOF > primehub-values.yaml
primehub:
  scheme: http
  domain: ${PRIMEHUB_DOMAIN}
  keycloak:
    scheme: http
    domain: ${KEYCLOAK_DOMAIN}
    username: keycloak
    password: ${KEYCLOAK_PASSWORD}
bootstrap:
  usernmae: phadmin  
  password: ${PRIMEHUB_PASSWORD}
graphql:
  sharedGraphqlSecret: ${GRAPHQL_SECRET_KEY}
groupvolume:
  storageClass: ${STORAGE_CLASS}
ingress:
  annotations:
    ingress.kubernetes.io/affinity: cookie
    kubernetes.io/ingress.class: nginx
  hosts:
  -  ${PRIMEHUB_DOMAIN}
jupyterhub:
  auth:
    state:
      cryptoKey: ${GRAPHQL_SECRET_KEY}
  hub:
    db:
      pvc:
        storageClassName: ${STORAGE_CLASS}
  proxy:
    secretToken: ${HUB_PROXY_SECRET_TOKEN}
  singleuser:
    storage:
      dynamic:
        storageClass: ${STORAGE_CLASS}
EOF
```
## Install

1. Run helm command to install primehub

   ```
   helm upgrade \
     --install \
     --reset-values \
     --create-namespace \
     --namespace hub  \
     --values primehub-values.yaml \
     primehub modules/charts/primehub
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

>By the default trial license, it doesn't allow to add new groups, instance types, images.
>If you don't have a valid license file. Please contact InfuseAI for the license inquiry.

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
