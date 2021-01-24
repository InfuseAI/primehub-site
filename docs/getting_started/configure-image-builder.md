---
id: configure-image-builder
title: Configure Image Builder
description: Configure Image Builder
sidebar_label: Image Builder
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

PrimeHub provides Image Builder feature to let system and group administrators build custom images. Once images are built successfully, they will be pushed into specified repositories of a registry. Here we show to how to configure PrimeHub using remote registry for it.

Path | Description | Default Value
--- | ----- | -----------------------
`customImage.enabled` | If the custom image is enabled | `false`
`customImage.registryEndpoint` | The registry the built image to push  | `N/A`
`customImage.registryUsername` | Login user name for registry | `N/A`
`customImage.registryPassword` | Login password for registry | `N/A`
`customImage.pushRepoPrefix` | The image prefix for the build image. The result image will be `<repo prefix>/<image>:<tag>` | `N/A`

## Configure DockerHub Registry

1. Sign in DockerHub.

2. Go to `Account Settings`/`Security`/`Access Tokens` Generate new access token and save it. (REF: [Managing access tokens](https://docs.docker.com/docker-hub/access-tokens/)).

3. Create a repository and note down the `<namespace>` and `<repo name>`

4. Configuration example of DockerHub registry

    ```
    customImage:
      enabled: true
      registryEndpoint: docker.io
      registryUsername: <your_docker_hub_username>
      registryPassword: <your_access_token>
      pushRepoPrefix: docker.io/<namespace>
    ```

## Configure Google Container Registry (GCR)

1. Please reference this [official document for GCR](https://cloud.google.com/container-registry/docs/advanced-authentication) to get the username and password

2. The username is always `_json_key`. The password is the keyfile json. Please make it a one-line json string so that we can put it in the environment variable.

    ```
    cat keyfile | jq -c .
    ```

3. Configuration example of GCR

    ```
    customImage:
      enabled: true
      registryEndpoint: https://gcr.io
      registryUsername: _json_key
      registryPassword: <gcr_service_account_json>
      pushRepoPrefix: gcr.io/<gcp_project_name>
    ```