---
id: ssh-config
title: Adding SSH configuration
---

Edit the `~/.ssh/config` with adding the configuration at your local. Make sure `<username>` and `<id_rsa>`(private key) are correct according to your circumstance.

If you don't have a generated key-pair, go to [doc](ssh-keygen) to generate your own at local.

```
HOST jupyter
User jovyan
Hostname jupyter-<username>
Port 22
ForwardAgent yes
ProxyCommand ssh -W %h:%p -i ~/.ssh/id_rsa limited-user@<primehub_domain> -p 2222
IdentityFile ~/.ssh/<id_rsa>
StrictHostKeyChecking no
UserKnownHostsFile=/dev/null
```

Press `Start Notebook`, after the JupyterHub is spawned.

Run the command from your local for verification.

```bash
ssh jupyter
```

Next, a practical usage, VSCode with Remote-SSH extension.
