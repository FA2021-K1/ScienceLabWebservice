Water quality is one of the most important factors in a healthy ecosystem.
In Ferienakademie 2021, we want to create a valuable foundation to measure, pre-process and provide data about the water quality in areas with insufficient digital infrastructure to data scientists as well as amateurs.

This repository includes the data management and data visualization systems for the distributed drone interactions project.

The web service is based on server-side Swift with the Apodini framework as well as a PostgreSQL database.
The web application is based on the React library and uses Apex Charts for modifiable visualizations.

## Current status
Currently, the Webservice provides two different views: Home and Export.
### Home
The intention of Home is to provide the user an overview of the current status of the water quality. At the top, the whole system is summarized using KPIs. Further, the map provides an easy way for issue identification as critical measurements are highlighted. Underneath the map different kinds of aggregation plots, which are interactively updated according to the slider on the map, serve for a deep dive into the data. The latest income raw data can be analysed in a list. Finally, an interactive zoomable linechart enables the user to interpret measurement developement over different time ranges.
![Bild 30 09 21 um 11 30](https://user-images.githubusercontent.com/56644209/135427140-76cbd4a5-98ba-4bcc-9f9a-d2dc5d85a607.jpeg)
### Export
For an individual data analysis the user can export selected raw data as a csv file.
![Bild 30 09 21 um 11 33](https://user-images.githubusercontent.com/56644209/135427381-4f17ad04-961a-4f7b-85d6-c9c46ac1f628.jpeg)

## Reaching the Deployed System

Data Science Service
https://fa.ase.in.tum.de/

Data Management Service
https://data.fa.ase.in.tum.de/


Authentication details for Kibana (ELK):
ELASTIC_USER=elastic
ELASTIC_PASSWORD=FA2021

Authentication details for Prometheus:
None

To build the development containers run
```
make build
```

To start the system run
```
make start
```

To stop the system run
```
make stop
```

To start the system in verbose mode run
```
make start-verbose
```

### Development Environment
To reach the frontend open
[localhost](localhost)

To reach the backend open
[localhost:6969](localhost:6969)


## Open tasks

Open tasks can be found under [projects](https://github.com/fa21-collaborative-drone-interactions/ScienceLabWebservice/projects/1).

## Deployment pipeline

With every change in the develop branch, the whole system is automatically built and deployed to the Amazon EC2 instance. It is reachable through the previously mentioned URLs.

## Observability

In this project, we integrated the observability functionalities of ApodiniObserve in order to showcase the features it provides to the server-side Swift Apodini framework. These functionalities were developed in the course of the bachelor's thesis "Observability in Distributed Web Services" of Philipp Zagar.

To easily test the observability features, we provide the `test_observability.sh` script that starts up all necessary services as Docker containers (so the Apodini web service, ELK, Prometheus, Postgres and Grafana) and then sends a number of example requests to the web service. These requests generate telemetry data that is then displayed via the web interfaces of the observability tools, which are automatically opened at the end of the script. This enables the viewer to get an insight into the execution of the web service and the processing of the requests.

For example, the developer is able to take a look at the generated logs in Kibana (is automatically opened). The authentication details are:
- Username: elastic
- Password: FA2021
Then create a new index pattern under the "Discover" section named "logstash-" and choose "timestamp" as the to be used time field. After finishing the setup, go back to "Discover" again and take a look at the created log data.

![image](https://user-images.githubusercontent.com/25406915/140191244-77fe2951-200f-45b7-b3af-528802c58848.png)

Another example is the visualization of metrics in Prometheus (is automatically opened). There is no authentication.
The developer can now query metrics data via the PromQL query language, for example `request_counter` prints out how often each endpoint was accessed.
Similar queries can be made for the error rate via `error_counter` or for the response time of a specific endpoint (or all of them) via `response_time_nanoseconds{endpoint="CreateMeasurement"}`. Furthermore, system metrics are also captured, all of them are prefixed with `process_`, for example `process_open_fds`.

![image](https://user-images.githubusercontent.com/25406915/140191320-7e86557a-c65e-4e62-9936-ce348afb2650.png)

Grafana builds on top of Prometheus and offers a better visualization of the gathered metrics data. No authentication is required.
The system comes with a very small dashboard that can be accessed unter "Dashboards > Manage". Then, access the "ApodiniObserve example" dashboard and take a look at the graphs.

![image](https://user-images.githubusercontent.com/25406915/140191378-ddd6d99f-87ff-42f2-9710-8e2f65d92d3d.png)

## Contributing
Contributions to this project are welcome. Please make sure to read the [contribution guidelines](https://github.com/Apodini/.github/blob/main/CONTRIBUTING.md) and the [contributor covenant code of conduct](https://github.com/Apodini/.github/blob/main/CODE_OF_CONDUCT.md) first.

## License
This project is licensed under the MIT License. See [License](https://github.com/Apodini/ApodiniExample/blob/develop/LICENSE) for more information.
