# Demo Script

## Start with kops…

```shell
cd ~/Work/Sandbox/kubernetes

export KOPS_STATE_STORE=s3://kops.aws.ferreira.cc

aws s3 mb $KOPS_STATE_STORE
aws s3 ls

kops create cluster demo.aws.ferreira.cc --zones=eu-west-1a --node-count=1

aws s3 ls $KOPS_STATE_STORE
aws s3 ls $KOPS_STATE_STORE/demo.aws.ferreira.cc/

kops update cluster demo.aws.ferreira.cc --yes

kops validate cluster
```

- Takes about 15 min. (`0:33–0:48`)


## Switch to code…

```shell
mate code
```

- Show `back-app` and `front-app`
- Show one `Dockerfile`


- Open Docker Hub <https://hub.docker.com/r/hugocf/> and show both apps are already there

## Go back to kops…

```shell
kubectl config use-context demo.aws.ferreira.cc

kops validate cluster
```

- Open Kops repo <https://github.com/kubernetes/kops/> to show where are the **addons**


```shell
cat kube/install-addons.sh

./kube/install-addons.sh

kops get secrets    # See `kube` secret stored in S3

kops get secrets kube --output=plaintext | pbcopy
```

- Open Kubernetes Dashboard <https://api.demo.aws.ferreira.cc/ui> and login with user **admin**

## Go to kube…

### back-app

```shell
kubectl run back-app --image=hugocf/back-app:0.1 --port=8000

kubectl get deploy,rs,pods

kubectl expose deployment back-app

kubectl get deploy,rs,pods,svc
```

```shell
mkdir kube/back-app

kubectl get deployment back-app -o yaml --export > kube/back-app/deployment.yaml

kubectl get service back-app -o yaml --export > kube/back-app/service.yaml

mate kube
```

- Show the key parts of `deployment.yml` and `service.yml`

### front-app

- Duplicate `back-app` folder and rename to `front-app`
- Edit `deployment.yaml`
  - Change all `back` to `front`
- Edit `service.yaml`
  - Change all `back` to `front`
  - Replace `type: ClusterIP` with `type: LoadBalancer`
  - Delete `spec.clusterIP`

```shell
kubectl apply -f kube/front-app/

kubectl get deploy,rs,pods,svc

# Describe it if the EXTERNAL-IP is truncated
kubectl describe svc front-app

http ??????????-??????????.eu-west-1.elb.amazonaws.com
```

- Open Kubernetes Dashboard <https://api.demo.aws.ferreira.cc/ui> to show what was created

### Ops

```shell
kubectl port-forward back-app-??????????-????? 8000 &

http localhost:8000

kill %1
```

```shell
kubectl exec -it back-app-??????????-????? -- ls -l

kubectl exec -it back-app-??????????-????? -- sh

env | sort
```

```shell
kubectl logs front-app-??????????-?????
```

## Run on Minikube?

```shell
minikube status

kubectl config current-context

kubectl config use-context minikube
```

```shell
kubectl apply -f kube/back-app/

kubectl apply -f kube/front-app/

kubectl get deploy,rs,pods,svc
```

```shell
minikube dashboard

# ???
minikube service front-app
```

## Upgrade a service?

- Edit `code/front-app/server.js` and add the response to the log message:

```javascript
console.log('Received request for URL: ' + request.url + ', responded with: ' + body);
```

```shell
cd code/front-app

docker build -t hugocf/front-app:0.2 .

docker push hugocf/front-app:0.2
```

```shell
cd -

mate kube/front-app/deployment.yaml
```

- Change the `image:` version from `hugocf/front-app:0.1` to `hugocf/front-app:0.2`

```shell
kubectl apply -f kube/front-app/

kubectl get deploy,rs,pods,svc
```

