---
id: version-2.2.0-airgap
title: Airgap
original_id: airgap
---

## Make Component Airgap-Ready

- **images.txt**: For every modules, put the image `repository:tag` in a `images.txt` file in one of the following path

  - `modules/charts/*/images.txt`: for images managed by chart
  - `modules/*/images.txt`: for image managed by manifests or other

- **chart**: If the component is managed by a remote chart, remember to pack the chart in the release builder.

      Edit the `Embed required charts` task in

  https://gitlab.com/infuseai/primehub/blob/master/installer/ansible/roles/release-builder/tasks/main.yml

- In the helmfile, provide two versions of chart path, one is original, another one is airgapped version. For example,

  ```
  releases:
     - name: elasticsearch
      ## general
      chart: stable/elasticsearch
      ## air-gapped
      #chart: ../../charts/elasticsearch
  ```

## Release

1. **build the release**:

   ```
   cd installer/
   make release
   ```

2. **build image tarball**: note, this step may fail if you have not login to some private repositories, e.g. [registry.gitlab.com](http://registry.gitlab.com). Please login by your email/password in gitlab

   ```
   make release-images
   ```

   and `primehub-images-xxx.tgz` and `primehub-images-xxx.txt` will be recreated

## Deployment

1. Extract the release tarball

   ```
   tar xvfz /tmp/primehub-rke-airgapped-xxx.tar.gz
   ln -s primehub-rke-airgapped-xxx  primehub
   cd primehub
   ```

1. move the images-xxx.txt and images-xxx.tgz

   ```
   mv primehub-images-xxx-* primehub
   ```

1. Enter the primehub folder

   ```
   cd primehub
   ```

1. Replace all the images

   ```
   ./modules/airgap/image-replace.sh ./primehub-images-xxx.txt
   ```

1. Load the images and push to private registry

   ```
   ./modules/airgap/image-load-and-push.sh ./primehub-images-xxx.txt ./primehub-images-xxx.tgz
   ```

1. Install as normal installation

   ```
   make component-diff-<app>
   make component-install-<app>
   ```

1. Check the running image is using airgapped image

   ```
   kubectl get pods --all-namespaces -o=jsonpath='{range .items[*]}{"\n"}{.metadata.name}{":\t"}{range .spec.containers[*]}{.image}{", "}{end}{end}' | sort -u
   ```

## Environment Simulation

Use `dev-gce` environment.

- **/etc/hosts**: check if there is this line in each node

        10.40.0.11 k8s01 primehub.airgap

- **/etc/docker/daemon.json**: The `insecure-registries` is set

  ```
  {
    "storage-driver": "overlay2",
    "storage-opts": [
      "overlay2.override_kernel_check=true"
    ],
    "default-runtime": "runc",
    "insecure-registries": [
      "primehub.airgap:5000"
    ]
  }
  ```

- **Private Registry**: In the first node `k8s01`. run the docker registry. in the release primehub folder. Run this task

  ```
  make start-local-docker-registry
  ```

## Tips

- keycloak login for master realm require ([localhost](http://localhost) connection or https) by default
- Fetch image from helm chart. [Reference](https://rancher.com/docs/rancher/v2.x/en/installation/air-gap-high-availability/prepare-private-registry/)

        helm fetch stable/cert-manager
        helm template ./cert-manager-<version>.tgz | grep -oP '(?<=image: ").*(?=")'
