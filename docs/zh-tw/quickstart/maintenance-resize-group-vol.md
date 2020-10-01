---
id: maintenance-resize-group-vol
title: 加大 Group Volume
---

<div class="ee-only tooltip">Enterprise
  <span class="tooltiptext">Applicable to Enterprise tier only</span>
</div>

這份文件介紹如何利用 `Maintenance Notebook` 中的 `Resize Group Volume` 來加大 Group Volume Size。

>請注意： 目前 **Group Volume 只能增加容量**，不能減少；一旦加大，無法還原。
>**PrimeHub v2.0**以上才有**`Resize Group Volume`**功能

### 步驟

1. 登入管理者，進入 `Maintenance Notebook`。

2. 至`Resize Group Volume`段落，執行第一個`cell`後，會顯示`Group vol:`下拉選單。

    ![img](assets/dropdown_group_list.png)

3. 從`Group vol:`選單，選擇要變更的群組。

4. 執行第二個`cell`，顯示`Current Size`及`New Size:`輸入欄位。

    ![img](assets/enlarge_group_vol.png)

5. 輸入期望的`size`後 (**必須大於 current size**)，按下`Update`更新。

6. 一旦更新完成後，可以再次執行第二個`cell`做為驗證。

**Tips: 可用快捷鍵 `Ctrl + Enter` 執行已選擇的 `cell`。**
