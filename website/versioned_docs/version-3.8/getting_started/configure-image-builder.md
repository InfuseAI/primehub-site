---
id: version-3.8-configure-image-builder
title: Configure Custom Image Build
description: Configure Custom Image Build
sidebar_label: Custom Image Build
original_id: configure-image-builder
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

## Introduction

PrimeHub provides the capability to build custom images. There are two features related to building image
- *[Image > Build custom image](../group-image)*: Allows group admin to create custom image.
- *[Admin Portal > Images](../guide_manual/admin-image) (EE only)*: Allows system admin to create custom image

Once images are built successfully, they will be pushed into specified repositories of a registry. Here we show how to configure PrimeHub using a remote registry for it.

Path | Description | Default Value
--- | ----- | -----------------------
`customImage.registryEndpoint` | The registry the built image to push  | `N/A`
`customImage.registryUsername` | Login user name for registry | `N/A`
`customImage.registryPassword` | Login password for registry | `N/A`
`customImage.pushRepo` | The image repository for the build image. The result image will be `<repo>:<image name>-<tag>` | `N/A`
`customImage.pushRepoPrefix` | The image prefix for the build image. The result image will be `<repo prefix>/<image name>:<tag>`. This field will be ignored when `customImage.pushRepo` is set | `N/A`
`customImage.pushSecretName` | The secret name of the registry push secret | `primehub-controller-custom-image-push-secret`

## Configure DockerHub Registry

1. Sign in DockerHub.

2. Go to `Account Settings`/`Security`/`Access Tokens` Generate new access token and save it. (REF: [Managing access tokens](https://docs.docker.com/docker-hub/access-tokens/)).

3. Create a repository and note down the `<namespace>` and `<repo name>`

4. Configuration example of DockerHub registry

    ```yaml
    customImage:
      enabled: true
      registryEndpoint: docker.io
      registryUsername: <your_docker_hub_username>
      registryPassword: <your_access_token>
      pushRepo: docker.io/<namespace>/<repo name>
    ```

## Configure Google Container Registry (GCR)

1. Please reference this [official document for GCR](https://cloud.google.com/container-registry/docs/advanced-authentication) to get the username and password

2. The username is always `_json_key`. The password is the keyfile json. Please make it a one-line json string so that we can put it in the environment variable.

    ```bash
    cat keyfile | jq -c .
    ```

3. Configuration example of GCR

    ```yaml
    customImage:
      enabled: true
      registryEndpoint: https://gcr.io
      registryUsername: _json_key
      registryPassword: <gcr_service_account_json>
      pushRepo: gcr.io/<gcp_project_name>/<repo name>
    ```

## Configure AWS Elastic Container Registry (ECR)

1. Please reference this [official document for ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/ECR_on_EKS.html) to setup IAM role policy with ECR.

2. Install the tool `aws-ecr-credential` by helm to fetch the latest access token of AWS ECR.

    ```bash
    helm repo add infuseai https://charts.infuseai.io
    helm repo update
    helm install aws-ecr-credential infuseai/aws-ecr-credential \
      --set-string aws.account="<aws_account_id>" \
      --set aws.region="<aws_region>" \
      --set targetNamespace=hub
    ```

    The access token of ECR will be generated into a k8s secret `aws-registry` under the target namespace.

    ```text
    $ kubectl get secret -n hub aws-registry
    NAME           TYPE                             DATA   AGE
    aws-registry   kubernetes.io/dockerconfigjson   1      3h32m
    ```

3. Configuration example of ECR

    ```yaml
      customImage:
        registryEndpoint: https://8<aws_account_id>.dkr.ecr.<aws_region>.amazonaws.com
        pushRepo: <aws_account_id>.dkr.ecr.<aws_region>.amazonaws.com/<repo name>
        pushSecretName: aws-registry
    ```

### Notice

> AWS ECR only support push the container image to an existed repository. Please reference the [official document](https://docs.aws.amazon.com/AmazonECR/latest/userguide/repository-create.html) to create the corresponding repository on AWS ESC before adding the custom image build.
