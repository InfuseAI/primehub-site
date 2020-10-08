---
id: version-3.0-dockerhub-registry
title: 利用 DockerHub Registry
original_id: dockerhub-registry
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
</div>

## Image Builder 利用 DockerHub Registry 發佈 Image

PrimeHub 的 `Image Builder` 功能讓管理者可以建立客製 image，image 創建完成後會發佈到設定的 registry 中指定 repository。

這份文件說明如何設定 PrimeHub 發佈 Image Builder 建立的 image 至 DockerHub registry 。

## 先決條件

操作者需要有在實際環境中 PrimeHub 目錄的存取權限，以及`.env`檔的存取權限。

## 步驟

### 設定 DockerHub registry

1. 登入 DockerHub。
    
2. 進入 `Account Settings`/`Security`/`Access Tokens` 由此生成 access token 並記錄下來。 [官方參考: [Managing access tokens](https://docs.docker.com/docker-hub/access-tokens/)]

3. 新增 repository 並記下其 `<namespace>` 及 `<repo name>` 資訊；我們需要填入至 `.env`。

4. 編輯 `.env`檔，並依照持有資訊填入下列的環境變數；若原先無此變數，請自行添加。
   
    |環境變數                             |變數值|
    |--------------------------------|-----|
    |`PRIMEHUB_FEATURE_CUSTOM_IMAGE`|`true`|
    |`PRIMEHUB_CUSTOM_IMAGE_REGISTRY_ENDPOINT`|`docker.io`|
    |`PRIMEHUB_CUSTOM_IMAGE_REGISTRY_USERNAME`|`<your_docker_hub_username>`|
    |`PRIMEHUB_CUSTOM_IMAGE_REGISTRY_PASSWORD`|`<your_access_token>`|
    |`PRIMEHUB_CUSTOM_IMAGE_REPO_PREFIX`|`docker.io/<namespace>`|

5. 執行下列指令安裝 PrimeHub 元件；指令會依據`.env`來設定配置。

    ```bash
    cd ${PRIMEHUB_REPO} # 進入環境下 PrimeHub 目錄
    make component-diff-primehub # 變更差異比對
    make component-install-primehub # 元件安裝
    ```

我們已經成功設定 PrimeHub 利用指定的 DockerHub registry 作為 Image Builder 發佈 image 的目的地。接下來透過 Image Builder 創建的 image 會自動發佈於此。

### 由 Image Builder 創建 Image

此時於 Image Builder 建立 image spec 時，請將 `Name` 填入完全一致的 `<repo name>`，且該 repository 必須要事先存在於 DockerHub；輸入完其它欄位，建立 image 成功後，Image Builder 會自動發佈至我們配置的 DockerHub registry 中指定的 repository。

1. 由 Image Builder 新增 Image Spec。

    + `Name`: `test-build` 為我們在 DockerHub 的 `<repo-name>`。
  
    + `Base Image`: `registry.gitlab.com/infuseai/docker-stacks/scipy-notebook` 為 InfuseAI 官方提供的 base images 之一； 請見[「客製 image 指南」](../guide_manual/custom-image-guideline.md)。
  
    + `Use Image PullSecret`: InfuseAI 官方提供的 registry 為非公開，故需要指定特定的認證權限；請見[「GitLab 用 PullSecret」](../quickstart/secret-pull-image.md)，如果需要認證權限，請洽 InfuseAI 窗口。

![](assets/dockerhub-image-builder.png)

2. Image 建立發佈完成後，可以得知該 image 已發佈至指定的 **registry/namespace/repository** `docker.io/gabrielxinfuseai/test-build`。

    ![](assets/dockerhub-job-image-build.png)

3. DockerHub 也可見到從 **Image Builder of PrimeHub** 發佈而來的資訊。

![](assets/dockerhub-test-build.png)

### 使用 Image

我們可以將此 image(url) 透過 Image Management 加入至 PrimeHub，讓使用者可以選用；請見[「Image Management」](../guide_manual/admin-image-cht) 以及[「增加 Image」](../quickstart/add-image.md)。
