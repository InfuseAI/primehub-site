---
id: version-2.5-kubernetes_on_ubuntu_machine
title: Kubernetes on an Ubuntu Machine (Single Node)
original_id: kubernetes_on_ubuntu_machine
---

This guide helps you to create a Kubernetes with [microk8s](https://microk8s.io/) for PrimeHub. microk8s is only for the single-node use case.

## Provision a cluster

[microk8s](https://microk8s.io/) could run on multi-platform, we demonstrate it in the following spec:

* Ubuntu 18.04 LTS
* Kubernetes 1.15 version
* Networking: allow 80 port for HTTP
  

### install microk8s

Install microk8s with `snap`

```
$ sudo snap install microk8s --classic --channel=1.15/stable
microk8s (1.15/stable) v1.15.10 from Canonical✓ installed
```

Add to group (re-login is required to get new permissions)

```
$ sudo usermod -a -G microk8s $USER
```

Wait microk8s ready

```
$ microk8s.status --wait-ready
microk8s is running
addons:
knative: disabled
jaeger: disabled
fluentd: disabled
gpu: disabled
cilium: disabled
storage: disabled
registry: disabled
rbac: disabled
ingress: disabled
dns: disabled
metrics-server: disabled
linkerd: disabled
prometheus: disabled
istio: disabled
dashboard: disabled
```

You could check it with `microk8s.kubectl`

```
$ microk8s.kubectl get nodes
NAME           STATUS   ROLES    AGE     VERSION
microk8s-doc   Ready    <none>   2m40s   v1.15.10
```

### configure microk8s

Enable features

```
$ microk8s.enable storage
$ microk8s.enable dns
$ microk8s.enable rbac
```

Enable `privileged` in kube-apiserver

```
# add this line in `/var/snap/microk8s/current/args/kube-apiserver`
--allow-privileged
```

Apply it by restart microk8s:

```
sudo microk8s.stop
sudo microk8s.start
```

Install extra packages

```
sudo apt-get install nfs-common
```

Prepare kube config

```
$ mkdir ~/.kube
$ microk8s.kubectl config view --raw > ~/.kube/config
```

Verify config with kubectl

```
$ kubectl get nodes
NAME           STATUS   ROLES    AGE   VERSION
microk8s-doc   Ready    <none>   35m   v1.15.10
```


### Install helm

Install helm 2.x binary. Please see the installation steps in [prerequisites](prerequisites.md). Make sure the helm binary version is `v2.x.x` (`v3.x.x` is not supported yet)

```
$ helm version --client
Client: &version.Version{SemVer:"v2.16.1", GitCommit:"bbdfe5e7803a12bbdf97e94cd847859890cf4050", GitTreeState:"clean"}
```

Apply RBAC resources for helm

```
$ kubectl apply -f - << EOF
apiVersion: v1
kind: ServiceAccount
metadata:
  name: tiller
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: tiller
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - kind: ServiceAccount
    name: tiller
    namespace: kube-system
EOF
```

Initialize helm:

```
$ helm init --service-account tiller --wait
```

Verify helm versions:

```
$ helm version
Client: &version.Version{SemVer:"v2.16.1", GitCommit:"bbdfe5e7803a12bbdf97e94cd847859890cf4050", GitTreeState:"clean"}
Server: &version.Version{SemVer:"v2.16.1", GitCommit:"bbdfe5e7803a12bbdf97e94cd847859890cf4050", GitTreeState:"clean"}
```

## Nginx Ingress


```
$ helm install stable/nginx-ingress --namespace ingress-nginx \
  --name nginx-ingress --set controller.hostNetwork=true --set rbac.create=true
```


### Quick Verification

Access nginx-ingress with the magic `.nip.io` domain, with your `EXTERNAL-IP`:

```
$ curl http://104.155.238.100.nip.io
```

The output will be `404` because nobody defines any `Ingress` resources:

```
default backend - 404
```

## Configure GPU (optional)

* download and install Nvidia GPU drivers from official website
* enable GPU feature

```
microk8s.enable gpu
```

## Configure snap (optional)

[snap](https://snapcraft.io/) will update packages automatically. If you plan to use it in a production-ready environment, you could

* Set the update process run on a special time window, or delay it before a date
* Disable it by setting a wrong proxy

Please read the [manual](https://snapcraft.io/docs/keeping-snaps-up-to-date)


## Next

The cluster is ready to install PrimeHub. Please bring `EXTERNAL-IP` and `StorageClass` name to the next steps. They would be used in the value files of `KeyCloak` and `PrimeHub`

* `EXTERNAL-IP`: 104.155.238.100

* `StorageClass` name: microk8s-hostpath
    ```
    $ kubectl get storageclass
    NAME                          PROVISIONER            AGE
    microk8s-hostpath (default)   microk8s.io/hostpath   56m
    ```


