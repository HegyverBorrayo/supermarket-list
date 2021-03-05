const mysql = require("mysql");
const dotenv = require("dotenv").config();

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

conn.connect(err => {
    if(err) console.log("problema en conexion a mysql");
    console.log("Mysql operando");
});

module.exports = conn;