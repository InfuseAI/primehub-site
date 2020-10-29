---
id: version-3.1-repo2docker
title: repo2docker image
original_id: repo2docker
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

PrimeHub could support notebook images built from repo2docker tool, if an images had

* `sudo` installed
* jovyan user is `1000` uid
* notebook started in `Safe Mode`

Please install [repo2docker](https://repo2docker.readthedocs.io/en/latest/) tool, before you get started.

## Build image

We will use [binder-examples](https://github.com/binder-examples) to show how to make it compatible with PrimeHub

```
git clone https://github.com/binder-examples/tensorboard
```

In order to make it work on the PrimeHub, we need to add `sudo` package. It needs an [`apt.txt`](https://repo2docker.readthedocs.io/en/latest/config_files.html#apt-txt-install-packages-with-apt-get) file with this content:

```
sudo
```

After adding sudo, it is time to build an image with `jupyter-repo2docker`

* set user with `--user-name jovyan`
* set user uid with `--user-id 1000`
* configure the docker image tag by `--image`

```
jupyter-repo2docker --no-run --user-name jovyan --user-id 1000 \
--image infuseai/tensorboard-repo2docker-example .
```

If the command will invoke docker to build an image, you could push the image to docker repository and register it on the PrimeHub.

## Launch notebook

Users should start a notebook built from repo2docker in `Safe Mode`, because it might have installed libraries in the `$HOME`.

![](assets/repo2docker-safe-mode.png)




