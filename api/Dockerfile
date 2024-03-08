FROM golang:alpine

# Install air for hot reloading
RUN go install github.com/cosmtrek/air@latest

# Install ca-certificates for HTTPS and migrate tool
RUN apk --no-cache add ca-certificates && \
    apk add --no-cache curl && \
    curl -L https://github.com/golang-migrate/migrate/releases/download/v4.14.1/migrate.linux-amd64.tar.gz | tar xvz && \
    mv migrate.linux-amd64 /usr/bin/migrate

WORKDIR /app

COPY . .
RUN go mod download

RUN chmod +x entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["air"]
