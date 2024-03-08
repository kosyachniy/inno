package main

import (
    "database/sql"
    "encoding/json"
    "fmt"
    "log"
	"os"
    "net/http"

    _ "github.com/lib/pq"
)

type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

var password = os.Getenv("POSTGRESQL_PASS")
const (
    host     = "db"
    port     = 5432
    user     = "postgres"
    dbname   = "main"
)

var db *sql.DB

func initDB() {
    var err error
    psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
        host, port, user, password, dbname)

    db, err = sql.Open("postgres", psqlInfo)
    if err != nil {
        log.Fatal(err)
    }

    err = db.Ping()
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println("Successfully connected to the database")
}

func saveUserHandler(w http.ResponseWriter, r *http.Request) {
    var u User
    if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    sqlStatement := `INSERT INTO users (name, email) VALUES ($1, $2)`
    _, err := db.Exec(sqlStatement, u.Name, u.Email)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusCreated)
}

func getUsersHandler(w http.ResponseWriter, r *http.Request) {
    rows, err := db.Query("SELECT id, name, email FROM users")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    var users []User
    for rows.Next() {
        var u User
        if err := rows.Scan(&u.ID, &u.Name, &u.Email); err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        users = append(users, u)
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(users)
}

func main() {
    initDB()

    http.HandleFunc("/users/save/", saveUserHandler)
    http.HandleFunc("/users/get/", getUsersHandler)

    fmt.Println("Server is running on port 8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
