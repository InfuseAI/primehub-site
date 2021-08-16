---
id: secret-pull-image
title: Pull Secret for GitLab
description: Pull Secret for GitLab
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

**Secret**, is a credential for proper permissions on repositories or registries.

## Add a image pull-secret

This quickstart describes how we have/add a secret dedicated to pull an image from GitLab on PrimeHub.

PrimeHub supports to pull an `image` from a **Docker registry**. But what if the registry is private only?  Then we need a `secret` to have proper privileges to do it.

### Generate a deploy token on GitLab

We need a deploy token generated from GitLab as a secret on PrimeHub for accessing a private registry on GitLab.
Luckily, GitLab has a nice guide instructing how to [Creating a Deploy Token](https://docs.gitlab.com/ee/user/project/deploy_tokens/#creating-a-deploy-token) of a specific repo. 

Following the guide to have a deploy token and keeping the pair of `Username` and `Token` safely since they are only displayed once otherwise we have to re-generate a token again.

### Add a token as a secret on PrimeHub

1. Log in as an administrator and [switch to Admin Portal](login-portal-admin).

2. Enter the `Secrets` management and click `+ Add` for adding a secret.

3. Fill `Name`, `Display Name`(Optional) and select `Type` **`Image Pull`**.

4. Fill `Registry Host` with `registry.gitlab.com`.

5. Fill `Username` and `Password` with the token generated from GitLab.

6. Click `Confirm` to save the secret.

Alright, we have added a pull secret for our private GitLab registry, then we are able to use it to pull images. Once we add an image description which is located on our private GitLab registry on PrimeHub, we have to select this secret as an `Image Pull Secret`.

---

## MISC.

We, of course, can add secrets not only from GitLab, but also secrets from other sources, here are some references.

+ [Pull an Image from a Private Registry to Kubernetes](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/)
  
+ [Docker Secret](https://docs.docker.com/engine/swarm/secrets/)

+ [Authenticating with the GITHUB_TOKEN](https://help.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token)
