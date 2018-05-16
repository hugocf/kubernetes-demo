#!/usr/bin/env bash

echo
echo "### Installing Heapster (provides basic cluster monitoring) ###"
echo
kubectl apply -f https://raw.githubusercontent.com/kubernetes/kops/master/addons/monitoring-standalone/v1.7.0.yaml

echo
echo "### Installing Kubernetes Dashboard ###"
echo
kubectl apply -f https://raw.githubusercontent.com/kubernetes/kops/master/addons/kubernetes-dashboard/v1.8.3.yaml
