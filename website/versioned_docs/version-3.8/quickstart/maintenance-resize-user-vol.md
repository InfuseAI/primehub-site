---
id: version-3.8-maintenance-resize-user-vol
title: Increase User Volume
sidebar_label: Increase User Volume (deprecated)
description: Increase User Volume
original_id: maintenance-resize-user-vol
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

> This maintenance notebook is planned to be deprecated since v3.8. For resizing volume, please check [HOWTO: Increase Volume Size](../tasks/howto-resize-vol)

This document introduces how to increase a user volume via built-in `User Volume Size` tool on Maintenance Notebook.

>***Caution**: User Volume can be **increased only**, but reduced, it cannot be rolled back once increased. This feature is introduced **PrimeHub v2.0 above***

### Steps

1. Log in as an administrator and [switch to Admin Portal](login-portal-admin)
2. Enter `Maintenance Notebook`。

3. At `Resize User Volume` section, run the first `cell`, then it shows dropdown `User vol:` beneath.

    ![img](assets/dropdown_user_list.png)

4. Select the user from the dropdown `User vol:`.

5. Run second `cell`, it shows `Current Size` and input field `New Size:`.

    ![img](assets/enlarge_user_vol.png)

6. Input `size` which you want to change to (**must be larger than current size**), then click `Update`.

7. Once updated, re-run second cell to verify the modification。
