---
id: version-2.6-jh-blank-page
title: After spawned, JupyterHub shows a blank page
original_id: jh-blank-page
---

If you see a blank page after JupyterHub spawned, 

1. Try to rename `/home/jovyan/.local` to `/home/jovyan/.local.bak` inside the pod.

2. Restart JupyterHub; Jupyter will regenerate the `~/.local`.

`.local` is a [Jupyter directory](https://jupyter.readthedocs.io/en/latest/projects/jupyter-directories.html).