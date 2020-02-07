---
id: version-2.4-secret-pull-image
title: Pull secret for GitLab
original_id: secret-pull-image
---

## Add a secret for pulling an image on GitLab registry

This quickstart describes how we have/add a secret dedicated to pull an image from GitLab on PrimeHub.

PrimeHub supports to pull an `image` from a **Docker registry**. But what if the registry is private only?  Then we need a `secret` to have proper privileges to do it.

### Generate a deploy token on GitLab

We need a deploy token generated from GitLab as a secret on PrimeHub for accessing a private registry on GitLab.
Luckily, GitLab has a nice guide instructing how to [Creating a Deploy Token](https://docs.gitlab.com/ee/user/project/deploy_tokens/#creating-a-deploy-token) of a specific repo. 

Following the guide to have a deploy token and keeping the pair of `Username` and `Token` safely since they are only displayed once otherwise we have to re-generate a token again.

### Add a token as a secret on PrimeHub

1. Goes to `Admin Dashboard` and the `Secrets` management.

2. Click `+ Add` for adding a secret.

3. Fill `Name`, `Display Name`(Optional) and select `Type` **`kubernetes.io/dockerconfigjson`**.

4. Fill `Registry Host` with `registry.gitlab.com`.

5. Fill `Username` and `Password` with the token generated from GitLab.

6. Click `Confirm` to save the secret.

Alright, we have added a pull secret for our private GitLab registry, then we are able to use it to pull images. Once we add an image description which is located on our private GitLab registry on PrimeHub, we have to select this secret as an `Image Pull Secret`.
