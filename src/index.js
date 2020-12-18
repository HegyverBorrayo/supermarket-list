const server = require("./config/server");
const app = require("./config/server");

app.get('/', (req, res) => {
    res.json("ok")
})

const auth = require('./app/auth/auth');

const rol = require("./app/endpoints/rol/rol");
app.post('/api/rol', rol.insert_rol);
app.get('/api/rol', auth, rol.getRol);

const login = require("./app/endpoints/login/login")
app.post('/api/login', login.login);


server.listen(server.get("port"), () => {
    console.log(`${server.get("port")}`)
});