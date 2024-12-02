const { Seller } = require("../models/sellerModel");

async function fetchAllSellers(req, res) {
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

    const allSellerResult = await allSellerHelper({ pageNo });
    console.log(allSellerResult);

    if (!Array.isArray(allSellerResult) || allSellerResult.length === 0) {
      return res.status(404).json({
        error: "No Sellers found",
      });
    }
    return res.status(200).json({
      totalPages: Math.ceil(totalRows / 10),
      pageNo,
      allSellers: allSellerResult,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong. Try again later",
    });
  }
}

// HELPER FUNCTION

function allSellerHelper(data) {
  return new Promise((resolve, reject) => {
    Seller.allSellers(data, (error, results) => {
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
    Seller.totalCount((error, results) => {
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
  fetchAllSellers,
};
