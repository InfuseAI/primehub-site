---
id: architecture
title: Architecture
---

PrimeHub is a kubernetes-based multi-user machine learning platform. For multi-user requirements, we fully integrate with [keycloak](http://keycloak.org/) as the identity provider (IdP) solution.


Here is a high-level diagram of PrimeHub

![](assets/architecture.png)


- **Keycloak:** Identity provider. Provide user databases and authentication/authorization services.
- **Console:** User interface to use and manage PrimeHub platform. It is a rich web application (by react) and sends the user command to graphql server.
- **GraphQL:** API Server to manage PrimeHub. The API may create/update the resources in kubernetes by [kubernetes api](https://kubernetes.io/docs/reference/#api-reference) or update users/groups by [keycloak admin api](https://www.keycloak.org/docs-api/8.0/rest-api/index.html).
- **Controllers:** Controllers are a group of components to watch and reconcile the state of the kubernetes and keycloak resources. The basic concept is described in the kubernetes [official document](https://kubernetes.io/docs/concepts/architecture/controller/)
- **Custom Resources:** Kubernetes provide powerful extensibility for API. We can define the [custom resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) and allow us to store these resources in kubernetes.
- **UI Components:** For some features, we integrate existing third-party solutions (e.g. jupyterhub). We would customize them and integrate our PrimeHub graphql API and configure the [OIDC](https://en.wikipedia.org/wiki/OpenID_Connect) client in our keycloak.



## Components 


Name | Type | Description
-----|------|--------------
keycloak | Identity Provider | Identify server for PrimeHub. It is responsible for managing users, groups, authentication.
primehub console | UI | PrimeHub UI for users and administrators.
jupyterhub | UI Components | Third-party multiple users jupyter project. We integrate it to spawn the jupyter servers.
admin notebook | UI Components | A special jupyter server for operation purposes.
graphql | API Server | The primary API Server for PrimeHub.
groupvolume | Controlers | A metacontroller-based controller. It is responsible for provisioning an NFS server for a shared volume. ([metacontroller](https://github.com/GoogleCloudPlatform/metacontroller) is a general-purpose controller to implement a controller.)
gitsync | Controllers | A metacontroller-based controller. It is responsible to manage the gitsync dataset.
dataset-upload | Controllers | A metacontroller-based controller. It is responsible to manage the dataset upload server.
primehub controller | Controllers | The single process controller to manage jobs, image builder, license, etc. This component is relatively new and we hope to include all metacontroller-based controllers to this component in the future.
admission webhook | Controllers | It implements the [admission controller](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/) to intercept the request the creation of resources. Currently, we use it to guarantee a pod does not request more resources than the quota.
watcher | Controllers | It monitors images, instance types, datasets custom resources and generates corresponding keycloak roles.


## Data Model
PrimeHub in the core does not have its database. The persistence state is stored in the keycloak and the kubernetes cluster. 

![](assets/architecture-data-model.png)

The data respectively are

- **Keycloak:** Store the users, groups, user/group binding (member), roles, and group/role binding. 
- **Kubernetes:** Store the common resources among groups, like `image`, `instance type`, `datasets`, `imagespecs`, and `secrets`. Or user-created items, like `phjobs`.


In PrimeHub design, the common resources (e.g. `image`) can be associated with groups. There is a corresponding role of this resource defined in keycloak. And the relationship between resource and group is implemented by role binding. The following diagram depicts the relationship.

![](assets/architecture-data-model2.png)

For more information, please refer to [data model documentation](data-model.md)

## Design Principles

- Graphql is the primary API server. We use it to control the resources in keycloak and cluster.
- For end-users request, graphql requires an id-token ([defined in OpenID Connect](https://en.wikipedia.org/wiki/OpenID_Connect)) to access the graphql endpoint.
- For server-to-server requests, graphql requires a shared secret to access the graphql endpoint with full permission.
- Controllers watch the cluster/keycloak states and reconcile the current state to the desired state.
- Controllers may call GraphQL to get the user/group configuration. However, graphql should not know the controllers' existence.


