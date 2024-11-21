const express = require('express');
const cors = require('cors');
const { validateAdminLogin } = require('./controllers/userAdminController');
const app = express();
const PORT = process.env.PORT || 5005;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { v4: uuidv4 } = require('uuid');
const { authenticateAdmin } = require('./lib/middleware');
const { fetchAllProducts, deleteAProduct } = require('./controllers/productsController');
app.use(cors())
app.use(express.json())

app.post('/shh-xxx-hss/admin/login', validateAdminLogin)

app.get('/shh-xxx-hss/admin/all-products', fetchAllProducts)

app.post('/shh-xxx-hss/admin/products/delete/:product_id', deleteAProduct)

app.post('/admin/joker', authenticateAdmin)

app.listen(PORT, ()=> {
    console.log("Server is listening at port " + PORT);
})