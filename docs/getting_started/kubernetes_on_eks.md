---
id: kubernetes_on_eks
title: Kubernetes on AWS EKS
---

This document guides you to deploy a Kubernetes on AWS EKS for PrimeHub.

## Prepare

**You must have a valid AWS account with proper permissions to continue this guide.**

### Generate Access Key

Visiting [AWS Console](https://aws.amazon.com/console/) and IAM service page to generate your own access key.

### Prepare AWS credentials

```bash
mkdir -p ~/.aws
touch ~/.aws/credentials
```

Edit `credentials` and add the content with the generated access key.

```plantext
# credentials
[default]
aws_access_key_id = xxx
aws_secret_access_key = xxx
region = ap-northeast-1
```

Install `aws-cli` and `eksctl` on your working machine

```bash
# Install awscli
brew install awscli

# Install eksctl
brew tap weaveworks/tap
brew install weaveworks/tap/eksctl
eksctl version
```

### Prepare a Domain name

Prepare your domain name and manage it by **Route53**; Please see [Making Route 53 the DNS service for a domain that's in use](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/migrate-dns-domain-in-use.html) for details.

## Create EKS Kubernetes Cluster

Create EKS cluster by `eksctl` command with a proper `__my_cluster_name__`.

```bash
# Prepare customized data
EKS_CLUSTER_NAME=__my_cluster_name__
EKS_REGION=ap-northeast-1
EKS_ZONE=${EKS_REGION}-a
K8S_VERSION=1.16

# Running eksctl to create EKS cluster
cat <<EOF >> eks-config.yaml
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
    # this is the name of the cluster
    name: ${EKS_CLUSTER_NAME}
    region: ${EKS_REGION}
    version: "${K8S_VERSION}"
    tags:
      # You can customize your own tags
      Name: ${EKS_CLUSTER_NAME}

vpc:
    nat:
        gateway: Disable

nodeGroups:
  - name: scaled-cpu-pool
    instanceType: m5.xlarge
    desiredCapacity: 0
    minSize: 0
    maxSize: 2
    labels:
      component: singleuser-server
      hub.jupyter.org/node-purpose: user
    taints:
      hub.jupyter.org/dedicated: "user:NoSchedule"
    iam:
      withAddonPolicies:
        autoScaler: true
        externalDNS: true
    availabilityZones: ["${EKS_ZONE}"]
    tags:
      Name: "${EKS_CLUSTER_NAME}-scaled-cpu-pool"
      cluster: "${EKS_CLUSTER_NAME}"
      k8s.io/cluster-autoscaler/node-template/label/component: singleuser-server
      k8s.io/cluster-autoscaler/node-template/taint/hub.jupyter.org/dedicated: "user:NoSchedule"
  # [Optional] For GPU node
  # - name: scaled-gpu-pool
  #   instanceType: g4dn.xlarge
  #   desiredCapacity: 0
  #   minSize: 0
  #   maxSize: 2
  #   labels:
  #     component: singleuser-server
  #     hub.jupyter.org/node-purpose: user
  #   taints:
  #     hub.jupyter.org/dedicated: "user:NoSchedule"
  #   iam:
  #     withAddonPolicies:
  #       autoScaler: true
  #       externalDNS: true
  #   availabilityZones: ["${EKS_ZONE}"]
  #   tags:
  #     Name: "${EKS_CLUSTER_NAME}-scaled-gpu-pool"
  #     cluster: "${EKS_CLUSTER_NAME}"
  #     k8s.io/cluster-autoscaler/node-template/label/component: singleuser-server
  #     k8s.io/cluster-autoscaler/node-template/taint/hub.jupyter.org/dedicated: "user:NoSchedule"

managedNodeGroups:
  - name: default-node-group
    instanceType: t3.medium
    minSize: 2
    desiredCapacity: 2
    maxSize: 3
    labels:
    iam:
      withAddonPolicies:
        autoScaler: true
        externalDNS: true
    availabilityZones: ["${EKS_ZONE}"]
    tags:
      Name: "${EKS_CLUSTER_NAME}-default-node-group"
      cluster: "${EKS_CLUSTER_NAME}"
EOF
eksctl create cluster -f eks-config.yaml
```

Wait until EKS cluster is created, then check the cluster.

```bash
eksctl get cluster
```

Update kube-config with the newly created cluster info.

```bash
aws eks update-kubeconfig --name ${EKS_CLUSTER_NAME} --alias ${EKS_CLUSTER_NAME}
```

Try to get nodes to verify the added kubeconfig:

```bash
kubectl get nodes

NAME                                                STATUS   ROLES    AGE   VERSION
ip-192-168-2-53.ap-northeast-1.compute.internal     Ready    <none>   21s   v1.15.10-eks-bac369
ip-192-168-74-187.ap-northeast-1.compute.internal   Ready    <none>   21s   v1.15.10-eks-bac369
```

## Install helm

Install helm 2.x binary. Please see the installation steps in [prerequisites](prerequisites.md). Make sure the helm binary version is `v2.x.x` (`v3.x.x` is *not supported* yet)

```bash
helm version --client
Client: &version.Version{SemVer:"v2.16.3", GitCommit:"1ee0254c86d4ed6887327dabed7aa7da29d7eb0d", GitTreeState:"clean"}
```

Apply RBAC resources for helm

```bash
kubectl apply -f - << EOF
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

## Nginx Ingress

```bash
helm install stable/nginx-ingress --namespace ingress-nginx --name nginx-ingress --set rbac.create=true
```

Find the `EXTERNAL-IP`

```bash
kubectl get svc -n ingress-nginx

NAME                               TYPE           CLUSTER-IP       EXTERNAL-IP                                                                          PORT(S)                      AGE
nginx-ingress-controller           LoadBalancer   10.100.253.162   a3ee868bc0f194ac19c04948497bc8ca-a179fb405d10a39f.elb.ap-northeast-1.amazonaws.com   80:31938/TCP,443:30853/TCP   21d
nginx-ingress-controller-metrics   ClusterIP      10.100.146.39    <none>                                                                               9913/TCP                     21d
nginx-ingress-default-backend      ClusterIP      10.100.49.194    <none>                                                                               80/TCP                       21d
```

Go to AWS web console Route53 page and add a Type `A` record for your domain with alias name.

![Setup domain name by route53](assets/kubernetes_on_eks_route53.png)

### Verify By Your Domain

Query nginx-ingress with your own domain:

```bash
curl http://<your-own-domain>
```

The output will be `404`, because nobody defines any `Ingress` resources:

```text
default backend - 404
```

## Enable Cluster Autoscaler

AWS EKS will use `cluster-autoscaler` to handle auto scaling. For detail information, please reference the following URL. (https://docs.aws.amazon.com/eks/latest/userguide/cluster-autoscaler.html)

### Deploy the Cluster Autoscaler

To deploy the customized Cluster Autoscaler with the following commands.

```bash
EKS_CLUSTER_NAME=__my_cluster_name__
curl https://docs.primehub.io/docs/assets/cluster-autoscaler-autodiscover.yaml.tmpl | sed -e "s/{EKS_CLUSTER_NAME}/$EKS_CLUSTER_NAME/" | kubectl apply -f -
```

### View your Cluster Autoscaler logs

After you have deployed the Cluster Autoscaler, you can view the logs and verify that it is monitoring your cluster load.

View your Cluster Autoscaler logs with the following command.

```bash
kubectl -n kube-system logs -f deployment.apps/cluster-autoscaler
```

## [Optional] Cert Mananger

If you want to enable Https on your cluster, you can use cert manager to request free certificate from Let's Encrypt.

### Deploy Cert Manager

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install \
  --name cert-manager \
  --namespace cert-manager \
  --version v0.15.0 \
  jetstack/cert-manager \
  --set installCRDs=true \
  --set ingressShim.defaultIssuerName=letsencrypt-prod \
  --set ingressShim.defaultIssuerKind=ClusterIssuer
kubectl -n cert-manager rollout status Deployment/cert-manager-webhook
```

### Apply Cluster Issuer

```bash
kubectl apply -f - << EOF
apiVersion: cert-manager.io/v1alpha2
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    email: phadmin@<Your-Domain>
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      # Secret resource used to store the account's private key.
      name: letsencrypt
    # Add a single challenge solver, HTTP01 using nginx
    solvers:
    - http01:
        ingress:
          class: nginx
EOF
```

## Next - Setup PrimeHub

### Prepare PrimeHub Config for auto scaling

Please put `primehub.yaml` under the following path `~/.primehub/config/<cluster-name>/helm_override/primehub.yaml`

``` bash
EKS_CLUSTER_NAME=__my_cluster_name__
mkdir -p ~/.primehub/config/${EKS_CLUSTER_NAME}/helm_override/
touch ~/.primehub/config/${EKS_CLUSTER_NAME}/helm_override/primehub.yaml
```

### primehub.yaml

```yaml
---
jupyterhub:
  scheduling:
    userScheduler:
      enabled: true
      image:
        tag: v1.16.8
    podPriority:
      enabled: true
    userPlaceholder:
      enabled: false
    userPods:
      nodeAffinity:
        matchNodePurpose: require
```

### Install PrimeHub

Now a kubernetes-ready EKS is ready for PrimeHub installation. Next, go to [Setup PrimeHub](install_helper) section

### After PrimeHub Installed

Please apply the following command to fix rbac issue of `primehub-user-scheduler`

```bash
cat << EOF > primehub-user-scheduler-complementary.patch.yaml
- apiGroups:
  - ""
  resources:
  - persistentvolume
  - persistentvolumeclaims
  verbs:
  - update
EOF
kubectl apply -f <(cat <(kubectl get clusterrole primehub-user-scheduler-complementary -o yaml) primehub-user-scheduler-complementary.patch.yaml)
```
