---
id: jh-failed-spawn
title: Why JupyterHub fails to spawn?
---

## It shows "resource temporarily unavailable"

The Jupyter process may hit the threshold, we can try to raise the limit.

Edit `path/to/primehub/modules/charts/primehub-prerequisite/start-notebook.d/ulimit.sh`

Modify `ulimit -n xxxx` and/or `ulimit -u xxxx` to push the limits.

```bash
ulimit -n 4096 # Maximum number of open file descriptors
ulimit -u 2048 # Maximum number of processes available to a single user
```

Back to `path/to/primehub/` and run commands to apply modifications.

```bash
make release-diff-primehub-prerequisite
make release-install-primehub-prerequisite
```

Restart a JupyterHub which will take new settings.

## It shows "unable to mount volume for pod": "input output error"

The file system of the user volume may be corrupted. Try to repair it with proper repairing tools.

### Case: XFS RBD

Find out which node the rbd is located.

```
kubectl get -n hub pod -o wide | grep jupyter-xxx
kubectl describe pod -n hub jupyter-xxx
```

`ssh <that_node>`

Repair the rbd

```
sudo umount /dev/rbd?
sudo xfs_repair /dev/rbd?
```

If xfs_repair shows error, try it with `-L` again.
```
sudo xfs_repair -L /dev/rbd?
```