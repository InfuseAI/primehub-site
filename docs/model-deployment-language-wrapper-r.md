---
id: model-deployment-language-wrapper-r
title: Package a Model Image for R
description: Package a Model Image for R
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="deploy-only tooltip">Deploy
    <span class="tooltiptext">Applicable to Deploy Edition</span>
  </div>
</div>

This doc shows how to package a model into a format-valid docker image for the PrimeHub model deployment feature.

The PrimeHub model deployment feature is based on Seldon. This doc takes [reference](#reference) from Seldon official documentations and other resources which are listed in the last part.

## Prerequisites

- Docker: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

## Prepare the Model and Code (R)

- Create a `install.R` file and write down all required packages (it could be empty if there was no any required packages).
    ```text
    install.packages('pls')
    ```

- Create a `Dockerfile` with the following content.
    ```dockerfile
    FROM rocker/r-apt:bionic

    RUN apt-get update && \
        apt-get install -y -qq \
            r-cran-plumber \
            r-cran-jsonlite \
            r-cran-optparse \
            r-cran-stringr \
            r-cran-urltools \
            r-cran-caret \
            curl

    ENV MODEL_NAME mnist.R
    ENV API_TYPE REST
    ENV SERVICE_TYPE MODEL
    ENV PERSISTENCE 0

    RUN mkdir microservice
    COPY . /microservice
    WORKDIR /microservice

    RUN curl -OL https://raw.githubusercontent.com/SeldonIO/seldon-core/master/incubating/wrappers/s2i/R/microservice.R > /microservice/microservice.R
    RUN Rscript install.R

    EXPOSE 5000
    CMD Rscript microservice.R --model $MODEL_NAME --api $API_TYPE --service $SERVICE_TYPE --persistence $PERSISTENCE
    ```

- Create a `mnist.R` file with the following example template.
    ```R
    library(methods)

    predict.mnist <- function(mnist,newdata=list()) {
        cn <- 1:784
        for (i in seq_along(cn)){cn[i] <- paste("X",cn[i],sep = "")}
        colnames(newdata) <- cn
        predict(mnist$model, newdata = newdata, type='prob')
    }

    new_mnist <- function(filename) {
        model <- readRDS(filename)
        structure(list(model=model), class = "mnist")
    }

    initialise_seldon <- function(params) {
        new_mnist("model.Rds")
    }
    ```

    - The file name `mnist.R` should be the same as **MODEL_NAME** under `Dockerfile`
    - Provide a function `initialise_seldon` to return an S3 class
    - Define a generic `predict` function for `mnist` class, this will be called with a newdata field with the data.frame to be predicted
    - `model.Rds` is a trained model file, it will be used while packaging the image.
    - You can also check the [keras example](https://github.com/InfuseAI/model-deployment-examples/tree/master/r_keras_mnist)

## Build the Image

- Make sure you are in the folder that includes `install.R`, `Dockerfile`, `R scripts`, and `model file`.

- Execute following command to install environment and package our model file into the target image `my-model-image`.
    ```bash
    docker build . -t my-model-image
    ```

- Then check the image by `docker images`.
    ```bash
    $ docker images | grep my-model-image
    my-model-image                      latest              04b42f702072        24 seconds ago      1.1GB
    ```

## Test the Image

- In order to make sure your model image is well packaged, you can run your model as a Docker container locally.
    ```bash
    docker run -p 5000:5000 --rm my-model-image
    ```

- And curl (replace `ndarray` content in curl example according to your application).
    ```bash
    curl -X POST localhost:5000/predict \
        -H 'Content-Type: application/json' \
        -d 'json={"data":{"ndarray":[[0.44,0.162,0.367,0.011,0.231,0.973,0.675,0.597,0.896,0.936,0.997,0.149,0.836,0.17,0.832,0.365,0.902,0.914,0.645,0.678,0.166,0.933,0.386,0.89,0.854,0.617,0.001,0.454,0.602,0.33,0.857,0.134,0.695,0.335,0.519,0.236,0.389,0.665,0.921,0.266,0.936,0.587,0.295,0.7,0.803,0.452,0.902,0.636,0.063,0.358,0.048,0.289,0.821,0.956,0.605,0.511,0.392,0.522,0.289,0.953,0.488,0.371,0.455,0.552,0.789,0.259,0.064,0.06,0.398,0.11,0.675,0.161,0.698,0.618,0.929,0.782,0.042,0.076,0.579,0.985,0.526,0.078,0.384,0.273,0.387,0.374,0.595,0.673,0.421,0.823,0.733,0.734,0.157,0.37,0.394,0.722,0.011,0.042,0.408,0.0,0.76,0.353,0.497,0.215,0.194,0.795,0.3,0.397,0.094,0.818,0.872,0.976,0.959,0.546,0.537,0.478,0.532,0.829,0.074,0.547,0.774,0.782,0.783,0.029,0.89,0.573,0.379,0.712,0.361,0.616,0.42,0.589,0.622,0.167,0.054,0.552,0.804,0.277,0.238,0.661,0.237,0.773,0.282,0.887,0.605,0.921,0.254,0.723,0.589,0.577,0.519,0.91,0.388,0.757,0.546,0.149,0.55,0.818,0.392,0.205,0.422,0.004,0.542,0.847,0.358,0.103,0.566,0.053,0.812,0.481,0.98,0.921,0.995,0.33,0.276,0.221,0.59,0.982,0.088,0.569,0.488,0.315,0.957,0.169,0.093,0.148,0.219,0.486,0.79,0.005,0.833,0.139,0.765,0.545,0.062,0.863,0.027,0.954,0.419,0.315,0.436,0.896,0.838,0.14,0.389,0.474,0.066,0.459,0.737,0.311,0.965,0.57,0.522,0.8,0.442,0.149,0.918,0.305,0.793,0.576,0.058,0.491,0.693,0.029,0.413,0.15,0.365,0.318,0.536,0.083,0.902,0.072,0.3,0.844,0.263,0.815,0.017,0.313,0.293,0.547,0.934,0.913,0.05,0.171,0.889,0.915,0.716,0.636,0.534,0.984,0.309,0.42,0.471,0.701,0.685,0.057,0.519,0.995,0.002,0.748,0.858,0.149,0.1,0.009,0.989,0.856,0.293,0.856,0.183,0.326,0.933,0.671,0.025,0.836,0.492,0.705,0.99,0.684,0.104,0.375,0.736,0.23,0.697,0.8,0.68,0.905,0.4,0.855,0.128,0.592,0.302,0.796,0.977,0.427,0.063,0.533,0.738,0.206,0.477,0.921,0.316,0.719,0.806,0.517,0.131,0.407,0.92,0.142,0.299,0.304,0.077,0.633,0.822,0.537,0.622,0.424,0.542,0.142,0.972,0.939,0.806,0.511,0.731,0.519,0.873,0.682,0.478,0.008,0.977,0.365,0.124,0.755,0.562,0.228,0.515,0.247,0.262,0.178,0.293,0.376,0.584,0.257,0.092,0.46,0.459,0.614,0.369,0.71,0.041,0.212,0.805,0.349,0.845,0.333,0.834,0.661,0.397,0.796,0.223,0.653,0.379,0.781,0.721,0.345,0.233,0.855,0.876,0.466,0.369,0.948,0.115,0.434,0.18,0.169,0.354,0.378,0.798,0.596,0.28,0.492,0.507,0.451,0.967,0.308,0.624,0.344,0.946,0.278,0.197,0.198,0.27,0.334,0.394,0.016,0.957,0.492,0.908,0.236,0.748,0.824,0.273,0.829,0.055,0.44,0.586,0.999,0.022,0.062,0.441,0.799,0.122,0.209,0.666,0.715,0.966,0.138,0.209,0.29,0.752,0.341,0.055,0.54,0.952,0.337,0.003,0.542,0.961,0.308,0.301,0.741,0.713,0.553,0.957,0.11,0.84,0.122,0.2,0.009,0.397,0.684,0.982,0.963,0.7,0.747,0.223,0.683,0.673,0.994,0.41,0.665,0.475,0.025,0.125,0.879,0.806,0.22,0.563,0.998,0.787,0.313,0.008,0.096,0.716,0.57,0.535,0.05,0.826,0.213,0.567,0.276,0.612,0.202,0.485,0.165,0.777,0.473,0.093,0.999,0.977,0.306,0.896,0.517,0.145,0.786,0.344,0.643,0.214,0.866,0.988,0.188,0.691,0.173,0.592,0.984,0.584,0.221,0.525,0.475,0.185,0.846,0.572,0.68,0.987,0.653,0.828,0.781,0.504,0.309,0.321,0.147,0.45,0.331,0.753,0.457,0.966,0.954,0.872,0.84,0.787,0.056,0.65,0.867,0.946,0.852,0.136,0.93,0.168,0.293,0.145,0.108,0.552,0.472,0.841,0.186,0.005,0.685,0.917,0.813,0.781,0.796,0.871,0.446,0.976,0.874,0.016,0.718,0.344,0.092,0.831,0.992,0.976,0.666,0.786,0.727,0.296,0.319,0.067,0.408,0.593,0.368,0.411,0.122,0.127,0.495,0.647,0.528,0.519,0.798,0.354,0.144,0.38,0.571,0.034,0.912,0.386,0.16,0.236,0.821,0.979,0.07,0.732,0.088,0.119,0.199,0.407,0.687,0.903,0.71,0.276,0.579,0.073,0.748,0.07,0.598,0.721,0.06,0.964,0.805,0.483,0.75,0.702,0.609,0.124,0.873,0.64,0.364,0.114,0.345,0.922,0.941,0.753,0.79,0.878,0.014,0.279,0.482,0.784,0.461,0.77,0.581,0.256,0.287,0.04,0.202,0.82,0.021,0.227,0.304,0.281,0.632,0.412,0.788,0.836,0.767,0.232,0.964,0.798,0.278,0.508,0.18,0.311,0.553,0.521,0.866,0.448,0.523,0.867,0.549,0.938,0.988,0.406,0.896,0.16,0.876,0.055,0.816,0.805,0.117,0.253,0.233,0.906,0.512,0.768,0.438,0.891,0.452,0.211,0.664,0.272,0.358,0.929,0.696,0.339,0.823,0.191,0.583,0.033,0.273,0.718,0.714,0.023,0.198,0.842,0.669,0.417,0.798,0.358,0.793,0.726,0.133,0.689,0.911,0.698,0.753,0.972,0.828,0.599,0.668,0.115,0.83,0.766,0.043,0.754,0.827,0.165,0.695,0.177,0.973,0.429,0.365,0.779,0.735,0.28,0.6,0.679,0.101,0.179,0.997,0.267,0.403,0.943,0.818,0.302,0.984,0.973,0.607,0.783,0.213,0.261,0.034,0.614,0.567,0.514,0.238,0.722,0.353,0.024,0.421,0.304,0.231,0.229,0.478,0.699,0.551,0.837,0.401,0.559,0.69,0.116,0.21,0.811,0.537,0.154,0.206,0.518,0.334,0.739,0.976,0.408,0.655,0.653,0.014,0.917,0.704,0.233,0.92,0.467,0.687,0.247,0.502,0.377,0.078,0.883,0.08,0.297,0.855,0.057,0.012,0.079,0.645,0.072,0.591,0.272,0.902]]}}'
    ```

You have successfully built the docker image for the PrimeHub model deployment.

## Push the Image

- Next, push the image into the docker hub (or other docker registries) and check PrimeHub tutorial to serve the model under PrimeHub.

    Tag your docker image.
    ```bash
    docker tag my-model-image test-repo/my-model-image
    ```

    Then push to docker registry.
    ```bash
    docker push test-repo/my-model-image
    ```

## Reference

- [https://docs.seldon.io/projects/seldon-core/en/latest/R/r_wrapping_docker.html](https://docs.seldon.io/projects/seldon-core/en/latest/R/r_wrapping_docker.html)
- [https://docs.seldon.io/projects/seldon-core/en/latest/wrappers/language_wrappers.html](https://docs.seldon.io/projects/seldon-core/en/latest/wrappers/language_wrappers.html)
- [https://docs.seldon.io/projects/seldon-core/en/latest/workflow/serving.html](https://docs.seldon.io/projects/seldon-core/en/latest/workflow/serving.html)