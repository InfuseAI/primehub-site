---
id: version-3.4-install_primehub_ce
title: Install PrimeHub Community
description: Install PrimeHub Community
sidebar_label: Install PrimeHub CE
original_id: install_primehub_ce
---
<div class="label-sect">
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

>To prepare a PrimeHub-ready-Kubernetes, Please check the [Prerequisites](prerequisites) for PrimeHub first before preceding to the PrimeHub CE installation.

The document assumes there is a PrimeHub-ready-Kubernetes already. The steps below are performed against the cluster.

## Prepare the Value File

Prepare the value file `primehub-values.yaml` for helm installation.

> Pure IP address is not allowed because we use Kubernetes ingress to route the traffic. A trick is to use the [nip.io](https://nip.io/) service to map an IP to a domain name. (e.g., `1.2.3.4.nip.io`)

Key | Description
----|------------------------------------
`PRIMEHUB_DOMAIN` | The domain name of PrimeHub. It can be the same as PrimeHub's one.



Modify the environment variables below and execute the commands to generate the value file.

```
PRIMEHUB_DOMAIN=1.2.3.4.nip.io

cat <<EOF > primehub-values.yaml
primehub:
  domain: ${PRIMEHUB_DOMAIN}
ingress:
  annotations:
    kubernetes.io/ingress.allow-http: "true"
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
  hosts:
  -  ${PRIMEHUB_DOMAIN}
EOF
```

## Add the chart repository

```bash
helm repo add infuseai https://charts.infuseai.io
```

```bash
helm repo update
```

## Install

1. Run Helm command to install PrimeHub

   ```
   helm upgrade \
     primehub infuseai/primehub \
     --install \
     --create-namespace \
     --namespace hub  \
     --timeout 30m  \
     --values primehub-values.yaml
   ```

   > In the first time installation, it may take a longer time to pull images. You can extend `--timeout 30m` to change the default timeout duration.

2. Wait and watch
   
   In another Terminal, run the command to watch the progress.
   ```
   watch 'kubectl -n hub get pods'
   ```

    Please wait and ignore the interim pods status, `CreateContainerConfigError` until you see **primehub-bootstrap-xxx** pod and **admission-post-install-job-xxx** pod are **Completed** and other pods are **Running** with Ready(1/1).

    Then go back to first Terminal and wait until you see messages:

    ```text
    NOTES:
    PrimeHub is installed at:

    To get the login account, please enter the following commands:
    echo "username: phadmin"
    echo "password: $(kubectl -n hub get secret primehub-bootstrap -o jsonpath='{.data.password}' | base64 --decode)"
    ```

    According to the instruction, run the command to learn the password for account `phadmin` and memory it.

    ```bash
    echo "password: $(kubectl -n hub get secret primehub-bootstrap -o jsonpath='{.data.password}' | base64 --decode)"
    ```

3. Label the nodes which can be assigned for JupyterHub servers

   ```
   kubectl label node component=singleuser-server --all
   ```

## Verify the Installation

1. Run this command

   ```bash
   kubectl -n hub rollout status deploy/primehub-console
   ```

2. Browse `http://${PRIMEHUB_DOMAIN}` and log in by the `phadmin` and the password. `phadmain` is a default account with admin privileges.

Hooray! PrimeHub CE has been installed and is running now. 

## New to PrimeHub

Initially, PrimeHub has a built-in *user* `phadmin`, a built-in *group* `phusers`, several *instance types*/*image* which are available to *Global* ready to use. `phadmin` can launch a notebook quickly by using these resources. 

Now PrimeHub CE is ready, see [Launch Notebook](../quickstart/launch-project) to launch your very first JupyterNotebook on PrimeHub. Also see [User Guide](../quickstart/login-portal-user) to have the fundamental knowledge of PrimeHub.
