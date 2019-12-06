---
id: version-2.1.0-changelog
title: Changelog
original_id: changelog
---

## Upcoming

- [Bug] Resource validator should check all container resource's usage #ch3414

### What's New

- **Custom Image:** Admin now can build images with custom packages which include APT, pip and conda.
- **Dataset Upload (Beta):** For a dataset with pv type, it can run a dataset upload server which allow resumable upgrade and disable upload progress.

### Breaking Changes

### Action Required

- Add the environment variables for image pull secret to `.env`

      ```
      PRIMEHUB_ADMISSION_DOCKER_USERNAME=
      PRIMEHUB_ADMISSION_DOCKER_PASSWORD=
      ```
  We use admission to check resources now. Therefore, need pull secret for the admission image.
  Please reference [admission document](docs/design/admission.md) for more detail.

- To enable Custom Image, you need to set `PRIMEHUB_FEATURE_CUSTOM_IMAGE=true` and it requires new environment variables:
  - `PRIMEHUB_CONTROLLER_CUSTOM_IMAGE_REGISTRY_ENDPOINT`: Registry endpoint (e.g. `https://gcr.io`)
  - `PRIMEHUB_CONTROLLER_CUSTOM_IMAGE_REGISTRY_USERNAME`: Registry username
  - `PRIMEHUB_CONTROLLER_CUSTOM_IMAGE_REGISTRY_PASSWORD`: Registry password
  - `PRIMEHUB_CONTROLLER_CUSTOM_IMAGE_REPO_PREFIX`: Prefix for image. (e.g. 'gcr.io/infuseai' for 'gcr.io/infuseai/primehub-controller:be20ee69c5')

### Deprecated

## v2.1.1

### Feature

- make dataset upload beta - #ch5084

### Bugfix

- When user logout and login again immediately, he will see error message. - #ch3045
- unable to remove logo from primehub admin console - #ch4668
- admin dashboard discard button doesn't work - #ch4392
- fix grafana dashboard logout issue - #ch4692

## v2.1.0

### What's New

The main themes of this release are:

- **User Portal (GA)**: A single user portal for user to access all the components and the admin console.
- **GPU/CPU Image selection**:  Admin can provide different image name for GPU/CPU
- **Dataset PVC Creation:** Support to create dataset PVC from admin console.
- **Dataset Upload (Beta):** For a dataset with pv type, it can run a dataset upload server which allow resumable upgrade and disable upload progress.
- **Meta Chart:** Since the 2.0 release, the meta chart is enabled by default. In release 2.1, the bootstrap script is run in the cluster and triggered when running helm install and upgrade.

### Breaking Changes

N/A

### Action Required

- Because `PRIMEHUB_FEATURE_USER_PORTAL` is enabled by default, there are some action required:
  - For default installation, the `PRIMEHUB_SCHEME`, `PRIMEHUB_DOMAIN`, `KC_SCHEME`, `KC_DOMAIN` is required environment now. For definition, please reference [configuration document](docs/administration/configuration.md)
  - modify keycloak client `grafana-proxy` redirect URIs to `https://<PRIMEHUB_DOMAIN>/grafana/*`
- Image has new spec attributes `type` and `urlForGpu` now, those two new attrs are used for seamlessly picking different image by type in spawner. For migrating existing images, please run `modules/upgrade/optional/add_gpu_cpu_type_to_images.sh`
- Set a new environment variable `PRIMEHUB_STORAGE_CLASS`. For rke installation, please set it to `rook-block`. For dev-gcp, set it to `standard`. For dev-gce, set it to `rook-block`. For dev-kind set it to `local-path`. It is the storage class setting for all RWO pvc usage.

### Features

