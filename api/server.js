const express = require('express')
const cors = require('cors')
const { Client } = require('pg')

const app = express()
app.use(cors())
app.use(express.json())

const db = new Client({
    host: 'db',
    port: 5432,
    user: 'postgres',
    password: process.env.POSTGRESQL_PASS,
    database: 'main',
})
db.connect()

app.post('/', function (req, res) {
    db.query(`CREATE TABLE IF NOT EXISTS customers (
        "id" SERIAL NOT NULL PRIMARY KEY,
        "user_agent" TEXT
    )`)
    db.query(`INSERT INTO customers (user_agent)
        VALUES ('${req.body.user_agent}')
    `)
    db.query(`SELECT * FROM customers`, (error, data) => {
        res.json(data.rows)
    })
})

app.listen(3000)
