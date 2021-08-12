---
id: rstudio-image
title: RStudio image
sidebar_label: RStudio Image
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>


We could use [repo2docker](./repo2docker.md) to build a Jupyter Notebook with RStudio: https://github.com/binder-examples/r

1. Ensure repo2docker installed
2. Clone the source code and add `sudo` to `apt.txt`
3. Build image with arguments `--user-name jovyan --user-id 1000`
4. Add image to PrimeHub and start in `Safe Mode`

## Check repo2docker

Execute `jupyter-repo2docker` command to see if any output from the command

```bash
jupyter-repo2docker --help | head -10
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

If command `command not found: jupyter-repo2docker` shows, please install `python3-pip` and `jupyter-repo2docker` packages.

```bash
sudo apt install python3-pip
pip3 install jupyter-repo2docker
```

If `bash: jupyter-repo2docker: command not found` shows, please export `${HOME}/.local/bin` file to PATH.

```bash
export PATH=${HOME}/.local/bin:${PATH}
```

## Use repo2docker to build R-studio docker image.

Git clone the source code

```bash
git clone https://github.com/binder-examples/r.git && cd r
```

In the source directory, create `apt.txt` and add `sudo` in a line

```bash
echo "sudo" > apt.txt
```

Check the current file status.

```
$ git status
On branch master
Your branch is up to date with 'origin/master'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	apt.txt

nothing added to commit but untracked files present (use "git add" to track)
```

Verify

```
$ cat apt.txt
sudo
```

Build a image with the tag `infuseai/r` in the source directory (`.`)

```bash
jupyter-repo2docker --no-run --no-clean --user-name jovyan --user-id 1000 --push --image infuseai/r .
```

Then Check the docker image is successfully push to dockerhub.

## Build R-studio in PrimeHub

Add Docker image into PrimeHub images function.

![](assets/task_r_studio_create_image.png)

Start Notebook with the image in `Safe Mode`. 

![](assets/task_safe_mode.png)

Initially, it enters a general Jupyter Notebook.

> For the RStudio environment, we must add the following at the end of the URL: `?urlpath=rstudio` according to the [README](https://github.com/binder-examples/r#url-addresses-for-rstudio-and-shiny-environments).

Regarding accessing RStudio, in browser the current URL looks like

```
https://example.primehub.io/user/<username>/lab
```

Replace the suffix `lab` with `rstudio` to be like URL below and navigate.

```
https://example.primehub.io/user/<username>/rstudio
```

Here RStudio is

![](assets/repo2docker-rstudio.png)