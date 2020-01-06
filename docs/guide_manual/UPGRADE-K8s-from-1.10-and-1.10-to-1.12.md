---
id: UPGRADE-K8s-from-1.10-and-1.10-to-1.12
title: UPGRADE K8s from 1.10 and 1.10 to 1.12 
---

For PrimeHub 1.1, the target, Kubernetes-version-required (abbreviated to K8s) is 1.12, which provides essential features.

# How

According to your K8s bootstrapper or installer, upgrade methods may vary:

## RKE (Rancher Kubernetes Engine)

1. Ensure if you are using RKE version `v0.1.15`, you may verify this by running:

   ```
   rke
   ```

   According to the output, the `VERSION:` section should be shown as:

   ```
   VERSION:
      v0.1.15
   ```

   If not, please update your RKE binary installation:

   1. Locate your `rke` binary path:

      ```bash
      export RKE_LOCATION=$(echo $(dirname `which rke`)) && echo $RKE_LOCATION
      ```

   1. Backup your current copy of `rke`:

      ```bash
      mv $RKE_LOCATION/rke $RKE_LOCATION/rke.bak
      ```

   1. Download RKE version `v0.1.15` (We assumed that you are using GNU/Linux OS platform and X86-64 system here):

      ```bash
      curl -Lo $RKE_LOCATION/rke-0.1.15 https://github.com/rancher/rke/releases/download/v0.1.15/rke_linux-amd64 && chmod u+x r$RKE_LOCATION/ke-0.1.15 && ln -s $RKE_LOCATION/rke-0.1.15 $RKE_LOCATION/rke
      ```

   1. Run `rke` again to verify that you have RKE version `v0.1.15` now.

   1. Unset the `RKE_LOCATION` environment variable:
      ```bash
      unset RKE_LOCATION
      ```

1. Use an updated `cluster.yml` to re-provision your K8s cluster. The diff-patch would be like this:

   ```patch
   --- cluster.yml	2019-01-15 06:22:38.416839329 +0000
   +++ cluster-upgrade-k8s-1.12.yml	2019-01-15 08:09:10.823283582 +0000
   @@ -146,7 +146,7 @@
   # If set to true, rke won't fail when unsupported Docker version is found
   ignore_docker_version: false
   # The kubernetes version used. For now, this should match the version defined in rancher/types defaults map: https://github.com/rancher/types/blob/master/apis/management.cattle.io/v3/k8s_defaults.go#L14
   -kubernetes_version: v1.10.11-rancher1-1
   +kubernetes_version: v1.12.4-rancher1-1

   # addons are deployed using kubernetes jobs. RKE will give up on trying to get the job status after this timeout in seconds..
   addon_job_timeout: 30
   @@ -169,20 +169,20 @@
       enable-ssl-passthrough: ""

   system_images:
   -  etcd: quay.io/coreos/etcd:v3.1.12
   -  kubernetes: rancher/hyperkube:v1.10.11-rancher1
   -  alpine: rancher/rke-tools:v0.1.10
   -  nginx_proxy: rancher/rke-tools:v0.1.10
   -  cert_downloader: rancher/rke-tools:v0.1.10
   -  kubernetes_services_sidecar: rancher/rke-tools:v0.1.10
   -  kubedns: gcr.io/google_containers/k8s-dns-kube-dns-amd64:1.14.8
   -  dnsmasq: gcr.io/google_containers/k8s-dns-dnsmasq-nanny-amd64:1.14.8
   -  kubedns_sidecar: gcr.io/google_containers/k8s-dns-sidecar-amd64:1.14.8
   -  kubedns_autoscaler: gcr.io/google_containers/cluster-proportional-autoscaler-amd64:1.0.0
   -  calico_node: quay.io/calico/node:v3.1.1
   -  calico_cni: quay.io/calico/cni:v3.1.1
   -  calico_ctl: quay.io/calico/ctl:v2.0.0
   -  pod_infra_container: gcr.io/google_containers/pause-amd64:3.1
   +  etcd: rancher/coreos-etcd:v3.2.24
   +  kubernetes: rancher/hyperkube:v1.12.4-rancher1
   +  alpine: rancher/rke-tools:v0.1.16
   +  nginx_proxy: rancher/rke-tools:v0.1.16
   +  cert_downloader: rancher/rke-tools:v0.1.16
   +  kubernetes_services_sidecar: rancher/rke-tools:v0.1.16
   +  kubedns: rancher/k8s-dns-kube-dns-amd64:1.14.13
   +  dnsmasq: rancher/k8s-dns-dnsmasq-nanny-amd64:1.14.13
   +  kubedns_sidecar: rancher/k8s-dns-sidecar-amd64:1.14.13
   +  kubedns_autoscaler: rancher/cluster-proportional-autoscaler-amd64:1.0.0
   +  calico_node: rancher/calico-node:v3.1.3
   +  calico_cni: rancher/calico-cni:v3.1.3
   +  calico_ctl: rancher/calico-ctl:v2.0.0
   +  pod_infra_container: rancher/pause-amd64:3.1
     ingress: rancher/nginx-ingress-controller:0.16.2-rancher1
   -  ingress_backend: k8s.gcr.io/defaultbackend:1.4
   -  metrics_server: gcr.io/google_containers/metrics-server-amd64:v0.2.1
   +  ingress_backend: rancher/nginx-ingress-controller-defaultbackend:1.4
   +  metrics_server: rancher/metrics-server-amd64:v0.3.1
   ```

   Before editing your `cluster.yml`, you may backup it:

   ```bash
   cp cluster.yml cluster.yml.bak
   ```

1. After editing `cluster.yml`, please re-provisioning your K8s cluster by running:
   ```bash
   rke up --config cluster.yml
   ```
1. If re-provisioning is completed successfully, your K8s will be version 1.12, you may verify it by running:

   ```bash
   kubectl version
   ```

   server should versioned as GitVersion:"v1.12.4".
