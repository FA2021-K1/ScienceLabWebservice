#!/bin/bash
cd /home/ec2-user/webservice
docker pull ghcr.io/fa21-collaborative-drone-interactions/sciencelabwebservice:initialdeploymentsetup
docker pull ghcr.io/fa21-collaborative-drone-interactions/sciencelabfrontend:initialdeploymentsetup
docker-compose -f docker-compose-deploy.yml up -d
