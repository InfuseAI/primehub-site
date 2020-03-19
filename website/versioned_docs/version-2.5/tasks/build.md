---
id: version-2.5-build
title: Package Builder
original_id: build
---

The package builder is in the `${PRIMEHUB_HOME}/installer/` folder

## Build

```
make build
```

In the build process, it will
1. `build-common`: copy files to `build/`
1. `build-bin`: download required binaries to `build/bin`
1. `build-charts`: fetch charts to `build/charts`. These charts are used from airgapped installation.

## Release
Generate the release tarball

```
make release 
```
then the release will go to `release/` 

## Release Docker Images

The release tarball is used for airgapped. For more information, please reference the [airgap](airgap.md) docuemnt.

```
make release-images
```

## Clean

Clean up the generated files.
```
make clean 
```
