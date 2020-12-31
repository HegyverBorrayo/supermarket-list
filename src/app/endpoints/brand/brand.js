const conn = require('../../../config/mysql');
const Joi = require('joi');

const before_insert = async(name) => {
    var promise = () => {
        return new Promise((resolve, reject) => {
            let query = `SELECT COUNT(*) as resultExists FROM Brand WHERE brand_name = '${name}'`;

            conn.query(query, (err, result) => {
                err ? reject(-1) : resolve(result[0].resultExists)
            })
        })
    }

    var result = await (promise());
    return result;
}

const new_brand = async(req, res) => {
    const { name } = req.body;

    try {
        const existsBrand = await before_insert(name);

        if (existsBrand === 0 && name !== (undefined && "")) {
            let query = `INSERT INTO Brand (brand_name) VALUES ('${name}')`;

            conn.query(query, (err, response, fields) => {
                if (err) {
                    res.status(500).json({status: 500, message: "Error al insertar brand"});
                } else {
                    res.json({status: 200, message: "Brand creado con éxito"});
                }
            })
        } else {
            res.status(403).json({message: "No ha podido ser procesa su solicitud"})
        }
    } catch (error) {
        res.status(500).json({status: 500, message: "Error no esperado"})
    }
}

const before_update = async(name, brandID) => {
    var promise = () => {
        return new Promise((resolve, reject) => {
            let query = `SELECT COUNT(*) as resultExists FROM Brand WHERE brand_name = '${name}' AND brand != ${brandID}`;

            conn.query(query, (err, results) => {
                err ? reject(-1) : resolve(results[0].resultExists)
            })
        });
    }

    var result = await (promise());
    return result;
}

const update_brand = async(req, res) => {
    const { name } = req.body;
    let brandID = req.params.brand;

    try {
        if (name !== (undefined && "") && brandID !== (undefined && "")) {
            const existsBrand = await before_update(name, brandID);
    
            if (existsBrand === 0) {
                let query = `UPDATE Brand SET brand_name = '${name}' WHERE brand = ${brandID}`;

                conn.query(query, (err, updateBrand, fields) => {
                    if (err) {
                        res.status(500).json({status: 500, message: "Error al actualizar Marca"} );
                    } else {
                        if (updateBrand.affectedRows > 0) {
                            res.json({status: 200, message: "Brand actualizado con éxito"});
                        } else {
                            res.json({status: 200, message: "No se ha encontrado ningun brand con ese ID"});
                        }
                    }
                });
            } else {
                res.status(403).json({message: "La Marca no ha podido ser actualizada, debido a que ya existe"});
            }
        } else {
            res.status(403).json({message: "Datos faltantes"});
        }
    } catch (error) {
        res.status(500).json({status: 500, message: "Error inesperado"})
    }
}

const get_brands = (req, res) => {
    let query = `SELECT brand, brand_name FROM Brand WHERE status = 'ACTIVE' GROUP BY brand, brand_name`;

    conn.query(query, (err, brands, fields) => {
        if (err) {
            res.status(500).json({status: 500, message: "Error al obtener Marcas"} );
        } else {
            res.json(brands)
        }
    })
}

const get_brand = (req, res) => {
    let brandID = req.params.brand;

    if (brandID !== (undefined && "")) {
        let query = `SELECT brand, brand_name FROM Brand WHERE brand = ${brandID}`;

        conn.query(query, (err, brand, fields) => {
            if (err) {
                res.status(500).json({status: 500, message: "Error al obtener Marca"} );
            } else {
                if (brand[0]) {
                    res.json(brand[0])
                } else {
                    res.json({})
                }
            }
        })
    } else {
        res.status(403).json({message: "Datos faltantes"});
    }
}

const change_status = (req, res) => {
    let brandID = req.params.brand;

    if (brandID !== (undefined && "")) {
        let query = `UPDATE Brand SET status = CASE WHEN status = 'ACTIVE' THEN 'INACTIVE' ELSE 'ACTIVE' END 
        WHERE brand = ${brandID}`

        conn.query(query, (err, brand, fields) => {
            if (err) {
                res.status(500).json({status: 500, message: "Error al cambiar estado de Marca"} );
            } else {
                if (brand.affectedRows > 0) {
                    res.json({status: 200, message: "Marca actualizado con éxito"});
                } else {
                    res.json({status: 200, message: "No se ha encontrado ninguna marca con ese ID"});
                }
            }
        })
    } else {
        res.status(403).json({message: "Datos faltantes"});
    }
}


module.exports = {
    new_brand,
    update_brand,
    get_brands,
    get_brand,
    change_status
}