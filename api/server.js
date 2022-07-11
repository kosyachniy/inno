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
client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
})

app.post('/', function (req, res) {
    res.json(req.body)
})

app.listen(3000)
