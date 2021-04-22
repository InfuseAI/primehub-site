---
id: admin-nb-admin-cht
title: Notebooks Admin
---


## Notebook Instances

Notebook Admin 呈現 Hub 記錄的使用者 Notebook instance 的狀能。只要使用者曾經成功啟動過 Notebook 或昰正在執行中的，都會列於此。 正在執行的 instance 會顯示 `stop server`/`access server` 兩個按鈕，管理者可以針對各個 instance 採取動作；如果使用者自帳號建立後不曾啟動過 Notebook，則使用者不會出現在清單上。

管理者可用 `Stop All` 停止所有執行中的 instance。

![](assets/nb-admin-list.png)

## Out of Sync

「狀態不同步」，當管理者注意到 Hub 的資訊並沒有同步於 kubectl 得到的輸出時。

例如，頁面上顯示某使用者的 Notebook instance 執行中，但是透過 kubectl 查詢到的使用者 user pod 並不存在，也就是說，不在運行中。

```bash
kubectl -n hub get pod | grep jupyter-<user_id>
```

此時，可以用 `delete user` 來清除 Hub 對此使用者 Notebook 的記錄，下次同一使用者啟動 Notebook 後，Hub 會重新同步 user pod 得知的狀態。 使用者名稱會從清單中消失（使用者帳號依舊存在於 PrimeHub），同步狀態後，使用者名稱回到清單上。

## Shutdown Hub

>請先確定採取此措施的動機為何及採取後的動作為何。
>如果您看到的文件有建議此步驟 *Shutdown Hub* ，步驟如下：

**取消勾選** 二個選項，如截圖，點擊 `Shutdown` 並等待幾分鐘。

Hub 將會被重啟，重啟時並會試圖掃過所有的使用者取得同步狀態。等待時間會依據當時網路速度及使用者名單多寡來決定；使用者名單越多，等待時間越長。

![](assets/nb-admin-shutdown.png)
