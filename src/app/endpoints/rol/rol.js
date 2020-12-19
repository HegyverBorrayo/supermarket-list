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

const before_update = async(rol_id, name) => {
    var promise = () => {
        return new Promise((resolve, reject) => {
            let querySearch = `SELECT COUNT(*) as resultExists FROM Rol WHERE name = '${name}' AND rol != ${rol_id}`;

            conn.query(querySearch, (err, results) => {
                err ? reject(-1) : resolve(results[0].resultExists)
            })
        })
    }

    var result = await (promise());
    return result;
}

const insert_rol = async(req, res) => {
    const { name, description } = req.body;

    try {
        const rolExists = await before_insert(name);
        if (rolExists === 0 && name !== undefined) {
            let query = `INSERT INTO Rol (name, description) VALUES ('${name}', '${description}')`;
            conn.query(query, (err, response, fields) => {
                if (err) {
                    res.status(500).json({status: 500, message: "Error al insertar nuevo rol"});
                } else {
                    res.json({status: 200, message: "Rol creado con éxito"});
                }
            });
        } else {
            res.status(403).json({message: "Nombre duplicado"})
        }
    } catch (error) {
        res.status(500).json({status: 500, message: "Error no esperado"})
    }
}

const update_rol = async(req, res) => {
    const { name, description } = req.body;
    let rol_id = req.params.rol;

    try {
        const rolExists = await before_update(rol_id, name);
        if (rolExists === 0 && name !== undefined) {
            let query = `UPDATE Rol SET name = '${name}', description = '${description}' WHERE rol = ${rol_id}`;

            conn.query(query, (err, response, fields) => {
                if (err) {
                    res.status(500).json({status: 0, message: "Error al actualizar el rol"});
                } else {
                    res.json({status: 200, message: "Rol Actualizado con éxito"});
                }
            })
        } else {
            res.status(500).json({status: 500, message: "Error inesperado"})
        }
    } catch (error) {
        res.status(500).json({status: 500, message: "Error no esperado"});
    }

}

const getRoles = (req, res) => {
    let query = `SELECT rol, name, description FROM  Rol`;

    conn.query(query, (err, rol, fields) => {
        if (err) {
            res.status(500).json({status: 0, message: "Error al consultar"});
        } else {
            res.json(rol)
        }
    })
};

const getRol = (req, res) => {
    let rol_id = req.params.rol;

    let query = `SELECT rol, name, description FROM Rol Where rol = ${rol_id}`;

    conn.query(query, (err, rol, fields) => {
        if (err) {
            res.status(500).json({status: 500, message: "Error al consultar rol"})
        } else {
            if (rol[0]) {
                res.json(rol[0])
            } else {
                res.json({status: 200, message: "No existe ningun rol con ese id"})
            }
        }
    });
}

const findRol = (req, res) => {
    let inputSearch = req.params.search;

    let query = `SELECT rol, name, description FROM Rol WHERE name like '%${inputSearch}%' or description like '%${inputSearch}%'`

    conn.query(query, (err, roles, fields) => {
        if (err) {
            res.status(500).json({status: 500, message: "Error al consultar"})
        } else {
            if (roles.length > 0) {
                res.json(roles)
            } else {
                res.json({status: 200, message: "Empty Roles"})
            }
        }
    });
}

const delete_rol = (req, res) => {
    let rol_id = req.params.rol;

    let query = `DELETE FROM Rol WHERE rol = ${rol_id}`;
    conn.query(query, (err, response, fields) => {
        if (err) {
            res.status(500).json({status: 500, message: "Error al eliminar un rol"});
        } else {
            res.json({status: 200, message: "Rol Eliminado con éxito"});
        }
    })
}

module.exports = {
    insert_rol,
    getRoles,
    getRol,
    findRol,
    update_rol,
    delete_rol
}