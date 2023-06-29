---
id: version-3.8-install_primehub
title: Install PrimeHub Enterprise
description: Install PrimeHub Enterprise
sidebar_label: Install PrimeHub EE
original_id: install_primehub
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
</div>

>Check the [prerequisites](prerequisites) for PrimeHub first before preceding to the PrimeHub installation.

The document assumes there is a PrimeHub-ready-Kubernetes already and will guide you how to install **PrimeHub EE (Trial license)** by **primehub-install**. The steps below are performed against the cluster.

## Prepare the environment variables

Prepare the variables before installation

Key | Description | Example value
----|-------------| ----
`PRIMEHUB_DOMAIN` | The domain name of PrimeHub which user can access to. | `example.primehub.io`
`PH_PASSWORD` | PrimeHub admin `phadmin` default password| `yourDefaultPassw0rd`
`KC_PASSWORD` | Keycloak admin `keycloak` default password | `yourDefaultPassw0rd`


## Clone PrimeHub Repository

```bash
git clone https://github.com/InfuseAI/primehub.git
```

## Validate the primehub-install command is executable

```bash
./primehub/install/primehub-install
```

You should see the usage message like this:
```bash
USAGE:
  primehub-install create  singlenode  [options]            : Create single-node k8s environment
  primehub-install status  singlenode                       : Show the statuse of single-node k8s environment
  primehub-install destroy singlenode                       : Destroy single-node k8s environment
...
```

## Install PrimeHub required binaries

```bash
./primehub/install/primehub-install required-bin
```

This will install the required commands onto `~/bin`. You should append the `~/bin` to your `PATH` variables, or use the following command to append and read from the `.bashrc`

```bash
echo "export PATH=$HOME/bin:$PATH" >> ~/.bashrc
source ~/.bashrc
```

## Install PrimeHub 

Prepare two terminals, one to execute the primehub install script, the other to monitor the install progress by watching the pods status.

### Terminal one

Install by `primehub-install create primehub` with the latest stable version.


```bash
./primehub/install/primehub-install
```

Or install the specific version as below

   ```bash
   ./primehub/install/primehub-install create primehub --primehub-version <version>
   ```

   Enter the `PRIMEHUB_DOMAIN`, `KC_PASSWORD`, `PH_PASSWORD` by command prompt.

   The install script will start by preflight check, init config, and so on.
   ```
   [Preflight Check]
   [Preflight Check] Pass
   [Verify] Mininal k8s resources
   ...
   [Install] PrimeHub
   [Check] primehub.yaml
   [Generate] primehub.yaml
   [Install] PrimeHub   
   ...
   [Progress] wait for bootstrap job ready
   ...
   ```

### Terminal two

Open another terminal to run the command to watch the progress.
   
```bash
watch 'kubectl -n hub get pods'
```

Or once the `primehub-bootstrap` is running, check the progress of bootstrapping.

```bash
kubectl logs -n hub $(kubectl get pod -n hub | grep primehub-bootstrap | cut -d' ' -f1) -f
```

Once to see most pods with Running STATUS except **primehub-bootstrap-xxx** pod in **Completed** STATUS and the READY indicator should be **N/N**. 

Example watch console for the completed installation:

```bash
NAME                                                   READY   STATUS      RESTARTS   AGE
hub-758bd48876-wwwww                                   1/1     Running     0          17m
keycloak-0                                             1/1     Running     0          17m
keycloak-postgres-0                                    1/1     Running     0          17m
metacontroller-0                                       1/1     Running     0          17m
primehub-admission-xxxxxxxxxx-yyyyy                    1/1     Running     0          17m
primehub-bootstrap-xxxxx                               0/1     Completed   0          17m
primehub-console-xxxxxxxxxx-yyyyy                      1/1     Running     0          17m
primehub-controller-xxxxxxxxxx-yyyyy                   2/2     Running     0          17m
primehub-graphql-xxxxxxxxx-yyyyy                       1/1     Running     0          17m
primehub-metacontroller-webhook-xxxxxxxxxx-yyyyy       1/1     Running     0          17m
primehub-watcher-xxxxxxxxxx-yyyyy                      1/1     Running     0          17m
proxy-6bdd94cc-yyyyy                                   1/1     Running     0          17m
```

Then go back to Terminal one and wait until you see messages:

```bash
[Completed] Install PrimeHub

PrimeHub:   http://`$PRIMEHUB_DOMAIN` ( phadmin / `$PH_PASSWORD` )
Id Server:  http://`$PRIMEHUB_DOMAIN`/auth/admin/ ( keycloak / `$KC_PASSWORD` )

[Completed]
```


## Verify the Installation

1. Open `http://${PRIMEHUB_DOMAIN}` and log in by the admin username and password.

   ![](assets/install_primehub1.png)

2. Enter `Notebooks` for launching a JupyterHub.

## Apply License Key (Optional)

>By default, a trial license is applied. See [trial license limitations](../comparison#license-limitations).
>Please contact InfuseAI for the license inquiry for a valid commercial license.

If you have a valid license file from InfuseAI, saving the file at `$HOME` directory and run this command to apply a license key. 

```bash
./primehub/install/primehub-install apply-license
```

You can check the license status from [System Management](../guide_manual/admin-system#primehub-license) in the admin dashboard.

## Troubleshooting

1. If there is something wrong when installing, you can check the bootstrap job log to see what's going on

   ```bash
   kubectl -n hub logs jobs/primehub-bootstrap
   ```

## New to PrimeHub

Initially, PrimeHub has a built-in *user* `phadmin`, a built-in *group* `phusers`, and several *instance types*/*image* which are set *Global*. `phadmin` can launch a notebook quickly by using these resources. 

Now PrimeHub CE is ready, see [Launch Notebook](../quickstart/launch-project) to launch your very first JupyterNotebook on PrimeHub. Also see [User Guide](../quickstart/login-portal-user) to have the fundamental knowledge of PrimeHub.