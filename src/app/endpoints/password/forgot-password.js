const conn = require('../../../config/mysql');
const Joi = require('joi');

const before_update = async(email, nickname) => {
    var promise = () => {
        return new Promise((resolve, reject) => {
            let query = `SELECT COUNT(*) resultExists FROM Users WHERE email = '${email}' AND nickname = '${nickname}'`;

            conn.query(query, (err, results) => {
                err ? reject(-1) : resolve(results[0].resultExists)
            })
        })
    }

    var result = await(promise());
    return result;
}

const forgot_password = async(req, res) => {
    const { password, email, nickname } = req.body;

    try {
        if (password !== undefined && password !== "" && email !== undefined && email !== "" && nickname !== (undefined && "") ) {
            const userExists = await before_update(email, nickname);
            if (userExists === 0) {
                res.status(403).json({status: 403, message: "No ha podido ser encontrado el usuario"});
            } else {
                let query = `UPDATE Users SET password = MD5('${password}') WHERE email = '${email}' AND nickname = '${nickname}'`;
                conn.query(query, (err, userUpdate, fields) => {
                    if (err) {
                        res.status(500).json({status: 500, message: "Error al actualizar usuario"} );
                    } else {
                        res.json({status: 200, message: "Usuario actualizado con éxito"});
                    }
                })
            }
        } else {
            res.status(403).json({message: "Datos faltantes"});
        }
    } catch (error) {
        res.status(500).json({status: 500, message: "Error inesperado"})
    }

}

module.exports = {
    forgot_password
}