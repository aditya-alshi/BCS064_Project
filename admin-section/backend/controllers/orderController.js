const { Order } = require("../models/orderModel");

async function fetchAllOrders(req, res) {
  try {
    const pageNo = parseInt(req.params.pageNo);
    const totalRowsResult = await totalRowsCount();
    console.log(totalRowsCount);
    if (!Array.isArray(totalRowsResult) || totalRowsResult.length === 0) {
      return res.status(404).json({
        error: "No Sellers found",
      });
    }

    const [{ totalRows }] = totalRowsResult;

    const allOrderResult = await allOrderHelper({ pageNo });
    console.log(allOrderResult);

    if (!Array.isArray(allOrderResult) || allOrderResult.length === 0) {
      return res.status(404).json({
        error: "No Sellers found",
      });
    }
    return res.status(200).json({
      totalPages: Math.ceil(totalRows / 10),
      pageNo,
      allOrders: allOrderResult,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong. Try again later",
    });
  }
}

// HELPER FUNCTION

function allOrderHelper(data) {
  return new Promise((resolve, reject) => {
    Order.allOrders(data, (error, results) => {
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
    Order.totalCount((error, results) => {
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
  fetchAllOrders,
};
