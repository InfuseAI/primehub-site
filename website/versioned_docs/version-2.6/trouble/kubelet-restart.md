---
id: version-2.6-kubelet-restart
title: Restart Kubelet
original_id: kubelet-restart
---

If this `Orphan pod xxxxxx found, but volume paths are still present on disk` is shown in logs, Kubelet may be required a restart.

1. Access into the node.

2. Run `docker ps` and check the kublet status, meanwhile, there should no any running K8S relative containers.

3. Stop kubelet; run `docker stop kubelet`.

4. Rename the original kubelet working folder; run `sudo mv /var/lib/kubelet /var/lib/kubelet.del`.

5. Start kubelet; run `docker start kubelet`; kubelet working folder should be re-generated.

6. Once kubelet is started and work ab, there should be some running K8S containers; verify it with `docker ps`.
