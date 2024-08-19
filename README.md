# Project Setup and Deployment Guide

This guide will walk you through setting up and deploying the application using Yarn, Docker, Docker Compose, and Kubernetes with Kind and Kubectl.

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js**
- **npm**
- **Yarn**
- **Docker**
- **Docker Compose**
- **Kind**
- **Kubectl**

## Running the Application Locally

1. **Install Dependencies**
2. 
   After cloning the repository, navigate to the project directory and install the necessary packages using Yarn:

   ```bash
   yarn install
   ```

3. **Start the Application**

   To start the application locally, use:

   ```bash
   yarn start
   ```

## Building the Docker Image

1. **Build the Docker Image**

   If you have Docker installed, you can build a Docker image for the application using the provided `Dockerfile`:

   ```bash
   docker build -t your-image-name .
   ```

## Running the Application with Docker Compose

1. **Start the Application**

   You can run the application using Docker Compose with the provided `mongo.yaml` file:

   ```bash
   docker-compose -f mongo.yaml up
   ```

## Deploying to Kubernetes with Kind

1. **Create a Kind Cluster**

   Set up a Kind cluster using the provided configuration:

   ```bash
   kind create cluster --config kind-config.yaml
   ```

2. **Configure Ingress Controller**

   Deploy the ingress controller:

   ```bash
   kubectl apply -f ingresscontroller.yaml
   ```

3. **Configure Kubectl**

   Retrieve the Kind cluster config and update your kubeconfig:

   ```bash
   kind get kubeconfig >> ~/.kube/config
   ```

   Modify the server address in `~/.kube/config` to:

   ```yaml
   server: https://127.0.0.1:6443
   ```

4. **Deploy the Application to the Cluster**

   Apply the configuration files in the following order:

   ```bash
   kubectl apply -f configmap.yaml
   kubectl apply -f secret.yaml
   kubectl apply -f init-configmap.yaml
   kubectl apply -f mongodb.yaml
   kubectl apply -f mongo-express.yaml
   kubectl apply -f simple-project.yaml
   kubectl apply -f ingress.yaml
   ```

5. **Update `/etc/hosts` File**

   Add the following line to your `/etc/hosts` file to map the local domains:

   ```bash
   127.0.0.1 local.simple.com local.express.com
   ```

## Conclusion

With these steps, you should have the application running locally, in Docker, or in a Kubernetes cluster. For further information, refer to the individual configuration files and their documentation.
