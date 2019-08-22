# Admission

After primehub 1.7, we start to use admission webhooks to handle kubernetes objects mutation and validation:

* hub group quota (1.7): a validation webhook to verify the usage of a hub user in a group
* airgap image replacer (1.8): a mutation webhook to replace container image url defined in a `pod`

An admission webhook is grouped by:

1. admission configuration 
2. service (it is called by kube-apiserver)
3. a secret to keep certificates for https
4. a deployment where an admission lives

## Admission Configuration

There are two kinds of configrations for dynamic webhook in the Admission Controller.

* MutatingWebhookConfiguration
* ValidatingWebhookConfiguration

Both of them use the same structure to define a configuration, but they are invoked in a different api lifecycle before a kubernetes object persisted into the etcd. 

You can find a introducion at [A Guide to Kubernetes Admission Controllers](https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/)

For users, they should care about the `namespaceSelector` in a configuraion. We made an admission webhook only working with labeled namespaces.


### hub group quota

* kind: `ValidatingWebhookConfiguration`
* namespaceSelector: `primehub.io/resources-validation-webhook: "enabled"`

### airgap image replacer

* kind: `MutatingWebhookConfiguration`
* namespaceSelector: `primehub.io/image-mutation-webhook: "enabled"`

## cluster configuration

In order to sign a certificate for https, the kubernetes cluster should enable ca-signer (certificate controller). The administrator could checkt it by:

```
$ ./modules/support/operation_script/ca-signer-vendor-test.sh
```

here is a output example:

```
namespace/vendor-test created
try to issue a CA
creating certs in tmpdir /var/folders/g_/01sz14td6qsdt7l2x_y4brmw0000gn/T/tmp.v2ylRksc
Generating RSA private key, 2048 bit long modulus
..............................................................+++
............................................+++
e is 65537 (0x10001)
certificatesigningrequest.certificates.k8s.io/vendor-test-svc.vendor-test created
NAME                          AGE   REQUESTOR           CONDITION
vendor-test-svc.vendor-test   0s    qrtt1@infuseai.io   Pending
certificatesigningrequest.certificates.k8s.io/vendor-test-svc.vendor-test approved
secret/vendor-test-secret created

ca-signer is working.

clean up
certificatesigningrequest.certificates.k8s.io "vendor-test-svc.vendor-test" deleted
namespace "vendor-test" deleted
```

referenced issue [ch1641](https://app.clubhouse.io/infuseai/story/1641/configure-rke-to-support-csr-approval)

