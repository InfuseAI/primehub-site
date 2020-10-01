---
id: maintenance-resize-group-vol
title: Increase Group Volume
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

This document introduces how to increase a group volume via built-in `Group Volume Size` tool on `Maintenance Notebook`.

>***Caution**: Group Volume can be **increased only**, but reduced, it cannot be rolled back once increased. This feature is introduced **PrimeHub v2.0 above***

### Steps

1. Login as an administrator, enter `Maintenance Notebook`。

2. At `Resize Group Volume` section, run the first `cell`, then it shows a dropdown `Group vol:` beneath.

    ![img](assets/dropdown_group_list.png)

3. Select the group from the dropdown `Group vol:`.

4. Run second `cell`, it shows `Current Size` and input field `New Size:`.

    ![img](assets/enlarge_group_vol.png)

5. Input `size` which you want to change to (**must be larger than current size**), then click `Update`.

6. Once updated, re-run second cell to verify the modification。

**Tips: `Ctrl + Enter` run selected cells.**
