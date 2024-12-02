const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

function verifySellerLoginMW(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({
      error: "Unauthorized: No token provided",
    });

  const jwtToken = authHeader.split(" ")[1];
  if (!jwtToken) {
    return res.status(401).json({
      error: "Unauthorized: No token provided",
    });
  }

  jwt.verify(jwtToken, process.env.JWT_SECRET_PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: "Forbidden: Invalid token",
      });
    }

    console.log(decoded);
    req.seller_id = decoded;
    console.log("Jwt verified succesfully");
    next();
  });
}

function verifyCustomerLoginMW(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({
      error: "Unauthorized: No token provided",
    });

  const jwtCustomerToken = authHeader.split(" ")[1];
  if (!jwtCustomerToken) {
    return res.status(401).json({
      error: "Unauthorized: No token provided",
    });
  }

  jwt.verify(
    jwtCustomerToken,
    process.env.JWT_SECRET_CUSTOMER_PRIVATE_KEY,
    (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: "Forbidden: Invalid token",
        });
      }

      console.log(decoded);
      req.customer_id = decoded;
      console.log("Jwt verified succesfully");
      next();
    }
  );
}

module.exports = { verifySellerLoginMW, verifyCustomerLoginMW };
