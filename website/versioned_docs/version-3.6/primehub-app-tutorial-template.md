---
id: version-3.6-primehub-app-tutorial-template
title: Create Your Own App
description: Tutorial about how to create your own PrimeHub App
original_id: primehub-app-tutorial-template
---
<div class="label-sect">
  <div class="ee-only tooltip">Enterprise
    <span class="tooltiptext">Applicable to Enterprise Edition</span>
  </div>
  <div class="ce-only tooltip">Community
    <span class="tooltiptext">Applicable to Community Edition</span>
  </div>
</div>
<br>

This tutorial demostrate how to create your own PrimeHub app using `PhAppTemplate` CRD.

For more information about the PrimeHub app, please check our [design document](design/primehub-apps).

## Limitations

Here are some limitations/constraints when it comes to turning your application into a PrimeHub app.
1. Your application should be containerized.
1. Your application can be configured by passing Environment variables or commandline arguments.
1. PrimeHub app now only supports single container. You can't define multiple containers and initContainer in `PhAppTemplate`. If you have to run multiple processes, you'll need to run it in the same container or separate them into different PrimeHub apps for now.

## What Is A PhAppTemplate?

`PhAppTemplate` is a CRD defines how an application is installed in PrimeHub. Think it as a stamp, you can create tons of application instances using that stamp very easily.

There are few components you need to define in your `PhAppTemplate`:
1. **podTemplate:** used to create the deployment of the application
2. **svcTemplate:** used to create the service
3. **httpPort:** The HTTP port if the application has a web interface
4. **defaultEnvs:** The default env variables are used when creating the application. When an application is created, the values would be put in enviornment variables of the target application.
    - ENV Name
    - Description
    - Default value
    - Optional

## Predefined Environment Variables

Here's list of our predefined environment variables. These predefined environment variables will be injected into your application container at the very beginning.

1. `PRIMEHUB_APP_ID`: The PhApplication k8s resource name
`<app-id>`
1. `PRIMEHUB_APP_ROOT`:  The root of persistence storage for the application.
    - `<group-volume>/phapplications/<app-id>` (if group volume available)
    - `/phapplications/<app-id>` (if group volume not available)
1. `PRIMEHUB_APP_BASE_URL`: The url prefix for the application
`/console/apps/<app-id>`
1. `PRIMEHUB_URL`: The external url of PrimeHub
1. `PRIMEHUB_GROUP`: The group name

The common usage of these predefined environment variables are usually these two:
1. Compose another environment variable at your will.
1. Pass as an commandline argument into your container endpoint to configure your application.

We'll cover some examples in the following sections.

## podTemplate

podTemplate is basically the same as how you describe a native kubernetes pod. But you can only define a single container in your podTemplate. We do not suopport multiple containers and initContainer for now.

Here's an example podTemplate block:

```yaml
template:
    spec:
      podTemplate:
        spec:
          containers:
          - name: label-studio
            image: heartexlabs/label-studio:latest
            command:
            - bash
            - -c
            args:
            - |
              label-studio start primehub --init --host $(PRIMEHUB_URL)$(PRIMEHUB_APP_BASE_URL) --username $(DEFAULT_USERNAME) --password $(DEFAULT_PASSWORD)
            ports:
            - containerPort: 8080
              name: http
              protocol: TCP
```

As you can see, you can use our predefined environment variables or variables you define in the `defaultEnvs` block to configure and launch your application. We'll cover the `defaultEnvs` part later.

## defaultEnvs

When a PrimeHub user is trying to create a new PrimeHub app from the `PhAppTemplate` you defined, ze is able to customize/configure the application with `defaultEnvs`.

Again, take our `label-studio` phAppTemplate as an example:
```yaml
  defaultEnvs:
  - name: DEFAULT_USERNAME
    description: "The default username to login"
    defaultValue: "$(PRIMEHUB_GROUP)@infuseai.io"
    optional: false
  - name: DEFAULT_PASSWORD
    description: "The default password to login"
    defaultValue: "$(PRIMEHUB_GROUP)_password!"
    optional: false
  - name: LABEL_STUDIO_BASE_DATA_DIR
    description: "Directory to use to store all application-related data."
    defaultValue: "$(PRIMEHUB_APP_ROOT)/label-studio-data"
    optional: false
  - name: LOCAL_FILES_SERVING_ENABLED
    description: "Serving data from the local file system."
    defaultValue: "true"
    optional: false
  - name: DISABLE_SIGNUP_WITHOUT_LINK
    description: "Deactivate the signup page and use only the invitation link."
    defaultValue: "true"
    optional: false
```

We defined five default environment variables here and some of them are composed from our predefined environment variables.

Now, when the user is trying to create a new `label-studio` app, this form will show up.

![](assets/app-tutorial-template-defaultenvs.png)

Please note that if the `optional` attribute is set to `false`, then users can remove the defaultEnv. Be sure to set it properly.


## svcTemplate and httpPort

svcTemplate and httpPort are used to expose your application through our proxy. If your application does not have a web-interface then you can leave these fields blank.

```yaml
      svcTemplate:
        spec:
          ports:
          - name: http
            port: 8080
            protocol: TCP
            targetPort: 8080
      httpPort: 8080
```
The `svcTemplate` is basically the same as `Service` resource in Kubernetes. PrimeHub will create a service for your app according to your definition here.

## Persistant Storage

If your application requires a persistant storage to keep your data, you can use the `group volume`.

Every PrimeHub app is created inside a group context. If you have [enabled group volume feature](guide_manual/admin-group#shared-volume) for that group, then that group volume will be mounted to your application container at `<group-volume>/phapplications/<app-id>`. You can use the predefined environment variable `PRIMEHUB_APP_ROOT` to tell your application to store persistant data into that location.

## More Examples

For more examples, please check our built-in `phAppTemplate` on our [Github repo](https://github.com/InfuseAI/primehub/tree/master/chart/templates/ph-app-templates).