---
id: version-3.0-prerequisites
original_id: prerequisites
title: Prerequisites
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

>Before installing PrimeHub, we need to provide a PrimeHub-ready-Kubernetes, which should contain following essentials. Make sure the cluster is ready for PrimeHub.

## Kubernetes Cluster (1.16+)

>The Kubernetes version 1.16 is recommended.

If you already have a Kubernetes cluster or going to install one in your own preference, make sure the cluster meets the requirements below.

If a fresh PrimeHub on GKE or EKS is one of your preferences, you may want to start from our [Kubernetes on GKE](kubernetes_on_gke) guide or [Kubernetes on EKS](kubernetes_on_eks) guide.

## Kubectl

[kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) is used to access the cluster. To install kubectl, please follow the instructions

  Linux

  ```
  KUBECTL_VERSION=v1.15.3
  curl -LO https://storage.googleapis.com/kubernetes-release/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl
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
  KUBECTL_VERSION=v1.15.3
  curl -LO https://storage.googleapis.com/kubernetes-release/release/${KUBECTL_VERSION}/bin/darwin/amd64/kubectl
  chmod +x ./kubectl
  sudo mv ./kubectl /usr/local/bin/kubectl
  kubectl version --client
  ```

  For more details, please see the [kubernetes official document](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

## Helm

PrimeHub is packaged and installed by [Helm](https://helm.sh/docs/using_helm/)

  > From PrimeHub v3.0, we recommend Helm v3.3.2+.

  Installation steps:

  1. Go to the [Helm release page (v3.3.2)](https://github.com/helm/helm/releases/tag/v3.3.2)
  2. Download the package according to your OS
  3. Unpack the package and put the `helm` binary in you `$PATH`


## Domain name

PrimeHub requires a domain name to access the service

  > Pure IP address is not allowed because we use kubernetes ingress to route the traffic. A trick is to use the [nip.io](https://nip.io/) service to map an IP to a domain name. (e.g., `1.2.3.4.nip.io`)

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
helm install nginx-ingress --create-namespace --namespace ingress-nginx --version=1.31.0 --set controller.hostNetwork=true --set rbac.create=true
```

Verify it

```bash
kubectl get svc -n ingress-nginx
```

## Dynamic Volume Provisioner

[Dynamic Volume Provisioner](https://kubernetes.io/docs/concepts/storage/dynamic-provisioning/) is used to provision a [PVC](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) dynamically. Make sure that there is a [storage class](https://kubernetes.io/docs/concepts/storage/storage-classes/) using this provisioner.

## Cert Manager (Optional)

If https is required in your environment, [cert-manager](https://github.com/jetstack/cert-manager) provides an easy way to set up a certificate.
