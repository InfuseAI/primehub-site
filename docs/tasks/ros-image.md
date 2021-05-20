---
id: ros-image
title: ROS image
sidebar_label: ROS Image
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>


We could use [repo2docker](./repo2docker.md) to build a Jupyter Notebook with ROS support: https://github.com/RoboStack/jupyterlab-ros

1. Ensure repo2docker installed
2. Clone the source code and add `sudo` to `apt.txt`
3. Build image with arguments `--user-name jovyan --user-id 1000`
4. Add image to PrimeHub and start in `Safe Mode`

## Check repo2docker

Execute `jupyter-repo2docker` command to see if any output from the command

```bash
$ jupyter-repo2docker --help | head -10
usage: jupyter-repo2docker [-h] [--config CONFIG] [--json-logs]
                           [--image-name IMAGE_NAME] [--ref REF] [--debug]
                           [--no-build]
                           [--build-memory-limit BUILD_MEMORY_LIMIT]
                           [--no-run] [--publish PORTS] [--publish-all]
                           [--no-clean] [--push] [--volume VOLUMES]
                           [--user-id USER_ID] [--user-name USER_NAME]
                           [--env ENVIRONMENT] [--editable]
                           [--target-repo-dir TARGET_REPO_DIR]
                           [--appendix APPENDIX] [--subdir SUBDIR] [--version]
```

If `command not found`, please install it by `pip install jupyter-repo2docker`

```
command not found: jupyter-repo2docker
```

## Update configuration

Clone the source code

```
git clone https://github.com/RoboStack/jupyterlab-ros && cd jupyerlab-ros/binder
```

In the source, update `binder/apt.txt` and add `sudo` in a line

## Build image

Build a image with the tag `infuseai/ros` in the source directory (`.`)

```
jupyter-repo2docker --no-run --no-clean --user-name jovyan --user-id 1000 --push --image infuseai/ros .
```


## Add Image to PrimeHub

After the image tagged`infuseai/ros` is pushed, add it to the PrimeHub and start Notebook with the image in `Safe Mode`.

![](assets/ros-0.png)