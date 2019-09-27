---
id: version-2.0.0-migrate-v2
title: Migration to v2.0
original_id: migrate-v2
---


From PrimeHub 2.0, there are some breaking changes

1. All the PrimeHub chart is managed by a single metachart (a.k.a [umbrella chart](https://github.com/helm/helm/blob/master/docs/charts_tips_and_tricks.md#complex-charts-with-many-dependencies)). That is, `primehub-prerequisite`, `hub`, `primehub-console`, `admin-notebook` become a subchart of primehub. However, keycloak is still a standalone chart. The below is the comparison of the helm list result in 1.x and 2.x. 

   v1.x
   
    ```
    $ helm ls
    NAME                      REVISION  STATUS     CHART                         NAMESPACE
    keycloak                  131       DEPLOYED   keycloak-3.1.0                default    
    admin-notebook            119       DEPLOYED   admin-notebook-0.1.0          primehub
    hub                       219       DEPLOYED   jupyterhub-0.9-dev            hub
    primehub-console          67        DEPLOYED   primehub-console-0.1.0        primehub
    primehub-prerequisite     167       DEPLOYED   primehub-prerequisite-0.1.0   primehub
    ```
    
   v2.0
   
    ```
    $ helm ls
    NAME            REVISION  STATUS     CHART              NAMESPACE
    keycloak        1         DEPLOYED   keycloak-3.1.0     default
    primehub        1         DEPLOYED   primehub-0.1.0     hub
    ```

1. The original helm value for each chart would moved to their own key respectively. 

   ```
   # <config_path>/helm_override/primehub.yaml
   primehub-prerequisite:
     ...
   jupyterhub:
     ...
   primehub-console:
     ...
   admin-notebook:
     ...     
   ```
       
1. Primehub console and admin notebook are moved to `hub` namespace
1. In terms of helmfile, the app label of keycloak changes from `app=primehub` to `app=keycloak`. All helmfiles for old charts are removed.


## Migration Steps

1. Backup keycloak data.

    1. Open keycloak
    1. Select the realm. default is `Primehub`
    1. Turn on `Export groups and roles`
    1. Export

1. Make sure all jupyter servers are down

   ```
   kubectl -n hub delete pod -l component=singleuser-server
   ```
   
1. Backup all the custom resources

    ```
    kubectl -n hub get images -o yaml > images.yaml
    kubectl -n hub get datasets -o yaml > datasets.yaml
    kubectl -n hub get instancetypes -o yaml > instancetypes.yaml
    ```
    
1. For shared keycloak (external keycloak) clusters, please add these two setting to `.env`. (for keycloak `https://id.mydomain.com/auth/`)

   ```
   KC_SCHEME=https
   KC_DOMAIN=id.mydomain.com
   ```
   
1. Merge old `helm_overrides/xxx.yaml` to `helm_overrides/primehub.yaml`. There is a script to do this.

   ```
   modules/upgrade/migrate-v2.0/merge-helm-override.sh <path-to-helm-override>
   ```   

1. Remove old releases

   ```
   helm delete primehub-console --purge
   helm delete hub --purge
   helm delete admin-notebook --purge
   ```

   Wait until `primehub-console-watcher` pod is deleted

   ```
   kubectl -n primehub get pods -l app.kubernetes.io/name=primehub-console-watcher
   ```

   Delete `primehub-prerequisite`

   ```
   helm delete primehub-prerequisite --purge
   ```

1. Install new primehub by metachart

    ```
    make primehub-upgrade
    ```
    
    > The reason why we don't use `make primehub-install` is this command would recreate default objects
    
1. Restore the custom resources

   ```
   kubectl apply -f images.yaml
   kubectl apply -f datasets.yaml
   kubectl apply -f instancetypes.yaml
   ```
    