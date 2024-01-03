#!/bin/bash
set -e
if docker ps -q 2>/dev/null | grep -q .; then
    containers_running=true
    echo "Are there running containers? $containers_running"
    docker kill $(docker ps -q)
    minikube start
else
    containers_running=false
    echo "Are there running containers? $containers_running"
fi
