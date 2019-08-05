---
id: howto1
title: HOWTO Backup Keycloak Data 
---
## Steps

1. Go to primehub keycloak module

        cd primehub/modules/keycloak

2. Check keycloak is running

        $ kubectl get pod -n default

3. Perform backup dump

        $ kubectl exec -ti keycloak-0 -- bash -c "cd /opt/jboss/keycloak; $(cat export-cmd.sh)"

    wait until you see the "service started" message:

        [org.jboss.as] (Controller Boot Thread) WFLYSRV0025: Keycloak 4.1.0.Final (WildFly Core 3.0.8.Final) started in 25686ms - Started 546 of 882 services (604 services are lazy, passive or on-demand)

    ![](/img/Untitled-9eb1beac-11d2-4be8-abf6-ed05d445b3d6.png)

4. hit Ctrl-C to break the exec. your data is located inside `keycloak-0` pod under `/tmp/keycloak-export`. how actually retrieve them:

        kubectl cp keycloak-0:/tmp/keycloak-export /tmp/keycloak-export-$(date +%F)

5. the backup is now in `/tmp/keycloak-export-$(date +%F)`

        ls -al /tmp/keycloak-export-2019-01-25/
        total 116
        drwxr-xr-x.  2 phuser phuser   114 Jan 25 06:20 .
        drwxrwxrwt. 12 root   root    4096 Jan 25 06:23 ..
        -rw-rw-r--.  1 phuser phuser 51646 Jan 25 06:20 master-realm.json
        -rw-rw-r--.  1 phuser phuser   887 Jan 25 06:20 master-users-0.json
        -rw-rw-r--.  1 phuser phuser 52761 Jan 25 06:20 primehub-realm.json
        -rw-rw-r--.  1 phuser phuser  3740 Jan 25 06:20 primehub-users-0.json

## Restore (Import)

1. Open the keycloak and sign in `https://<keycloak-domain>/auth/admin/`
2. Add new  realm，and click the import，`primehub-realm.json`

    ![](/img/30a036c3-5124-4312-a14f-495a765e86a1untitled.png)

3. Or in the side menu, select [Import] to import `primehub-user-xxx.json`

    ![](/img/99ef4b0e-d911-46ad-aac1-2ac49d3f7088untitled.png)
