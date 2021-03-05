---
id: version-3.3-customize-job-runtime
title: Customize job runtime
original_id: customize-job-runtime
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

Users, sometimes, require to install 3rd-party packages into environments (Notebook, Job). Those packages, by default, are installed in individual user home volume which is not available to Jobs environment. It implies that repeating same packages installation in different environment instances is not avoidable if packages also are needed.

One way is to build custom images with built-in required packages with Admin Privileges, the other is to customize runtime environment as general users.

This document guides how to install packages once for re-use in other environments, or even re-use by same group members.
By installing packages specifically in [Group Volume](../quickstart/nb-data-store#group-volume) instead of User Volume, users are able to have certain runtime dependencies customization.

Two examples are demonstrated here:

* All dependencies are installed by *pip*
* A dependency is compilation needed

## Basic idea

Customization of runtime are two parts:

1. Install packages of dependency into Group Volume
2. Append extra search paths to your application

Configure the dependency search path to your application:

* Use `LD_LIBRARY_PATH` environment variable to linux shared library (.so files)
* Use `PYTHONPATH` environment variable to python application

Here only list *Python*-related path, for other languages, please visit their official documentation.

## PIP

For python application, using `pip` package installer is simpler way to customize job runtime. Packages could be installed into assigned directory by `--target`. 

E.g. Install  `mlflow` libraries into `<GROUP_VOLUME>/mlflow-library` by `--target` option with specified `<GROUP_Volme>`.

```bash
pip install --target <GROUP_VOLUME>/mlflow-library mlflow sklearn
```

Then specify `PYTHONPATH` variables with python package path to Group Volume.

```bash
jovyan@jupyter-phadmin:~/mlflow$ PYTHONPATH=<GROUP_VOLUME>/mlflow-library/
jovyan@jupyter-phadmin:~/mlflow$ python examples/sklearn_elasticnet_wine/train.py

Elasticnet model (alpha=0.500000, l1_ratio=0.500000):
  RMSE: 0.7931640229276851
  MAE: 0.6271946374319586
  R2: 0.10862644997792614
```

In command lines of a Job, use this form to specify extra dependency:

```python
PYTHONPATH=<GROUP_VOLUME>/mlflow-library/ python [your-application.py]
```


## Load native dynamic library at runtime

In some cases, a library works with its native library. It should configure dependencies by `LD_LIBRARY_PATH`. 

For example, submit a job running [warp-ctc](https://github.com/SeanNaren/warp-ctc) which requires two steps according to the installation documents:

* Build the native library
* Install the binding python packages


In this case, we have to build the `libwarpctc.so` first and copy it to `<GROUP_VOLUME>/warp-ctc/libwarpctc.so`, then build the Python package with `--prefix` and `WARP_CTC_PATH` environment variables

```bash
cd pytorch_binding
WARP_CTC_PATH=<GROUP_VOLUME>/warp-ctc \
python setup.py install --prefix=<GROUP_VOLUME>/warp-ctc
```

In the build log, it points the installed path, set `PYTHONPATH` the path

```bash
Installed <GROUP_VOLUME>/warp-ctc/lib/python3.7/site-packages/warpctc_pytorch-0.1-py3.7-linux-x86_64.egg
```

```bash
LD_LIBRARY_PATH=<GROUP_VOLUME>/warp-ctc \
PYTHONPATH=<GROUP_VOLUME>/warp-ctc/lib/python3.7/site-packages/warpctc_pytorch-0.1-py3.7-linux-x86_64.egg \
python [your-application.py]
```

>Installed packages under Group Volume are also available to other group members as long as paths are specified, since Group Volume is a shared data store within the group.
