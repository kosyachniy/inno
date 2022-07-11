include .env

run:
	sudo docker-compose -p ${NAME} up --build

check:
	curl http://localhost:${APP_PORT}/

set:
	export APP_PORT=${APP_PORT} API_PORT=${API_PORT}; \
	envsubst '$${APP_PORT} $${API_PORT}' < nginx.conf > /etc/nginx/sites-enabled/${NAME}.conf
	sudo systemctl restart nginx
	sudo certbot --nginx
