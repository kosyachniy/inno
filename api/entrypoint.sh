#!/bin/sh

# Run migrations
# FIXME: password
migrate -path /db/migrations -database "postgres://postgres:password@db:5432/main?sslmode=disable" up

# Start the main application
exec "$@"
