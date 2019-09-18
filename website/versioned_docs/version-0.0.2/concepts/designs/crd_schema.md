---
id: version-0.0.2-crd-schema
title: CRD Structural Schema
original_id: crd-schema
---

From Kubernetes v1.15, CustomeResrouces(CR) is able to adopt a schema of Open API V3 vadliation by specifiying it in a definition file. The schema is used to validate the JSON data during creation and updates so that it can prevent from invalid data, moreover, from malicous attacks.

While in `apiextensions.k8s.io/v1beta1`, the definition of a structural schema is **optional**, whereas in `apiextensions.k8s.io/v1` it is **mandatory**.

Please see [[KEP]20190425-structural-openapi](https://github.com/kubernetes/enhancements/blob/master/keps/sig-api-machinery/20190425-structural-openapi.md) for more detail.

## Structural Schema
A schema is called **structural** if it obeys all of principles below:
1. specifies a non-empty type (via `type` in OpenAPI) for the root, for each specified field of an object node (via `properties` or `additionalProperties` in OpenAPI) and for each item in an array node (via `items` in OpenAPI), with the exception of:

- a node with `x-kubernetes-int-or-string: truei`
- a node with `x-kubernetes-preserve-unknown-fields: true`

2. for each field in an object and each item in an array which is specified within any of `allOf`, `anyOf`, `oneOf` or `not`, the schema also specifies the field/item outside of those logical junctors.

3. does not set `description`, `type`, `default`, `additionProperties`, `nullable` within an `allOf`, `anyOf`, `oneOf` or `not`, with the exception of the two pattern for `x-kubernetes-int-or-string: true`.

4. if `metadata` is specified, then only restrictions on `metadata.name` and `metadata.generateName` are allowed.

A **non-structural** schema example:
```
properties:
  foo:
    pattern: "abc"
  metadata:
    type: object
    properties:
      name:
        type: string
        pattern: "^a"
      finalizers:
        type: array
        items:
          type: string
          pattern: "my-finalizer"
anyOf:
- properties:
    bar:
      type: integer
      minimum: 42
  required: ["bar"]
  description: "foo bar object"
```

The example above is **not a structural** schema because of the following violations.

- the `type` at the root is missing (rule 1).
- the `type` of foo is missing (rule 1).
- bar inside of `anyOf` is *not specified outside* (rule 2).
- bar’s `type` is within `anyOf` (rule 3).
- the `description` is set within `anyOf` (rule 3).
- `metadata.finalizer` might *not be restricted* (rule 4).

Violations of the structural schema rules are reported in the **NonStructural** condition in the CustomResourceDefinition.

In contrast, the following corresponding schema is **structural**:
```
type: object
description: "foo bar object"
properties:
  foo:
    type: string
    pattern: "abc"
  bar:
    type: integer
  metadata:
    type: object
    properties:
      name:
        type: string
        pattern: "^a"
anyOf:
- properties:
    bar:
      minimum: 42
  required: ["bar"]
```

For more examples, please see [Specifying a structural schema](https://kubernetes.io/docs/tasks/access-kubernetes-api/custom-resources/custom-resource-definitions/#specifying-a-structural-schema) and [Future of CRDs: Structual Schemas](https://kubernetes.io/blog/2019/06/20/crd-structural-schema/).


## Validation Schema

### Keywords for Applying Subschemas With Boolean Logic
Keyword|Description|
-------|-----------|
allOf|if it validates successfully against all schemas defined by this keyword's value.|
anyOf|if it validates successfully against at least one schema defined by this keyword's value.|
oneOf|f it validates successfully against exactly one schema defined by this keyword's value.|
not|if it fails to validate successfully against the schema defined by this keyword.|

### Validation Keywords for Numeric Instances (number and integer)
Keyword|Description|
-------|-----------|
multipleOf|if division by this keyword's value results in an integer.|
maximum|if the instance is less than or exactly equal to "maximum".|
exclusiveMaximum|if it has a value strictly less than (not equal to) "exclusiveMaximum".|
minimum|if the instance is greater than or exactly equal to "minimum".
exclusiveMinimum|if it has a value strictly greater than (not equal to) "exclusiveMinimum".|

### Validation Keywords for Strings
Keyword|Description|
-------|-----------|
maxLength|if its length is less than, or equal to, the value of this keyword.|
minLength|if its length is greater than, or equal to, the value of this keyword.|
pattern|if the regular expression matches the instance successfully. Recall: regular expressions are not implicitly anchored.|


### Validation Keywords for Arrays
Keyword|Description|
-------|-----------|
items|*If "items" is a schema*, validation succeeds if all elements in the array successfully validate against that schema. *If "items" is an array of schemas*, validation succeeds if each element of the instance validates against the schema at the same position, if any.|
maxItems|if its size is less than, or equal to, the value of this keyword.|
minItems|if its size is greater than, or equal to, the value of this keyword.|
uniqueItems|If this keyword has boolean value `false`, the instance validates successfully. If it has boolean value `true`, the instance validates successfully if all of its elements are unique.|

## CRDs of PrimeHub with validation schema

Current `Instance Type` data is like below,
```
apiVersion: primehub.io/v1alpha1
kind: InstanceType
metadata:
  generation: 1
  name: p100
  selfLink: /apis/primehub.io/v1alpha1/namespaces/hub/instancetypes/p100
spec:
  description: p100
  displayName: p100
  limits.cpu: 4
  limits.memory: 26G
  limits.nvidia.com/gpu: 1
  requests.cpu: 4
  requests.memory: 26G
```
Taking this data as an example, the validation schema might look like:
```
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: instancetypes.primehub.io
spec:
  group: primehub.io
  version: v1alpha1
  names:
    kind: InstanceType
    plural: instancetypes
    shortNames:
    - it
    # categories is a list of grouped resources the custom resource belongs to.
    categories:
    - all
  scope: Namespaced
  preserveUnknownFields: false
  validation:
   # openAPIV3Schema is the schema for validating custom objects.
    openAPIV3Schema:
      type: object
      properties:
        spec:
          type: object
          properties:
            description:
                type: string
            displayName:
                type: string
                pattern: '^(\d+|\*)(/\d+)?(\s+(\d+|\*)(/\d+)?){4}$'
            limits:
                type: object
                properties:
                    cpu:
                        type: float
                    memory:
                        type: string
                    nvidia_gpu:
                        type: integer
                required:
                - cpu
                - memory
            requests:
                type: object
                properties:
                    cpu:
                        type: float
                    memory:
                        type: string
            required:
            - displayName
            - limits
```
We define `validation.openAPIV3Schema` with schema object and `preserveUnknownFields: false` to enforce pruning unknow fields.
Also, both of `displayName` and `limits` are mandatory, we define
```
required
- displayName
- limits
```

## Pruning – don’t preserve unknown fields
In `apiextensions.k8s.io/v1` pruning will be the default, with ways to opt-out of it. Pruning in `apiextensions.k8s.io/v1beta1` is enabled via
```
apiVersion: apiextensions/v1beta1
kind: CustomResourceDefinition
spec:
  …
  preserveUnknownFields: false
```
Pruning can only be enabled if the global schema or the schemas of all versions are **structural**.

If pruning is enabled, the pruning algorithm
- assumes that the schema is complete, i.e. every field is mentioned and not-mentioned fields can be dropped
- is run on
    - data received via an API request
    - after conversion and admission requests
    - when reading from etcd (using the schema version of the data in etcd).

With `spec.preserveUnknownField: false` in the CustomResourceDefinition, pruning is enabled for all custom resources of that type and in all versions.
However, it is also possible to partially specify the permitted JSON without any thing being pruned by `x-kubernetes-preserve-unknown-fields: true`. e.g.:
```
type: object
properties:
  json:
    x-kubernetes-preserve-unknown-fields: true
    type: object
    description: this is arbitrary JSON
```

## Defaulting
`default:` is available as alpha since 1.15. It is disabled by default and can be enabled via the `CustomResourceDefaulting` feature gate. [[More details]](https://kubernetes.io/docs/tasks/access-kubernetes-api/custom-resources/custom-resource-definitions/#defaulting)

```
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: crontabs.stable.example.com
spec:
  group: stable.example.com
  versions:
    - name: v1
      served: true
      storage: true
  version: v1
  scope: Namespaced
  names:
    plural: crontabs
    singular: crontab
    kind: CronTab
    shortNames:
    - ct
  preserveUnknownFields: false
  validation:
   # openAPIV3Schema is the schema for validating custom objects.
    openAPIV3Schema:
      type: object
      properties:
        spec:
          type: object
          properties:
            cronSpec:
              type: string
              pattern: '^(\d+|\*)(/\d+)?(\s+(\d+|\*)(/\d+)?){4}$'
              default: "5 0 * * *"
            image:
              type: string
            replicas:
              type: integer
              minimum: 1
              maximum: 10
              default: 1
```

## Printer Columns
The server decides which columns are shown by the `kubectl get` command. We can customize these columns by `additionalPrinterColumns:` e.g.:
```
apiVersion: apiextensions.k8s.io/v1beta1
  kind: CustomResourceDefinition
  metadata:
    name: crontabs.stable.example.com
  spec:
    group: stable.example.com
    version: v1
    scope: Namespaced
    names:
      plural: crontabs
      singular: crontab
      kind: CronTab
      shortNames:
      - ct
    additionalPrinterColumns:
    - name: Spec
      type: string
      description: The cron spec defining the interval a CronJob is run
      JSONPath: .spec.cronSpec
    - name: Replicas
      type: integer
      description: The number of jobs launched by the CronJob
      JSONPath: .spec.replicas
    - name: Age
      type: date
      JSONPath: .metadata.creationTimestamp

```
By `kubectl get`, notice the `NAME`, `SPEC`, `REPLICAS`, and `AGE` columns in the output:
```
NAME                 SPEC        REPLICAS   AGE
my-new-cron-object   * * * * *   1          7s
```

Regarding usages of`Priority`, `Type` and `Format` of columns, please see [[More details]](https://kubernetes.io/docs/tasks/access-kubernetes-api/custom-resources/custom-resource-definitions/#additional-printer-columns)

## Categories
This feature is beta and availabe from v1.10.
We can categorize CRs into `all` or customized categories by `categories:` e.g.:
```
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: crontabs.stable.example.com
spec:
  group: stable.example.com
  versions:
    - name: v1
      served: true
      storage: true
  scope: Namespaced
  names:
    plural: crontabs
    singular: crontab
    kind: CronTab
    shortNames:
    - ct
    # categories is a list of grouped resources the custom resource belongs to.
    categories:
    - all
```

Therefore, this CR object is included in result of `kubectl get all`.

[[More details]](https://kubernetes.io/docs/tasks/access-kubernetes-api/custom-resources/custom-resource-definitions/#categories)

## Reference
Reference|
---|
[Specifying a structural schema](https://kubernetes.io/docs/tasks/access-kubernetes-api/custom-resources/custom-resource-definitions/#specifying-a-structural-schema)|
[Future of CRDs: Structual Schemas](https://kubernetes.io/blog/2019/06/20/crd-structural-schema/)|
[[KEP]20190425-structural-openapi](https://github.com/kubernetes/enhancements/blob/master/keps/sig-api-machinery/20190425-structural-openapi.md)|
[Kubebuilder - SDK for building Kubernetes APIs using CRDs](https://github.com/kubernetes-sigs/kubebuilder)|