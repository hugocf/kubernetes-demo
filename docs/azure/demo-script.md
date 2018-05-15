# Demo Script

## Start with acs-engine

(show how an `example` cluster is created with `acs-engine`)

* show the clusterDefinition.json file

```bash
cd ./docs/azure/

acs-engine generate --api-model clusterDefinition.json

az group deployment create --name "ee-kubernetes-example-acs" \
  --resource-group "ee-kubernetes-example" \
  --template-file "./_output/ee-kube-example/azuredeploy.json" \
  --parameters "./_output/ee-kube-example/azuredeploy.parameters.json"
```

* Takes about 10 min. (`0:13–0:23`)

## Switch to code…

```shell
code .
```

* Show `back-app` and `front-app`
* Show that both `Dockerfile` are the same

* Open Docker Hub <https://hub.docker.com/r/hugocf/> and show both apps are already there

## Go back to acs-engine …

* switch to the pre-build `demo` cluster
* show portal and resources created

## MASTERFQDN should be ee-kube-demo.westeurope.cloudapp.azure.com

```bash
export KUBECONFIG=`pwd`/_output/ee-kube-demo/kubeconfig/kubeconfig.westeurope.json

kubectl config view
```

* open kubernetes dashboard

```bash
kubectl proxy
```

* navigate to [http://localhost:8001/api/v1/namespaces/kube-system/services/kubernetes-dashboard/proxy](http://localhost:8001/api/v1/namespaces/kube-system/services/kubernetes-dashboard/proxy)

* deploy back-app

```bash
kubectl run back-app --image=hugocf/back-app:0.1 --port=8000

kubectl get deploy,rs,pods

kubectl expose deployment back-app

kubectl get deploy,rs,pods,svc
```

* get the yaml files

```bash
cd ../../

mkdir kube/back-app

kubectl get deployment back-app -o yaml --export > kube/back-app/deployment.yaml
kubectl get service back-app -o yaml --export > kube/back-app/service.yaml
```

### front-app

* Duplicate `back-app` folder and rename to `front-app`
* Edit `deployment.yaml`
  * Change all `back` to `front`
* Edit `service.yaml`
  * Change all `back` to `front`
  * Replace `type: ClusterIP` with `type: LoadBalancer`
  * Delete `spec.clusterIP`

```bash
kubectl apply -f kube/front-app/

kubectl get deploy,rs,pods,svc
```

* show the app running

### OPS

```bash
kubectl port-forward back-app-??????????-????? 8000 &

http localhost:8000

kill %1
```

```bash
kubectl exec -it back-app-??????????-????? -- ls -l

kubectl exec -it back-app-??????????-????? -- sh

env | sort
```

```bash
kubectl logs front-app-??????????-?????
```
