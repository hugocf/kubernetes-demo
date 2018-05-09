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
export SERVICEPRINCIPALCLIENTID=b475812b-8697-491a-b1c5-086db0abc60e
export SERVICEPRINCIPALCLIENTSECRET=b8d36c09-6429-40ab-bb62-e18457a2c123
export SERVICEPRINCIPALTENANTID=1f8dc174-62e5-4b61-9f28-7c2450a9a522


az login --service-principal -u $SERVICEPRINCIPALCLIENTID -p $SERVICEPRINCIPALCLIENTSECRET --tenant $SERVICEPRINCIPALTENANTID
```

* create an azure resource group

```bash
az group create -n ee-kubernetes-demo -l "westeurope"
az group create -n ee-kubernetes-final -l "westeurope"
```

* Generate sha key and paste it to the clusterDefinition.json file

```bash
cd ~/.ssh/
ssh-keygen -t rsa

cat ~/.ssh/kubernetes-demo.pub

export SSH_PUBLICKEY=ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCxs2MbVa8VUBwIZKrYAT27ioP4toKBc/NgALwy1MQXYDLvC3cOQR3AqVQlZ8KWjbeUUJU/9hl4+BSsO8lXj+LRb52sV6YtkhFyxavinLD2bpZdafBLxTjsMW85qqdE14sWHzmpWTW6JElW2tCI1E9aB1fsQLBHJ8K15qOyVBYlsp6POJZ0StJyWIXtOWSnuDXUl4Kj7tm/AnCe8hVXKtxd8b5bXU7UM3arb6Ja2LphKg1sFc4m+VsXfDpc4JOjqwrpOvnLOpKNAzOQF++9R3wGV5bTiIJTHf3YXI6XKVXC6393iVX3PuLIeXZjPSKTy/VRun05W6Pgy9ZtRSmK6bNP
```

* substitute env variables in clusterDefinition

```bash
cd kubernetes-demo/docs/azure/

envsubst < clusterDefinition.template.json > clusterDefinition.json
```

* change dnsPrefix: ee-kube-final

```bash
acs-engine generate clusterDefinition.json

az group deployment create --name "ee-kubernetes-final-acs" --resource-group "ee-kubernetes-final" --template-file "./_output/ee-kube-final/azuredeploy.json" \
    --parameters "./_output/ee-kube-final/azuredeploy.parameters.json"


export KUBECONFIG=./_output/ee-kube-final/kubeconfig/kubeconfig.westeurope.json

kubectl cluster-info
```
