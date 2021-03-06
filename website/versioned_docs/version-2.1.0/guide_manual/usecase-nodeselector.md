---
id: version-2.1.0-usecase-nodeselector
title: NodeSelector
original_id: usecase-nodeselector
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

When it comes to DevOps, we may arrange downtime of nodes for regular maintenance several times a year, however, for the sake of impact reduction of our service, we keep some of nodes continue to be available for providing the service, and shutdown other nodes in shift. In this case, initially we label all of nodes with `service=on`

```
kubectl label nodes node1 service=on
```

and apply a nodeSelector on every instance types when creation by NodeSelector on Admin UI so that they, initially, are able to to be scheduled on any nodes labelled with `service=on`.

![](assets/nodeSelector_add.png)

![](assets/nodeSelector_use_case_on.png)

When a maintenance comes, we label some of nodes with service=off

```
kubectl label nodes node5 service=off
```

afterwards newly spawned projects are scheduled only on nodes with label `service=on` according to the nodeSelector. We can do maintenance on these nodes with `service=off` when no running pods.

![](assets/nodeSelector_use_case_off.png)

Then we bring these nodes of out-off-service back to service with the label `service=on`.

```
kubectl label nodes node5 service=on
```

Repeatedly, we make some nodes `service=off/service=on` in shift until whole maintenance is completed.
