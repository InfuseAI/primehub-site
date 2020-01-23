---
id: secret-gitsync
title: Gitsync secret for GitHub
---

## Add a secret for gitsync on GitHub

This quickstart describes how we have/add a secret for gitsync with a repo on GitHub.

PrimeHub support datasets of type `git`, in other words, we can use a dataset located on a repository via gitsync. What if the repository is private only? Then we need a `secret` to have proper privileges for access the repo.

### Generate deploy public key on GitHub

We need to deploy our public key on the GitHub. There is a nice guide from GitHub instructing [how to deploy a public key on the repository](https://developer.github.com/v3/guides/managing-deploy-keys/#setup-2), following the guide to generate a key and deploy it on a repo on GitHub.

### Add a key as a secret on PrimeHub

Once we have deployed our **public key** on the repo, we can add the key as a secret on PrimeHub.

1. Goes to `Admin Dashboard` and the `Secrets` management.

2. Click `+ Add` for adding a secret.

3. Fill `Name`, `Display Name`(Optional) and select `Type` **`Opaque`**.

4. Fill `Secret` with your **public key**.

5. Click `Confirm` to save the secret.

Now we can add a dataset pointing to our private repo on GitHub and select the secret for authorization.
