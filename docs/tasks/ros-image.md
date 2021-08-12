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
```

```bash
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

If we got command `command not found: jupyter-repo2docker`, please install python3-pip and jupyter-repo2docker.

```bash
sudo apt install python3-pip
pip3 install jupyter-repo2docker
```

If we got command `bash: jupyter-repo2docker: command not found`, please export bin file to PATH.

```bash
export PATH=${HOME}/.local/bin:${PATH}
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

Add Docker image into PrimeHub images function.

![](assets/task_ros_create_image.png)

Start Notebook with the image in `Safe Mode`. 

![](assets/task_safe_mode.png)

After starting the image, please clone example jupyter notebook to see the demo.

```bash
git clone https://github.com/RoboStack/jupyter-ros.git
```

- Open `notebooks/ROS 3D Grid.ipynb` jupyter notebook and click `circle icon` to open live demo.

![](assets/task_ros_icon_location.png)

You will see the live demo in jupyterlab.

![](assets/ros-0.png)