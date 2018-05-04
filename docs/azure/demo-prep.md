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
* create a service principal

```bash
az ad sp create-for-rbac --name "kubernetes-demo"
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

```bash
export SERVICEPRINCIPALCLIENTID=
export SERVICEPRINCIPALCLIENTSECRET=
export SERVICEPRINCIPALTENANTID=

az login --service-principal -u $SERVICEPRINCIPALCLIENTID -p $SERVICEPRINCIPALCLIENTSECRET --tenant $SERVICEPRINCIPALTENANTID
```

* Generate sha key

```bash
cd ~/.ssh/
ssh-keygen -t rsa
```
