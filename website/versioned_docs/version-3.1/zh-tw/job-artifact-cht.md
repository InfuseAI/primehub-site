---
id: version-3.1-job-artifact-cht
title: Job Artifacts
original_id: job-artifact-cht
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

允許使用者把 Job 產生的檔案儲存起來，Job 完成後可以在使用者介面下載所產生的檔案。

## 前置需求

此功能必須要 **PrimeHub Store** 跟 **PHFS** 此兩項功能都打開才可以運作

## 產生 Artifacts

一個 Job 要產生 `artifacts`，只要建立一個叫 `artifacts` 的目錄 (也就是 `/home/jovyan/artifacts` )，並且把要拷貝的檔案放在裡面。步驟如下

1. 產生一 Job 並且 Command 如下

    ```
    mkdir -p artifacts/sub
    echo "hello" > artifacts/test.txt
    echo "hello" > artifacts/sub/test.txt
    ```

1. 到剛產生出來的 Job 的詳細頁面
1. 等待 Job 完成
1. 到 **Artifacts** 頁籤，你會看到剛剛產生的兩個 artifacts

   ![](assets/jartifact_folder.png)

## 連結 Artifacts 目錄

我們也可以產生一個 symbolic link `artifacts` 指到要被拷貝檔案的所在位置

1. 產生一 Job 並且 Command 如下

    ```
    mkdir -p mymodel
    echo "model1" > mymodel/model1
    echo "model2" > mymodel/model2
    ln -s mymodel artifacts
    ```

1. 到剛產生出來的 Job 的詳細頁面
1. 等待 Job 完成
1. 到 **Artifacts** 頁籤，你會看到剛剛產生的兩個 artifacts
   ![](assets/jartifact_link.png)

## Retention

檔案預設會保留七天，系統會每天自動清除過期的檔案。

## Size and File Count Limit

一個 Job 預設最多可以允許 100MB 大小以及 1000 個 artifact 檔案。如果超過限制，不會有任何檔案被拷貝。
