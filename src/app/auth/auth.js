const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        
        if (typeof bearerHeader !== 'undefined') {
            //Para obtener acceso al token
            const bearerToken = bearerHeader.split(" ")[1];
            req.token =  bearerToken

            jwt.verify(req.token, 'secretkey', (error, authdata) =>{
                if (error) {
                    res.json({error: "forbidden"})
                } else {
                    req.authdata = authdata
                    next();
                }
            })

        } else {
            throw 'Invalid user ID';
        }
    } catch (error) {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};