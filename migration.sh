#!/bin/bash
set -e
stage=$1
echo "Running Hasura Migration"
npx hasura --project=./hasura --envfile=.env migrate apply
wait
npx hasura --project=./hasura --envfile=.env metadata apply
echo "Done"