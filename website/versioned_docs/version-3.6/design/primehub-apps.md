---
id: version-3.6-primehub-apps
title: PrimeHub Apps
original_id: primehub-apps
---

Allows third-party application integrated into PrimeHub platform.

## Features

1. **Shared domain**: The installed application can be accessed in the sub-path of PrimeHub's domain. We don't need an additional domain for this application.
1. **Authorization**: Allows to restrict the applications only accessible to group members, PrimeHub logged-in users, or public users.
1. **Data Persistence**: Allows applications to persist data in group volume and access data in other persistent storage, like datasets and PHFS.
1. **Resource constraint**: Enforce the resource CPU, memory, GPU quota limitation in a group.

## Concepts

### Application

We introduce a new concept: **Application** in PrimeHub. An application is an instance of an integrated third-party application (e.g. MLflow). We install it as a group resource and can install multiple instances for a kind of application within a group.

### Application Template

Application template describes how an application is installed. It contains this information

1. **podTemplate:** used to create the deployment of the application
2. **Service Ports:** used to create the service
3. **HTTP Port:** The HTTP port if the application has a web interface
4. **defaultEnvs:** The default env variables are used when creating the application. When an application is created, the values would be put in enviornment variables of the target application.
    - ENV Name
    - Description
    - Default value
    - Optional

### Create an Application

Users can create an application from an application template.

1. Select an application template
1. Fill the default envs provided by the template
1. Select the instance type
1. Choose the scope (Public / PrimeHub users only/ Group members only). The scope only affects the web interface of the application.
1. Create

**Preset Environment Variables**

The preset environment variables can be used in the value field of the environment variables. Here is the list of preset environment variables

1. `PRIMEHUB_APP_ID`: The PhApplication k8s resource name
`<app-id>`
1. `PRIMEHUB_APP_ROOT`:  The root of persistence storage for the application.
    - `<group-volume>/phapplications/<app-id>` (if group volume available)
    - `/phapplications/<app-id>` (if group volume not available)
1. `PRIMEHUB_APP_BASE_URL`: The url prefix for the application
`/console/apps/<app-id>`
1. `PRIMEHUB_URL`: The external url of PrimeHub
1. `PRIMEHUB_GROUP`: The group name

### Connect to Application
There are two ways to connect to the application

- **Connect to a web interface from sub-path of PrimeHub**: Most of the applications are web-based applications. To access this kind of application, users can access it from `https://<primehub>/console/apps/<app-id>` from the browser.
- **Connect to a TCP endpoint from the host name and port**: For some applications, they provide non-HTTP service. We can access it by the service endpoint `<my-app-svc>:<my-app-port>`. The endpoint can be only accessed in the PrimeHub cluster internally. (like notebooks and jobs)

### Application Management

1. Users can start/stop an application
1. Users can get the basic information of the application
1. Users can get the application log
1. Users can delete an application

## Implementation

### Principles

1. Introduce a new CRD `PhApplication` that represents the app to install. It will derive a deployment and service for this app.
2. We use `PhAppTemplate` to create `PhApplication`. However, `PhApplication` can work standalone without PhAppTemplate. The controller of `PhApplication` should not know `PhAppTemplate`.
3. GraphQL uses `PhAppTemplate` to create `PhApplication`. And the template and template data are stored in the `PhApplication`'s annotation for update use thereafter.

### CRDs

**PhApplication**

```yaml
apiVersion: primehub.io/v1alpha1
kind: PhApplication
metadata:
  name: mlflow-xyzab
  namespace: hub
  annotations:
	  phapplication.primehub.io/template: '<json of app template>'
	  phapplication.primehub.io/template-data: '<json of app template>'
spec:
  stop: false
  displayName: "My MLflow"
  groupName: "phusers"
  instanceType: ""
  scope: "group"
  podTemplate:
    spec:
      containers:
      - name: mlflow
        image: larribas/mlflow:1.9.1
        command:
        - mlflow
        args:
        - server
        - --host
        - 0.0.0.0
        - --default-artifact-root
        - $(DEFAULT_ARTIFACT_ROOT)
        - --backend-store-uri
        - $(BACKEND_STORE_URI)
        env:
        - name: FOO
          value: bar
        - name: BACKEND_STORE_URI
          value: "sqlite:///$(PRIMEHUB_APP_ROOT)/mlflow.db"
        - name: DEFAULT_ARTIFACT_ROOT
          value: "$(PRIMEHUB_APP_ROOT)/mlruns"
        ports:
        - containerPort: 5000
          name: http
          protocol: TCP
  svcTemplate:
    spec:
      ports:
		  - name: http
		    port: 5000
		    protocol: TCP
		    targetPort: 5000
  httpPort: 5000
status:
  phase: "Ready"
  message: "Error message"
  serviceName: "app-mlflow-xyzab"
```

