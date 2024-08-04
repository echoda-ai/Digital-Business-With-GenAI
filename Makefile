build-backend: 
	sudo docker compose build backend

up-backend: 
	sudo docker compose up -d backend

up-db:
	sudo docker compose up -d db	

build-app: 
	sudo docker compose up -d

stop-app: 
	sudo docker compose down	