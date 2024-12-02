const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
const {
  getAllProducts,
  addNewProduct,
  getProductById,
} = require("./controllers/productController");
const { Products, ProductImage } = require("./models/productModel");
const {
  validateUserLogin,
  registerSeller,
  registerCustomer,
  validateCustomerLogin,
} = require("./controllers/userController");
const {
  verifySellerLoginMW,
  verifyCustomerLoginMW,
} = require("./lib/middleware");

const multer = require("multer");
const {
  orderCheckout,
  fetchOrderItemsBySellerId,
} = require("./controllers/orderController");
const {
  createAnPaymentOrder,
  verifyPayment,
} = require("./controllers/paymentController");
const {
  addNewReview,
  getReviewsById,
} = require("./controllers/reviewController");
const {
  fetchAllProductsBySellerId,
} = require("./controllers/sellerController");
const upload = multer({ dest: "./public/data/uploads/" });

// Product
app.get("/all-products/:pageNo", getAllProducts);
app.get("/product/detail/:productId", getProductById);
app.get("/product/review/:productId", getReviewsById);
app.post("/product/review", verifyCustomerLoginMW, addNewReview);

// Customer
app.post("/customer/regiter", registerCustomer);
app.post("/customer/login", validateCustomerLogin);

// Order
app.post("/order/checkout", verifyCustomerLoginMW, orderCheckout);

// Payment
app.post(
  "/create-order",
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  express.static(path.join(__dirname)),
  createAnPaymentOrder
);
app.post(
  "/verify-payment",
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  express.static(path.join(__dirname)),
  verifyPayment
);

// Seller
app.post("/seller/login", validateUserLogin);

app.post("/seller/register", registerSeller);

app.post(
  "/seller/addNewProduct",
  verifySellerLoginMW,
  upload.single("productImage"),
  addNewProduct
);

app.get("/seller/products", verifySellerLoginMW, fetchAllProductsBySellerId);
app.get("/seller/orders", verifySellerLoginMW, fetchOrderItemsBySellerId);

module.exports = {
  app,
};
