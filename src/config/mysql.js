const mysql = require("mysql");

/*const conn = mysql.createConnection({
    host: "localhost",
    user: 'erehebo',
    password: "2013043-eB",
    database: 'lista_super'
});*/

const conn = mysql.createConnection({
    host: "z5zm8hebixwywy9d.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: 's1995pfkk7a5csmj',
    password: "ucycm9zsz56cyzd1",
    database: 'hvu07lntfsc1b12j'
})

conn.connect(err => {
    if(err) console.log("problema en conexion a mysql");
    console.log("Mysql operando");
});

module.exports = conn;