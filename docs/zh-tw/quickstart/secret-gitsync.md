---
id: secret-gitsync
title: GitHub 用 gitsync secret
---

## 新增 GitHub gitsync 用的 secret

這份文件說明我們如何取得並新增 `secret` 至 PrimeHub，藉此可以透過 `gitsync` 方式存取 **GitHub private repo** 上的 dataset。

PrimeHub 透過 `gitsync` 方式支援 `git` 型 的 dataset；也就是說我們可以存取存放在 private repo 內的 dataset。但是當 repo 為 private 時，我們需要有對應的 `secret` 獲得足夠的權限來存取。

### Generate deploy public key on GitHub

首先我們需要透過 GitHub 來為指定的 repo 設定 deploy public key。GitHub 已有提供簡單易懂的步驟文件
[[how to deploy a public key on the repository]](https://developer.github.com/v3/guides/managing-deploy-keys/#setup-2)。

我們依照步驟將**公開金鑰**配置在指定的 GitHub repo，記得保留此金鑰，稍候我們會需要用到。。

### Add a key as a secret on PrimeHub

一旦我們已經在 GitHub 配置**公開金鑰**，我們可以新增該 `secret`。

1. 以管理者帳號登入、並進入 `Admin Dashboard` 後，進入 `Secrets` 管理介面。

2. 點擊 `+ Add`按鈕，建立 `Secret`。

3. 填入 `Name`、`Display Name`(非必要) 及 選擇 `Type`為`Opaque`。

4. 填入 `Secret` 為先前設定的**公開金鑰**。

5. 點擊 `Confirm` 儲存。

新增此 `secret` 之後，我們就可以從 `Dataset` 管理，新增存在於對應的 GitHub repo 的 git 型 dataset。
