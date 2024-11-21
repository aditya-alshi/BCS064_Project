const { s3DeleteObject } = require("../lib/s3connet");
const { Product } = require("../models/productModel");

async function fetchAllProducts(req, res) {
  try {
    const allProductResult = await allProductHelper();
    if (!Array.isArray(allProductResult) || allProductResult.length === 0) {
      return res.status(404).json({
        error: "No Products found",
      });
    }
    return res.status(200).json({
      allProducts: allProductResult,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong. Try again later",
    });
  }
}

async function deleteAProduct(req, res) {
  const productId = req.params.product_id;
  if (!productId) {
    return res.status(400).json({
      error: "invalid product id",
    });
  }
  try {
    const imageKeyResult = await imageKeyHelper({ productId });

    if(!(Array.isArray(imageKeyResult)) || imageKeyResult.length === 0) {
        return res.status(404).json({
            error: "Data not found (IMG)"
        })
    }

    const [{ imageKey }] = imageKeyResult
    const imageDeletionResult = await s3DeleteObject(imageKey)

    if(imageDeletionResult.error) {
        return res.status(404).json({
            error: "Soemething went wrong.\nDetails:\n" + imageDeletionResult.error
        })
    }

    const productDeletionResult = await prouductDeleteHelper({ productId });
    if(productDeletionResult && productDeletionResult.affectedRows === 1) {
        return res.status(200).json({
            message: "Product Deleted successfull"
        })
    } else {
        return res.status(400).json({
            error: "Something went wrong PdelRes"
        })
    }

    
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong. Try again later\nDetails: " + error.message
    });
  }
}

// HELPER FUNCTIONs
function allProductHelper() {
  return new Promise((resolve, reject) => {
    Product.allProduct((error, results) => {
      if (error)
        return {
          error: error.message,
        };
      resolve(results);
    });
  });
}

function imageKeyHelper(data) {
  return new Promise((resolve, reject) => {
    Product.productImage(data, (error, results) => {
      if (error)
        return reject({
          error: error.message,
        });
      return resolve(results);
    });
  });
}

function prouductDeleteHelper(data) {
    return new Promise((resolve, reject) => {
        Product.productDelete(data, (error, results) => {
            if(error) {
                return reject({
                    error: error.message
                })
            }
            return resolve(results)
        })
    })
}

module.exports = {
  fetchAllProducts,
  deleteAProduct,
};
