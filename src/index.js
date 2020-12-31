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

const user = require("./app/endpoints/user/user");
app.post('/api/user/update/:user', auth, user.update_user);

const brand = require("./app/endpoints/brand/brand");
app.get('/api/brand', auth, brand.get_brands);
app.get('/api/brand/:brand', auth, brand.get_brand);
app.post('/api/brand', auth, brand.new_brand);
app.put('/api/brand/:brand', auth, brand.update_brand);
app.post('/api/brand/:brand/change-status', auth, brand.change_status);

const category = require("./app/endpoints/category/category");
app.get('/api/category', auth, category.get_categories);
app.get('/api/category/:category', auth, category.get_category);
app.post('/api/category', auth, category.new_category);
app.put('/api/category/:category', auth, category.update_category);
app.post('/api/category/:category/change-status', auth, category.change_status);

server.listen(server.get("port"), () => {
    console.log(`${server.get("port")}`)
});