---
id: install_primehub
title: Install PrimeHub
---

Before installing PrimeHub, please make sure you have the PrimeHub release tarball. 

```
tar -zxvf primehub-vx.x.x.tar.gz
cd primehub-vx.x.x
```

## Prepare the Value File

Prepare the value file `primehub-values.yaml` for helm installation. 

Key | Description
----|------------------------------------
`PRIMEHUB_DOMAIN` | The domain name of keycloak. Can be the same as primehub's one.
`PRIMEHUB_PASSWORD` | The password for primehub admin. (The default username of admin is `phadmin`)
`KEYCLOAK_DOMAIN` | The hostname of keycloak. Can be the same as primehub's one.
`KEYCLOAK_PASSWORD` | The master password of keycloak
`STORAGE_CLASS` | The storage class for persistence storage
`GRAPHQL_SECRET_KEY` | The graphql API secret key
`HUB_AUTH_STATE_CRYPTO_KEY` | The jupyterhub crypo key. Please reference the [z2jh document](https://zero-to-jupyterhub.readthedocs.io/en/latest/reference/reference.html#auth-state-cryptokey).
`HUB_PROXY_SECRET_TOKEN` | The jupyterhub secret. Please reference the [z2jh document](https://zero-to-jupyterhub.readthedocs.io/en/latest/reference/reference.html#proxy-secrettoken).

```
PRIMEHUB_DOMAIN=1.2.3.4.nip.io
PRIMEHUB_PASSWORD=__my_password__
KEYCLOAK_DOMAIN=1.2.3.4.nip.io
KEYCLOAK_PASSWORD=__my_password__
STORAGE_CLASS=__storage_class__
GRAPHQL_SECRET_KEY=$(openssl rand -hex 32)
HUB_AUTH_STATE_CRYPTO_KEY=$(openssl rand -hex 32)
HUB_PROXY_SECRET_TOKEN=$(openssl rand -hex 32)

cat <<EOF > primehub-values.yml
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
jupyterhub:
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

1. Run helm command to install keycloak

   ```
   helm upgrade \
     --install \
     --reset-values \
     --namespace hub  \
     --values primehub-values.yaml \
     primehub modules/charts/primehub
   ```

   > In the first time installation, it may take longer time to pull image. You can add `--timeout 1800` to change the default timeout duration.

2. Label the nodes which can be assignned for jupyterhub servers

   ```
   kubectl label node component=singleuser-server --all
   ```

## Verify the Installation

1. Run this command to wait for PrimeHub ready

   ```
   kubectl -n hub rollout status deploy/primehub-console
   ```

2. Open `http://${PRIMEHUB_DOMAIN}` and login by the admin username and password.
3. Open [Jupyterhub] icon and spawn a jupyter instance.

## Troubleshooting

1. If there are something run when installing, you can check the bootstrap job log to see what's going on

   ```
   kubectl -n hub logs jobs/primehub-bootstrap
   ```