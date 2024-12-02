const { connection } = require("../lib/db"); // getting connection configuration of mysql from the db.js

const Products = {
  // just for some test
  sampleFunction: (callback) => {
    connection.query("DESCRIBE products", callback);
  },

  totalCount: (callback) => {
    const query = `
            SELECT COUNT(*) AS totalRows FROM products
        `;
    connection.query(query, callback);
  },

  //fetch all products
  // when the frontend will request for a product information, it will get everything.
  // then the frontend can decide what to display
  allProducts: (data, callback) => {
    const query = `
            SELECT pi.image_url, pi.product_id, pd.product_name, pd.product_description, pd.price, pd.seller_id
            FROM products pd INNER JOIN product_images pi 
            ON pd.product_id = pi.product_id
            WHERE pd.approval_status="approved"
            LIMIT ?, ?
        `;
    const { pageNo } = data;
    const offset = (pageNo - 1) * 10;
    connection.query(query, [offset, 10], callback);
  },
  oneProduct: (data, callback) => {
    const query = `
            SELECT pi.image_url as imageKey,
            pd.product_id,
            pd.product_name as product_name,
            pd.product_description as product_description,
            pd.category as category,
            pd.price as price,
            pd.category_type as category_type,
            pd.seller_id as seller_id
            FROM products pd INNER JOIN product_images pi ON pd.product_id=pi.product_id
            WHERE pd.product_id=?;
        `;
    const { incomingProductId } = data;
    connection.query(query, [incomingProductId], callback);
  },

  newProduct: (data, callback) => {
    const query = `
            INSERT INTO products (
                product_id, product_name, product_description, category,  stock, seller_id, price, category_type
            ) VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?
            )
        `;
    const {
      productId,
      productName,
      productDescription,
      category,
      stock,
      seller_id,
      price,
      categoryType,
    } = data;
    connection.query(
      query,
      [
        productId,
        productName,
        productDescription,
        category,
        stock,
        seller_id,
        price,
        categoryType,
      ],
      callback
    );
  },
};

const ProductImage = {
  addNewImage: (data, callback) => {
    const query = `
            INSERT INTO product_images (
                image_id, product_id, image_url
            ) VALUES (
                ?, ?, ? 
            )
        `;
    const { imageId, productId, productImageName } = data;
    connection.query(query, [imageId, productId, productImageName], callback);
  },
};

module.exports = {
  Products,
  ProductImage,
};

// (error, results, fields) => {
//     if(error) throw error;
//     return console.log("Result of the query : ", results[0]);
// }

// Here's what's going on
// in the index.js we have app.get
// this app.get has '/some-route' and (req, res) => {}
// that (req, res) => {} will do something
// that do something is nothing but getting request -> querying the database -> responding in the form of json
// In here in this file productModel.js code, we handle the 'quering the databse' part.
// And what to do about the result of that query, will be responsibility of the callback.
// Note that the callback is actually required for connection.query() method, it's not our own thing
// So there is a standard structure to that callback. Refer to the above commented code