- Make User portal as default landing page #ch2574
- admin-console should have a nav link back to portal #ch2859
- Add Grafana to default list of user portal #ch2981
- Adjust the application path #ch3495
- Make the banner consistence in the user portal and admin console #ch3498
- Unify primehub-console's navbar style #ch3498
- unified ingress: deprecate PH_DOMAIN #ch1727
- unified ingress: grafana #ch1725
- update checklist for PrimeHub installation #ch2937
- Tweaks for User Portal #ch2674
- remove deprecated variables #ch3772
- [Dataset] Admin Dashboard provides UI to create dataset pv-type pvc. #ch1794
- Move dataset upload chart to metachart. #ch3065
- In meta chart, use Job to perform idempotent upgrade #ch1238
- Add images type (gpu/cpu/universal) on images list page #ch3661
- Update image type wording `both` to `universal` #ch3393
- conditional spawner options for image and GPU/CPU #ch2642
- admin-ui support new ux-behavior to set up GPU/CPU in 1 image crd #ch2638
- set maintenance notebook files to read only #ch1920
- Make primehub-admission helm managed #ch1735
- parameterize primehub-admission by helm-chart #ch1749
- Refactor admission flask server #ch1909
- crd openapi schema #ch2370
- Support validation schema defined in the CRD (Image, InstanceType and Dataset) #ch2370
- Script to check if the service account token valid #ch3764
Workspace
- Provide a tool to detect and fix orphan mount & rbdmap #ch3460
- Create `ImageSpec` and `ImageSpecJob` CRD #ch3807    
- [Custom image v1] Evaluate Tekton pipelines for image building #ch3076
- [Custom image v1] Evaluate if metacontroller satisfy the operator needs #ch3086
- [Custom image v1] Setup Google container registry for storing built images #ch3083
- Design Training Job Submission MVP #ch2724
- Workspace: Admin Console UI Changes #ch1278

### Security 

- k8s CVE-2019-11253 mitigation and advisories #ch3808

### Bugfix

- [BUG] bootstrap image incompatible with the latest code (GPU, CPU feature) #ch3676
- [BUG] memory resource literal should convert to bytes #ch3956
- [Bug] 'feature/ch2436/provide-scripts-to-delete-orphan-user-group' break the ci job 'build:infra-upgrade-test-previous' #ch3701
- [Bug] Attributes in everyone group is removed after editing "Default User Volume Capacity" #ch3007
- [Bug] Default USER_PORTAL cause CI fail in infra-upgrade-test-previous #ch3934
- [Bug] If numeric password is not allowed in bootstrap #ch3339
- [Bug] Resource validator should check all container resource's usage #ch3414
- [Bug] The `make init` generated .env incorrect. #ch3213
- [Bug] User can't go to login page after logout from JupyterHub #ch2786
- [Bug] When admin updates group permissions for some instances & images, hub won't auto update for users #ch3041
- [Bug] When instance type set memory with fraction, cannot spawn #ch4082
- [Bug] When user choose a cpu or gpu instance, then choose the other instance of same type, the image list shouldn't be reset #ch3422
- [Bug] feature/ch2574/make-user-portal-default break the ci job 'build:infra-upgrade-test-latest' #ch3700
- [Bug] graphql-server should terminate when oidc refresh token fails #ch2358
- [Bug] kernel-gateway cannot see GPU device #ch3641
- [Bug] the volume size of pv dataset is incorrect in demo.b #ch3629
- [Bug] when user create an instance type without overcommitting values, and click the edit button again, it shouldn't show overcommitting enabled. #ch3649
- [Bug][CI][Kind] no instance type and image can be found #ch3991
- cloud provisioner - quota on everyone group #ch1957
- user portal broken after group removal #ch3003
- Reproduce the group volume migration issue and find the solution #ch3012  
- investigate dev-gcp's use of load balancer #ch3933

### Third Party

- Upgrade cert-manager #ch2673    
- Upgrade Grafana dashboard to 6.3.0 and support unified ingress #ch1725
- followup node-problem-detector #ch2088
- [gpu] a preview image contains nvdashboard plugin (predefine layout for UX) #ch3768
- Survey nvdashboard jupyter plugin #ch2220
    
### Document

