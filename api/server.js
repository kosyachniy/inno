const express = require('express')
const { Client } = require('pg')

const app = express()
app.use(express.json())

const client = new Client({
    host: 'db',
    port: 5432,
    user: 'postgres',
    password: process.env.POSTGRESQL_PASS,
    database: 'main',
})
client.connect()

app.post('/', function (req, res) {
    client.query(`CREATE TABLE IF NOT EXISTS customers (
        "id" SERIAL NOT NULL PRIMARY KEY,
        "user_agent" TEXT
    )`)
    client.query(`INSERT INTO customers (user_agent)
        VALUES ('${req.body.user_agent}')
    `)
    client.query(`SELECT * FROM customers`, (error, data) => {
        res.json(data.rows)
    })
})

app.listen(3000)
