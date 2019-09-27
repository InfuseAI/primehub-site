---
id: version-2.0.0-graphql
title: Spawner and GraphQL
original_id: graphql
---

For making API queries to existing data in Kubernetes and Keycloak more understandable, PrimeHub adopts [GraphQL](https://graphql.org) to achieve it and also, GraphQL makes evolve APIs easier over time.

## Design

The following diagram depicts what PrimeHub Spawner sends a query to GraphQL server for:

![](assets/graphql.png)

When a user intents to launch a JupyterHub via Spawner, Spawner has to learn what **server options** this user can have according to `images`, `instance types`, `datasets`, `groups`, `user` settings. For retrieving the relative data, Spawner sends a query to GraphQL server by `fetch_context` method, the server responds with a bunch of data in JSON. According to the response data, Spawner renders a html page to display for user selection.

E.g. the context of the query:

```
query ($id: ID!) {
    system { defaultUserVolumeCapacity }
    user (where: { id: $id }) {
        id username isAdmin volumeCapacity
        groups { name
                displayName
                enabledSharedVolume
                sharedVolumeCapacity
                homeSymlink
                launchGroupOnly
                quotaCpu
                quotaGpu
                quotaMemory
                userVolumeCapacity
                projectQuotaCpu
                projectQuotaGpu
                projectQuotaMemory
                instanceTypes { name displayName description spec global }
                images { name displayName description spec global }
                datasets { name displayName description spec global writable mountRoot homeSymlink launchGroupOnly }
        }
    }
}
```

## APIs Test
In terms of APIs test, we can **POST** `curl` to the GraphQL server for the verification of APIs and responses.

A simple query to retrieve only a user data, using it to just verify if the graphql server works or not:
```
#!/bin/bash

user_id='your-user-id-on-keycloak' # user uuid
endpoint='https://domain/graphql'
secret='your-secret' # shared secret
query='{ users {id} }'

curl -vvv -X POST \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer ${secret}" \
  -d "{\"query\": \"${query}\", \"variables\": {\"id\": \"${user_id}\"}}" \
  "${endpoint}" | jq -r '.'
```


Once the graphql server works, using a complex query to retrieve a bunch of data related to a user:
```
query='query ($id: ID!) { 
  system { defaultUserVolumeCapacity } 
  user (where: { id: $id }) { 
    id 
    username 
    isAdmin 
    volumeCapacity 
    groups { 
      name displayName enabledSharedVolume sharedVolumeCapacity homeSymlink launchGroupOnly quotaCpu quotaGpu quotaMemory userVolumeCapacity projectQuotaCpu projectQuotaGpu projectQuotaMemory 
      instanceTypes { name displayName description spec global } 
      images { name displayName description spec global } 
      datasets {
        name displayName description spec global writable mountRoot homeSymlink launchGroupOnly
      }
    }
  }
}'
```
## Reference
For the detail of latest GraphQL APIs, please see [canner-admin-ui](https://gitlab.com/infuseai/canner-admin-ui/tree/master/packages/graphql-server/src/graphql) repo. The access permission is required.