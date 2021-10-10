This is an example project demonstrating the observability features integrated into the server-side Swift Apodini framework in the course of my bachelor's thesis "Observabilit in Distributed Web Services".

The example reuses the Apodini web service written for the Science Lab in the course of the Ferienakademie 2021.

The core of this exampel is the test_observability.sh script. This script starts up all necessary services as Docker containers (so Apodini web service, ELK, Prometheus, Postgres and Grafana). 
It then sends a number of example requests to the web service and opens the respective web interfaces of the observability tools. This enables the viewer to get an insight into the execution of the web service and the processing of the requests.

To start the script, type this CMD in the console: ./test_observability.sh

Authentication details for Kibana (ELK):
ELASTIC_USER=elastic
ELASTIC_PASSWORD=FA2021

Authentication details for Prometheus:
None

Authentication details for Grafana: 
TBA
