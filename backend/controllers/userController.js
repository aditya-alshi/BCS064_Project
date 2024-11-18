const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { v4: uuidv4 } = require("uuid");
const { Seller, SellerStoreAddress } = require("../models/sellerModel");


// CONTROLLERS
async function validateUserLogin(req, res) {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const results = await validateEmailHelper(email);

    if (results.message) {
      return res.status(401).json({
        message: results.message,
      });
    }
    if (results.length === 0) {
      return res.status(401).json({
        message: "No account found for this email",
      });
    }
    // console.log(results[0].password);
    const userId = results[0].user_id;
    const hashedPassword = await validatePasswordHelper(userId);
    if (hashedPassword.length === 0) {
      return res.status(401).json({
        message: "Invalid ",
      });
    }
    const isValidPassword = await bcrypt.compare(
      password,
      hashedPassword[0].password
    );
    if (isValidPassword) {
      return res.status(200).json({
        message: "Login succesfull",
      });
    } else {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

async function registerSeller(req, res) {
  const {
    email,
    password,
    bussinessName,
    phoneNumber,
    addressLine1,
    addressLine2,
    city,
    country,
    zipCode,
  } = req.body;

  const sam = [email,
    password,
    bussinessName,
    phoneNumber,
    addressLine1,
    addressLine2,
    city,
    country,
    zipCode,]

  console.log(sam)

  const userId = uuidv4();

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const modifyData = {
    userId,
    email,
    password: hashedPassword,
    role: "seller",
  };
  try {
    const results = await registerSellerHelper(modifyData);

    if (results && results.affectedRows === 1) {
      const sellerId = uuidv4();
      const modifySellerInformation = {
        sellerId,
        reisteredUserId: userId,
        bussinessName,
        phoneNumber,
      };

      const sellerEntryResult = await sellerEntryHelper(
        modifySellerInformation
      );

      if (sellerEntryResult && sellerEntryResult.affectedRows === 1) {
        const sellerAddressId = uuidv4();

        const modifySellerStoreAddressInfo = {
          sellerAddressId,
          sellerId,
          addressLine1,
          addressLine2,
          city,
          country,
          zipCode,
        };

        const sellerStoreAddressEntryResult =
          await sellerStoreAddressInfoHelper(modifySellerStoreAddressInfo);

        if (
          sellerStoreAddressEntryResult &&
          sellerStoreAddressEntryResult.affectedRows === 1
        ) {
          return res.status(201).json({
            message: "Seller Registered Successfully",
          });
        } else {
          return res.status(400).json({
            message: "Registration failed",
          });
        }
      } else {
        return res.status(400).json({
          message: "Registration failed",
        });
      }
    } else {
      return res.status(400).json({
        message: "Registration failed",
      });
    }
  } catch (error) {
    console.log(error);
    if (error.code === "DUPLICATE_ENTRY") {
      return res.status(409).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: "An internal server error occured",
    });
  }
}

// HELPER FUNCTIONS
function validateEmailHelper(email) {
  return new Promise((resolve, reject) => {
    User.UserLoginEmail(email, (error, results) => {
      if (error)
        reject({
          message: error.message,
        });

      resolve(results);
    });
  });
}

function validatePasswordHelper(userId) {
  return new Promise((resolve, reject) => {
    User.UserLoginPassword(userId, (error, results) => {
      if (error)
        reject({
          message: error.message,
        });
      resolve(results);
    });
  });
}

function registerSellerHelper(modifyData) {
  return new Promise((resolve, reject) => {
    User.UserRegister(modifyData, (error, results) => {
      if (error) {
        if (error.code === "ER_DUP_ENTRY") {
          return reject({
            message: "The email is already in use.",
            code: "DUPLICATE_ENTRY",
          });
        }

        return reject({
          message: error.message,
          code: error.code,
        });
      }
      resolve(results);
    });
  });
}

function sellerEntryHelper(modifySellerInformation) {
  return new Promise((resolve, reject) => {
    Seller.addSeller(modifySellerInformation, (error, results) => {
      if (error)
        reject({
          error: error.message,
        });
      resolve(results);
    });
  });
}

function sellerStoreAddressInfoHelper(modifySellerStoreAddressInfo) {
  return new Promise((resolve, reject) => {
    SellerStoreAddress.addSellerStoreAddress(
      modifySellerStoreAddressInfo,
      (error, results) => {
        if (error) {
          reject({
            error: error.message,
          });
        }
        resolve(results);
      }
    );
  });
}

module.exports = {
  validateUserLogin,
  registerSeller,
};


// ========== Registration Section ==============
// Challenge
// -- Get the user register as a seller. 
  //   For this we need three different table entries. The problem was to get all the information about the 
  //   user at once from the frontend(via user registration form) and make three entries in respective three tables
  //   Initially the user_id, seller_id, seller_address_id in the user, seller and seller_store_address table were
  //   Default uuid() and auto added. But this will mean it will need to retrive the ids first and then the further 
  //   consecutive steps will be applied. 
  //   Which means. for seller_id, we need the user_id as foreign key and so on. which will be difficult becuase the 
  //   the INSERT statement don't return the added row. 
// -- Solution was 
  //   to generate uuid() manually and add it to the respective tables. 
  //   so first the user_id will be generated. and the data needed for the user table entry will be grabbed from the 
  //   req.body which was email and password. 
  //   if everything goes well, then we will proceed to fill the seller table with generating seller_id and already 
  //   generated user_id from the previous step will be added as the foreingn key. in the seller table. 
  //   if that goes well we will do similar for seller_store_address table. 

  // Still there's a lot of error handling stuff pending.
  // ERROR HANDLING IS A BIG ISSUE. need to take care asap. 


  // ========== Login Section ==============
  // For further usage we will be needing the seller_id.
  // Such as for seller data update. seller_store_address data update. adding removing products
  // we will need seller_id. 
  // As discussed we will be adding the seller_id to JWT tokens and thus store it to user. and manage those actions.
  // with login request seller will send their email and since email is unique. we will query the seller table to
  // retrive the seller_id using that email. 
  // So basically querying the user table and join on seller table on user_id where the email address is "?" and
  // and return the email and seller id or what ever it is. 