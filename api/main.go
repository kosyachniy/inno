package main

import (
    "encoding/json"
    "net/http"
)

type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

func getUsersHandler(w http.ResponseWriter, r *http.Request) {
    users := []User{
		{ID: 1, Name: "Alex Poloz", Email: "alex@gmail.com"},
		{ID: 2, Name: "Sam Smith", Email: "sam@gmail.com"},
	}

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(users)
}

func main() {
    http.HandleFunc("/users/get/", getUsersHandler)
    http.ListenAndServe(":8080", nil)
}
