---
id: prerequisites
title: Prerequisites
---

Before installing PrimeHub, we need to provide a primehub-ready kubernetes, which should contain

- **Kubernetes Cluster** (1.14+)
- **[kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/):** used to access the cluster
- **[helm](https://helm.sh/docs/using_helm/):** PrimeHub is packaged by helm

  > Currently, we recommend installing helm 2.x. For helm 3.x, we have not tested against this version.
- **Domain name**: used to access the PrimeHub.

  > Pure IP address is not allowed because we use kubernetes ingress to route the traffic. A trick is to use the [nip.io](https://nip.io/) service to map an IP to a domain name. (e.g., `1.2.3.4.nip.io`)

- **[Nginx Ingress Controller](https://github.com/kubernetes/ingress-nginx):** Used to control the [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) traffic. 

  > Other ingress controllers may work. But the nginx ingress controller is the solution we develop on.

- **[Dynamic Volume Provisioner](https://kubernetes.io/docs/concepts/storage/dynamic-provisioning/):** Used to provision a [PVC](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) dynamically. Make sure that there is a [storage class] provisioned by this provisioner.
- **[Cert manager](https://github.com/jetstack/cert-manager) (Optional):** If https is required in your environment, cert-manager provides an easy way to set up a certificate.
