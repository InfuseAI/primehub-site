---
id: job-submission-tutorial-p2
title: (Part2) MNIST classifier 訓練範例程式
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

1. 登入後，進入 `Notebooks`。
2. 選擇至少有 1 virtual CPU 及 2GB RAM 的 `instance type`。
3. 選擇有`Tensorflow 1.14`環境的`image`。
4. 點擊`start Notebook`起始 Notebook。

    ![image](assets/jobsub-tt-p2-2.png)

我們將會利用已開啟的`group volume`；依照步驟將程式存在`group volume`：

1. 雙擊進入 group volume folder
2. 點擊右方工作區`Other`下的 `Text File`，開啟文字編輯檔。
3. 按右鍵選擇`rename`將`untitled.txt`改名為`train_mnist.py`。
4. 輸入下方的程式碼；此為 MNIST classifier 訓練用的範例程式。

    ```
    import tensorflow as tf
    import argparse
    import shutil
    import os

    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument('--dropout', type=float, default=0.2)
    args = parser.parse_args()

    mnist = tf.keras.datasets.mnist

    (x_train, y_train),(x_test, y_test) = mnist.load_data()
    x_train, x_test = x_train / 255.0, x_test / 255.0

    model = tf.keras.models.Sequential([
        tf.keras.layers.Flatten(input_shape=(28, 28)),
        tf.keras.layers.Dense(512, activation=tf.nn.relu),
        tf.keras.layers.Dropout(args.dropout),
        tf.keras.layers.Dense(10, activation=tf.nn.softmax)
    ])

    model.compile(optimizer='adam',
                    loss='sparse_categorical_crossentropy',
                    metrics=['accuracy'])

    model.fit(x_train, y_train, epochs=5)
    model.evaluate(x_test, y_test)

    export_path = "params_dropout-{}".format(args.dropout)
    if os.path.isdir(export_path):
        print('Cleaning up\n')
        shutil.rmtree(export_path)
    os.mkdir(export_path)

    model.save(os.path.join(export_path, 'my_model'))
    ```

*請注意： 在範例程式中，我們將 model 存在 group volume 的相對路徑。*

到此，我們已經把`job submission`前置準備都做好了。

## Submit a Job

回到`user portal`，進入`Jobs`。

請確認目前預先決定的專案群組，是否為設想的群組；切換專案群組請用下拉選單 `Group:`。

1. 點擊右上方的`Create Job`按鈕。
2. 從左方選擇 `instance type` 及 `image`；確保跟我們用來起始`Notebook`的環境一致。
3. 在右方將 job 命名為`training mnist`。
4. 因為我們的範例程式存放在 group volume 且 group volume 會被掛載在`/home/jovyan/<group name> -> /project/<group name>`，在`Commnad`欄位輸入下方指令； 請置換 `<group name>` 為實際名稱 ：

    ```
    cd /project/<group name>/
    python -u train_mnist.py --dropout 0.2
    ```
    參考：[Job 可存取工作目錄、專案目錄及資料集目錄](job-submission-cht#job-可存取工作目錄-專案目錄及資料集目錄)
### Command 範例說明：

- 因為我們產出 `my_model` 在 group volume 相對路徑，所以我們需要先`cd /project/<group name>` or `cd <group name>/`。
- `<group name>` 大小寫有差別；
- python command 參數`-u` 強制 python 直接輸出 log 不要先 buffer；在 logs 頁籤可以更即時看到 log。
- 參數`--dropout`是範例程式中，指定要接收的輸入參數。
- Job Submission 會依序執行一行一行的指令，如同執行 script 般。
- 滑鼠指標移到小圖示`?`上方，可以看到更多提示。

#### Jobs 列舉及 refresh 按鈕

![image](assets/jobsub-tt-p2-5.png)

當 job 遞交後，起初會在`Pending`狀態；點擊右上方`Refresh`按鈕可以更新其狀態。

#### Logs 頁籤

![image](assets/jobsub-tt-p2-6.png)

點擊`Logs`頁籤可以查看 job 即時執行記錄。此時 job 正在背景執行，我們可以離開此頁面去做其它事，不必開啟頁面等候；事後回來查看狀態及記錄。

當完成後，範例會輸出`my_model`至 group volume，我們可以開啟 JupyterLab 查看。

## Test Outputted Model in JupyterLab

到了驗證我們訓練 MNIST classifier 的時候。

#### Outputted model file located in JuypterLab

![image](assets/jobsub-tt-p2-7.png)

先在同樣環境下起始 JupyterLab tab， 我們可以在 group volume 下看到`params_dropout-0.2/my_model`。

*如果沒有看到輸出的檔案，那就須回到該 job 的 Logs 頁籤，查看記錄及問題；查明並修正問題後，再次遞交 job。*

讓我們來依照步驟來驗證 MNIST classifier：

1. 先進入 `group volume`
2. 點擊右方工作區`Notebook`下的 `Python 3`。
3. 輸入下方驗證用的程式碼至第一個`cell`：

    ![image](assets/jobsub-tt-p2-8.png)

    **Example Code**
    ```
        import tensorflow as tf
        
        mnist = tf.keras.datasets.mnist
        (x_train, y_train),(x_test, y_test) = mnist.load_data()
        x_train, x_test = x_train / 255.0, x_test / 255.0
        
        model = tf.keras.models.load_model('params_dropout-0.2/my_model')
        model.evaluate(x_test, y_test)
    ```

4. 按下 `shift + enter`執行該`cell`。

    ![image](assets/jobsub-tt-p2-9.png)

    *model accuracy 將近 ~0.98；我們可以忽略 warning。*

至此我們已經透過`Job Submission`訓練出一個`MNIST classifier`。之後我們可以遞交多個 job 帶入不同的 drop rates 來驗證分別產出的結果。

*建議：先用 notebook 來快速驗證程式，沒問題後，再轉成 python file 交付給 job submission。*

## Job Submission 進階教學

想要試試其它 job submission 進階教學，請參考英文教學文件：

+ [[(Advanced) Use Job Submission to Tune Hyperparameters]](../job-submission-tutorial-p3)
  
+ [[(Advanced) Model Serving by Seldon]](../job-submission-tutorial-p4)
