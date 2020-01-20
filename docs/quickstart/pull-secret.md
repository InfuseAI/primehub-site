---
id: pull-secret
title: Pull Secret
---

This quickstart describes why we need a pull secret and how we have/add it in PrimeHub.

Nowadays there are many repository hosting service providers on Internet. In PrimeHub we are able to pull `image`, `dataset` via Git from those repositories. Those repositories, sometimes, are not public, therefore, we need `pull secret` to have **read privilege** for pulling down images or datasets. Most of time these private repositories belongs to your teams so let's assume we have the proper privilege to add deploy keys.

Here we take GitHub and GitLab as examples.

## GitHub

### Deploy public key on GitHub

First of all, we need to deploy our public key on the GitHub. There is a nice guide from GitHub instructing [how to deploy a public key on the repository](https://developer.github.com/v3/guides/managing-deploy-keys/#setup-2).

### Add a key as a secret on PrimeHub

Once you have deployed the **public key** on the repo, please keep the public key because we need it later on PrimeHub.

1. Goes to PrimeHub console and the `Secrets` page.

2. Click `+ Add` for adding a secret.

3. Fill `Name`, `Display Name`(Optional) and select `Type` `Opaque`.

4. Fill `Secret` with your **public key**.

5. Click `Confirm` to save the secret.

## GitLab

### Deploy tokens on GitLab

We can use a deploy token as a secret on PrimeHub for accessing a repo on GitLab.
GitLab also has a nice guide instructing how to [Creating a Deploy Token](https://docs.gitlab.com/ee/user/project/deploy_tokens/#creating-a-deploy-token) of a specific repo. 

Once you have applied the token, please keep the pair of `Username` and `Token` safely since they are only displayed once and we need the pair later on PrimeHub.

### Add a pair of token as a secret on PrimeHub

1. Goes to PrimeHub console and the `Secrets` page.

2. Click `+ Add` for adding a secret.

3. Fill `Name`, `Display Name`(Optional) and select `Type` `kubernetes.io/dockerconfigjson`.

4. Fill `Registry Host` with the url of the repo on GitLab.

5. Fill `Username` and `Password` with the token you retrieve from GitLab.

6. Click `Confirm` to save the secret.

Alright, we have added a pull secret, then we are able to use it to pull images or datasets. We have other quickstarts to show you how to do that.
