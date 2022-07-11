NAME := inno

run:
	sudo docker-compose -p $(NAME) up --build

check:
	curl -X POST -H "Content-Type: application/json" -d '{"foo": "bar"}' http://localhost:8123/
