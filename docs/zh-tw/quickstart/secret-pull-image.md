---
id: secret-pull-image
title: GitLab 用 pull secret
---

## 新增從 private GitLab registry 下載 image 用的 secret

PrimeHub 支援從 private Docker registry 下載 image。因為是 private，所以我們需要有對應的 secret 才有足夠的權限。

這份文件就說明我們如何新增從 **GitLab** 上的 private registry 下載 image 用的 secret。

### 產生 Deploy tokens on GitLab

首先我們需要在 GitLab 產生 deploy token，然後將此 token 加入至 PrimeHub 上的 Secret。我們可以照著 GitLab 官方文件 [[Creating a Deploy Token]](https://docs.gitlab.com/ee/user/project/deploy_tokens/#creating-a-deploy-token) 來產生 token。Token 產生後只會顯示一次，記得要將`Username`及`Token`儲存下來，稍候我們會需要它們；若不幸遺失了，可以重新產生新的 `Token`。

### 將 Token 加入 PrimeHub 的 Secret

1. 登入管理者、進入`Admin Dashboard`後，進入`Secrets`管理。

2. 點擊 `+ Add` 新增 `secret`。

3. 填入 `Name`、 `Display Name` (非必要)並選擇 `Type` 為 **`kubernetes.io/dockerconfigjson`**。

4. 填入 `Registry Host` 為 `registry.gitlab.com`.

5. 填入 `Username` 及 `Password` 為先前取得的 `deploy token`。

6. 點擊 `Confirm` 儲存.

之後我們可以指定此 `secret` 用來下載我們在 GitLab 上 private registry 的 image。
