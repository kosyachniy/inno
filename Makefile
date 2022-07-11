include .env

run:
	sudo docker-compose -p ${NAME} up --build

check:
	curl http://localhost:${APP_PORT}/

set:
	rm -f /etc/nginx/sites-enabled/${NAME}.conf
	cp nginx.conf /etc/nginx/sites-enabled/${NAME}.conf
	sudo systemctl restart nginx
	sudo certbot --nginx
