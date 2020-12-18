const mysql = require("mysql");

const conn = mysql.createConnection({
    host: "localhost",
    user: 'erehebo',
    password: "2013043-eB",
    database: 'lista_super'
});

conn.connect(err => {
    if(err) console.log("problema en conexion a mysql");
    console.log("Mysql operando");
});

module.exports = conn;