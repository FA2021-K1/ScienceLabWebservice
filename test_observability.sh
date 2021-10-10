#!/bin/bash
docker compose -p sciencelabwebservice up --build

while :
do
    if [ -z `docker-compose ps -q science-lab-web-service` ] || [ -z `docker ps -q --no-trunc | grep $(docker-compose ps -q science-lab-web-service)` ]; then
      echo "Not running yet."
      sleep 1
    else
  	  echo "Runs."
	    break
    fi
done

sleep 10

# Register User 1
curl --location --request POST 'localhost:80/v1/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "drone01",
    "password": "test",
    "type": 0
}'

# Register User 2
curl --location --request POST 'localhost:80/v1/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "drone02",
    "password": "test",
    "type": 2
}'

# Login User 1
curl --location --request POST 'localhost:80/v1/auth/login' \
--header 'Authorization: Basic ZHJvbmUwMTp0ZXN0' \
--data-raw ''

# Login User 2
curl --location --request POST 'localhost:80/v1/auth/login' \
--header 'Authorization: Basic ZHJvbmUwMjp0ZXN0' \
--data-raw ''

# Failed login
curl --location --request POST 'localhost:80/v1/auth/login' \
--header 'Authorization: Bas ZHJvbmUwMjZXN0' \
--data-raw ''

# Create SensorType1
curl -X POST -H "Content-Type: application/json" -d \
    '{"id":0, "name":"temperatureSensor", "unit":"degree celsius"}' \
    "http://localhost:80/v1/sensorTypes"

sleep 5

# Create SensorType2
curl -X POST -H "Content-Type: application/json" -d \
    '{"id":1, "name":"PHSensor", "unit":"none"}' \
    "http://localhost:80/v1/sensorTypes"

sleep 5

# Create SensorType3
curl -X POST -H "Content-Type: application/json" -d \
    '{"id":2, "name":"DSSensor", "unit":"no clue"}' \
    "http://localhost:80/v1/sensorTypes"

sleep 5

# Create Measurement1
curl --location --request POST 'localhost:80/v1/measurements/drone' \
--header 'Content-Type: application/json' \
--data-raw '[
  {
    "measurements": [
      {
        "measurement": 2.123,
        "sensorID": 0,
        "sensorType": 0
      },
      {
        "measurement": 4.3,
        "sensorID": 1,
        "sensorType": 1
      },
      {
        "measurement": 12.2,
        "sensorID": 2,
        "sensorType": 2
      }
    ],
    "date": "2021-09-23T18:09:36Z",
    "buoyID": 0,
    "location": {
      "longitude": -93.94,
      "latitude": -13.94
    }
  }
]'

sleep 5

# Create Measurement2
curl --location --request POST 'localhost:80/v1/measurements/drone' \
--header 'Content-Type: application/json' \
--data-raw '[
  {
    "measurements": [
      {
        "measurement": 2.123,
        "sensorID": 0,
        "sensorType": 0
      },
      {
        "measurement": 4.3,
        "sensorID": 1,
        "sensorType": 1
      },
      {
        "measurement": 12.2,
        "sensorID": 2,
        "sensorType": 2
      }
    ],
    "date": "2021-09-23T19:19:36Z",
    "buoyID": 1,
    "location": {
      "longitude": -94.94,
      "latitude": -14.94
    }
  }
]'

sleep 5

# Get Sensor Types
curl --location --request GET 'localhost:8080/v1/measurements/frontend/sensors'

sleep 5

# Get Agg. Measurements
curl --location --request GET 'localhost:80/v1/measurements/frontend/aggregated?startDate=1532396593&endDate=1832396593'

sleep 5

# Get Agg. Measurements 2
curl --location --request GET 'localhost:80/v1/measurements/frontend/aggregated?startDate=1532396593&endDate=1832396593'

sleep 5

# Get Agg. Buoy Measurements
curl --location --request GET 'localhost:80/v1/measurements/frontend/aggregated/buoy?startDate=1532396593&endDate=1832396593'

sleep 5

# Get Agg. Buoy Measurements 2
curl --location --request GET 'localhost:80/v1/measurements/frontend/aggregated/buoy?startDate=1532396593&endDate=1832396593'