# Demo Preparation

## References

### ACS-ENGINE

* [https://github.com/Azure/acs-engine/blob/master/docs/acsengine.md](https://github.com/Azure/acs-engine/blob/master/docs/acsengine.md)

* [https://github.com/Azure/acs-engine/blob/master/docs/clusterdefinition.md](https://github.com/Azure/acs-engine/blob/master/docs/clusterdefinition.md)

* [https://github.com/Azure/acs-engine/tree/master/examples](https://github.com/Azure/acs-engine/tree/master/examples)

## Prep terminal

* Install az cli
  [https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-macos?view=azure-cli-latest](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-macos?view=azure-cli-latest)

```bash
brew update && brew install azure-cli
```

* login to az with portal

```bash
az login

az ad sp list -o table
```

* create a service principal

```bash
az ad sp create-for-rbac --name "kubernetes-demo" --role="Contributor" --scopes="/subscriptions/7348075e-601f-435c-957b-ef23db3a7a66"
```

```json
{
  "appId": "",
  "displayName": "kubernetes-demo",
  "name": "http://kubernetes-demo",
  "password": "",
  "tenant": ""
}
```

* copy paste values to clusterdefinition.json file

```bash
export SERVICEPRINCIPALCLIENTID=
export SERVICEPRINCIPALCLIENTSECRET=
export SERVICEPRINCIPALTENANTID=


az login --service-principal -u $SERVICEPRINCIPALCLIENTID -p $SERVICEPRINCIPALCLIENTSECRET --tenant $SERVICEPRINCIPALTENANTID
```

* create an azure resource group

```bash
az group create -n ee-kubernetes-demo -l "westeurope" \
az group create -n ee-kubernetes-example -l "westeurope"
```

* Generate sha key and paste it to the clusterDefinition.json file

```bash
cd ~/.ssh/
ssh-keygen -t rsa

cat ~/.ssh/kubernetes-demo.pub

export SSH_PUBLICKEY=
```

* substitute env variables in clusterDefinition

```bash
cd kubernetes-demo/docs/azure/

envsubst < clusterDefinition.template.json > clusterDefinition.json
```

* change dnsPrefix: ee-kube-demo

```bash
acs-engine generate --api-model clusterDefinition.json

az group deployment create \
  --name "ee-kubernetes-demo-acs" \
  --resource-group "ee-kubernetes-demo" \
  --template-file "./_output/ee-kube-demo/azuredeploy.json" \
  --parameters "./_output/ee-kube-demo/azuredeploy.parameters.json"


export KUBECONFIG=./_output/ee-kube-demo/kubeconfig/kubeconfig.westeurope.json

kubectl cluster-info
```
