const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json())
app.use(cors());

const { getAllProducts } = require("./controllers/productController");
const { Products, ProductImage } = require("./models/productModel");
const { validateUserLogin, registerSeller } = require("./controllers/userController");

// NEED TO BUILD BASIC AUTHENTICATION
    // build a middleware for validating login(check backend\lib\middleware.js)


app.get("/all-products", getAllProducts);

app.post('/seller/login', validateUserLogin);

app.post('/seller/register', registerSeller);

// app.post('/seller/editprofile', )

// app.get('/seller/profile', getSellerProfile);

app.get('/joker', (req, res) => {
    try {
        Products.oneProduct("GULABJAMUN_2",(error, results) => {
            if (error) throw error;
            res.status(200).json(results[0]);
          })
    } catch(error) {
        res.status(500).json({
            error: error.message
        })
    }
})

module.exports = {
  app,
};