- build docs and provide as help site as part of primehub installation #ch1746
- open source license files #ch2291
- [Doc] Update ZD PrimeHub Manual with conditional spawner scenario #ch3389
- [Doc] Update dataset page on ZD with two new features #ch2900
- Beta Features Policy (eg Dataset Upload) #ch3816
- Polish PrimeHub-Site to release-ready #ch2947
- Spec: Hub UI can show resources usage for users' group before launch #ch391
- Spec: design the architecture to integrate user portal, workspace, and application. #ch2976
- Write design document for dataset upload #ch2503
- Write document for primehub-ee metachart #ch2875

## v2.0.0

### Breaking Changes

- PrimeHub is managed by a single meta chart


### Action Required

- **[Downtime Required] Migrate to metachart.** Please follow the instructions in the [migration document to v2.0](modules/upgrade/migrate-v2.0.md)
- **Dataset PVC** Please configure `primehubGroupSC` at etc/helm_override/primehub.yaml. For example, set `standard` storage-class for GKE:
  ```yaml
  primehub-console:
    graphql:
      primehubGroupSC: standard
  ```
  The primehub-console needs a storage-class to create dataset pvc.

Change `starndard` to other pvc storage class if needed.
- [Optional] setup `PRIMEHUB_FEATURE_ENABLE_KERNEL_GATEWAY` flag to enable jupyter separated kernel feature
- [Optional] setup `PRIMEHUB_FEATURE_DATASET_UPLOAD` flag to enable dataset upload feature

### Deprecated

- **Configuration in `${primehub}/etc`**. Configuration files should locate in `~/.primehub/config/$(kubectl config current-context)` instead of `${primehub}/etc`. The preferred path can also by retrieved by the command `${primehub}/bin/phenv --path`. For more information, please see [customization document](concepts/designs/customization)


### Features

- [admin] Admin Dashboard provides UI to create dataset pv-type pvc. #ch1794
- [rke] Configure csr-approval feature enabled by default #ch1641
- [primehub] Make the meta chart the default installation #ch2096
  - [dev] Use metachart in dev-gce and dev-gcp installation. #ch2874
  - [airgap] Make sure metachart can be installed in airgap environment #ch2876

### Bugfix

- [admin] Attributes in everyone group is removed after editing "Default User Volume Capacity" #ch3007
- [hub] Bring scheduled-maintenance anti affinity back #ch2667
- [hub] Refresh user state after the administrator reconfigured settings #ch2676

### Documents

- [primehub] Update PrimeHub 2 migration documents to avoid lost role binding #ch3023
- [hub] Write a design document for persistence storage for notebooks #ch1119
- [admin] Write design document for graphql #ch1116

## v1.8.2

### Security

- [CVE-2019-9512] Upgrade nginx-ingress chart to 1.17.1 (app version 0.25.1)

## v1.8.1

### Bugfix

- Fix the issue that user can't launch instance when its CPU/memory requests are disabled. #ch2475
- Fix group sorting error in spawner page. #ch2471

## v1.8.0

### Action Required

- [Optional] Disable image and instance type customization
  Set env `READ_ONLY_ON_INSTANCE_TYPE_AND_IMAGE=true` will disable image and instance type customization.

- [Optional] For external keycloak installation, install `keycloak-tools` to enable keycloak idempotent upgrades.

  ```
  kubectl apply -f modules/bootstrap/keycloak-tools.yaml
  ```

- [Optional] Apply pod's image mutation

  Label any namespaces which want to apply pod's image replcaing. For example:

  ```
  kubectl label ns hub primehub.io/image-mutation-webhook=enabled
  ```

  In an airgap environment, that should be all namespaces.  This version, it keeps both PRIMEHUB_AIRGAPPED and image-mutation for backward compatible.

