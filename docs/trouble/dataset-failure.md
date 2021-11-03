---
id: volume-failure
title: Jupyter spawning fails due to mounting volumes
sidebar_label:
---

PrimeHub supports several types of volume mounting, theses volume records can be created easily, however, we are not able to be aware of problematic mounting volumes until users spawn a Jupyterhub which tries to mount those volumes.

>A problematic volume could cause every user who are in the same group failing to spawn Jupyterhub.

If there are messages are related to volume mounting error during spawning Jupyterhub, there are things we can try to recover.

1. Identify the problematic **volume** from error message shown on the spawner page.

2. Remove the volume record via Volume Management (Admin is required). (Without removing the volume, Spawning Jupyterhub remains failing!)

3. Wait for Jupyterhub-spawning being timeout after 5mins. Or use `Kubectl -n hub delete pod jupyter-xxxx` (Admin is required) to delete the pod immediately.

4. Try to re-spawn Jupyterhub.
