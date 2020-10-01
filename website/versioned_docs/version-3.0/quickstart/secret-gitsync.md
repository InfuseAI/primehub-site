---
id: version-3.0-secret-gitsync
original_id: secret-gitsync
title: Gitsync Secret for GitHub
---


<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

## Add a secret for gitsync on GitHub

This quickstart describes how we have/add a secret for gitsync with a repo on GitHub.

PrimeHub support datasets of type `git`, in other words, we can use a dataset located on a repository via gitsync. What if the repository is private only? Then we need a `secret` to have proper privileges for access the repo.

### Generate deploy public key on GitHub

We need to deploy our public key on the GitHub. There is a nice guide from GitHub instructing [how to deploy a public key on the repository](https://developer.github.com/v3/guides/managing-deploy-keys/#setup-2), following the guide to generate a key and deploy it on a repo on GitHub.

### Add a key as a secret on PrimeHub

Once we have deployed our **public key** on the repo, we can add the key as a secret on PrimeHub.

1. Log in as an administrator and [switch to Admin Portal](login-portal-admin).

2. Enter `Secrets` management and click `+ Add` for adding a secret.

3. Fill `Name`, `Display Name`(Optional) and select `Type` **`Opaque`**.

4. Fill `Secret` with your **public key**.

5. Click `Confirm` to save the secret.

Now we can add a dataset pointing to our private repo on GitHub and select the secret for authorization.
