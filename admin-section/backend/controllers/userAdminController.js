const { ADMIN } = require("../models/userAdminModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const adminPassword = process.env.ADMIN_PASSWORD;
const JWTADMINPK = process.env.ADMIN_JWT_PRIVATE_KEY;

async function validateAdminLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      error: "Invalid credentials",
    });
  }
  try {
    const emailResults = await checkAdminHEmail({ email });
    if (!Array.isArray(emailResults) || emailResults.length === 0) {
      return res.status(401).json({
        error: "Invalid email",
      });
    }

    const [{ password: hashedPassword, user_id: adminUserId }] = emailResults;

    const isValidPassword = await bcrypt.compare(adminPassword, hashedPassword);
    if (isValidPassword) {
      const jwtToken = jwt.sign(
        {
          adminUserId,
        },
        JWTADMINPK,
        { expiresIn: "1h" }
      );
      return res.status(201).json({
        message: "Successfully logged in",
        jwtToken,
      });
    } else {
      return res.json({
        error: "Invalid Password",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function checkAdminHEmail(data) {
  return new Promise((resolve, reject) => {
    ADMIN.adminEmailLogin(data, (error, results) => {
      if (error) reject(error.message);
      return resolve(results);
    });
  });
}

module.exports = {
  validateAdminLogin,
};
