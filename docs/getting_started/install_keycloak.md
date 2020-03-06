---
id: install_keycloak
title: Install Keycloak
---

Here are the instructions to install keycloak in the cluster. We select *postgresql* as the persistence solution.

## Add the chart repository

```
helm repo add stable https://kubernetes-charts.storage.googleapis.com/
helm repo update
```

## Prepare the Value File

Prepare the value file `keycloak-values.yaml` for helm installation. 

Key | Description
----|------------------------------------
`KEYCLOAK_DOMAIN` | The domain of keycloak. Can be the same as primehub's one.
`KEYCLOAK_PASSWORD` | The master password of keycloak
`KEYCLOAK_DB_PASSWORD` | The db password of keycloak
`STORAGE_CLASS` | The storage class for the postgresql database

```
KEYCLOAK_DOMAIN=1.2.3.4.nip.io
KEYCLOAK_PASSWORD=__my_password__
KEYCLOAK_DB_PASSWORD=__my_password__
STORAGE_CLASS=<storage_class>

cat <<EOF > keycloak-values.yml
keycloak:
  ingress:
    enabled: true
    annotations:      
      kubernetes.io/ingress.class: nginx
      kubernetes.io/tls-acme: "true"    
      ingress.kubernetes.io/affinity: cookie
    hosts:
    - ${KEYCLOAK_DOMAIN}
    path: /auth
  username: keycloak
  password: ${KEYCLOAK_PASSWORD}
  persistence:    
    deployPostgres: true
    dbVendor: postgres
    dbPassword: ${KEYCLOAK_DB_PASSWORD}
postgresql:
  persistence:
    enabled: true
    storageClass: ${STORAGE_CLASS}
  postgresPassword: ${KEYCLOAK_DB_PASSWORD}
EOF
```

## Install

Run helm command to install keycloak

```
helm upgrade \
  --install \
  --reset-values \
  --namespace default  \
  --values keycloak-values.yaml \
  keycloak stable/keycloak
```

## Verify the Installation

1. After installation, run this command to check if keycloak is ready

   ```
   kubectl -n default rollout status sts/keycloak
   ```

1. Open `http://<keycloak-hostname>/auth`
1. Enter *Administrator Console* and log in by the username and password.

## Reference

- Keycloak Documentation: https://www.keycloak.org/documentation.html
- Keycloak Chart: https://github.com/helm/charts/tree/master/stable/keycloak
