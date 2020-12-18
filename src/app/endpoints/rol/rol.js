const conn = require('../../../config/mysql');
const Joi = require('joi');
const { func } = require('joi');

const before_insert = async(name) => {
    var promise = () =>{
        return new Promise((resolve, reject) => {
            let querySearch = `SELECT COUNT(*) as resultExists FROM Rol WHERE name = '${name}'`;

            conn.query(querySearch, (err, results) => {
                err ? reject(-1) : resolve(results[0].resultExists)
            })
        })
    }

    var result = await (promise());
    return result;
}

const insert_rol = async(req, res) => {
    const { name } = req.body;

    try {
        const rolExists = await before_insert(name);
        if (rolExists === 0) {
            res.json("hola")
        } else {
            res.status(403).json({message: "Nombre duplicado"})
        }
    } catch (error) {
        res.status(500).json({status: 500, message: "Error no esperado"})
    }
}

const getRol = (req, res) => {

    let query = `SELECT name, description FROM  Rol`;

    conn.query(query, (err, rol, fields) =>{
        if (err) {
            res.status(500).json({status: 0, message: "Error al consultar"});
        } else {
            res.json({rol, hola : req.authdata})
        }
    })
};


module.exports = {
    insert_rol,
    getRol
}