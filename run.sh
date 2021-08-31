#!/bin/bash
cd /home/ec2-user/webservice
docker-compose build --no-cache
docker-compose up -d