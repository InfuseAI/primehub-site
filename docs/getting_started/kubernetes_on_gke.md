---
id: kubernetes_on_gke
title: Kubernetes on GKE
description: Kubernetes on GKE
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

This guide helps you to create a Kubernetes on GKE for PrimeHub. 

## Provision a cluster

Create [a single-zone cluster](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-cluster#creating-a-cluster)

```
gcloud container clusters create <cluster-name> \
--project <project-id> \
--cluster-version 1.15 \
--machine-type n1-standard-2 \
--zone asia-east1-a
```

This step will take a few minutes, please wait for output like this:

```
NAME              LOCATION      MASTER_VERSION  MASTER_IP        MACHINE_TYPE   NODE_VERSION   NUM_NODES  STATUS
primehub-example  asia-east1-a  1.15.9-gke.12   104.155.214.113  n1-standard-2  1.15.9-gke.12  3          RUNNING
```


Update kube-config:

```
gcloud container clusters get-credentials <cluster-name> --zone asia-east1-a
```

After update kube-config, try to get nodes:

```bash
kubectl get nodes
```

Output
```text
NAME                                              STATUS   ROLES    AGE   VERSION
gke-primehub-example-default-pool-51960bca-0cz5   Ready    <none>   98s   v1.15.9-gke.12
gke-primehub-example-default-pool-51960bca-nfxd   Ready    <none>   98s   v1.15.9-gke.12
gke-primehub-example-default-pool-51960bca-wr9l   Ready    <none>   98s   v1.15.9-gke.12
```


### Install Helm

Install helm 3.x.x+ binary. Please see the installation steps in [prerequisites](prerequisites.md). (From PrimeHub v2.8, we use `Helm 3` for the installation.)

```
helm version
version.BuildInfo{Version:"v3.3.4", GitCommit:"0ad800ef43d3b826f31a5ad8dfbb4fe05d143688", GitTreeState:"clean", GoVersion:"go1.13.12"}
```

## Nginx Ingress

Add Chart repo
```bash
helm repo add stable https://kubernetes-charts.storage.googleapis.com
helm repo update
```

Helm install

```bash
helm install nginx-ingress stable/nginx-ingress --create-namespace --namespace ingress-nginx --version=1.31.0 --set controller.hostNetwork=true --set rbac.create=true
```

Find the `EXTERNAL-IP`

```bash
kubectl get svc -n ingress-nginx
```

You might see `<pending>` status in `EXTERNAL-IP`:

```text
NAME                            TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)                      AGE
nginx-ingress-controller        LoadBalancer   10.23.250.249   <pending>       80:31248/TCP,443:31681/TCP   9m5s
nginx-ingress-default-backend   ClusterIP      10.23.253.133   <none>          80/TCP                       9m5s
```

It would be updated after GKE bound IP to the LoadBalancer:

```text
NAME                            TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)                      AGE
nginx-ingress-controller        LoadBalancer   10.23.250.249   35.221.223.87   80:31248/TCP,443:31681/TCP   9m5s
nginx-ingress-default-backend   ClusterIP      10.23.253.133   <none>          80/TCP                       9m5s
```

### Quick Verification

Access nginx-ingress with the magic `.nip.io` domain:

```
curl http://35.221.223.87.nip.io
```

The output will be `404`, because nobody defines any `Ingress` resources:

```text
default backend - 404
```

## Prepare EXTERNAL-IP & StorageClass

The cluster is ready to install PrimeHub. Please bring  `EXTERNAL-IP` and `StorageClass` name to the PrimeHub Installation. They are mandatory in the value files of `KeyCloak` and `PrimeHub`.

* `EXTERNAL-IP`: 35.221.223.87
    ```text
    kubectl get svc -n ingress-nginx
    ```

* `StorageClass` name: **standard**
    ```bash
    kubectl get storageclass
    ```

    Output
    ```text
    NAME                 PROVISIONER            AGE
    standard (default)   kubernetes.io/gce-pd   17m
    ```

## Next - Setup PrimeHub

Go to [Setup PrimeHub](install_primehub) section.
