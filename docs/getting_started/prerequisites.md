---
id: prerequisites
title: Prerequisites
---

Before installing PrimeHub, we need to provide a primehub-ready kubernetes, which should contain

## Kubernetes Cluster (1.14+)

PrimeHub is based on kuberentes. The kubernetes version should be 1.14+

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

PrimeHub is packaged and installed by [helm]((https://helm.sh/docs/using_helm/))

  > Currently, we recommend installing helm 2.x. For helm 3.x, we have not tested against this version.

  Installation steps:

  1. Go to the [helm release page (v2.16.1)](https://github.com/helm/helm/releases/tag/v2.16.1)
  2. Download the package for your OS
  3. Unpack the package and put the `helm` binary in you `$PATH`


## Domain name

PrimeHub requires a domain name to access the service

  > Pure IP address is not allowed because we use kubernetes ingress to route the traffic. A trick is to use the [nip.io](https://nip.io/) service to map an IP to a domain name. (e.g., `1.2.3.4.nip.io`)

## Nginx ingress Controller

[Nginx Ingress Controller](https://github.com/kubernetes/ingress-nginx) is used to control the [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) traffic. 

  > Other ingress controllers may work. But the nginx ingress controller is the solution we develop on.

## Dynamic Volume Provisioner

[Dynamic Volume Provisioner](https://kubernetes.io/docs/concepts/storage/dynamic-provisioning/) is used to provision a [PVC](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) dynamically. Make sure that there is a [storage class](https://kubernetes.io/docs/concepts/storage/storage-classes/) using this provisioner.

## Cert Manager (Optional)
If https is required in your environment, [cert-manager](https://github.com/jetstack/cert-manager) provides an easy way to set up a certificate.
