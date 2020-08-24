---
id: ssh-server-connection-refused
title: Connection Refused
---

## Advice to Users

- Please check your `~/.ssh/config` on your local machine and make sure you're using `limited-user` as the username of your SSH connection.

## Advice to Admin

- Please make sure your firewall/security group setting is correct and allow the TCP connection (default 2222).

- There's also a `/etc/ssh/access.log` inside the SSH bastion server pod, you can check if the connection actually reaches the SSH bastion server.
