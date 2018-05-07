# Demo Preparation

## References

### Kops tutorial

- https://kubernetes.io/docs/getting-started-guides/kops/

### Kubernetes tutorials

*(beginner)*

- https://kubernetes.io/docs/tutorials/stateless-application/hello-minikube/
- https://kubernetes.io/docs/tutorials/kubernetes-basics/

*(detailed)*

- https://github.com/kelseyhightower/kubernetes-the-hard-way/

### Miscellaneous

- https://kubernetes.io/docs/reference/kubectl/cheatsheet/
- https://en.wikipedia.org/wiki/Kubernetes
- [linux - difference between cgroups and namespaces - Stack Overflow](https://stackoverflow.com/questions/34820558/difference-between-cgroups-and-namespaces)
- [The Kubernetes Effect](https://www.infoq.com/articles/kubernetes-effect) at InfoQ

## Prep AWS

- [x] Create `demo` IAM user account in AWS
- [x] Configure `demo` profile with AWS credentials at `~/.aws/config`

```shell
export AWS_PROFILE=demo
```

- [x] Create Route53 hosted zone for `aws.ferreira.cc`

```shell
aws route53 create-hosted-zone --name aws.ferreira.cc --caller-reference 1
```

```json
{
    "HostedZone": {
        "ResourceRecordSetCount": 2,
        "CallerReference": "1",
        "Config": {
            "PrivateZone": false
        },
        "Id": "/hostedzone/Z2FYQ7M988WF5Z",
        "Name": "aws.ferreira.cc."
    },
    "DelegationSet": {
        "NameServers": [
            "ns-495.awsdns-61.com",
            "ns-1377.awsdns-44.org",
            "ns-756.awsdns-30.net",
            "ns-2043.awsdns-63.co.uk"
        ]
    },
    "Location": "https://route53.amazonaws.com/2013-04-01/hostedzone/Z2FYQ7M988WF5Z",
    "ChangeInfo": {
        "Status": "PENDING",
        "SubmittedAt": "2018-02-28T00:20:08.732Z",
        "Id": "/change/C26T4GE6LJDUMG"
    }
}
```

- [x] Create S3 Bucket for Kops

```shell
export KOPS_STATE_STORE=s3://kops.aws.ferreira.cc

# mb = make bucket
aws s3 mb $KOPS_STATE_STORE
```

- [x] Create a `demo` cluster to be already setup beforehand *(align names with the `demo-script.md`)*

```shell
export KOPS_STATE_STORE=s3://kops.aws.ferreira.cc

kops create cluster demo.aws.ferreira.cc --zones=eu-west-1a --node-count=1

kops update cluster demo.aws.ferreira.cc --yes

kops validate cluster
```

## Prep Code

- [x] Prepare 2 node.js micro services
      - `front-app` — receive GET, query `back-app`
      - `back-app` — get hostname from system
- [x] Create simple `Dockerfile` for them both

## Prep Docker

- [x] Clear local Docker (except for `openjdk`)

- [x] Setup my public registry on Docker Hub: https://hub.docker.com/r/hugocf

- [x] Ensure `docker login` works on the terminal

- [x] Push `back-app` service to Docker Hub

```shell
docker build -t hugocf/back-app:0.1 .
docker push hugocf/back-app:0.1
```

- [x] Push `front-app` service to Docker Hub

```shell
docker build -t hugocf/front-app:0.1 .
docker push hugocf/front-app:0.1
```

- [x] Delete any app versions other than `front-app:0.1` and `back-app:0.1` in Docker Hub

