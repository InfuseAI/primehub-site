---
id: version-3.1-api-token
title: Generate an PrimeHub API Token
sidebar_label: Generate API Token
original_id: api-token
---

<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>

PrimeHub provides API to allow third party program to access. Regarding querying API, a valid token is mandatory.
Here are steps generating a valid token.

## Steps

1. Go to `User Portal` and hover over the top-right icon.

2. Click `API Token`.

3. Click `Request API Token` to generate a new token, any existing token will be revoked.

    ![](assets/api_token.png)

4. Verify the new token by following the curl example to query PrimeHub in the circumstance.
