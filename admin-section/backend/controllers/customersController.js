const { Customer } = require("../models/customerModel");

async function fetchAllCustomers(req, res) {
  try {
    const pageNo = parseInt(req.params.pageNo);
    const totalRowsResult = await totalRowsCount();
    console.log(totalRowsCount);
    if (!Array.isArray(totalRowsResult) || totalRowsResult.length === 0) {
      return res.status(404).json({
        error: "No Customers found",
      });
    }

    const [{ totalRows }] = totalRowsResult;

    const allCustomersResult = await allCustomersHelper({ pageNo });
    console.log(allCustomersResult);

    if (!Array.isArray(allCustomersResult) || allCustomersResult.length === 0) {
      return res.status(404).json({
        error: "No Customers found",
      });
    }
    return res.status(200).json({
      totalPages: Math.ceil(totalRows / 10),
      pageNo,
      allCustomer: allCustomersResult,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong. Try again later",
    });
  }
}

// HELPER FUNCTION

function allCustomersHelper(data) {
  return new Promise((resolve, reject) => {
    Customer.allcustomers(data, (error, results) => {
      if (error)
        return reject({
          error: error,
        });
      resolve(results);
    });
  });
}

function totalRowsCount() {
  return new Promise((resolve, reject) => {
    Customer.totalCount((error, results) => {
      if (error) {
        return reject({
          error: error,
        });
      }
      return resolve(results);
    });
  });
}

module.exports = {
  fetchAllCustomers,
};
