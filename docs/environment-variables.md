---
id: environment-variables
title: Environment Variables
description: Environment Variables
sidebar_label: Environment Variables
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

## Environment Variables

### User & Group

The following environment variables are available in the PrimeHub runtime.

Name | Description
----|------------------------------------
`PRIMEHUB_DOMAIN` | The domain name of PrimeHub. It can be the same as PrimeHub's one.
`PRIMEHUB_USER` | PrimeHub user name
`PRIMEHUB_GROUP` | PrimeHub group name
`PRIMEHUB_GROUP_VOLUME_PATH` | group volume path (e.g. `/project/phusers`)
`PRIMEHUB_PHFS_PATH` | group volume path (e.g. `/phfs`)
`GROUP_ID` | Group ID
`GROUP_NAME` | Group name
`IMAGE_NAME` | Image name
`INSTANCE_TYPE`	| Instance Type
`JUPYTERHUB_USER`	| If availble, it is in jupyter environment.
`PHJOB_NAME` | If available, it is in job environment.
`PRIMEHUB_SAFE_MODE_ENABLED` | If `true`, safe mode is enabled

### Volume

We could also add custom environment variables by creating a type `env` of Volume. See [Volume](guide_manual/admin-volume#env).
