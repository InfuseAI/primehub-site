---
id: install_seldon
title: Install Seldon (Optional)
---


Seldon is used by the model deployment feature. It should be installed before enabling the model deployment feature.

## Install

You could install it with PrimeHub tarball

```
cd primehub-vx.x.x
make component-install-seldon
```

## Verify the installation

You could see the `seldon-core` installed by `helm ls`

```
$ helm ls | grep seldon
seldon-core  	1       	Wed Apr  8 16:54:10 2020	DEPLOYED	seldon-core-operator-1.0.2	           	seldon-system
```

And found `seldondeployments.machinelearning.seldon.io` crd and its controller:

```
$ kubectl get crd | grep seldon
seldondeployments.machinelearning.seldon.io   2020-04-08T08:54:11Z
```


```
kubectl -n seldon-system get pod
NAME                                         READY   STATUS    RESTARTS   AGE
seldon-controller-manager-6658cd7449-885hd   1/1     Running   0          18h
```
