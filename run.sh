#!/bin/bash
cd /home/ec2-user/webservice
docker-compose -f docker-compose-deploy.yml up -d
