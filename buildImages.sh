#!/bin/bash
set -e
echo "Building server production dist"
nx run-many --target=build --all
echo "Building docker images"
echo "Building server image"
docker buildx build -f ./apps/auth/Dockerfile -t saurabhjainwal/node-k8s-server:latest ./ --platform=linux
docker buildx build -f ./apps/cart/Dockerfile -t saurabhjainwal/node-k8s-cart:latest ./ --platform=linux
echo "Building postgres image"
docker buildx build -f ./postgres/Dockerfile -t saurabhjainwal/node-k8s-postgres:latest ./ --platform=linux
echo "Building hasura image"
docker buildx build -f ./hasura/Dockerfile -t saurabhjainwal/node-k8s-hasura:latest ./ --platform=linux
echo "Building caddy image"
docker buildx build -f ./caddy/Dockerfile -t saurabhjainwal/node-k8s-caddy:latest ./ --platform=linux
echo "Done Building"

echo "Deploying Images"
docker push saurabhjainwal/node-k8s-server:latest
docker push saurabhjainwal/node-k8s-cart:latest
docker push saurabhjainwal/node-k8s-postgres:latest
docker push saurabhjainwal/node-k8s-hasura:latest
docker push saurabhjainwal/node-k8s-caddy:latest

echo "Done"



