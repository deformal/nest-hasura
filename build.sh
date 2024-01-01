#!/bin/bash
set -e
echo "Building the server"
nx run-many --target=build --all
echo "Copying node engines for prisma"
cp ./node_modules/.prisma ./dist/apps/node-k8s/node_modules/.prisma
