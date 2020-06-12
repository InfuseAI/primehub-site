---
id: version-2.7-dataset-failure
title: Jupyter spawning fails due to mounting datasets
sidebar_label: 
original_id: dataset-failure
---

PrimeHub supports several types of dataset mounting, theses dataset records can be created easily, however, we are not able to be aware of problematic mounting datasets until users spawn a Jupyterhub which tries to mount those datasets.

>A problematic dataset could cause every user who are in the same group failing to spawn Jupyterhub.

If there are messages are related to dataset mounting error during spawning Jupyterhub, there are things we can try to recover.

1. Identify the problematic **dataset** from error message shown on the spawner page.

2. Remove the dataset record via Dataset Management (Admin is required). (Without removing the dataset, Spawning Jupyterhub remains failing!)

3. Wait for Jupyterhub-spawning being timeout after 5mins. Or use `Kubectl -n hub delete pod jupyter-xxxx` (Admin is required) to delete the pod immediately.

4. Try to re-spawn Jupyterhub.
