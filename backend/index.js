const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());

const { getAllProducts } = require("./controllers/productController");
const { Products, ProductImage } = require("./models/productModel");

app.get("/all-products", getAllProducts);

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
