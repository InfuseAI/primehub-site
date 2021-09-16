---
id: version-3.8-maintenance-resize-group-vol
title: Increase Group Volume
sidebar_label: Increase Group Volume (deprecated)
description: Increase Group Volume
original_id: maintenance-resize-group-vol
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

> This maintenance notebook is planned to be deprecated since v3.8. For resizing volume, please check [HOWTO: Increase Volume Size](../tasks/howto-resize-vol)

This document introduces how to increase a group volume via built-in `Group Volume Size` tool on `Maintenance Notebook`.

>***Caution**: Group Volume can be **increased only**, but reduced, it cannot be rolled back once increased. This feature is introduced **PrimeHub v2.0 above***

### Steps

1. Log in as an administrator and [switch to Admin Portal](login-portal-admin)
2. Enter `Maintenance Notebook`。

3. At `Resize Group Volume` section, run the first `cell`, then it shows a dropdown `Group vol:` beneath.

    ![img](assets/dropdown_group_list.png)

4. Select the group from the dropdown `Group vol:`.

5. Run second `cell`, it shows `Current Size` and input field `New Size:`.

    ![img](assets/enlarge_group_vol.png)

6. Input `size` which you want to change to (**must be larger than current size**), then click `Update`.

7. Once updated, re-run second cell to verify the modification。

**Tips: `Ctrl + Enter` run selected cells.**
