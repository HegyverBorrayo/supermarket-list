const conn = require('../../../config/mysql');
const Joi = require('joi');

const before_register = async(email, nickname) => {
    var promise = () => {
        return new Promise((resolve, reject) =>{
            let querySearch = `SELECT COUNT(*) resultExists FROM Users WHERE email = '${email}' OR nickname = '${nickname}'`;

            conn.query(querySearch, (err, results) => {
                err ? reject(-1) : resolve(results[0].resultExists)
            })
        })
    }

    var result = await (promise());
    return result;
}

const register = async(req, res) => {
    const { first_name, last_name, email, nickname, password } = req.body;

    try {
        const userExists = await before_register(email, nickname);

        if (userExists === 0) {
            if (first_name !== undefined && last_name !== undefined 
                && email !== undefined && nickname !== undefined && password !== undefined) {
                    let query = `INSERT INTO Users (first_name, last_name, email, nickname, password, rol) 
                        VALUES ('${first_name}', '${last_name}', '${email}', '${nickname}', md5('${password}'), 3);`;

                    conn.query(query, (err, response, fields) => {
                        if (err) {
                            res.status(500).json({status: 500, message: "Error al crear nuevo usuario"});
                        } else {
                            res.json({status: 200, message: "Usuario creado con éxito"});
                        }
                    });
            } else {
                res.status(403).json({message: "Datos faltantes"});
            }
        } else {
            res.status(403).json({message: "El usuario no ha podido ser creado, ya existe"});
        }
    } catch (error) {
        res.status(500).json({status: 500, message: "Error inesperado"})
    }
}

module.exports = {
    register
}