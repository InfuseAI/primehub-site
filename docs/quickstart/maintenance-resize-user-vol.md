---
id: maintenance-resize-user-vol
title: Increase User Volume
---

This document introduces how to increase a user volume via built-in `User Volume Size` tool on Maintenance Notebook.

>***Caution**: User Volume can be **increased only**, but reduced, it cannot be rolled back once increased. This feature is introduced **PrimeHub v2.0 above***

### Steps

1. Login `User Portal`, enter `Maintenance Notebook`。

2. At `Resize User Volume` section, run the first `cell`, then it shows dropdown `User vol:` beneath.

    ![img](assets/dropdown_user_list.png)

3. Select the user from the dropdown `User vol:`.

4. Run second `cell`, it shows `Current Size` and input field `New Size:`.

    ![img](assets/enlarge_user_vol.png)

5. Input `size` which you want to change to (**must be larger than current size**), then click `Update`.

6. Once updated, re-run second cell to verify the modification。
