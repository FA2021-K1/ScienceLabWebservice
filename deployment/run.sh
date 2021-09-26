#!/bin/bash
cd /home/ec2-user/webservice
docker pull ghcr.io/fa21-collaborative-drone-interactions/sciencelabwebservice:develop
docker pull ghcr.io/fa21-collaborative-drone-interactions/sciencelabfrontend:develop
docker-compose -f docker-compose.yml up -d
