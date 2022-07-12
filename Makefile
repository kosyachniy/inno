include .env

run:
	mkdir -p data >/dev/null 2>&1
	docker-compose -p ${NAME} up --build

check:
	curl http://localhost:${APP_PORT}/

set:
	export APP_PORT=${APP_PORT} API_PORT=${API_PORT} HOST=${HOST}; \
	envsubst '$${APP_PORT} $${API_PORT} $${HOST}' < nginx.conf > /etc/nginx/sites-enabled/${NAME}.conf
	sudo systemctl restart nginx
	sudo certbot --nginx
