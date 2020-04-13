---
id: jh-failed-spawn
title: Why JupyterHub fails to spawn?
---

Because certain reasons, the JupyterHub fails to launch. We may check logs of JupyterHub pod to see what root causes are.

Here we list some of error messages you may see it in logs and advices you may consider to try.

## It shows "resource temporarily unavailable" in logs

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

Restart the JupyterHub, then it will take new settings.

---

## It shows "unable to mount volume for pod": "input output error" in logs

The file system of the user volume may be corrupted. Try to repair it with proper repairing tools.

### Case: XFS RBD

Find out which node the rbd is located:

```
kubectl get -n hub pod -o wide | grep jupyter-xxx
kubectl describe pod -n hub jupyter-xxx
```

`Access into <that_node>`.

Repair the rbd:

```
sudo umount /dev/rbd?
sudo xfs_repair /dev/rbd?
```

If xfs_repair shows error, try it with `-L` again:
```
sudo xfs_repair -L /dev/rbd?
```

---

## It shows "Unable to mount volumes for pod": "timeout expired ..." or "no volume plugin matched", etc. in logs

+ If the circumstance runs with **Rook**, you may consider to restart `rook-agent`

    Check the status of `rook-ceph-agent-xxx` of the problematic node:

    `kubectl -n rook-system get pods -o wide`

    Restart the pod.

+ Or consider to restart the `kubelete` [[Howto]](kubelet-restart).

---
