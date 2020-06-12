---
id: version-2.7-maintenance
title: Maintenance Notebook
original_id: maintenance
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Available in Enterprise tier only</span>
</div>

PrimeHub provides Maintenance Notebook which is a Jupyter notebook including some frequently-used operations such as delete-user-volume, resize-user-volume, etc. Administrators are able to perform those operations quickly without typing a bunch of commands/scripts.

Administrators can access Maintenance Notebook from admin section on User Portal. From there, all we need to do is running cells to execute corresponding operations.

It includes below operations:

+ Delete User Volume

+ Delete Group Volume

+ Cleanup orphan PVC

+ Cleanup released orphan PV

+ Create pv-type dataset

+ [Resize Group Volume](quickstart/maintenance-resize-group-vol)

+ [Resize User Volume](quickstart/maintenance-resize-user-vol)
