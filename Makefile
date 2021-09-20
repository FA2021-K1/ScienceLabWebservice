build:
	docker-compose up -d --build
build-prod:
	docker-compose -f docker-compose-deploy.yml up --build
start:
	docker-compose up -d
start-verbose:
	docker-compose up
stop:
	docker-compose stop