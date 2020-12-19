const conn = require('../../../config/mysql');
const Joi = require('joi');
const { func } = require('joi');
const jwt = require('jsonwebtoken')

const login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    let query = `SELECT user from Users WHERE email = '${req.body.email}' AND password = MD5('${req.body.password}')`;

    conn.query(query, (err, user, fields) => {
        if (err) {
            res.status(500).json({status: 0, message: "Credenciales no validas"} );
        }else {
            jwt.sign({user}, 'secretkey', {expiresIn: '1d'} ,(error_token, token) => {
                res.json({token})
            })
        }
    })
}

// Authorization Bearer <token>
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        //Para obtener acceso al token
        const bearerToken = bearerHeader.split(" ")[1];
        req.token =  bearerToken

        next();
    } else {
        res.status(403)
    }
}

module.exports = {
    login,
    verifyToken
}