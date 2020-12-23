const conn = require('../../../config/mysql');
const Joi = require('joi');

const update_password = (req, res) => {
    const { password } = req.body;
    let userID = req.params.user;

    if (password !== (undefined && "") && userID !== (undefined && "")) {
        let query = `UPDATE Users SET password = MD5('${password}') WHERE user = ${userID}`;

        conn.query(query, (err, updateUser, fields) => {
            if (err) {
                res.status(500).json({status: 500, message: "Error al actualizar la contraseña"} );
            } else {
                if (updateUser.affectedRows > 0) {
                    res.json({status: 200, message: "Usuario actualizado con éxito"});
                } else {
                    res.json({status: 200, message: "No se ha encontrado ningun usuario con ese ID"});
                }
            }
        })
    } else {
        res.status(403).json({message: "Datos faltantes"});
    }
}

module.exports = {
    update_password
}