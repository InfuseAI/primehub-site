---
id: customize-job-runtime
title: Customize job runtime
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>


Primehub users devlop their programs in the Jupyter Notebook evnironment. In the notebook, it is easy to install 3rd-party library to users' home volume. However, any program runs in the job runtime environment, the user volume is not available by design. It could be customized the job runtime environment, if any runtime dependencies installed in the PrimeHub Store (i.e. the `/phfs` directory).

We will discuss two examples in this how-to document:

* All dependencies are installed by pip
* A dependency is compilation needed

## Basic idea

Customzation a job runtime is:

1. install dependency to the PrimeHub Store
2. setup extra search path to your application

Please configure the dependency search path to your application:

* Use `LD_LIBRARY_PATH` environment variable to linux shared library (.so files)
* Use `PYTHONPATH` environment variable to python application

If the list didn't cover your language runtime, please look up its official documentation.


## PIP

For python application, using `pip` package installer is simpler way to customize job runtime. Packages could be installed into assigned directory by `--target`. For example, a user want to run jobs with `mlflow`, install libraries into `/phfs/mlflow-library` by `--target` option 

```bash
pip install --target /phfs/mlflow-library mlflow sklearn
```

Add python package path at the runtime by `PYTHONPATH` variables

```bash
jovyan@jupyter-phadmin:~/phfs/mlflow$ PYTHONPATH=/phfs/mlflow-library/ python examples/sklearn_elasticnet_wine/train.py
Elasticnet model (alpha=0.500000, l1_ratio=0.500000):
  RMSE: 0.7931640229276851
  MAE: 0.6271946374319586
  R2: 0.10862644997792614
```

In job command lines, we will use this form to setup extra dependency:

```python
PYTHONPATH=/phfs/mlflow-library/ python [your-application.py]
```

## Run with other native library

In some cases, a library works with its native library. It should configure dependencies by `LD_LIBRARY_PATH`. For example, a user want to run jobs with [warp-ctc](https://github.com/SeanNaren/warp-ctc). Its build steps was:

* build the native library
* install the python package


Following the build steps, we could build the `libwarpctc.so` first and copy it to `/phfs/warpctc/warpctc.so`, then build the Python package with `--prefix` and `WARP_CTC_PATH` environment variables

```bash
WARP_CTC_PATH=/phfs/warpctc python setup.py install --prefix=/phfs/warpctc
```

In the build log, it told the installed path, we will use it at `PYTHONPATH`

```bash
Installed /phfs/warpctc/lib/python3.7/site-packages/warpctc_pytorch-0.1-py3.7-linux-x86_64.egg
```

```bash
LD_LIBRARY_PATH=/phfs/warpctc \
PYTHONPATH=/phfs/warpctc/lib/python3.7/site-packages/warpctc_pytorch-0.1-py3.7-linux-x86_64.egg \
python [your-application.py]
```


