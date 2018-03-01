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

- https://en.wikipedia.org/wiki/Kubernetes
- [linux - difference between cgroups and namespaces - Stack Overflow](https://stackoverflow.com/questions/34820558/difference-between-cgroups-and-namespaces)
- [The Kubernetes Effect](https://www.infoq.com/articles/kubernetes-effect) at InfoQ

## Prep AWS

- [x] Create demo IAM user account in AWS


- [x] Configure credentials in bash profile


- [x] Create source script to setup credentials. R: `kubernetes.creds`


- [x] Temporarily auto-load above script at the end of `.bash_profile`

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

## Prep Code

- [x] Prepare 2 node.js micro services
      - `front-app` — receive GET, query `back-app`
      - `back-app` — get hostname from system
- [x] Create simple `Dockerfile` for them both

## Prep Docker

- [x] Clear local Docker (except for `openjdk`)

- [x] Setup my public registry on Docker Hub. R: No need, was already done!

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


