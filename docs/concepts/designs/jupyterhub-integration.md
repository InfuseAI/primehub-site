---
id: jupyterhub-integration
title: Integration with JupyterHub
---

This document describes the integration of PrimeHub and JupyterHub. The whole magic happens in `jupyterhub_profiles.py`, under the hood, it collects data from Keycloak(roles-related) and CRDs (`Instance Type`, `Image` and `Dataset`) from K8S in the procedures and it prepares a spawner (with an rendered options page) for a user according to what data/logic are prepared. Then it launches a hub based on the user selection (`Group`, `Instance Type` and `Image`).

## The concept diagram

![](assets/jupyterhub_profiles.png)

## Imported
There are serveral imported modules which are worth attention are used for api interaction or interfaces.
```
from kubespawner.clients import shared_client
from kubespawner import KubeSpawner
import kubernetes.client
from z2jh import get_config
from oauthenticator.generic import GenericOAuthenticator
from jupyterhub.handlers import LogoutHandler
from kubespawner.objects import make_pvc
from kubernetes.client.models import V1LabelSelector
from kubernetes.client.rest import ApiException
from kubespawner.traitlets import Callable
```
## Classes and Methods
There are three main classes, `OIDCLogoutHandler`, `OIDCAuthenticator` and `PrimeHubSpawner` in `jupyterhub_profiles.py` listed in the table below.

Class|Description
-----|---
OIDCLogoutHandler| The implementation of `LogoutHandler` which redirect to `logout_url` of Keycloak.
OIDCAuthenticator| The implementation of  `GenericOAuthenticator` of OpenID way.
PrimeHubSpawner| The implementation of `Kubespawner`. The core of PrimeHub spawner.

### OIDCLogoutHandler
Method|Description
------|-----------
get| redirect to keycloak logout url and redirect back with `kc=true` parameters, then proceed with the original logout method.

### OIDCAuthenticator

Here we list several main methods which are worth attention in the table below. Growing methods are expected with the progressive development.

Method|Description
------|----------
attach_project_pvc| To append/create a PVC according to the project, group and size.
authenticate| To authenticate a user and return it if validated.
get_custom_resources| To get CRDs from K8S.
is_admin| To learn if a user is administrator or not.
mount_dataset| To determine where and what to mount datasets by a combination of logics such as `type`, `global`, `launch_group`, annotations and so on.
user_volume_capacity| To get a user volume capacity by the business logic.
get_datasets_in_launch_group| To get datasets of the launching group.
get_global_datasets| To get global datasets.
pre_spawn_start| The core of PrimeHubSpawner that it determines/collect what a spawner of a user should be capable of according to a series of logics and configurations in Keycloak and CRDs of K8S.

### PrimeHubSpawner
Here we list several main methods which are worth attention in the table below. Growing methods are expected with progressive development.

Method|Description
------|---
_start| To launch a hub while checking the sufficiency of resources, otherwise to stop launching immediately.
apply_kubespawner_override| To apply/override values of KubeSpawner.
check_event| To check messages of a event to see if resource is sufficient.
get_request_resources| To get requests of resources.
image_to_override| To override values of an image with a `url` and a `pull_secret` if any.
instance_type_to_override| To apply/override values of an `instance type`, such as requests/limits of resources, `node_selector` and `tolerations`.
options_from_form| To get values of options for rendering a `Server Options` form.
render_html| To render a html according to a template and values.

### References

Reference|
---|
[Kubespawner](https://github.com/jupyterhub/kubespawner)|
[Zero to JupyterHub with Kubernetes](https://zero-to-jupyterhub.readthedocs.io/en/latest/)|
[Keycloak Admin REST API](https://www.keycloak.org/docs-api/6.0/rest-api/index.html)|