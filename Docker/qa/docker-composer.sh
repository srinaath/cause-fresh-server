#!/bin/bash
set -o allexport
source .env.qa
set +o allexport
docker-compose down
docker-compose build
docker-compose up -d




