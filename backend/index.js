const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')
// app.use(cors());
app.use(cors());
app.use(express.json())
const { getAllProducts, addNewProduct, getProductById } = require("./controllers/productController");
const { Products, ProductImage } = require("./models/productModel");
const { validateUserLogin, registerSeller } = require("./controllers/userController");
const { verifySellerLoginMW } = require("./lib/middleware");

const multer  = require('multer')
const upload = multer({ dest: './public/data/uploads/' })

// NEED TO BUILD BASIC AUTHENTICATION
    // build a middleware for validating login(check backend\lib\middleware.js)


app.get("/all-products", getAllProducts);
app.get('/product/detail/:productId', getProductById);

app.post('/seller/login', validateUserLogin);

app.post('/seller/register', registerSeller);

app.post('/seller/addNewProduct',verifySellerLoginMW, upload.single('productImage'), addNewProduct)

app.get('/joker/token', verifySellerLoginMW, (req, res) => {
    console.log(req.user);
})

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
