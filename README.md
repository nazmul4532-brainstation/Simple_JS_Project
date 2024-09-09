# Kubernetes Setup with Kind, Cilium, and Gateway API

## Prerequisites

- **Kind**: Kubernetes IN Docker
- **Kubernetes**: Ensure `kubectl` is installed
- **Cilium**: Install Cilium (installation script will be added later)

## Instructions

```bash
# 1. Create Kind Cluster
# This command creates a Kubernetes cluster using Kind based on the configuration provided in cluster.yaml.
kubectl apply -f cluster.yaml

# 2. Install Gateway API CRDs
# These commands install the necessary Custom Resource Definitions (CRDs) for the Gateway API,
# which are required for managing Gateway resources and HTTP routes.
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.1.0/config/crd/standard/gateway.networking.k8s.io_gatewayclasses.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.1.0/config/crd/standard/gateway.networking.k8s.io_gateways.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.1.0/config/crd/standard/gateway.networking.k8s.io_httproutes.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.1.0/config/crd/standard/gateway.networking.k8s.io_referencegrants.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.1.0/config/crd/standard/gateway.networking.k8s.io_grpcroutes.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.1.0/config/crd/experimental/gateway.networking.k8s.io_tlsroutes.yaml

# 3. Install Cilium
# This command installs Cilium as the CNI plugin with specific settings,
# enabling NodePort, kube-proxy replacement, L7 proxy, and Gateway API support.
cilium install --set nodePort.enabled=true --set kubeProxyReplacement=true --set l7Proxy=true --set gatewayAPI.enabled=true --version 1.16.1

# 4. Apply Kubernetes Resources
# Apply the configuration for various Kubernetes resources. These resources include:
# - ConfigMaps for initial setup and configuration
# - Secrets for storing sensitive data such as TLS certificates
# - Deployments and services for MongoDB, Mongo Express, and a simple Node.js application
# - Gateway and HTTPRoute configurations for managing ingress traffic and routing
kubectl apply -f configmap.yaml    # Apply initial configuration
kubectl apply -f init-configmap.yaml # Apply configuration for initial setup
kubectl apply -f secret.yaml       # Apply secret configurations
kubectl apply -f my-tls-secret.yaml # Apply TLS secret for secure communication
kubectl apply -f mongodb.yaml      # Deploy MongoDB service
kubectl apply -f mongo-express.yaml # Deploy Mongo Express service
kubectl apply -f simple-nodejs-app.yaml # Deploy a simple Node.js application
kubectl apply -f gateway.yaml      # Apply Gateway configuration
kubectl apply -f httproute.yaml    # Apply HTTPRoute configuration for local.simple.com
kubectl apply -f expresshttproute.yaml # Apply HTTPRoute configuration for local.express.com
