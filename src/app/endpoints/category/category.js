const conn = require('../../../config/mysql');
const Joi = require('joi');

const before_insert = async(name) => {
    var promise = () => {
        return new Promise((resolve, reject) => {
            let query = `SELECT COUNT(*) as resultExists FROM Category WHERE name = '${name}'`;

            conn.query(query, (err, result) => {
                err ? reject(-1) : resolve(result[0].resultExists)
            })
        })
    }

    var result = await (promise());
    return result;
}

const new_category = async(req, res) => {
    const { name } = req.body;

    try {
        const existsCategory = await before_insert(name);

        if (existsCategory === 0 && name !== (undefined && "")) {
            let query = `INSERT INTO Category (name) VALUES ('${name}')`;

            conn.query(query, (err, response, fields) => {
                if (err) {
                    res.status(500).json({status: 500, message: "Error al insertar categoria"});
                } else {
                    res.json({status: 200, message: "Categoria creada con éxito"});
                }
            })
        } else {
            res.status(403).json({message: "No ha podido ser procesa su solicitud"})
        }
    } catch (error) {
        res.status(500).json({status: 500, message: "Error inesperado"})
    }
}

const before_update = async(name, categoryID) => {
    var promise = () => {
        return new Promise((resolve, reject) => {
            let query = `SELECT COUNT(*) as resultExists FROM Category WHERE name = '${name}' AND category != ${categoryID}`;

            conn.query(query, (err, results) => {
                err ? reject(-1) : resolve(results[0].resultExists)
            })
        });
    }

    var result = await (promise());
    return result;
}

const update_category = async(req, res) => {
    const { name } = req.body;
    let categoryID = req.params.category;

    try {
        if (name !== (undefined && "") && categoryID !== (undefined && "")) {
            const existsCategory = await before_update(name, categoryID);

            if (existsCategory === 0) {
                let query = `UPDATE Category SET name = '${name}' WHERE category = ${categoryID}`;

                conn.query(query, (err, updateCategory, fields) => {
                    if (err) {
                        res.status(500).json({status: 500, message: "Error al actualizar Categoria"} );
                    } else {
                        if (updateCategory.affectedRows > 0) {
                            res.json({status: 200, message: "Categoria actualizada con éxito"});
                        } else {
                            res.json({status: 200, message: "No se ha encontrado ninguna categoria con ese ID"});
                        }
                    }
                });
            } else {
                res.status(403).json({message: "La Categoria no ha podido ser actualizada, debido a que ya existe"});
            }
        } else {
            res.status(403).json({message: "Datos faltantes"});
        }
    } catch (error) {
        res.status(500).json({status: 500, message: "Error inesperado"})
    }
}

const get_categories = (req, res) => {
    let query = `SELECT category, name FROM Category WHERE status = 'ACTIVE' GROUP BY category, name`;

    conn.query(query, (err, categories, fields) => {
        if (err) {
            res.status(500).json({status: 500, message: "Error al obtener Categorias"} );
        } else {
            res.json(categories)
        }
    })
}

const get_category = (req, res) => {
    let categoryID = req.params.category;

    if (categoryID !== (undefined && "")) {
        let query = `SELECT category, name FROM Category WHERE category = ${categoryID}`;
    
        conn.query(query, (err, categories, fields) => {
            if (err) {
                res.status(500).json({status: 500, message: "Error al obtener Categoria"} );
            } else {
                res.json(categories)
            }
        });
    } else {
        res.status(403).json({message: "Datos faltantes"});
    }
}

const change_status = (req, res) => {
    let categoryID = req.params.category;

    if (categoryID !== (undefined && "")) {
        let query = `UPDATE Category SET status = CASE WHEN status = 'ACTIVE' THEN 'INACTIVE' ELSE 'ACTIVE' END 
        WHERE category = ${categoryID}`

        conn.query(query, (err, category, fields) => {
            if (err) {
                res.status(500).json({status: 500, message: "Error al cambiar estado de la Categoria"} );
            } else {
                if (category.affectedRows > 0) {
                    res.json({status: 200, message: "Categoria actualizada con éxito"});
                } else {
                    res.json({status: 200, message: "No se ha encontrado ninguna categoria con ese ID"});
                }
            }
        })
    } else {
        res.status(403).json({message: "Datos faltantes"});
    }
}


module.exports = {
    new_category,
    update_category,
    get_categories,
    get_category,
    change_status
}