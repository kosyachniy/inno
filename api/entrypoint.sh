#!/bin/sh

# Run migrations
migrate -path /db/migrations -database "postgres://postgres:password@db:5432/main?sslmode=disable" up

# Start the main application
exec "$@"
