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

# Running eksctl to create EKS cluster
eksctl create cluster -f - <<EOF
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
    # this is the name of the cluster
    name: ${EKS_CLUSTER_NAME}
    region: ${EKS_REGION}
    version: "1.15"

vpc:
    nat:
        gateway: Disable

nodeGroups:
- name: default-node-group
    instanceType: m5.large
    desiredCapacity: 2
    labels:
    component: singleuser-server
    iam:
    withAddonPolicies:
        externalDNS: true
    availabilityZones: ["${EKS_ZONE}"]
EOF
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

### Quick Verification

Query nginx-ingress with your own domain:

```bash
curl http://<your-own-domain>
```

The output will be `404`, because nobody defines any `Ingress` resources:

```
default backend - 404
```

## Next - Setup PrimeHub

Now a kubernetes-ready EKS is ready for PrimeHub installation. Next, go to [Setup PrimeHub](install_metacontroller) section.
