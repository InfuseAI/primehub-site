---
id: version-2.0.0-rc.1-user-portal
title: User Portal
original_id: user-portal
---

Provide a single portal for users to access all the PrimeHub services.

## Configuration

Please add these variables to the `.env` file

Release |App
--- | ----- 
`PRIMEHUB_FEATURE_USER_PORTAL` | `true` to enable the feature flag to enable the user portal feature |
`PRIMEHUB_SCHEME` | The scheme for user portal
`PRIMEHUB_DOMAIN` | The domain for user portal
`KC_SCHEME` | The scheme for keycloak
`KC_DOMAIN` | The domain for keycloak

## Migration
If user portal is enabled, all the services (except keycloak) use the single domain. In terms of migration from the to a unified domain, please follow the instructions

1. Add these variables to `.env`

   ```
   PRIMEHUB_FEATURE_USER_PORTAL=true
   PRIMEHUB_SCHEME=
   PRIMEHUB_DOMAIN=
   KC_SCHEME=
   KC_DOMAIN=
   ```

1. Add new [Valid Redirect URIs](https://www.keycloak.org/docs/6.0/server_admin/index.html#oidc-clients) to all affected keycloak clients. (e.g. `admin-ui`, `jupyterhub`, `maintenance-proxy`)


## Domain Names

In old design, each service use different sub-domains under a single parent domain. And the domain name is assigned according the parent domain `PH_DOMAIN`. 

If user portal is enabled, all services are under `PRIMEHUB_DOMAIN` and keycloak is under `KC_DOMAIN`

### Early Design

Service | Url
--- | ---
JupyterHub | `https://hub.${PH_DOMAIN}/hub`
Admin Dashboard | `https://admin.${PH_DOMAIN}/cms`
Maintenance Notebook | `https://admin.${PH_DOMAIN}/maintenance`
Keycloak | `https://id.${PH_DOMAIN}/auth`


### New Design

Service | Url
--- | ---
User Portal | `https://${PRIMEHUB_DOMAIN}/`
JupyterHub | `https://${PRIMEHUB_DOMAIN}/hub`
Admin Dashboard | `https://${PRIMEHUB_DOMAIN}/admin`
Maintenance Notebook | `https://${PRIMEHUB_DOMAIN}/admin/maintenance`
Keycloak | `https://${KC_DOMAIN}/auth`


