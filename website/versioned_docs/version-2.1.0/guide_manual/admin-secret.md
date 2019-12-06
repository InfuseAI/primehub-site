---
id: version-2.1.0-admin-secret
title: Secret Management
original_id: admin-secret
---

Secret management provides the capabilities of managing secrets which are used for pull images or datasets, such as create, delete, edit secrets.

## Creating New Secrets

![](assets/secret_add.png)

Click `Add` to add a Secret and it will pop up the edit screen of Secret.

![](assets/secret_empty.png)

You need to fill in these fields:

+ `Name` (required): Only lowercase letters, numbers, dash - and the bottom line _ can be filled in.

+ `Display Name`

+ `Type` `Opaque`, `kubernetes.io/dockerconfigjson`

### Type Opaque

![](assets/secret_opaque_key.png)

+ `Secret`: A secret of Opaque is used for pulling a dataset via git. The context is a private key related to a registered public key of ssh. Please see [Dataset Management](admin-dataset) to learn how to specify a pull-secret for a dataset.

### Type dockerconfigjson

![](assets/secret_dockerconfigjson.png)

It uses the secret of `docker-registry` type to authenticate with a container registry to pull an image. The registry host and credentials are required. Please see [Image Management](admin-image) to learn how to specify a pull-secret for an image.

+ `Registry Host`: The url of registry host.

+ `Username`

+ `Password`

Click `Confirm` to complete the addition.

## Deleting Secrets

![](assets/secret_delete.png)

Click `Delete` in the Secrets list, the confirmation dialog will pop up, and the Secret will be deleted when you click `OK`.

## Editing Secrets

![](assets/secret_edit.png)

Click `Edit` to enter the edit page of the Secret.
