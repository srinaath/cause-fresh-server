#!/bin/bash
docker-compose down
docker-compose build
docker-compose -p CauseFresh-qa up -d