- [Optional] Portal Default Cover

  Since 1.8.0, we add serveral default cover images for portal link, you can override ui.portalConfig setup to use it:
    - Gitlab: `/admin/default-covers/gitlab.png`
    - Mattermost: `/admin/default-covers/mattermost.png`
    - Jupyter: `/admin/default-covers/jupyter.png`
  default portal setup in `modules/charts/primehub-console/values.yml`:
  ```
  portalConfig: |
    services:
      # Service portal setup example:
      # - name: Example
      #   uri: "https://example.com"
      #   image: "/admin/default-covers/default.png"
      #   adminOnly: true | false
      #- name: Gitlab
      #  uri: "https://gitlab.com/infuseai"
      #  image: "/admin/default-covers/gitlab.png"
      - name: JupyterHub
        uri: "/hub"
        image: "/admin/default-covers/jupyter.png"
      - name: Support
        uri: "https://infuseai.zendesk.com/hc/en-us"
        image: "/admin/default-covers/support.png"
      - name: JupyterHub Admin
        uri: "/hub/admin"
        adminOnly: true
        image: "/admin/default-covers/jh-admin.png"
      - name: Admin Dashboard
        uri: "/admin/cms"
        image: "/admin/default-covers/admin-ui.png"
        adminOnly: true
      - name: Maintenance Notebook
        uri: "/admin/maintenance"
        image: "/admin/default-covers/notebook.png"
        adminOnly: true
    welcomeMessage: >
  ```

### Features

- Add new icons in user portal. #ch1860
- Implement an operator to control dataset upload server. #ch1796
- Spawner UI will order instanceTypes & images options in alphabetical order. #ch1742
- Use PrimeHub logo in JupyterHub navbar and can be used to redirect to user portal. #ch1740
- Support feature toggling infrastructure to provide an alternative to maintaining multiple source-code branches. #ch1675
- Add new template condition for readonly image and instanceType. #ch1595
- Design document for JupyterHub integration. #ch1114
- User won't be stuck in spawning page when resources is not enough. #ch1020
- Support idempotent bootstrap and upgrade for external keycloak setup.

### Bugfix

- Fix out of range issue when resizing user volume. #ch2125
- Fix missing space issue in "connect existing groups" button. #ch2070
- Fix deprecated fields in z2jh to avoid warning and provide forward compatibility. #ch231
- Fix the issue that group loading too long if there are too many users. !453
- Fix unexpected error when user without any dataset in launch group. !445
- Fix user storage capacity unit. !440
- Fix typo of terraform load module. !437

## v1.7.0

- Fix missing change image.txt !421
- Bump admin-notebook version with user and group cleanup !420
- Speed up OSD backfill !419
- Fix jupyterhub chart uses wrong image for airgap !418
- Remove skip deps for old helmfile !417
- Fix ci docker version !415
- Write design document for CRDs !414
- Refine primehub version provides way !413
- Support admission hook
- Rewrite template logics !411
- K8S ca signer checker !410
- Use feature flag to support old convention for group volume !407
- Update notebook image tag and move some fixed config into admin notebook image !406
- Add ansible playbook for migrate aia bluestore !405
- Add User portal mvp admin shows regular user !404
- Unify admin hub ingress !402
- Fix: launchGroupOnly should work for each type !401

### Breaking Changes

- Replace admin-ui with primehub-console
- Unify domain name

### Action Required

- **[Downtime Required] Migrate primehub-groupvolume.**

  After upgrade v1.7.0 primehub-groupvolume, need to run migration script to migrate exist project-volume and dataset-volume.
  
  After migrating primehub-groupvolume until running the migration process, user pod can not access the data in project and dataset volume.

  For the production environment, it's better to schedule downtime upgrade with customer, or we need to let customer known user will encounter data access error during the upgrade process.

  - RKE environment will run `rke_migration.sh` script for migration or follow the migration process provided in `READMD.md`.
  - GKE environment will run `gke_migration.sh` script for migration.
  (See `modules/primehub-groupvolume-nfs/README.md` for more info.)

