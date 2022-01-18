#!/bin/bash

if [ "$1" == "-d" ]
  then
    echo "Deleting all created containers and volumes"
    docker compose -p sciencelabwebservice down -v
else
  echo "Script started!"

  # Start all containers
  docker compose -p sciencelabwebservice up -d

  # Just to make sure that each container (especially from the ELK stack) is ready
  echo "Wait until all services are started!"
  sleep 60

  # Register User 1
  curl --fail-with-body --location --request POST 'localhost:8080/auth' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "username": "drone01",
      "password": "test",
      "type": 0
  }'

  sleep 1

  # Register User 2
  curl --fail-with-body --location --request POST 'localhost:8080/auth' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "username": "drone02",
      "password": "test",
      "type": 2
  }'

  sleep 1

  # Login User 1
  curl --fail-with-body --location --request POST 'localhost:8080/auth/login' \
  --header 'Authorization: Basic ZHJvbmUwMTp0ZXN0' \
  --data-raw ''

  sleep 1

  # Login User 2
  curl --fail-with-body --location --request POST 'localhost:8080/auth/login' \
  --header 'Authorization: Basic ZHJvbmUwMjp0ZXN0' \
  --data-raw ''

  sleep 1

  # Login User 2 again
  curl --fail-with-body --location --request POST 'localhost:8080/auth/login' \
  --header 'Authorization: Basic ZHJvbmUwMjp0ZXN0' \
  --data-raw ''

  sleep 1

  # Login User 2 again
  curl --fail-with-body --location --request POST 'localhost:8080/auth/login' \
  --header 'Authorization: Basic ZHJvbmUwMjp0ZXN0' \
  --data-raw ''

  sleep 1

  # Failed login
  curl --fail-with-body --location --request POST 'localhost:8080/auth/login' \
  --header 'Authorization: Bas ZHJvbmUwMjZXN0' \
  --data-raw ''

  sleep 1

  # Failed login
  curl --fail-with-body --location --request POST 'localhost:8080/auth/login' \
  --header 'Authorization: Bas ZHJvbmUwMjZXN0' \
  --data-raw ''

  sleep 1

  # Create SensorType1
  curl --fail-with-body -X POST -H "Content-Type: application/json" -d \
      '{"id":0, "name":"temperatureSensor", "unit":"degree celsius"}' \
      "http://localhost:8080/sensorTypes"
      
  sleep 1

  # Create SensorType2
  curl --fail-with-body -X POST -H "Content-Type: application/json" -d \
      '{"id":1, "name":"PHSensor", "unit":"none"}' \
      "http://localhost:8080/sensorTypes"
      
  sleep 1

  # Create SensorType3
  curl --fail-with-body -X POST -H "Content-Type: application/json" -d \
      '{"id":2, "name":"DSSensor", "unit":"no clue"}' \
      "http://localhost:8080/sensorTypes"

  sleep 1

  # Create Measurement1
  curl --fail-with-body --location --request POST 'localhost:8080/measurements/drone' \
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

  sleep 1

  # Create Measurement2
  curl --fail-with-body --location --request POST 'localhost:8080/measurements/drone' \
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

  sleep 1

  echo "First batch"

  # Create Batch of measurements
  curl --fail-with-body --location --request POST 'localhost:8080/measurements/drone' \
  --header 'Content-Type: application/json' \
  --data-raw '[{"buoyID":1,"date":"2021-09-19T10:00:00+00","location":{"latitude":46.74037,"longitude":11.441375},"measurements":[{"sensorID":0,"sensorType":0,"measurement":5.5},{"sensorID":1,"sensorType":1,"measurement":1000.0}]},{"buoyID":2,"date":"2021-09-19T10:00:00+00","location":{"latitude":46.743085,"longitude":11.44508},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.0},{"sensorID":1,"sensorType":1,"measurement":450.0}]},{"buoyID":3,"date":"2021-09-19T10:00:00+00","location":{"latitude":46.742715000000004,"longitude":11.4474},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.5},{"sensorID":1,"sensorType":1,"measurement":550.0}]}]'

  sleep 1

  curl --fail-with-body --location --request POST 'localhost:8080/measurements/drone' \
  --header 'Content-Type: application/json' \
  --data-raw '[{"buoyID":1,"date":"2021-09-19T10:10:00+00","location":{"latitude":46.74037545862428,"longitude":11.44137596847181},"measurements":[{"sensorID":0,"sensorType":0,"measurement":5.501696793006291},{"sensorID":1,"sensorType":1,"measurement":1000.5772997106601}]},{"buoyID":2,"date":"2021-09-19T10:10:00+00","location":{"latitude":46.74308565169694,"longitude":11.445085504111503},"measurements":[{"sensorID":0,"sensorType":0,"measurement":6.99880494286082},{"sensorID":1,"sensorType":1,"measurement":449.7104183417503}]},{"buoyID":3,"date":"2021-09-19T10:10:00+00","location":{"latitude":46.74271640277791,"longitude":11.44740801194648},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.5052944930376055},{"sensorID":1,"sensorType":1,"measurement":553.4185822579916}]}]'

  sleep 1

  curl --fail-with-body --location --request POST 'localhost:8080/measurements/drone' \
  --header 'Content-Type: application/json' \
  --data-raw '[{"buoyID":1,"date":"2021-09-19T10:20:00+00","location":{"latitude":46.74037937810827,"longitude":11.441382451641635},"measurements":[{"sensorID":0,"sensorType":0,"measurement":5.517606736069172},{"sensorID":1,"sensorType":1,"measurement":1000.9773042146653}]},{"buoyID":2,"date":"2021-09-19T10:20:00+00","location":{"latitude":46.743088621140764,"longitude":11.445091581038977},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.003677003784712},{"sensorID":1,"sensorType":1,"measurement":450.439389527205}]},{"buoyID":3,"date":"2021-09-19T10:20:00+00","location":{"latitude":46.74271776738328,"longitude":11.447413819545469},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.5257096833949015},{"sensorID":1,"sensorType":1,"measurement":555.4081765073335}]}]'

  sleep 1

  echo "Second batch"

  curl --fail-with-body --location --request POST 'localhost:8080/measurements/drone' \
  --header 'Content-Type: application/json' \
  --data-raw '[{"buoyID":1,"date":"2021-09-19T10:30:00+00","location":{"latitude":46.740384885822166,"longitude":11.441390672109984},"measurements":[{"sensorID":0,"sensorType":0,"measurement":5.5306293540144615},{"sensorID":1,"sensorType":1,"measurement":1002.2693179926916}]},{"buoyID":2,"date":"2021-09-19T10:30:00+00","location":{"latitude":46.74309153183022,"longitude":11.44509132309029},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.016994922200072},{"sensorID":1,"sensorType":1,"measurement":451.63673773557645}]},{"buoyID":3,"date":"2021-09-19T10:30:00+00","location":{"latitude":46.74271750825529,"longitude":11.44741296045893},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.586629234010946},{"sensorID":1,"sensorType":1,"measurement":557.8535723442358}]}]'

  sleep 1

  curl --fail-with-body --location --request POST 'localhost:8080/measurements/drone' \
  --header 'Content-Type: application/json' \
  --data-raw '[{"buoyID":1,"date":"2021-09-19T10:40:00+00","location":{"latitude":46.74038780528033,"longitude":11.441393781545427},"measurements":[{"sensorID":0,"sensorType":0,"measurement":5.540893811944808},{"sensorID":1,"sensorType":1,"measurement":1004.3465188538515}]},{"buoyID":2,"date":"2021-09-19T10:40:00+00","location":{"latitude":46.74309409960657,"longitude":11.445099694229159},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.033623291153607},{"sensorID":1,"sensorType":1,"measurement":451.784298174401}]},{"buoyID":3,"date":"2021-09-19T10:40:00+00","location":{"latitude":46.74271916024797,"longitude":11.447411092242513},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.6503164760233116},{"sensorID":1,"sensorType":1,"measurement":559.5141596046277}]}]'

  sleep 1

  curl --fail-with-body --location --request POST 'localhost:8080/measurements/drone' \
  --header 'Content-Type: application/json' \
  --data-raw '[{"buoyID":1,"date":"2021-09-19T10:50:00+00","location":{"latitude":46.74038780487778,"longitude":11.441392337105729},"measurements":[{"sensorID":0,"sensorType":0,"measurement":5.567999394165069},{"sensorID":1,"sensorType":1,"measurement":1007.9591527110774}]},{"buoyID":2,"date":"2021-09-19T10:50:00+00","location":{"latitude":46.74309803937772,"longitude":11.445111284537706},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.044975602836766},{"sensorID":1,"sensorType":1,"measurement":453.1958722899337}]},{"buoyID":3,"date":"2021-09-19T10:50:00+00","location":{"latitude":46.74272407748943,"longitude":11.447417827471849},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.647533489559885},{"sensorID":1,"sensorType":1,"measurement":558.3909728568195}]}]'

  sleep 1

  echo "Third batch"

  curl --fail-with-body --location --request POST 'localhost:8080/measurements/drone' \
  --header 'Content-Type: application/json' \
  --data-raw '[{"buoyID":1,"date":"2021-09-19T10:50:00+00","location":{"latitude":46.74038780487778,"longitude":11.441392337105729},"measurements":[{"sensorID":0,"sensorType":0,"measurement":5.567999394165069},{"sensorID":1,"sensorType":1,"measurement":1007.9591527110774}]},{"buoyID":2,"date":"2021-09-19T10:50:00+00","location":{"latitude":46.74309803937772,"longitude":11.445111284537706},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.044975602836766},{"sensorID":1,"sensorType":1,"measurement":453.1958722899337}]},{"buoyID":3,"date":"2021-09-19T10:50:00+00","location":{"latitude":46.74272407748943,"longitude":11.447417827471849},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.647533489559885},{"sensorID":1,"sensorType":1,"measurement":558.3909728568195}]}]'

  sleep 1

  curl --fail-with-body --location --request POST 'localhost:8080/measurements/drone' \
  --header 'Content-Type: application/json' \
  --data-raw '[{"buoyID":1,"date":"2021-09-19T11:00:00+00","location":{"latitude":46.7403895381289,"longitude":11.441395688493705},"measurements":[{"sensorID":0,"sensorType":0,"measurement":5.568024947782201},{"sensorID":1,"sensorType":1,"measurement":1012.0615878984363}]},{"buoyID":2,"date":"2021-09-19T11:00:00+00","location":{"latitude":46.74310211370222,"longitude":11.445116802866403},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.065422604859057},{"sensorID":1,"sensorType":1,"measurement":454.03573884208805}]},{"buoyID":3,"date":"2021-09-19T11:00:00+00","location":{"latitude":46.74272300819221,"longitude":11.44741709615163},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.655245580570864},{"sensorID":1,"sensorType":1,"measurement":560.8040118548699}]}]'

  sleep 1

  curl --fail-with-body --location --request POST 'localhost:8080/measurements/drone' \
  --header 'Content-Type: application/json' \
  --data-raw '[{"buoyID":1,"date":"2021-09-19T11:10:00+00","location":{"latitude":46.74039497690894,"longitude":11.441396069670335},"measurements":[{"sensorID":0,"sensorType":0,"measurement":5.596020261905565},{"sensorID":1,"sensorType":1,"measurement":1015.1722021504768}]},{"buoyID":2,"date":"2021-09-19T11:10:00+00","location":{"latitude":46.74310419736493,"longitude":11.445112604228935},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.069439170748002},{"sensorID":1,"sensorType":1,"measurement":453.6595786669544}]},{"buoyID":3,"date":"2021-09-19T11:10:00+00","location":{"latitude":46.74272420758204,"longitude":11.44741342607539},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.683164461262507},{"sensorID":1,"sensorType":1,"measurement":562.823783346974}]}]'

  sleep 1

  curl --fail-with-body --location --request POST 'localhost:8080/measurements/drone' \
  --header 'Content-Type: application/json' \
  --data-raw '[{"buoyID":1,"date":"2021-09-19T11:20:00+00","location":{"latitude":46.740395630301705,"longitude":11.441398763099977},"measurements":[{"sensorID":0,"sensorType":0,"measurement":5.598584139424248},{"sensorID":1,"sensorType":1,"measurement":1017.3475548923748}]},{"buoyID":2,"date":"2021-09-19T11:20:00+00","location":{"latitude":46.74310728778908,"longitude":11.445110622098499},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.080106513649299},{"sensorID":1,"sensorType":1,"measurement":453.9675473114685}]},{"buoyID":3,"date":"2021-09-19T11:20:00+00","location":{"latitude":46.74272438732934,"longitude":11.447414051839292},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.708771430071325},{"sensorID":1,"sensorType":1,"measurement":563.7500659454441}]}]'

  sleep 1

  echo "Forth batch"

  curl --fail-with-body --location --request POST 'localhost:8080/measurements/drone' \
  --header 'Content-Type: application/json' \
  --data-raw '[{"buoyID":1,"date":"2021-09-19T11:30:00+00","location":{"latitude":46.74039975385313,"longitude":11.441402890210556},"measurements":[{"sensorID":0,"sensorType":0,"measurement":5.624001700220699},{"sensorID":1,"sensorType":1,"measurement":1021.5414709330291}]},{"buoyID":2,"date":"2021-09-19T11:30:00+00","location":{"latitude":46.74310573720791,"longitude":11.445115757203377},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.095852366467405},{"sensorID":1,"sensorType":1,"measurement":452.88457990194087}]},{"buoyID":3,"date":"2021-09-19T11:30:00+00","location":{"latitude":46.74272087328633,"longitude":11.447410211067242},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.70266128553018},{"sensorID":1,"sensorType":1,"measurement":564.4887098895326}]}]'

  sleep 1

  curl --fail-with-body --location --request POST 'localhost:8080/measurements/drone' \
  --header 'Content-Type: application/json' \
  --data-raw '[{"buoyID":1,"date":"2021-09-19T11:40:00+00","location":{"latitude":46.74040385961401,"longitude":11.441405813212246},"measurements":[{"sensorID":0,"sensorType":0,"measurement":5.6308119495623385},{"sensorID":1,"sensorType":1,"measurement":1025.3933378359955}]},{"buoyID":2,"date":"2021-09-19T11:40:00+00","location":{"latitude":46.74310945179575,"longitude":11.445115630985985},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.115992902165098},{"sensorID":1,"sensorType":1,"measurement":454.10617612930844}]},{"buoyID":3,"date":"2021-09-19T11:40:00+00","location":{"latitude":46.74271873448667,"longitude":11.447413785132484},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.722258222663557},{"sensorID":1,"sensorType":1,"measurement":566.8372513924351}]}]'

  sleep 1

  curl --fail-with-body --location --request POST 'localhost:8080/measurements/drone' \
  --header 'Content-Type: application/json' \
  --data-raw '[{"buoyID":1,"date":"2021-09-19T11:50:00+00","location":{"latitude":46.74040315212917,"longitude":11.44140119048303},"measurements":[{"sensorID":0,"sensorType":0,"measurement":5.647025948590643},{"sensorID":1,"sensorType":1,"measurement":1028.3614235517537}]},{"buoyID":2,"date":"2021-09-19T11:50:00+00","location":{"latitude":46.74310930471798,"longitude":11.445118237301608},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.124558837618764},{"sensorID":1,"sensorType":1,"measurement":454.2760800357352}]},{"buoyID":3,"date":"2021-09-19T11:50:00+00","location":{"latitude":46.7427155232165,"longitude":11.4474182170314},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.673175512688472},{"sensorID":1,"sensorType":1,"measurement":568.1095044408518}]}]'

  sleep 1

  curl --fail-with-body --location --request POST 'localhost:8080/measurements/drone' \
  --header 'Content-Type: application/json' \
  --data-raw '[{"buoyID":1,"date":"2021-09-19T12:00:00+00","location":{"latitude":46.74040748625796,"longitude":11.441397205035917},"measurements":[{"sensorID":0,"sensorType":0,"measurement":5.65097001867082},{"sensorID":1,"sensorType":1,"measurement":1031.8293969842484}]},{"buoyID":2,"date":"2021-09-19T12:00:00+00","location":{"latitude":46.743106560918974,"longitude":11.445116032214504},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.138139671889769},{"sensorID":1,"sensorType":1,"measurement":453.5743798644667}]},{"buoyID":3,"date":"2021-09-19T12:00:00+00","location":{"latitude":46.742715708376984,"longitude":11.447417273747334},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.613655281042059},{"sensorID":1,"sensorType":1,"measurement":566.6775026167763}]}]'

  sleep 1

  echo "Fifth batch"

  curl --fail-with-body --location --request POST 'localhost:8080/measurements/drone' \
  --header 'Content-Type: application/json' \
  --data-raw '[{"buoyID":1,"date":"2021-09-19T10:00:00+00","location":{"latitude":46.74037,"longitude":11.441375},"measurements":[{"sensorID":0,"sensorType":0,"measurement":5.5},{"sensorID":1,"sensorType":1,"measurement":1000.0}]},{"buoyID":2,"date":"2021-09-19T10:00:00+00","location":{"latitude":46.743085,"longitude":11.44508},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.0},{"sensorID":1,"sensorType":1,"measurement":450.0}]},{"buoyID":3,"date":"2021-09-19T10:00:00+00","location":{"latitude":46.742715000000004,"longitude":11.4474},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.5},{"sensorID":1,"sensorType":1,"measurement":550.0}]}]'

  sleep 1

  curl --fail-with-body --location --request POST 'localhost:8080/measurements/drone' \
  --header 'Content-Type: application/json' \
  --data-raw '[{"buoyID":1,"date":"2021-09-19T10:10:00+00","location":{"latitude":46.74037545862428,"longitude":11.44137596847181},"measurements":[{"sensorID":0,"sensorType":0,"measurement":5.501696793006291},{"sensorID":1,"sensorType":1,"measurement":1000.5772997106601}]},{"buoyID":2,"date":"2021-09-19T10:10:00+00","location":{"latitude":46.74308565169694,"longitude":11.445085504111503},"measurements":[{"sensorID":0,"sensorType":0,"measurement":6.99880494286082},{"sensorID":1,"sensorType":1,"measurement":449.7104183417503}]},{"buoyID":3,"date":"2021-09-19T10:10:00+00","location":{"latitude":46.74271640277791,"longitude":11.44740801194648},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.5052944930376055},{"sensorID":1,"sensorType":1,"measurement":553.4185822579916}]}]'

  sleep 1

  curl --fail-with-body --location --request POST 'localhost:8080/measurements/drone' \
  --header 'Content-Type: application/json' \
  --data-raw '[{"buoyID":1,"date":"2021-09-19T10:20:00+00","location":{"latitude":46.74037937810827,"longitude":11.441382451641635},"measurements":[{"sensorID":0,"sensorType":0,"measurement":5.517606736069172},{"sensorID":1,"sensorType":1,"measurement":1000.9773042146653}]},{"buoyID":2,"date":"2021-09-19T10:20:00+00","location":{"latitude":46.743088621140764,"longitude":11.445091581038977},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.003677003784712},{"sensorID":1,"sensorType":1,"measurement":450.439389527205}]},{"buoyID":3,"date":"2021-09-19T10:20:00+00","location":{"latitude":46.74271776738328,"longitude":11.447413819545469},"measurements":[{"sensorID":0,"sensorType":0,"measurement":7.5257096833949015},{"sensorID":1,"sensorType":1,"measurement":555.4081765073335}]}]'

  sleep 1

  # Get Sensor Types
  curl --fail-with-body --location --request GET 'localhost:8080/measurements/frontend/sensors'

  sleep 1

  # Get Agg. Measurements
  curl --fail-with-body --location --request GET 'localhost:8080/measurements/frontend/aggregated?startDate=1532396593&endDate=1832396593'

  sleep 1

  # Get Agg. Measurements 2
  curl --fail-with-body --location --request GET 'localhost:8080/measurements/frontend/aggregated?startDate=1532396593&endDate=1832396593'

  sleep 1

  # Get Agg. Buoy Measurements
  curl --fail-with-body --location --request GET 'localhost:8080/measurements/frontend/aggregated/buoy?startDate=1532396593&endDate=1832396593'

  sleep 1

  # Get Agg. Buoy Measurements 2
  curl --fail-with-body --location --request GET 'localhost:8080/measurements/frontend/aggregated/buoy?startDate=1532396593&endDate=1832396593'

  # Open Websites
  open http://localhost/
  open http://localhost:5601/
  open http://localhost:9090/
  open http://localhost:3000/

  echo "Please run the script with the -d tag (so \"./test_observability.sh -d\") to delete all create containers and volumes"
  echo "Otherwise run \"docker compose down -v\" in order to shut down all the containers and delete created volumes"
fi

echo "ApodiniObserve script finished!"