- **annotations**:
    - `phapplication.primehub.io/template`: template content used to create this `PhApplication`
    - `phapplication.primehub.io/template-data`: template data used to create this `PhApplication`. It is the POST data of the graphql `PhApplication` create.
- **spec**:
    - **podTemplate**: the template of pods
    - **svcTemplate**: the template of service
    - **scope**: "group", "primehub", "public"
    - **httpPort**: the backend service port that the proxy should forward to
- **status**:
    - **phase**: "Starting", "Ready", "Updating", "Stopping", "Stopped", "Error"
    - **message**: human readable message
    - **serviceName**: name of service  (used for graphql `serviceName` field)

**PhAppTemplate**

```yaml
apiVersion: primehub.io/v1alpha1
kind: PhAppTemplate
metadata:
  name: mlflow
  namespace: hub
spec:
  name: MLFlow
  description:
  version:
  docLink:
  icon: <url to icon or data-uri>
	defaultEnvs:
  - name: BACKEND_STORE_URI
    description: ""
    defaultValue: "sqlite://$(PRIMEHUB_APP_ROOT)/mlflow.db"
    optional: false
  - name: DEFAULT_ARTIFACT_ROOT
    description: ""
    defaultValue: "$(PRIMEHUB_APP_ROOT)/mlruns"
    optional: false
  template:
    # The template of phApplication
    spec:
      podTemplate:
        spec:
          containers:
          - name: mlflow
            image: larribas/mlflow:1.9.1
            command:
            - mlflow
            args:
            - server
            - --host
            - 0.0.0.0
            - --default-artifact-root
            - $(DEFAULT_ARTIFACT_ROOT)
            - --backend-store-uri
            - $(BACKEND_STORE_URI)
            env:
            - name: FOO
              value: bar
            ports:
            - containerPort: 5000
              name: http
              protocol: TCP
      svcTemplate:
        spec:
          ports:
          - name: http
            port: 5000
            protocol: TCP
            targetPort: 5000
      httpPort: 5000

```

- **spec**:
    - **version**: the version string of the template
    - **description**: free form description of this applicatin
    - **docLink**: the document url
    - **defaultEnvs**: used for create the additional envs
        - **name**: the name of the environment variable
        - **descsription**: description of the variable
        - **defaultValue**: the default value of the variable
        - **optional**: if the environment is optional
    - **template** (the content of phApplication). See the phApplication

NOTE:

1. Why we copy the content of PhAppTemplate to PhApplication instead of use name ref is we want to decouple the created app from the template.
2. `phapplication.primehub.io/template` is used for GraphQL to use. We keep the template so we can use it thereafter while updating the app.

### Control Plane

1. GraphQL create `PhApplication` resource from `PhAppTemplate`
2. The controller of `PhApplication` reconciles the `PhApplication`. The hierarchy is

    ```yaml
    PhApplication
    ├── Deployment
    ├── Service
    └── NetworkPolicy
    ```

**Create**

1. Console get the template list from GraphQL
2. Console select one template and list the defaultEnvs to the UI's variables
3. Console call GraphQL to create phapplication
    1. Get the phapptemplate content
    2. Append env variables to the end of the container's env
    3. Set the scope

**Update**

1. Console gets the PhApplication from GraphQL.
2. GraphQL returns PhApplication user data `phapplication.primehub.io/template-data` and the PhApplication default envs from `phapplication.primehub.io/template`
3. Console can reset the variables
4. Console can add/remove/update the env vars
5. Console call update to the GraphQL
6. GraphQL gets the current PhApplication, and modify container env, scope, instance type.
7. GraphQL cannot change the appId and template

