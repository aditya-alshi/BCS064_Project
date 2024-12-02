const { s3DeleteObject, getSignedDownloadUrl } = require("../lib/s3connet");
const { Product } = require("../models/productModel");

async function fetchAllProducts(req, res) {
  try {
    const pageNo = parseInt(req.params.pageNo);
    const totalRowsResult = await totalRowsCount();
    if (!Array.isArray(totalRowsResult) || totalRowsResult.length === 0) {
      return res.status(404).json({
        error: "No Products found",
      });
    }

    const [{ totalRows }] = totalRowsResult;

    const allProductResult = await allProductHelper({ pageNo });

    if (!Array.isArray(allProductResult) || allProductResult.length === 0) {
      return res.status(404).json({
        error: "No Products found",
      });
    }
    return res.status(200).json({
      totalPages: Math.ceil(totalRows / 10),
      pageNo,
      allProducts: allProductResult,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong. Try again later",
    });
  }
}

async function fetchProductById(req, res) {
  const productId = req.params.product_id;
  if (!productId) {
    return res.status(400).json({
      error: "invalid product id",
    });
  }

  try {
    const productDetailsResult = await productDetailHelper({ productId });

    if (
      !Array.isArray(productDetailsResult) ||
      productDetailsResult.length === 0
    ) {
      return res.status(404).json({
        error: "Prouduct Not found for this id",
      });
    }
    const productImageHelperResult = await imageKeyHelper({ productId });

    if (
      !Array.isArray(productImageHelperResult) ||
      productImageHelperResult.length === 0
    ) {
      return res.status(404).json({
        error: "Data not found (IMG)",
      });
    }

    const [{ imageKey }] = productImageHelperResult;

    const imageSignedUrl = (await getSignedDownloadUrl(imageKey)) || "";

    const [
      {
        product_id,
        product_name,
        product_description,
        category,
        approval_status,
        stock,
        seller_id,
        created_at,
        updated_at,
        price,
        category_type,
      },
    ] = productDetailsResult;

    res.status(200).json({
      product_id,
      product_name,
      product_description,
      category,
      approval_status,
      stock,
      seller_id,
      imageSignedUrl,
      created_at,
      updated_at,
      price,
      category_type,
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

    if (!Array.isArray(imageKeyResult) || imageKeyResult.length === 0) {
      return res.status(404).json({
        error: "Data not found (IMG)",
      });
    }

    const [{ imageKey }] = imageKeyResult;
    const imageDeletionResult = await s3DeleteObject(imageKey);

    if (imageDeletionResult.error) {
      return res.status(404).json({
        error: "Soemething went wrong.\nDetails:\n" + imageDeletionResult.error,
      });
    }

    const productDeletionResult = await prouductDeleteHelper({ productId });
    if (productDeletionResult && productDeletionResult.affectedRows === 1) {
      return res.status(200).json({
        message: "Product Deleted successfull",
      });
    } else {
      return res.status(400).json({
        error: "Something went wrong PdelRes",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong. Try again later\nDetails: " + error.message,
    });
  }
}

async function changeApprovalStatus(req, res) {
  const { approvalStatus, productId } = req.body;
  if (!approvalStatus || !productId) {
    return res.status(400).json({
      error: "Invalid inputs",
    });
  }

  try {
    const approvalStatusAddedResult = await approvalStatusAddedHelper({
      approvalStatus,
      productId,
    });
    if (
      approvalStatusAddedResult &&
      approvalStatusAddedResult.affectedRows === 1
    ) {
      return res.status(200).json({
        message: `Approval Status for product with product_id ${productId} has been changeed to ${approvalStatus} successfully`,
      });
    } else {
      return res.status(400).json({
        error: "Something went wrong PApStRes",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong. Try again later",
    });
  }
}

// HELPER FUNCTIONs

function totalRowsCount() {
  return new Promise((resolve, reject) => {
    Product.totalCount((error, results) => {
      if (error) {
        return reject({
          error: error,
        });
      }
      return resolve(results);
    });
  });
}

function allProductHelper(data) {
  return new Promise((resolve, reject) => {
    Product.allProduct(data, (error, results) => {
      if (error)
        return reject({
          error: error,
        });
      resolve(results);
    });
  });
}

function productDetailHelper(data) {
  return new Promise((resolve, reject) => {
    Product.productById(data, (error, results) => {
      if (error)
        return reject({
          error: error,
        });
      return resolve(results);
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
      if (error) {
        return reject({
          error: error.message,
        });
      }
      return resolve(results);
    });
  });
}

function approvalStatusAddedHelper(data) {
  return new Promise((resolve, reject) => {
    Product.changeApprovalStatus(data, (error, results) => {
      if (error)
        return reject({
          error,
        });
      return resolve(results);
    });
  });
}

module.exports = {
  fetchAllProducts,
  fetchProductById,
  deleteAProduct,
  changeApprovalStatus,
};
