include .env

dev:
	docker compose -p ${NAME} up --build

run:
	docker compose -f compose.prod.yml -p ${NAME} up --build -d

stop:
	docker compose stop

logs:
	docker compose logs -t -f --tail 10

check:
	docker ps --filter name="^${NAME}"

set:
	export WEB_PORT=${WEB_PORT} API_PORT=${API_PORT} HOST=${HOST}; \
	envsubst '$${WEB_PORT} $${API_PORT} $${HOST}' < nginx.conf > /etc/nginx/sites-enabled/${NAME}.conf
	sudo systemctl restart nginx
	sudo certbot --nginx

connect:
	docker exec -it `docker ps -a | grep ${NAME}-api | cut -d ' ' -f 1` bash

db:
	docker exec -it `docker ps -a | grep ${NAME}-db | cut -d ' ' -f 1` psql -h localhost -p 5432 -U postgres