**Controller**

- Deployment
    - name `app-<app-id>`
    - Use `spec.podTemplate.spec`
    - Volumes
        - Add group, dataset volumes
        - Add empty dir if no group volume available
    - Init Container
        - run as root
        - `mkdir -p $(PRIMEHUB_APP_ROOT)`
    - Container
        - Keep only the first container
        - Set resources from instanceType
        - Prepend (not append) the primehub required envs.  `PRIMEHUB_APP_ID`, ,`PRIMEHUB_APP_ROOT` and `PRIMEHUB_APP_BASE_URL`
        - Mount group, dataset volumes
        - Mount empty dir if no group volume available (`/phapplications/<app-id>`)
    - The created pod should have label
        - `app=primehub-app`
        - `primehub.io/phapplication=<appid>`,
        - `primehub.io/group: <escaped group>`
- Service
    - name `app-<app-id>`
    - Use `spec.svcTemplates.spec`
- NetworkPolicy
    - Allows the ingress traffic from
        - pod label with `primehub.io/group=<escape-group>`
        - primehub-console (for proxy)
- `status.Phase`

     The phase of PhApplication

    1. **Starting**: App is starting, no ready pod and service still not available
    `deployment.status.readyReplicas==0`
    2. **Ready**: App is ready to use
    `deployment.status.readyReplicas==1` and `deployment.status.replicas==1`
    3. **Updating**: App is updating, old pod is still ready to use, but new version of app is starting.
    `deployment.status.readyReplicas==1` and `deployment.status.replicas>1`
    4. **Stopping**: App is stopping, the pod is terminating but resource has not been freed.
    `spec.stop=true`  and `deployment.status.replicas>0`
    5. **Stopped**: App is stopped, the pod is delated. No resource is used.
    `spec.stop=true` and `deployment.status.replicas==0`
    - We can check by `starting` and `updating` by deployment status

### Data Plane

**Http Proxy**

App path is under `https://<primehub>/console/apps/<app-id>`. We validate if the user can access app by server session. The first solution we come out is to validate the traffic by access token. The flow is as follows:

![](assets/primehub-apps-design-data-plane1.png)

1. Get the app information of `<app-id>` in the path
2. If app is with scope `group only`, it will check if the owner of this access token has permission of the group
3. If yes, accept the request and proxy to upstream service

Performance issue:

1. Access Token is expired about 5 mins. Too short to cache.
2. To refresh the access token, we need to request Keycloak token endpoint to ask for a new access token.
3. If the refresh token is expired, we need to go through the OIDC process.
4. The cache miss rate would be high because we keep changing the access token.

The solution is to implement the "session" concept

![](assets/primehub-apps-design-data-plane2.png)

1. If a new connection to the app, it will use the access token to authorize the request by the access token. If the traffic is accepted, create a session.
2. When the session is created, the console sets a cookie with key `phapplication-session-id` under path `/console/apps/<app>`, expired in 30mins, and maintains the session cache on the server side.
3. If the request contains the session cookie and it is found in the session cache. Allows the request to the backend. And it will extend the expiration time to 30mins.
4. If the session id is not found in the server, authorize the request as step 1

Performance issue:

1. Because the session can be easily extended, there would be much fewer Keycloak token endpoint requests.
2. The cache miss rate would be low because the session id is only expired if it is not used for 30 mins.

**Log Traffic**

Log API

1. Add a new endpoint (generic log endpoints authorized by group label)
`/api/logs/pods/<pod>`
2. GraphQL get the pod and find if there are `primehub.io/group` label and unescaped the group. If not found, rejected.
3. Check the user of the token is the group member of the app
4. Get the pod log from k8s API

Console & GraphQL

1. Get the pod list from GraphQL API (reference `PhDeployment`)

    ```yaml
    phApplication(...) {
       pods {
         name         // app-mlflow-xyzab-xxxx-yyyyy
         logEndpoint  // https://hub.a.demo.primehub.io/api/logs/pods/app-mlflow-xyzab-xxxx-yyyyy
       }
    }
    ```

2. GraphQL get the pods from the label `primehub.io/phapplication=<appid>`

