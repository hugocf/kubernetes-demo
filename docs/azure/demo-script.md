# Demo Script

## Start with acs-engine

_(show how an `example` cluster is created with `kops`)_

```bash
acs-engine generate --api-model clusterDefinition.json

az group deployment create --name "ee-kubernetes-demo-acs" --resource-group "ee-kubernetes-demo" --template-file "./_output/ee-kube/azuredeploy.json" \
    --parameters "./_output/ee-kube/azuredeploy.parameters.json"
```
