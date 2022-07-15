include .env

run:
	make stop
	docker-compose -p ${NAME} up --build -d
	make logs

stop:
	docker-compose stop

logs:
	docker-compose logs -t -f --tail 10

check:
	curl http://localhost:${APP_PORT}/

set:
	export APP_PORT=${APP_PORT} API_PORT=${API_PORT} HOST=${HOST}; \
	envsubst '$${APP_PORT} $${API_PORT} $${HOST}' < nginx.conf > /etc/nginx/sites-enabled/${NAME}.conf
	sudo systemctl restart nginx
	sudo certbot --nginx