- **Migrate admin-ui to primehub-console**

  1. Add the environment variables for image pull secret to `.env`

      ```
      PRIMEHUB_CONSOLE_DOCKER_USERNAME=
      PRIMEHUB_CONSOLE_DOCKER_PASSWORD=
      ```

      The value can be found from 

      ```
      kubectl -n primehub get secret gitlab-registry -o jsonpath='{.data.\.dockerconfigjson}' | base64 --decode | jq .
      ```

  2. Add the helm override yaml.

      Old sample (admin-ui.yaml):
    
      ```yaml
      primehub:
        keycloakUrl: https://id.example.com/auth
        adminLocale: en
        adminUrl: https://example.com/admin
        appPrefix: /admin
        crdNamespace: hub
      ```
    
      Should migrate to new one (primehub-console.yaml):
    
      ```yaml
      keycloak:
        url: https://id.example.com/auth
    
      ui:
        locale: en
        url: https://example.com/admin
        appPrefix: /admin
    
      graphql:
        crdNamespace: hub
      ```
    
      Before install primehub-console, you should remove old admin-ui release:
    
      ```
      helm del --purge admin-ui
      ```

- [Optional] User portal page
  1. `PRIMEHUB_FEAURE_USER_PORTAL=true` will enable universal landing page for PrimeHub users.
  2. You can setup items link and welcome messages on landing page in primhub-console.yaml:
  ```yaml
  ...
  ui:
    ...
    portalConfig: |
      services:
        - name: Google
          uri: "https://www.google.com"
          image: "https://www.google.com.tw/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        - name: GitLab
          uri: "https://gitlab.com"
          image: "https://shiring.github.io/tutorials/2017/09/04/GitLab_logo.png"
        - name: JupyterHub
          uri: "https://hub.aaron.dev.primehub.io"
          image: "https://cdn-images-1.medium.com/max/2400/1*m87_Htb_9Pstq0UcvNJ49w.png"
        - name: Admin Dashboard
          uri: "/cms"
          adminOnly: true
          image: "https://raw.githubusercontent.com/InfuseAI/primehub/master/docs/media/logo.png"
        - name: Maintenance Notebook
          uri: "/maintenance"
          adminOnly: true
          image: "https://raw.githubusercontent.com/InfuseAI/primehub/master/docs/media/logo.png"
      welcomeMessage: >
        <h1>Getting Started</h1>
        <div>End of Lines</div>
  ```

