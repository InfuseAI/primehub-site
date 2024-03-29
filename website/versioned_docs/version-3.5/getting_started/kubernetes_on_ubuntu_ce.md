---
id: version-3.5-kubernetes_on_ubuntu_ce
title: Install PrimeHub Community on MicroK8S Single Node (Ubuntu)
description: Install PrimeHub Community on MicroK8S Single Node (Ubuntu)
sidebar_label: Install PrimeHub CE on Single Node
original_id: kubernetes_on_ubuntu_ce
---

<div class="label-sect">
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

This document will guide you to install [MicroK8s](https://microk8s.io/) on a single node and **PrimeHub Community** with a easy script.


## Provision a cluster

[MicroK8s](https://microk8s.io/) supports multi-platform, we demonstrate it in the following spec:

* Ubuntu 18.04 LTS
* Kubernetes 1.17 version
* IP address: 1.2.3.4
* Networking: allow port 80 for HTTP

### Install MicroK8s Single Node

We provide a install script which makes the installation much easier to create a [MicroK8s-single-node](https://microk8s.io/) Kubernetes.

Download the script `primehub-install`

```bash
curl -O https://storage.googleapis.com/primehub-release/bin/primehub-install
chmod +x primehub-install
```

Run the `create singlenode` command:

```bash
./primehub-install create singlenode
```

After the first execution, you will see the message. Because it adds the user to `microk8s` group and needs to relogin:

```
[Require Action] Please relogin this session and run create singlenode again
```

After relogin, run the same command again to finish the single-node provision:

```bash
./primehub-install create singlenode
```

>During the installation, you might run into troubles or need to modify the default settings, please check the [TroubleShooting](#troubleshooting) section.

### Quick Verification

Access nginx-ingress with the magic `.nip.io` domain, with your `EXTERNAL-IP`:

```
curl http://1.2.3.4.nip.io
```

The output will be `404` because no `Ingress` resources are defined yet:

```
default backend - 404
```

## Configurations

### Configure GPU (optional)

* Download and install Nvidia GPU drivers from official website
* Enable GPU feature

```
microk8s.enable gpu
```

### Configure snap (optional)

[snap](https://snapcraft.io/) will update packages automatically. If you plan to use it in a production-ready environment, you could

* Set the update process run on a special time window, or delay it before a date
* Disable it by setting a wrong proxy

Please see the [manual](https://snapcraft.io/docs/keeping-snaps-up-to-date) from snapcraft.

---

## Using Self-hosted DNS (Optional)

>If your domain name is not hosted by public DNS server, using the self-hosted DNS server instead.

Validate domain name for PrimeHub. [regexr.com](https://regexr.com/)

```
# The domain name must match 
[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*
```

Configure K8S CoreDNS

```bash
kubectl edit cm -n kube-system coredns
```

Please modify the following line and fill your own DNS server

```yaml
# Please edit the object below. Lines beginning with a '#' will be ignored,
# and an empty file will abort the edit. If an error occurs while saving this file will be
# reopened with the relevant failures.
#
apiVersion: v1
data:
  Corefile: |
    .:53 {
        errors
        health
        ready
        kubernetes cluster.local in-addr.arpa ip6.arpa {
          pods insecure
          fallthrough in-addr.arpa ip6.arpa
        }
        prometheus :9153
        forward . <Fill your own DNS server>
        cache 30
        loop
        reload
        loadbalance
    }
...
```

After changing the config map of coredns, please use the following command to restart coredns and apply the new configuration.

```bash
kubectl rollout -n kube-system restart deploy coredns
```

Reference

[https://kubernetes.io/docs/tasks/administer-cluster/dns-custom-nameservers/](https://kubernetes.io/docs/tasks/administer-cluster/dns-custom-nameservers/)

---

## Install PrimeHub CE

Run the `create primehub` command with `--primehub-ce` and with a specified version such `v3.1.0`.

```bash
./primehub-install create primehub --primehub-version <version> --primehub-ce --helm-timeout 20m
```

1. Please enter the domain name of PrimeHub

2. The password of `KC_PASSWORD` and `PH_PASSWORD` will be prompted and will be auto-generated if input empty value.

### Monitor the PrimeHub installation

Once running the PrimeHub installation, meanwhile, just open another terminal session to run the command to monitor the installation.

```bash
watch 'kubectl get pod -n hub'
```

Once the `primehub-bootstrap` is running, use the the command to watch the log of primehub bootstrap

```bash
kubectl logs -n hub $(kubectl get pod -n hub | grep primehub-bootstrap | cut -d' ' -f1) -f
```

## New to PrimeHub

Initially, PrimeHub has a built-in *user* `phadmin`, a built-in *group* `phusers`, several *instance types*/*image* which are set *Global*. `phadmin` can launch a notebook quickly by using these resources. 

Now PrimeHub CE is ready, see [Launch Notebook](../quickstart/launch-project) to launch your very first JupyterNotebook on PrimeHub. Also see [User Guide](../quickstart/login-portal-user) to have the fundamental knowledge of PrimeHub.

---

## Troubleshooting

>Generate a log file for diagnosis.

```bash
./primehub-install diagnose
```

You may run into troubles during the installation, we list some of them, hopefully, you find resolutions here.

### Using valid hostname and domain

- Validate the hostname of the node with the following regular expression. [regexr.com](https://regexr.com/)

    ```bash
    [a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*
    ```

#### Symptoms

When hostname is invalid, the installation might suspend at the `microk8s status` phase, because the cluster is not running:

```bash
ubuntu@foo_bar:~$ ./primehub-install create singlenode foo-bar:5000 --k8s-version 1.17
[Search] Folder primehub-v2.6.2
[Not Found] Folder primehub-v2.6.2
[Search] tarball primehub-v2.6.2.tar.gz
[Not Found] tarball primehub-v2.6.2.tar.gz
[Search] primehub helm chart with version: v2.6.2
[Not Found] primehub v2.6.2 in infuseai helm chart
[Skip] Don't need PrimeHub release package when target != primehub
[check] microk8s status
```

#### Resolution

You would get `microk8s is not running` from the status result:

```bash
ubuntu@foo_bar:~$ microk8s.status
microk8s is not running. Use microk8s.inspect for a deeper inspection.
```

If you run the inspect command , it shows everything running:

```bash
ubuntu@foo_bar:~$ microk8s.inspect
Inspecting services
  Service snap.microk8s.daemon-cluster-agent is running
  Service snap.microk8s.daemon-flanneld is running
  Service snap.microk8s.daemon-containerd is running
  Service snap.microk8s.daemon-apiserver is running
  Service snap.microk8s.daemon-apiserver-kicker is running
  Service snap.microk8s.daemon-proxy is running
  Service snap.microk8s.daemon-kubelet is running
  Service snap.microk8s.daemon-scheduler is running
  Service snap.microk8s.daemon-controller-manager is running
  Service snap.microk8s.daemon-etcd is running
  Copy service arguments to the final report tarball
Inspecting AppArmor configuration
Gathering system information
  Copy processes list to the final report tarball
  Copy snap list to the final report tarball
  Copy VM name (or none) to the final report tarball
  Copy disk usage information to the final report tarball
  Copy memory usage information to the final report tarball
  Copy server uptime to the final report tarball
  Copy current linux distribution to the final report tarball
  Copy openSSL information to the final report tarball
  Copy network configuration to the final report tarball
Inspecting kubernetes cluster
  Inspect kubernetes cluster

Building the report tarball
  Report tarball is at /var/snap/microk8s/1489/inspection-report-20200713_093426.tar.gz
```

You could find the root cause in the kubelet's inspection-report logs:

```bash
ubuntu@foo_bar:~/inspection-report/snap.microk8s.daemon-kubelet$ cat systemctl.log
● snap.microk8s.daemon-kubelet.service - Service for snap application microk8s.daemon-kubelet
   Loaded: loaded (/etc/systemd/system/snap.microk8s.daemon-kubelet.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-07-13 09:34:10 UTC; 14s ago
 Main PID: 10180 (kubelet)
    Tasks: 12 (limit: 2329)
   CGroup: /system.slice/snap.microk8s.daemon-kubelet.service
           └─10180 /snap/microk8s/1489/kubelet --kubeconfig=/var/snap/microk8s/1489/credentials/kubelet.config --cert-dir=/var/snap/microk8s/1489/certs --client-ca-file=/var/snap/microk8s/1489/certs/ca.crt --anonymous-auth=false --network-plugin=cni --root-dir=/var/snap/microk8s/common/var/lib/kubelet --fail-swap-on=false --cni-conf-dir=/var/snap/microk8s/1489/args/cni-network/ --cni-bin-dir=/snap/microk8s/1489/opt/cni/bin/ --feature-gates=DevicePlugins=true --eviction-hard=memory.available<100Mi,nodefs.available<1Gi,imagefs.available<1Gi --container-runtime=remote --container-runtime-endpoint=/var/snap/microk8s/common/run/containerd.sock --node-labels=microk8s.io/cluster=true

Jul 13 09:34:24 foo_bar microk8s.daemon-kubelet[10180]: E0713 09:34:24.139863   10180 kubelet.go:2263] node "foo_bar" not found
Jul 13 09:34:24 foo_bar microk8s.daemon-kubelet[10180]: E0713 09:34:24.240093   10180 kubelet.go:2263] node "foo_bar" not found
Jul 13 09:34:24 foo_bar microk8s.daemon-kubelet[10180]: E0713 09:34:24.340308   10180 kubelet.go:2263] node "foo_bar" not found
Jul 13 09:34:24 foo_bar microk8s.daemon-kubelet[10180]: E0713 09:34:24.440529   10180 kubelet.go:2263] node "foo_bar" not found
Jul 13 09:34:24 foo_bar microk8s.daemon-kubelet[10180]: E0713 09:34:24.540736   10180 kubelet.go:2263] node "foo_bar" not found
Jul 13 09:34:24 foo_bar microk8s.daemon-kubelet[10180]: E0713 09:34:24.640915   10180 kubelet.go:2263] node "foo_bar" not found
Jul 13 09:34:24 foo_bar microk8s.daemon-kubelet[10180]: I0713 09:34:24.713484   10180 kubelet_node_status.go:294] Setting node annotation to enable volume controller attach/detach
Jul 13 09:34:24 foo_bar microk8s.daemon-kubelet[10180]: I0713 09:34:24.714871   10180 kubelet_node_status.go:70] Attempting to register node foo_bar
Jul 13 09:34:24 foo_bar microk8s.daemon-kubelet[10180]: E0713 09:34:24.721575   10180 kubelet_node_status.go:92] Unable to register node "foo_bar" with API server: Node "foo_bar" is invalid: metadata.name: Invalid value: "foo_bar": a DNS-1123 subdomain must consist of lower case alphanumeric characters, '-' or '.', and must start and end with an alphanumeric character (e.g. 'example.com', regex used for validation is '[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*')
Jul 13 09:34:24 foo_bar microk8s.daemon-kubelet[10180]: E0713 09:34:24.741101   10180 kubelet.go:2263] node "foo_bar" not found
```

> Jul 13 09:34:24 foo_bar microk8s.daemon-kubelet[10180]: E0713 09:34:24.721575   10180 kubelet_node_status.go:92] Unable to register node "foo_bar" with API server: Node "foo_bar" is invalid: metadata.name: Invalid value: "foo_bar": a DNS-1123 subdomain must consist of lower case alphanumeric characters, '-' or '.', and must start and end with an alphanumeric character (e.g. 'example.com', regex used for validation is '[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*')

Please fix the hostname, domain name and reinstall microk8s. You could destroy it with this command:

```bash
$ ./primehub-install destroy singlenode
```

---

### Ensure CNI IP Range not overlaid with your Egress network

MicroK8s uses `iptables` as `kube-proxy` implementation, the overlay IP ranges might cause unexpected behavior with networking. For example, a client in a pod might not access same IP range external endpoint (banned by iptables).

```bash
ubuntu@foo-bar:~$ ip addr show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 9001 qdisc fq_codel state UP group default qlen 1000
    link/ether 06:62:0d:d6:82:d4 brd ff:ff:ff:ff:ff:ff
    inet 172.31.39.226/20 brd 172.31.47.255 scope global dynamic eth0
       valid_lft 2651sec preferred_lft 2651sec
    inet6 fe80::462:dff:fed6:82d4/64 scope link
       valid_lft forever preferred_lft forever
3: flannel.1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 8951 qdisc noqueue state UNKNOWN group default
    link/ether ba:0f:7c:6d:8d:56 brd ff:ff:ff:ff:ff:ff
    inet 10.1.46.0/32 scope global flannel.1
       valid_lft forever preferred_lft forever
    inet6 fe80::b80f:7cff:fe6d:8d56/64 scope link
       valid_lft forever preferred_lft forever
4: cni0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 8951 qdisc noqueue state UP group default qlen 1000
    link/ether ee:98:e2:60:4e:18 brd ff:ff:ff:ff:ff:ff
    inet 10.1.46.1/24 scope global cni0
       valid_lft forever preferred_lft forever
    inet6 fe80::ec98:e2ff:fe60:4e18/64 scope link
       valid_lft forever preferred_lft forever
```

Microk8s uses `flannel` as the default CNI, it would create two interface `flannel.1` and `cni0`. In the example `eth0` IP range(`172.31.0.0`)  is not overlaid with CNI's IP range (`10.1.0.0`).

#### Resolution

If the IP Range is overlaid with each other, please fix it by update CNI's IP range configuration `/var/snap/microk8s/current/args/flannel-network-mgr-config`:

```json
{"Network": "10.1.0.0/16", "Backend": {"Type": "vxlan"}}
```

We might change it to `10.3.0.0/16` and restart microk8s

```json
{"Network": "10.3.0.0/16", "Backend": {"Type": "vxlan"}}
```

We have to delete `cni0` to make it re-create in the new configuration (flannel.1 would be updated automatically):

```json
sudo ip link delete cni0
```

You might find all pods in the new IP ranges:

```json
ubuntu@foo-bar:~$ k get pod -A -o wide
NAMESPACE        NAME                                             READY   STATUS             RESTARTS   AGE   IP              NODE      NOMINATED NODE   READINESS GATES
default          foobar-6bfcbb6974-c2gt7                          1/1     Running            1          29m   10.3.49.116     foo-bar   <none>           <none>
ingress-nginx    nginx-ingress-controller-676d5ccd4c-gmm5f        1/1     Running            3          32m   172.31.39.226   foo-bar   <none>           <none>
ingress-nginx    nginx-ingress-default-backend-5b967cf596-crhdp   1/1     Running            2          32m   10.3.49.117     foo-bar   <none>           <none>
kube-system      coredns-9b8997588-wm2n7                          1/1     Running            4          34m   10.3.49.113     foo-bar   <none>           <none>
kube-system      hostpath-provisioner-7b9cb5cdb4-d9hlm            1/1     Running            3          34m   10.3.49.115     foo-bar   <none>           <none>
kube-system      tiller-deploy-969865475-h6gtb                    1/1     Running            2          32m   10.3.49.114     foo-bar   <none>           <none>
metacontroller   metacontroller-0                                 1/1     Running            2          31m   10.3.49.112     foo-bar   <none>           <none>
```

---

### DNS configuration might reset to the default values when enable/disable microk8s addons

If you update the `coredns` ConfigMap, please keep a backup to restore it after every microk8s addons enabling or disabling.

#### Symptom

Applications are not able to resolve some domain names, they are registered in your internal DNS.

```json
ubuntu@foo-bar:~$ kubectl -n kube-system get cm coredns -o yaml
```

Here is the default configuration, we could customize the core-dns by editing it:

```json
apiVersion: v1
data:
  Corefile: |
    .:53 {
        errors
        health
        ready
        kubernetes cluster.local in-addr.arpa ip6.arpa {
          pods insecure
          fallthrough in-addr.arpa ip6.arpa
        }
        prometheus :9153
        forward . 8.8.8.8 8.8.4.4
        cache 30
        loop
        reload
        loadbalance
    }
kind: ConfigMap
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"v1","data":{"Corefile":".:53 {\n    errors\n    health\n    ready\n    kubernetes cluster.local in-addr.arpa ip6.arpa {\n      pods insecure\n      fallthrough in-addr.arpa ip6.arpa\n    }\n    prometheus :9153\n    forward . 8.8.8.8 8.8.4.4\n    cache 30\n    loop\n    reload\n    loadbalance\n}\n"},"kind":"ConfigMap","metadata":{"annotations":{},"labels":{"addonmanager.kubernetes.io/mode":"EnsureExists","k8s-app":"kube-dns"},"name":"coredns","namespace":"kube-system"}}
  creationTimestamp: "2020-07-13T09:44:53Z"
  labels:
    addonmanager.kubernetes.io/mode: EnsureExists
    k8s-app: kube-dns
  name: coredns
  namespace: kube-system
  resourceVersion: "7079"
  selfLink: /api/v1/namespaces/kube-system/configmaps/coredns
  uid: 7b0c948b-083a-49a0-a18e-49b173d78c5a
```

Try editing `forward` like this:

```json
forward . 8.8.8.8 
```

Enable some addons either:

- `microk8s.enable istio`
- `microk8s.enable gpu`

>The coredns ConfigMap will be **reset** to the default values.

#### Resolution

There is no a good way to tackle it.

>Please remember to backup your settings and apply it *after every addons enabling or disable*.
