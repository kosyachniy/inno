NAME := inno

run:
	sudo docker-compose -p $(NAME) up --build

check:
	curl -X POST -H "Content-Type: application/json" -d '{"foo": "bar"}' http://localhost:8123/

set:
	cp nginx.conf /etc/nginx/sites-enabled/$(NAME).conf
	sudo systemctl restart nginx
	sudo certbot --nginx