- [Optional] Migrate to unified domain name

  1. Add `PRIMEHUB_FEATURE_USER_PORTAL=true`, `PRIMEHUB_DOMAIN=` and `PRIMEHUB_SCHEME=` to `.env`. 
  2. Add new [Valid Redirect URIs](https://www.keycloak.org/docs/6.0/server_admin/index.html#oidc-clients) to all affected keycloak clients. (e.g. `admin-ui`, `jupyterhub`, `maintenance-proxy`)
  3. For more information, please see [User Portal](concepts/designs/user-portal)

## v1.6.0

 - Fixed Bug: metacontroller primehub-group nfs pvc deletion (reproduce) [ch378]
 - Fixed cpu limits configured in group quota are not effective [ch423]
 - Fixed User can't spawn pod because volume manager try to chown everything [ch728]
 - Implement the single upgrade script for PrimeHub [ch294]
 - JupyterLab 404 message patch [ch341]
 - Group volume size & options [ch361]
 - Support Image Pull Secret for Images [ch362]
 - Users in everyone group has no quota by default [ch497]
 - Helm chart for maintenance notebook environment. [ch557]
 - Upgrade nginx-ingress chart to 1.6.16 and increase client-header-buffer-size to 16k [ch708]
 - Implement dataset `launchGroupOnly` in JupyterHub spawner [ch710]
 - Support Maintenance notebook feature. [ch711]
 - Patch rke nginx-ingress configMap [ch713]
 - nvidia-gpu-device-plugin has too small memory limit [ch419]

### Action Required

- In order to make [primehub-admin-notebook](https://github.com/infuseai/primehub-admin-notebook) to work properly,
  You'll have to increase the `client_header_buffer_size` of your nginx-ingress up to `16k`.
  (See `modules/charts/nginx-ingress.yaml` for example.).

  For rke, this change need patch nginx-ingress config map, please run the following command:

  ```
  kubectl -n ingress-nginx patch cm nginx-configuration --type merge -p '{"data":{"client-header-buffer-size":"16k"}}'
  ```

- The system group (`everyone`) now has resource limit by default. In previous version, everyone group has unlimited resource limits. They are now set to `0` by default. If you want to adopt this behavior when upgrading, please source your env file and run `modules/upgrade/optional/kc_everyone_group_default_limit.sh` to apply.

- Groups now have options to enable shared volume (project group) and set volume capacity on Admin UI. In previous version, project groups depend on naming convention that group name starts with `Project-`. To migrate existing project groups to new ones with options, please source your env file and run `modules/upgrade/optional/kc_group_volume_migration.sh`. The migration script will rename existing project groups to remove the prefix `Project-`, so please check if there is any group name conflict by running `modules/upgrade/optional/kc_check_group_names_conflict.sh`.

  - To keep using legacy project group naming convention, do NOT run `modules/upgrade/optional/kc_group_volume_migration.sh` and need to add `SUPPORT_OLD_GROUP_VOLUME_CONVENTION=true` to your env file. This flag will be applied when you upgrade hub.

- Dataset now has option `Launch Group Only` and will display `Mount Root` on Admin UI. To migrate existing datasets, please run `modules/upgrade/optional/add_mount_root_to_datasets.sh`.

### Deprecated

- Project group naming convention is deprecated. Use group options to enable shared volume instead of naming group starts with `Project-`.

---
## v1.5.0

- Minimum autoscaling support [[ch73](https://app.clubhouse.io/infuseai/story/73)]
- map keycloak superuser role to jupyterhub admin [[ch65](https://app.clubhouse.io/infuseai/story/65)]
- Improve JupyterLab UX on reconnect and server stop [[ch42](https://app.clubhouse.io/infuseai/story/42)]
- Reorg kubectl plugins [[ch130](https://app.clubhouse.io/infuseai/story/130)]
- Script to create/delete keycloak user for hub load testing [[ch169](https://app.clubhouse.io/infuseai/story/169)]
- Implement the single upgrade script for PrimeHub [[ch294](https://app.clubhouse.io/infuseai/story/294)]
- Planning for cuda10/nvidia410 and tf-2.0 tests [[ch70](https://app.clubhouse.io/infuseai/story/70)]  [!302](https://gitlab.com/infuseai/primehub/merge_requests/302)
- Adjust default JupyterPageSlow alert rules [[ch166](https://app.clubhouse.io/infuseai/story/166)] [!304](https://gitlab.com/infuseai/primehub/merge_requests/304)
- Setup stable demo environment for potential clients [[ch66](https://app.clubhouse.io/infuseai/story/66)]
- Replace minikube with KIND in CI [[ch68](https://app.clubhouse.io/infuseai/story/68)]
- Add unit test to our CI [[ch312](https://app.clubhouse.io/infuseai/story/312)]
- Basic auto deploy demo hub [[ch67](https://app.clubhouse.io/infuseai/story/67)]
- Setup g suite oauth <-> b.demo [[ch136](https://app.clubhouse.io/infuseai/story/136)]
- In hub config, singleuser.nodeSelector is not working [[ch145](https://app.clubhouse.io/infuseai/story/145)]
- Remove `Stop My Server` button in control panel after server stopped [[ch259](https://app.clubhouse.io/infuseai/story/259)]
- JupyterLab UI is not rendering properly on JupyterHub 1.0 [[ch128](https://app.clubhouse.io/infuseai/story/128)]
- Group name should not be editable. bump admin-ui to v2.8.2 [!294](https://gitlab.com/infuseai/primehub/merge_requests/294) [canner-admin-ui#104](https://gitlab.com/infuseai/canner-admin-ui/issues/104)

### Action Required

1. After install helm-managed, also run the upgrade
`make primehub-upgrade`
2. To use the kubectl plugins, set the `$PRIMEHUB_HOME/bin` in the PATH environment variables or copy binaries inside to where the env `$PATH` can resolve it. Here are the kubectl plugins provided

        # shortcut to run ceph command
        kubectl ceph 
        # shortcut to run rbd command
        kubectl rbd
        # wrapper of kubectl scale
        kubectl stasis
        # force delete
        kubectl fdelete

3. The nvidia memory limit changes. Please increase memory for nvidia device plugin

        kubectl apply -f modules/nvidia/device-plugin/nvidia-device-plugin.yaml

---
## v1.4.0

- Adjust group user volume capacity logic (min -> max) #457
- Fix the Gitlab CI to upgrade the kubernetes version #456
- Modify monitoring script for check_node_cordoned not always throw alert #455
- Limit user process and other resources that might be harmful to node #454
- Show primehub version in hub launch page #453
- Initial PrimeHub chart phase1 #452
- The docker registry should not be stored at the tmp folder #451
- Add merge request template #449
- KC password cannot be a number #448
- Cpu limit issue on demo hub #447
- [CVE-2019-9946] Upgrade kubernetes to 1.12.7 #446
- [CVE-2019-10255] Upgrade JupyterHub to 0.9.6 #445
- [CVE-2019-1002101] Upgrade kubectl binary to 1.12.7 #444
- Full cluster shutdown script for rook 0.9 #443
- Unifying user volume capacity keys #441
- Full cluster shutdown for rook 0.9.x #440
- Reorg kubectl plugins #439
- Rsync script for gitsync operation #430

---
## v1.3.0
Al hail Himalaya!

- Set TZ env for user notebook #396
- Make sure group volume works when default storage class is set #170 stage/qa
- Install Tensorboard-enabled image to Demo Hub #259
- Grafana dashboard for jupyterhub #271
- Backup script for group volume #346
- [CVE-2019-1002101] Upgrade kubetctl binary to 1.12.7 #444
- Failed to install nvidia-driver in airgap #429
- User quota bug in admin UI #194
- Make disable_cfs_quota as default in kubelet #433
- Improve keycloak backup/restore #395
- Ceph metadata device on VG #401
- Set rook-block sc default reclaim policy to Retain #432
- Don't override the image in helm value for non-airgapped setting #417
- Cleanup for modules/support #416
- Fix dev-gce Makefile for new installer #414
- Ensure dev-gce install in airgap #406
- Automate dev-gce airgap environment setup #403
- Install Tensorboard-enabled image to Demo Hub #259
- Remove public keys from repo #415

### Action Required

- Migratie Keycloak client jupyterhub mapper by running the migration script

        ./modules/bootstrap/kc_migration.sh

- Migrate group volume nfs metacontroller

        ./modules/primehub-groupvolume-nfs/upgrade.sh

- upgrade kubectl to 1.12.7. copy `./bin/kubectl` to $PATH
- upgrade k8s to 1.12.7. Please following the steps
    1. edit rke configuration file `cluster.yml`
    2. Add a `system_images.kubernetes` to ` rancher/hyperkube:v1.12.7-rancher1` and don't change the `kubernetes_version`

            kubernetes_version: v1.12.4-rancher1-1    <--- leave v1.12.4. This is used for rke
            system_images:
              etcd: rancher/coreos-etcd:v3.2.24
              kubernetes: rancher/hyperkube:v1.12.7-rancher1    <-----    
              alpine: rancher/rke-tools:v0.1.16
              nginx_proxy: rancher/rke-tools:v0.1.16

    3. do the `rke up`


---
## v1.2.0

- Group volume (metacontroller) does not work in dev-gce [#383](https://gitlab.com/infuseai/primehub/issues/383) type/bug
- HOWTO document for add/remove nodes and change the controlplane node [#382](https://gitlab.com/infuseai/primehub/issues/382)
- EFK should only save hub & jupyter logs with log level ≥ warning [#378](https://gitlab.com/infuseai/primehub/issues/378)
- Dataset refresh should not require restarting server [#354](https://gitlab.com/infuseai/primehub/issues/354) type/bug
- Upgrade rook 0.9.1 [#344](https://gitlab.com/infuseai/primehub/issues/344)
- Test rook bluestore layout for mixed devices [#316](https://gitlab.com/infuseai/primehub/issues/316)
- Survey how to remove a ceph node from cluster [#386](https://gitlab.com/infuseai/primehub/issues/386)
- Upgrade docker for security [#404](https://gitlab.com/infuseai/primehub/issues/404)
- Airgap image push script should stripe shasum [#405](https://gitlab.com/infuseai/primehub/issues/405)
- Dev-gce one command setup script [#399](https://gitlab.com/infuseai/primehub/issues/399)
- Full shutdown/restart script [#361](https://gitlab.com/infuseai/primehub/issues/361)
- Remove ansible templates from ansible "release builder" role [#319](https://gitlab.com/infuseai/primehub/issues/319)
- Refine helmfile process for downloaded charts in airgapped mode [#297](https://gitlab.com/infuseai/primehub/issues/297)
- Per-node upgrade helper [#250](https://gitlab.com/infuseai/primehub/issues/250)
- Survey how to add/remove/manage etcd by rke [#385](https://gitlab.com/infuseai/primehub/issues/385)

---

## v1.1.0

- Jupyter-notebook setup have pip timeout issue when enable network policy [#392](https://gitlab.com/infuseai/primehub/issues/392)
- Upgrade kibana to 6.5.1 [#391](https://gitlab.com/infuseai/primehub/issues/391)
- Tensorboard start-notebook-d conflict with network policy [#390](https://gitlab.com/infuseai/primehub/issues/390)
- Remove not being referenced anymore files in installer/skeleton/ [#388](https://gitlab.com/infuseai/primehub/issues/388)
- Allow multiple login actions for newly created users [#384](https://gitlab.com/infuseai/primehub/issues/384)
- Lock EFK chart version [#371](https://gitlab.com/infuseai/primehub/issues/371)
- Add `make install-required-ansible-roles` back [#366](https://gitlab.com/infuseai/primehub/issues/366)
- Prometheus-node-exporter does not have resources requests/limits [#353](https://gitlab.com/infuseai/primehub/issues/353)
- Investigate better way to do nvidia.com/gpu: 0 [#352](https://gitlab.com/infuseai/primehub/issues/352)
- Default nodeSelector for fluentd [#349](https://gitlab.com/infuseai/primehub/issues/349)
- Fixed tensorboard serverextension is not correctly set up. [#339](https://gitlab.com/infuseai/primehub/issues/339)
- Correct namespace of primehub-groupvolume-nfs [#338](https://gitlab.com/infuseai/primehub/issues/338)
- Test upgrade path to kubernetes 1.12 [#335](https://gitlab.com/infuseai/primehub/issues/335)
- Show GPU utilization information from dashboard [#318](https://gitlab.com/infuseai/primehub/issues/318)
- Improve pod-level OOM behaviour [#317](https://gitlab.com/infuseai/primehub/issues/317)
- Installer should use downloaded helm binary to pull the remote helm chart [#311](https://gitlab.com/infuseai/primehub/issues/311)
- Keycloak image not overridden with airgap [#310](https://gitlab.com/infuseai/primehub/issues/310)
- Lock prometheus chart version [#304](https://gitlab.com/infuseai/primehub/issues/304)
- Custom search for KeyCloak events in Kibana [#296](https://gitlab.com/infuseai/primehub/issues/296)
- Calico should only throw log with level >= warning [#295](https://gitlab.com/infuseai/primehub/issues/295)

---

## v1.0.0

- Update kubernetes to 1.10.11 for rke install. CVE-2018-1002105 (#300)
