# Use the official Golang image to create a build artifact.
# This is based on Debian and sets the GOPATH to /go.
FROM golang:alpine

# Install air for hot reloading
RUN go install github.com/cosmtrek/air@latest

# Install ca-certificates for HTTPS and migrate tool
RUN apk --no-cache add ca-certificates && \
    apk add --no-cache curl && \
    curl -L https://github.com/golang-migrate/migrate/releases/download/v4.14.1/migrate.linux-amd64.tar.gz | tar xvz && \
    mv migrate.linux-amd64 /usr/bin/migrate

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Copy the source code into the container
COPY . .

# Expose port 8080 to the outside world
EXPOSE 8080

# Set the entrypoint script to be executed
ENTRYPOINT ["/app/entrypoint.sh"]

# Command to run the application using air for hot reloading
CMD ["air"]
