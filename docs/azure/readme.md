# Readme

## Main links

[acs-engine](https://github.com/Azure/acs-engine/blob/master/docs/acsengine.md)

[cluster definition](https://github.com/Azure/acs-engine/blob/master/docs/clusterdefinition.md)

[Create a service principal](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-create-service-principal-portal)

```bash
az ad sp create-for-rbac --name ServicePrincipalName --password PASSWORD
```

## Main commands

### Login to azure

* set environment variables

```bash
 source ./docs/azure/export.env
```

* login

```bash
az login --service-principal -u $SERVICEPRINCIPALCLIENTID -p $SERVICEPRINCIPALCLIENTSECRET --tenant $SERVICEPRINCIPALTENANTID
```

### Prepare cluster definition file

```bash
envsubst < input.txt > output.txt
```

### Create resource group

```bash
az group create --name "ee-kubernetes-demo" --location "westerneurope"
```

### deploy acs

```bash
az group deployment create --name "ee-kubernetes-demo-acs" --resource-group "ee-kubernetes-demo" --template-file "./_output/ee-kube/azuredeploy.json" \
    --parameters "./_output/ee-kube/azuredeploy.parameters.json"
```
