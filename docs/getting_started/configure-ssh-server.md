---
id: configure-ssh-server
title: Configure SSH Server
description: Configure SSH Server
sidebar_label: SSH Server
---


<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

## Introduction

With **SSH bastion server**, users are able to connect to their jupyter notebooks directly using **SSH** connections.

By setting up a SSH bastion server and exposing the TCP service, users could SSH into their Jupyter notebook if users toggle the `Enable SSH Server` option in the spawner page.

The bastion server also fetches public keys of users from Jupyter pods and cache them to speed up the SSH authorization.

The bastion server pod has very strict network policies and only allow to reach Jupyter notebook pods with `SSH Server` enabled.

This is a very practical feature, there are various of things you can do, for example:

- Port-forward services to your machine
- Connect to your Jupyter notebook workspace in your favorite editor

## Installation

### Enable SSH Bastion Server Feature

This feature is default enabled in PrimeHub CE version, if you're using EE version you'll need to enable this manually.

In your `helm_override/primehub.yaml` simply add this section and helmfile apply.

```yaml
sshBastionServer:
  enabled: true
```

You may need to restart the hub pod manually to reload the config.

### Allow SSH connection

You'll need to allow external SSH connection to your ingress / loadbalancer

And don't forget to allow the TCP port (default 2222 port) on your firewall or security group.

Here's some setup example in different environments:

#### On-Premises (NGINX Ingress)

For NGINX Ingress Controller, you'll have to edit the `tcp-services` configmap to expose certain TCP 2222 port to the SSH bastion server port.

```yaml
$ kubectl edit -n ingress-nginx tcp-services
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: tcp-services
  namespace: ingress-nginx
data:
  "2222": hub/ssh-bastion-server:2222
```

For more detail about exposing TCP services of NGINX Ingress Controller, you can check out the [official document](https://kubernetes.github.io/ingress-nginx/user-guide/exposing-tcp-udp-services/).

#### Google Kubernetes Engine

If you're using [GCE Ingress Controller](https://github.com/kubernetes/ingress-gce), it doesn't support TCP proxy. You need to specify the annotation `kubernetes.io/ingress.class: "nginx"` in all ingresses to target NGINX ingress controller.

```yaml
metadata:
  name: foo
  annotations:
    kubernetes.io/ingress.class: "nginx"
```

After that, you'll have to edit the firewall to expose certain TCP 2222 port. Go to [Firewall page](https://console.cloud.google.com/networking/firewalls/list) in Google Cloud Platform console, then create the firewall rule.


## FAQ

- What's the logic of the SSH key cache mechanism?
    - 15 min since last update cache → cache invalid, the whole cache will be fully rebuild upon the next ssh connection.
    - 2 min since last update cache → if incoming ssh key is not in cache store, try to fetch publickey APIs of those pods not in the cache.
    - cache updated within 2 min → only check incoming SSH key from local cache.
- How do I refresh the SSH key cache manually?

    If you are able to reach your Kubernetes cluster, you can run the following command to refresh the SSH key cache manually.

    ```bash
    $ POD_NAME=$(kubectl get pod -n hub --selector=ssh-bastion-server/bastion=true -o jsonpath='{.items[*].metadata.name}')
    $ kubectl exec -it -n hub $POD_NAME bash
    root@ssh-bastion-server:/# cd /etc/ssh
    root@ssh-bastion-server:/# python update_authorized_keys.py full
    root@ssh-bastion-server:/# exit
    ```