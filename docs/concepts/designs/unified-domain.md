---
id: unified-domain
title: Unified Domain
---
## Domain Name for Each Service

In the old design, each service use different domains. And the domain name is assigned according the parent domain `PH_DOMAIN`. So these two variables should defined in the `.env` file.


Release |Description | Example
--- | --- | ---
`PH_SCHEME` | The http scheme | `https`
`PH_DOMAIN` | The parent domain |  `example.com`

If the variables are set as the above example, we will get the service urls as below

Service | Url
--- | ---
keycloak | `https://id.example.com/auth`
hub | hub `https://hub.example.com/hub` <br> jupyter `https://hub.example.com/user/<name>`
primehub console | `https://admin.example.com`
maintenance notebook | `https://admin.example.com/maintenance`


> Actually, there are more specific environment variables (like `ADMIN_UI_DOMAIN`, or `HUB_UI_DOMAIN`), if these are not defined, system would use the above default logic.


## Unified Domain Name

The idea of unified domain name is to share a single domain for all integrated services. The url are moved to the sub-path of this unified domain. 

To enable unified domain, just define `PRIMEHUB_FEATURE_USER_PORTAL` in `.env`.

Release |App | Example
--- | ----- | ---
`PRIMEHUB_SCHEME` | The http scheme for this unified domain | `https`
`PRIMEHUB_DOMAIN` | The unified domain | `primehub.example.com`


The service url change to

Service | Url
--- | ---
hub | hub `https://primehub.example.com/hub` <br> jupyter `https://primehub.example.com/user/<name>`
primehub console | `https://primehub.example.com/admin`
maintenance notebook | `https://primehub.example.com/admin/maintenance`

## Keycloak Domain

Currently, keycloak is not added to unified domain because we allow an external keycloak installation. The domain name is still determined by parent domain `PH_DOMAIN`. Or more specificly, use the `KC_DOMAIN` to define.

Service | Url
--- | ---
keycloak | `https://id.example.com/auth`


## Migration

To migrate from shared parent domain to unified domain. Please do the following steps

1. Add `PRIMEHUB_FEATURE_USER_PORTAL=true`, `PRIMEHUB_DOMAIN=` and `PRIMEHUB_SCHEME=` to `.env`. 
2. Add new [Valid Redirect URIs](https://www.keycloak.org/docs/6.0/server_admin/index.html#oidc-clients) to all affected keycloak clients. (e.g. `admin-ui`, `jupyterhub`, `maintenance-proxy`)



