---
id: version-3.8-maintenance
title: Maintenance Notebook (is being deprecated since v3.8)
sidebar_label: Maintenance Notebook (deprecated)
description: Maintenance Notebook
original_id: maintenance
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

> This maintenance notebook is planned to be deprecated since v3.8. For maintenance related topics, please check the **Tasks** and **Trouble shooting** section.

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
