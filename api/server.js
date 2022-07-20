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
db.query(`CREATE TABLE IF NOT EXISTS users (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "token" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "ip" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[]
)`)

app.post('/', function (req, res) {
    const token = req.body.token
    const ip = req.headers['x-real-ip']

    db.query(`SELECT * FROM users WHERE token @> '{"${token}"}'`, (error, data) => {
        if (data.rows.length) {
            res.json(data.rows[0])
        } else {
            db.query(`INSERT INTO users (token${ ip ? ', ip' : '' })
                VALUES ('{"${token}"}'${ ip ? ', \'{"' + ip + '"}\'' : '' })
                RETURNING *
            `, (error, data) => {
                res.json(data.rows[0])
            })
        }
    })
})

app.listen(3000)
