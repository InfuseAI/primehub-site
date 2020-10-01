---
id: version-2.7-job-submission-tutorial-p3
title: (Advanced) Use Job Submission to Tune Hyperparameters
original_id: job-submission-tutorial-p3
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

For typical machine learning algorithms, there are many hyperparameters to tune. Finding the right hyperparameters can be a very time consuming job. However, with Job Submission, you can let it run the job for you. All you have to do is simply check the results when the job is complete. 

1. Let's create another Python file `tune_dropout.py` in JupyterLab first:

        import tensorflow as tf
        import argparse
        import numpy as np
        
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
        
        prob = model.predict(x_test)
        prediction = np.argmax(prob, 1)
        equality = np.equal(prediction, y_test)
        accuracy = np.mean(equality)
        
        filename = 'dropout_{}.txt'.format(args.dropout)
        with open(filename, 'w') as f:
            print(accuracy, file=f)

    The main difference from the last version is that we are now output testing dataset's accuracy into a text file.

    *Please note: we are not splitting dataset into training, validation, testing sub-datasets. For convenience, we are only using this dataset to tune the hyperparameters.*

2. Select the Job Submission tab again and select same group, instance type and image. But this time, type the following command; replace `<group name>`:

        cd /project/<group name>/
        
        bestAcc=0
        bestRate=0
        for i in $(seq 1 9)
        do
          dropout=`awk "BEGIN {print $i/10}"`
          echo "dropout rate: "$dropout
          python -u tune_dropout.py --dropout $dropout
          acc=`cat dropout_$dropout.txt`
          echo $acc
          better=`awk "BEGIN { print ($acc > $bestAcc) ? \"YES\" : \"NO\" }"`
          if [ "$better" = "YES" ]
          then
            bestAcc=$acc
            bestRate=$dropout
            echo "Current best accuracy is: "$bestAcc
            echo "Current best dropout rate is: "$bestRate
          fi
        done
        
        echo "Best accuracy is: "$bestAcc
        echo "Best dropout rate is: "$bestRate

    Here we write shell script loops through a 0.1 to 0.9 dropout rate. At the end of this command, the best accuracy and dropout rate is printed out. 

    If you prefer, rather than writing in a shell script, you can create another Python file and wrap the original code as a function and write a `for loop` in Python. We can submit this new Python file as a job to find out best dropout rate. 

3. After your job has succeeded, you can view the best dropout rate for your model.

    ![image](assets/jobsub-tt-p3-1.png)

    Your results may not match this image above 

In the future, we will provide even better hyperparameters tuning functions. Stay tuned!
