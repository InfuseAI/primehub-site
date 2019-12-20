---
id: version-2.2.0-admin-user-cht
title: User Management
original_id: admin-user-cht
---

## Creating New Users

![](assets/user_6.png)

點選 `Add` 新增使用者，會跳出該 User 的編輯畫面。

![](assets/user_4.png)

需填上 `Username` 及 `Email`，點選 `Confirm` 完成新增。

## Deleting User

在使用者列表中點選 `Delete` ，將跳出確認對話框，點選 `OK` 後即刪除該使用者。

![](assets/user_10.png)

## Editing User

![](assets/user_7.png)

在使用者列表中點選 `Edit` ，即進入編輯該 User 頁面。

## Basic Info

![](assets/user_5.png)

在此畫面中編輯使用者資料 & 設定使用者的使用項目，包括：

+ `Totp` 開啟 OTP。

+ `Is Admin` 設定為管理者。

+ `Enable` 禁止該使用者。

+ `Personal Disk Quota` 設定該使用者的磁盤大小。

## Connecting Users to Groups

![](assets/user_15.png)

在編輯使用者的畫面下方點選 `connect existed Groups`，即可從現有的 groups 列表中點選該使用者所屬的 group，將它們連結在一起。

## Send Email

![](assets/user_18.png)

管理者可以透過系統 e-mail 要求使用者變更以下設定：

+ `Update Password` 要求使用者更新密碼。

+ `Configure OTP` 要求使用者使用google驗證身份或其它OTP軟體（一次性密碼）在其裝置上設置OTP。

+ `Verify Email` 要求使用者驗證 E-mail，將驗證的連結 e-mail 給使用者。

+ `Update Profile` 要求使用者更新個人資料。

## Reset Password

![](assets/user_19.png)

要求使用者重設密碼。請輸入密碼兩次。如果開啟`Temporary`，則新密碼只能使用一次，使用者必須在登入後立即更改密碼。
