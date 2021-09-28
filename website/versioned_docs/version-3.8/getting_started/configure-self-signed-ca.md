---
original_id: configure-self-signed-ca
id: version-3.8-configure-self-signed-ca
title: Setup Self-Signed Certificate for PrimeHub
description: Setup Self-Signed Certificate for PrimeHub
sidebar_label: Self-Signed Certificate
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

In certain scenarios we may want to use self-signed certificate HTTPS. For example, in private network or corporation network.

This document explains how to setup self-signed certificate for PrimeHub.

## Prerequisite

To enable this feature, you need to make sure:

1. Keycloak version ≥ 8.0
2. PrimeHub version ≥ 3.1
3. Your Keycloak is installed in the same Kubernetes cluster with PrimeHub so they can talk with each other using in-cluster connections.

## Self-Signed Certificate

### Generation

Create a config file for openssl named `selfsigned.cnf`. Please make sure to replace the `YOUR_DOMAIN_NAME` field with the domain name you want to use.

```bash
prompt             = no
distinguished_name = req_dn
x509_extensions = x509_ext

[ req_dn ]

commonName = YOUR_DOMAIN_NAME

[ x509_ext ]

subjectAltName = @alt_names

[alt_names]
DNS.1 = YOUR_DOMAIN_NAME
```

Generate a self-signed certificate using the following command:

```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout selfsigned.key -out selfsigned.crt -config selfsigned.cnf
```

Modify the file permission for latter use.

```bash
sudo chmod 644 selfsigned.*
```

### Create A Secret For Nginx-Ingress-Controller

Create a TLS from our certificate and key files.

You may need to manually create the `hub` namespace before PrimeHub installation.

```bash
kubectl -n hub create secret tls selfsigned-tls --key selfsigned.key --cert selfsigned.crt
```

## Trust Self-Signed Certificate on Node

Execute following steps to trust your self-signed certificate on your node for latter use.

```bash
sudo mkdir -p /usr/local/share/ca-certificates/primehub
sudo cp selfsigned.crt /usr/local/share/ca-certificates/primehub/
sudo update-ca-certificates
```

## Configure

### Nginx-Ingress TLS Setting

Add the following ingress setting to your helm overrides. Including these components.

You can also refer to the [nginx-ingress documentation](https://kubernetes.github.io/ingress-nginx/user-guide/tls/).

#### PrimeHub

Including these ingresses:

- primehub-admin-notebook
- primehub-console
- primehub-graphql
- primehub-jupyterhub
- keycloak (installed via PrimeHub chart)

```yaml
# helm_override/primehub.yaml
ingress:
  annotations:
    kubernetes.io/tls-acme: "false"
  tls:
  - hosts:
    - YOUR_DOMAIN_NAME
    secretName: selfsigned-tls
```

### Keycloak

#### Keycloak Service URL Setting (Optional)

>Please notice that if you install a standalone Keycloak by using Keycloak chart instead of the one installed during PrimeHub installation, then you need to have a proper TLS.

Set `KC_SVC_URL` in your `.env` file to activate internal connection.

Please note which namespace your Keycloak locates. e.g. `http://keycloak-http.<namespace>/auth`.

```bash
# .env  namespace: default
KC_SVC_URL=http://keycloak-http.default/auth

#Use the following if your Keycloak installed in the `hub` namespace
#KC_SVC_URL=http://keycloak-http.hub/auth
```

#### helm_override/keycloak.yaml

>If you installed Keycloak by using Keycloak chart, then you need to configure Keycloak ingress to use self-signed certificate. If you install Keycloak via PrimeHub chart then there's no extra configuration needed.

```yaml
# helm_override/keycloak.yaml
keycloak:
  ingress:
    annotations:
      kubernetes.io/tls-acme: "false"
    tls:
    - hosts:
      - YOUR_DOMAIN_NAME
      secretName: selfsigned-tls # Note if your Keycloak using other domain & tls
```

#### Grafana

```yaml
# helm_override/prometheus.yaml
grafana:
  enabled: true
  ingress:
    annotations:
      kubernetes.io/tls-acme: "false"
    tls:
    - hosts:
      - YOUR_DOMAIN_NAME
      secretName: selfsigned-tls
```

With these settings, you can proceed PrimeHub installation and it should be working. Don't forget to trust your self-signed certificate in your browser.
