---
id: admin-secret
title: Secret Management
description: Secret Management
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
  <div class="deploy-only tooltip">Community
    <span class="tooltiptext">Applicable to Deploy Edition</span>
  </div>
</div>

Secret management provides the capabilities of managing secrets which are used for pull images or datasets, such as create, delete, edit secrets. Before adding secrets, we have to gain those generated secrets from sources of services. Please see [gain and add secrets](#gain-and-add-secrets).

## Creating New Secrets

![](assets/secret_add_v38.png)

Click `Add` to add a Secret and it will pop up the edit screen of Secret.

![](assets/secret_empty_v38.png)

You need to fill in these fields:

+ `Name`: (required): Only lowercase letters, numbers, hyphen `-` and a dot `.` can be filled in.

+ `Display Name`

+ `Type`: `Git Dataset`, `Image Pull`

### Type Git Dataset

![](assets/secret_opaque_key_v26.png)

+ `Secret`: A secret of Git Dataset is used for pulling a dataset via git. The context is a private key related to a registered public key of ssh. Please see [Dataset Management](admin-dataset) to learn how to specify a pull-secret for a dataset.

### Type Image Pull 

![](assets/secret_dockerconfigjson_v26.png)

It uses the secret of `docker-registry` type to authenticate with a container registry to pull an image. The registry host and credentials are required. Please see [Image Management](admin-image) to learn how to specify a pull-secret for an image.

+ `Registry Host`: The url of registry host.

+ `Username`

+ `Password`

Click `Confirm` to complete the addition.

## Deleting Secrets

![](assets/actions.png)

Click `Delete` in the Secrets list, the confirmation dialog will pop up, and the Secret will be deleted when you click `OK`.

## Editing Secrets

![](assets/actions.png)

Click `Edit` to enter the edit page of the Secret.

## Gain and add secrets

+ [Add pull secrets of private registry (GitLab)](../quickstart/secret-pull-image)

+ [Add gitsync secret of private repository (GitHub)](../quickstart/secret-gitsync)
  
+ [Other secrets](../quickstart/secret-pull-image#misc)
