# FA21 Science Lab WebService

[![DOI](https://zenodo.org/badge/375610092.svg)](https://zenodo.org/badge/latestdoi/375610092)
[![Build and Test](https://github.com/Apodini/ApodiniExample/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/Apodini/ApodiniExample/actions/workflows/build-and-test.yml)
[![Build Docker Compose](https://github.com/Apodini/ApodiniExample/actions/workflows/docker-compose.yml/badge.svg)](https://github.com/Apodini/ApodiniExample/actions/workflows/docker-compose.yml)
[![Deploy webservice and frontend to AWS](https://github.com/fa21-collaborative-drone-interactions/ScienceLabWebservice/actions/workflows/deployment.yml/badge.svg)](https://github.com/fa21-collaborative-drone-interactions/ScienceLabWebservice/actions/workflows/deployment.yml)


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


## Run the Example System

You can start the local development environment using make.

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

## Contributing
Contributions to this project are welcome. Please make sure to read the [contribution guidelines](https://github.com/Apodini/.github/blob/main/CONTRIBUTING.md) and the [contributor covenant code of conduct](https://github.com/Apodini/.github/blob/main/CODE_OF_CONDUCT.md) first.

## License
This project is licensed under the MIT License. See [License](https://github.com/Apodini/ApodiniExample/blob/develop/LICENSE) for more information.
