# FA21 Science Lab WebService

[![DOI](https://zenodo.org/badge/375610092.svg)](https://zenodo.org/badge/latestdoi/375610092)
[![Build and Test](https://github.com/Apodini/ApodiniExample/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/Apodini/ApodiniExample/actions/workflows/build-and-test.yml)
[![Build Docker Compose](https://github.com/Apodini/ApodiniExample/actions/workflows/docker-compose.yml/badge.svg)](https://github.com/Apodini/ApodiniExample/actions/workflows/docker-compose.yml)
[![Deploy webservice and frontend to AWS](https://github.com/fa21-collaborative-drone-interactions/ScienceLabWebservice/actions/workflows/deployment.yml/badge.svg)](https://github.com/fa21-collaborative-drone-interactions/ScienceLabWebservice/actions/workflows/deployment.yml)


This repository includes the FA21 Science Lab WebService and a shared Swift Package.j

## Run the Example System

You can start the local development environment using make

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

## Reaching the services

To reach the frontend open
```
localhost
```

To reach the backend open
```
localhost:6969
```

## Deployment pipeline

On every change on the develop branch the whole system is automatically built and deployed to the Amazon EC2 instance. It is reachable on http://http://3.123.38.88 and http://3.123.38.88:6969 respectively.

## Contributing
Contributions to this project are welcome. Please make sure to read the [contribution guidelines](https://github.com/Apodini/.github/blob/main/CONTRIBUTING.md) and the [contributor covenant code of conduct](https://github.com/Apodini/.github/blob/main/CODE_OF_CONDUCT.md) first.

## License
This project is licensed under the MIT License. See [License](https://github.com/Apodini/ApodiniExample/blob/develop/LICENSE) for more information.
