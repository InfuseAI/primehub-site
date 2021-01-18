---
id: notebook-as-job-cht
title: Submit a Notebook as a Job
description: Submit a Notebook as a Job
sidebar_label: Notebook as a Job
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

## 初階範例

> 確認使用者的工作群組已開啟 Group Volume。

1. 從外掛選擇 **API Token** 並填入使用者 Token。參照[產生使用者 Token](../tasks/api-token)。
   
    ![](assets/ph-extension-token.png)
2. 起始 Notebook 環境。

3. 從環境中進入工作群組的共享 Group Volume 資料夾中，新增空白 notebook 檔。
   >如果開啟的 notebook 檔並非位在 group volume 目錄下，當遞交時將會看到訊息 *"Now, we only support notebook under group volume. Please move your noteobook into your group volume.*"。
4. 新增兩個 cells，分別為：
   
   ```
   !pip install camelcase
   ```

    因為我們稍候會給予參數，因此我們註解 `start=1` 及 `end=10`。

    ```
    import time
    import camelcase

    camel = camelcase.CamelCase()

    txt = "this method capitalizes the first letter of each word."

    #start = 1
    #end = 10

    print("Counting from 1 to 10:")
    for num in range(start, end + 1):
        time.sleep(1)
        print('{}: {}'.format(num, camel.hump(txt)))
    ```



5. 從外掛選擇 **Submit Notebook as Job**。
   
    1.  選擇任務所需的 Instance Type。
    2.  請確保選擇的映像檔是 InfuseAI 提供最新的映像檔 或是建立在其上的映像檔。參照列表。
    3.  填入 **Job Name**。
    4.  於 **Notebook Parameters** 填入 `start=1; end=10`。(以`;`為分隔符號，不能有斷行！)
    5.  送出。

    ![](assets/ph-extension-sub-nb.png)

6. 點選連結查看任務狀態。

    ![](assets/ph-extension-success.png)

7. 任務完成後，從 Notebook 環境下的工作群組 Group Volume 可以看到在原始的 notebook 檔旁產出的 notebook 檔，以供結果查閱。在此，我們可以注意先前給予參數的內容插入至第一個 cell。
   
   ![](assets/nb-as-job-output.png)

## 儲存輸出 Job Artifacts

因為 Notebook 被以任務的形式遞交出去，因此我們可以利用儲存輸出結果為 Job Artifact。 請參照 [Job Artifact](job-artifact-cht)。

以下列二個 cell 取代原先第二個 cell。

建立 `artifacts/` 資料夾。

```bash
!mkdir -p artifacts/
```

此範例會在 `artifacts/` 下開啟新檔案 `hello_artifact.txt` 並寫入輸出結果。

```python
import time
import camelcase

camel = camelcase.CamelCase()

txt = "this method capitalizes the first letter of each word."

start = 1
end = 10

art = open("artifacts/hello_artifact.txt", "w")

print("Counting from 1 to 10:")
for num in range(start, end + 1): 
    time.sleep(1)
    print('{}: {}'.format(num, camel.hump(txt)))
    art.write('{}: {}\n'.format(num, camel.hump(txt)))
art.close()
```

將此 Notebook 遞交成任務；一旦執行結束，我們可以在 Job Artifacts 裡檢閱 `hello_artifact.txt`。

   ![](assets/nb-as-job-using-artifacts.png)

同時從 Notebook，檔案也會在 `/phfs/jobArtifacts/job-<ID>/hello_artifact.txt` 路徑。
