# Project Setup and Deployment Guide

This guide will walk you through setting up and deploying the application using Cilium CNI and Gateway API in a Kind Cluster.

## Deploying to Kubernetes with Kind using Cilium CNI and Gateway API

1. **Create a Kind Cluster**

   Set up a Kind cluster using the provided configuration:

   ```bash
   kind create cluster --config cluster.yaml
   ```

2. **Configure Kubectl**

   Retrieve the Kind cluster config and update your kubeconfig:

   ```bash
   kind get kubeconfig >> ~/.kube/config
   ```

   Modify the server address if not already in `~/.kube/config` to:

   ```yaml
   server: https://127.0.0.1:6443
   ```

   
3. **Install Gateway API CRDs**

 These commands install the necessary Custom Resource Definitions (CRDs) for the Gateway API, which are required for managing Gateway resources and HTTP routes.
   ```bash
   kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.1.0/config/crd/standard/gateway.networking.k8s.io_gatewayclasses.yaml
   kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.1.0/config/crd/standard/gateway.networking.k8s.io_gateways.yaml
   kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.1.0/config/crd/standard/gateway.networking.k8s.io_httproutes.yaml
   kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.1.0/config/crd/standard/gateway.networking.k8s.io_referencegrants.yaml
   kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.1.0/config/crd/standard/gateway.networking.k8s.io_grpcroutes.yaml
   kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.1.0/config/crd/experimental/gateway.networking.k8s.io_tlsroutes.yaml
   ```

4. **Install Cilium**

If cillium is not already installed, you may use the provided script to install cilium:
```bash
./install-cillium.sh
```

This command installs Cilium as the CNI plugin with specific settings, enabling NodePort, kube-proxy replacement, L7 proxy, and Gateway API support.
   ```bash
   cilium install --set nodePort.enabled=true --set kubeProxyReplacement=true --set l7Proxy=true --set gatewayAPI.enabled=true --version 1.16.1
   ```

5. **Deploy the Application to the Cluster**

   Apply the configuration files in the following order:

   ```bash
   kubectl apply -f configmap.yaml
   kubectl apply -f secret.yaml
   kubectl apply -f my-tls-secret.yaml
   kubectl apply -f init-configmap.yaml
   kubectl apply -f mongodb.yaml
   kubectl apply -f mongo-express.yaml
   kubectl apply -f simple-project.yaml
   kubectl apply -f gateway.yaml
   kubectl apply -f httproute.yaml
   kubectl apply -f expresshttproute.yaml
   ```

6. **Update `/etc/hosts` File**

   Go to cli and use the following command to get the Node Ip Address:
   ```bash
   kubectl get nodes -o wide
   ```

   Add the following line to your `/etc/hosts` file to map the local domains:

   ```bash
   <Any Node IP> local.simple.com local.express.com
   ```

6. **Access the Website**

   Go to cli and use the following command to get the Node Port:
   ```bash
   kubectl get services
   ```
   Under the services, there will be a service names cilium-gateway-app-gateway, which is bound port 80 and 443 to some random Node Ports. Those Node Ports are accessible from the host Machine.

   To access the Simple Node JS website go to:

   ```bash
   http://local.simple.com:<80 bournd Node-Port>/
   //or
   https://local.simple.com:<443 bournd Node-Port>/
   ```

   To access the Mongo Express website go to:

   ```bash
   http://local.express.com:<80 bournd Node-Port>/
   //or
   https://local.express.com:<443 bournd Node-Port>/
   ```

## Conclusion

With these steps, you should have the application running using Cillium CNI and Gateway API, refer to the individual configuration files and their documentation.
