---
id: version-2.5-kubernetes_on_gke
title: Kubernetes on GKE
original_id: kubernetes_on_gke
---

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
$ gcloud container clusters get-credentials <cluster-name> --zone asia-east1-a
```

After update kube-config, try to get nodes:

```
$ kubectl get nodes
NAME                                              STATUS   ROLES    AGE   VERSION
gke-primehub-example-default-pool-51960bca-0cz5   Ready    <none>   98s   v1.15.9-gke.12
gke-primehub-example-default-pool-51960bca-nfxd   Ready    <none>   98s   v1.15.9-gke.12
gke-primehub-example-default-pool-51960bca-wr9l   Ready    <none>   98s   v1.15.9-gke.12
```


### Install helm

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
Client: &version.Version{SemVer:"v2.16.3", GitCommit:"1ee0254c86d4ed6887327dabed7aa7da29d7eb0d", GitTreeState:"clean"}
Server: &version.Version{SemVer:"v2.16.3", GitCommit:"1ee0254c86d4ed6887327dabed7aa7da29d7eb0d", GitTreeState:"clean"}
```

## Nginx Ingress


```
$ helm install stable/nginx-ingress --namespace ingress-nginx --name nginx-ingress --set rbac.create=true
```

Find the `EXTERNAL-IP`

```
$ kubectl get svc -n ingress-nginx
```

You might see `<pending>` status in `EXTERNAL-IP`:

```
NAME                            TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)                      AGE
nginx-ingress-controller        LoadBalancer   10.23.250.249   <pending>       80:31248/TCP,443:31681/TCP   9m5s
nginx-ingress-default-backend   ClusterIP      10.23.253.133   <none>          80/TCP                       9m5s
```

It would be updated after GKE bound IP to the LoadBalancer:

```
NAME                            TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)                      AGE
nginx-ingress-controller        LoadBalancer   10.23.250.249   35.221.223.87   80:31248/TCP,443:31681/TCP   9m5s
nginx-ingress-default-backend   ClusterIP      10.23.253.133   <none>          80/TCP                       9m5s
```

### Quick Verification

Access nginx-ingress with the magic `.nip.io` domain:

```
$ curl http://35.221.223.87.nip.io
```

The output will be `404`, because nobody defines any `Ingress` resources:

```
default backend - 404
```

## Prepare EXTERNAL-IP & StorageClass

The cluster is ready to install PrimeHub. Please bring  `EXTERNAL-IP` and `StorageClass` name to the next steps. They would be used in the value files of `KeyCloak` and `PrimeHub`

* `EXTERNAL-IP`: 35.221.223.87
    ```
    kubectl get svc -n ingress-nginx
    ```

* `StorageClass` name: **standard**
    ```
    $ kubectl get storageclass
    NAME                 PROVISIONER            AGE
    standard (default)   kubernetes.io/gce-pd   17m
    ```


