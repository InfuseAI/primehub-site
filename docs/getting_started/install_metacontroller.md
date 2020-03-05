---
id: install_metacontroller
title: Install Metacontroller
---

Metacontroller is an add-on for Kubernetes that makes it easy to write and deploy custom controllers. PrimeHub uses it to implement some lightweight controllers.

## Quick Instructions

Basically, you can follow the instructions in [installation document](https://metacontroller.app/guide/install/) in offical site. Here is the summary of the installation steps

```
kubectl create namespace metacontroller
kubectl apply -f https://raw.githubusercontent.com/GoogleCloudPlatform/metacontroller/master/manifests/metacontroller-rbac.yaml
kubectl apply -f https://raw.githubusercontent.com/GoogleCloudPlatform/metacontroller/master/manifests/metacontroller.yaml
```

## Verify the Installaion

Type these commands
```
kubectl get crd | grep metacontroller
```        

The output should be
```
compositecontrollers.metacontroller.k8s.io     2020-01-06T01:24:57Z
controllerrevisions.metacontroller.k8s.io      2020-01-06T01:24:57Z
decoratorcontrollers.metacontroller.k8s.io     2020-01-06T01:24:57Z
```
