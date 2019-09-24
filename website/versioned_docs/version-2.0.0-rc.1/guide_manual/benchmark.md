---
id: version-2.0.0-rc.1-benchmark
title: Benchmark
original_id: benchmark
---

Scripts to benchmark the system and gather the basic hardware information.


# Basic Benchmark

## Basic Information

In this benchmark, it will

- gather hardware information

  - get cpu information by `lscpu`
  - get memory information by `free -h` and `cat /proc/meminfo`
  - get gpu information by `nvidia-smi`
  - get the disk partitions by `lsblk`

- benchmark
  - cpu

### Prerequisite

1. NVIDIA device driver: driver can be downloaded [here](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64). Once install, please check _nividia-smi_ is installed, we use this command to get GPU device information.

### Command

Run the benchmark script

```
cd modules/benchmark
sudo ./benchmark.sh
```



### Report

The output goes to `report.txt` in the working directory. Here is a sample result in GCP GCE. The profile is

- instance type: n1-standard-1 (1 vCPU, 3.75 GB ram)
- gpu: Tesla K80

the result: [report.txt](modules/benchmark/report-sample.txt)


# Storage Benchmark

## Raw Disk

We use `fio` to benchmark the disk performance. There are 5 tests to run

- **RANDOM_WRITE:** It simulates the traditional write-intensive DB work load. We observe the write IOPS and bandwidth for this test.
- **RANDOM_READ:** It simulates the traditional read-intensive DB work load. We observe the read IOPS and bandwidth for this test.
- **SEQ_WRITE:** It simulates to write big file to a disk.
- **SEQ_READ:** It simulates to read big file from a disk.
- **LATENCY:** In this test, we can understand the latency between client and the disk. Typically, local disks can outperform network disks on this metric.

The parameters of each test are listed as follow

| Name            | File Size  | Block Size | Concurrent Thread | 
| --------------- | -----------| -----------| ----------------- |
| SEQ_WRITE       | 10G        | 1M         | 64                |
| SEQ_READ        | 10G        | 1M         | 64                |
| RANDOM_WRITE    | 2G         | 4k         | 64                |
| RANDOM_WRITE    | 2G         | 4k         | 64                |
| LATENCY (30sec) | 10G        | 4k         | 1                 |


### Prerequisite
1. **fio:** we use fio to benchmark the disk performance

### Command

```
modules/benchmark/storage/run-fio.sh <device|file>
```

> Caution: for raw device, the data in the disk will be destroyed. Please don't sepcify raw device for a formatted disk.



## Ceph

In this benchmark, it will

- Use `rados bench` to benchmark against ceph rados cluster
- Use `osd bench` to benchmark against OSD daemon
- Use `rbd bench` to benchmark against ceph rbd

### Prerequisite

1. An primehub-provisioned ceph cluster. From `modules/rook`.
1. **kubectl-cephtools:** a [kubectl plugin](https://kubernetes.io/docs/tasks/extend-kubectl/kubectl-plugins/) to run command against the rook ceph tools pod. Please put `./bin/kubectl-cephtools` in to `PATH` environment variable

### Command

1. run rados benchmark

    ```
    modules/benchmark/storage/run-ceph-rados.sh
    ```
    
1. run osd benchmark

    ```
    modules/benchmark/storage/run-ceph-osd.sh
    ```

1. run rbd benchmark


    ```
    modules/benchmark/storage/run-ceph-rbd.sh
    ```

## PVC

In the benchmark, it will create a pvc for a given storageclass, create a pod mount on created pvc, and do `fio` against the mount point.

### Prerequisite

1. **kubectl-mountpvc:** a [kubectl plugin](https://kubernetes.io/docs/tasks/extend-kubectl/kubectl-plugins/) to create a pod to mount a specified pvc. Please put `./bin/kubectl-mountpvc` in to `PATH` environment variable

### Command

1. Create a pvc for this storage class. And create a pod to mount the pvc.

    ```
    cd modules/benchmark/storage
    ./mount-pvc-rwo.sh <storage-class>
    ```

2. Run the fio test

    ```
    ./run-pvc-rwo.sh
    ```

3. Clean up

    ```
    ./clean-pvc.sh
    ```

> If read performance is ridiculously fast, please try to clean cache for each benchmark test
> 
> ```   
> echo 3 > /proc/sys/vm/drop_cache
> ```


## PVC NFS

In the benchmark, it will create a NFS pvc and the backing storage is on top of the given storageclass. At the same time, it creates a pod mount on the created pvc, and do `fio` against the NFS mount point.

### Prerequisite

1. Group volume NFS required. `modules/primehub-groupvolume-nfs/`
1. **kubectl-mountpvc:** a [kubectl plugin](https://kubernetes.io/docs/tasks/extend-kubectl/kubectl-plugins/) to create a pod to mount a specified pvc. Please put `bin/kubectl-mountpvc` in to `PATH` environment variable


### Command

1. Create a pvc for this storage class. And create a pod to mount the pvc.

    ```
    cd modules/benchmark/storage
    ./mount-pvc-nfs.sh <storage-class>
    ```

2. Run the fio test

    ```
    ./run-pvc-nfs.sh
    ```

3. Clean up

    ```
    ./clean-pvc.sh
    ```
