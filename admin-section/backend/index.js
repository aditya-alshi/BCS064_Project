const express = require('express');
const cors = require('cors');
const { validateAdminLogin } = require('./controllers/userAdminController');
const app = express();
const PORT = process.env.PORT || 5005;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { v4: uuidv4 } = require('uuid');
const { authenticateAdmin } = require('./lib/middleware');
const { fetchAllProducts, deleteAProduct, fetchProductById, changeApprovalStatus } = require('./controllers/productsController');
const { fetchAllSellers } = require('./controllers/sellerController');
const { fetchAllCustomers } = require('./controllers/customersController');
const { fetchAllOrders } = require('./controllers/orderController');
app.use(cors())
app.use(express.json())

app.post('/shh-xxx-hss/admin/login', validateAdminLogin)

// Producs
app.get('/shh-xxx-hss/admin/all-products/:pageNo', fetchAllProducts)

app.get('/shh-xxx-hss/admin/products/details/:product_id', fetchProductById);

app.post('/shh-xxx-hss/admin/products/chageApprovalStatus', changeApprovalStatus)

app.post('/shh-xxx-hss/admin/products/delete/:product_id', deleteAProduct)

// Seller
app.get('/shh-xxx-hss/admin/all-sellers/:pageNo', fetchAllSellers)

// Customers
app.get('/shh-xxx-hss/admin/all-customers/:pageNo', fetchAllCustomers)

// Orders
app.get('/shh-xxx-hss/admin/all-orders/:pageNo', fetchAllOrders)

app.post('/admin/joker', authenticateAdmin)

app.listen(PORT, ()=> {
    console.log("Server is listening at port " + PORT);
})