const server = require("./config/server");
const app = require("./config/server");

app.get('/', (req, res) => {
    res.json("ok")
})

const auth = require('./app/auth/auth');

const rol = require("./app/endpoints/rol/rol");
app.post('/api/rol', auth, rol.insert_rol);
app.get('/api/rol', auth, rol.getRoles);
app.get('/api/rol/:rol', auth, rol.getRol);
app.get('/api/rol/find/:search', auth, rol.findRol);
app.put('/api/rol/:rol', auth, rol.update_rol);
app.delete('/api/rol/:rol', auth, rol.delete_rol);

const login = require("./app/endpoints/login/login");
app.post('/api/login', login.login);

const register = require("./app/endpoints/register/register");
app.post('/api/user/register', register.register);

const forgotPassword = require("./app/endpoints/password/forgot-password");
app.post('/api/user/forgot-password/', auth, forgotPassword.forgot_password)

const updatePassword = require("./app/endpoints/password/update-password");
app.post('/api/user/update-password/:user', auth, updatePassword.update_password);

server.listen(server.get("port"), () => {
    console.log(`${server.get("port")}`)
});