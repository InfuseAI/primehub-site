---
id: version-3.8-prerequisites
title: Prerequisites
description: Prerequisites
original_id: prerequisites
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

>For PrimeHub installation on **single node**, please visit [Install PrimeHub CE on Single Node](kubernetes_on_ubuntu_ce) or [Install PrimeHub EE on Single Node](kubernetes_on_ubuntu_machine) directly.

> For PrimeHub installation on **multiple nodes**, please read the prerequisites thoroughly. Before installing PrimeHub, we need to provide a PrimeHub-ready-Kubernetes, which should contain following essentials. Make sure the cluster is ready for PrimeHub.

## Kubernetes Cluster (1.19+)

>The Kubernetes version 1.19 is recommended.

If you already have a Kubernetes cluster or going to install one in your own preference, make sure the cluster meets the requirements below.

If a fresh PrimeHub on GKE or EKS is one of your preferences, you may want to start from our [Kubernetes on GKE](kubernetes_on_gke) guide or [Kubernetes on EKS](kubernetes_on_eks) guide.

## Git
  > Please follow the os-specific command to install git command

## cURL

[cURL](https://curl.se/) is a command-line tool that allows us to do HTTP requests from shell. To install cURL, please follow the os-specific method. For example.

  Ubuntu

  ```
  sudo apt update
  sudo apt install curl
  ```

  RHEL/CentOS

  ```
  yum install curl
  ```

## Kubectl

[kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) is used to access the cluster. To install kubectl, please follow the instructions, or visit [kubectl - Install Tools](https://kubernetes.io/docs/tasks/tools/install-kubectl/) for preferred operating system.

  Linux

  ```
  KUBECTL_VERSION=v1.19.15
  curl -LO https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl
  chmod +x ./kubectl
  sudo mv ./kubectl /usr/local/bin/kubectl
  kubectl version --client
  ```

  MacOS

  You can use brew to install

  ```
  brew install kubectl
  ```

  or below commands

  ```
  KUBECTL_VERSION=v1.19.15
  curl -LO https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/darwin/amd64/kubectl
  chmod +x ./kubectl
  sudo mv ./kubectl /usr/local/bin/kubectl
  kubectl version --client
  ```

  For more details, please see the [kubernetes official document](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

## Helm

PrimeHub is packaged and installed by [Helm](https://helm.sh/docs/using_helm/)

  > From PrimeHub v3.0, we recommend Helm v3.6.2+.

  Installation steps:

  1. Go to the [Helm release page (v3.6.2)](https://github.com/helm/helm/releases/tag/v3.6.2)
  2. Download the package according to your OS
  3. Unpack the package and put the `helm` binary in you `$PATH`


## Domain name

PrimeHub requires a domain name or fix IP address to access the service from the user machines.

  > The minimum requirement: The domain name can be accessible to the ingress node (by DNS CNAME or L4/L7 load balancer) from the users machines

## Nginx ingress Controller

[Nginx Ingress Controller](https://github.com/kubernetes/ingress-nginx) is used to control the [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) traffic. 

  > Other ingress controllers may work. But the nginx ingress controller is the solution we develop on.

Add Chart repo

```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
```

Helm install

```bash
helm install nginx-ingress ingress-nginx/ingress-nginx --create-namespace --namespace ingress-nginx --set controller.hostNetwork=true --set rbac.create=true
```

Verify it

```bash
kubectl get svc -n ingress-nginx
```

## Dynamic Volume Provisioner

[Dynamic Volume Provisioner](https://kubernetes.io/docs/concepts/storage/dynamic-provisioning/) is used to provision a [PVC](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) dynamically. Make sure that there is a [storage class](https://kubernetes.io/docs/concepts/storage/storage-classes/) using this provisioner.

Check if the default storage class is available.

```bash
kubectl get storageclass
```

If there is no available storage class, patch it with one you want. See [Change the default StorageClass↗](https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/).

Patch a storage class

```batch
kubectl patch storageclass <STORAGE_CLASS_NAME> -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

## Cert Manager (Optional)

If https is required in your environment, [cert-manager](https://github.com/jetstack/cert-manager) provides an easy way to set up a certificate.

## Behind Firewall (Optional)

+ Please open port `22, 80 and 443`.

+ Please add these domains below in allow-list

  ```text
  # Docker image registry
  *.docker.com
  *.docker.io
  *.gitlab.com
  quay.io
  gcr.io

  # Helm chart repository
  *.github.io
  *.storage.googleapis.com
  storage.googleapis.com
  charts.infuseai.io
  charts.rook.io        
  charts.jetstack.io

  # Nvidia driver
  *.nvidia.com

  ```