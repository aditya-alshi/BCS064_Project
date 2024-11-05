const { query } = require('express');
const { connection } = require('../lib/db') // getting connection configuration of mysql from the db.js

const Products = {
    // just for some test
    sampleFunction : (callback) => {
        connection.query('DESCRIBE products', callback);
    },
    //fetch all products
    // when the frontend will request for a product information, it will get everything. 
    // then the frontend can decide what to display
    allProducts: (callback) => {
        const query =  `
            SELECT pi.image_url, pi.product_id, pd.product_name, pd.product_description 
            FROM products pd INNER JOIN product_images pi 
            ON pd.id = pi.product_id
        `
        connection.query(query, callback)
    }
    // (callback) => {
    //     connection.query('SELECT * FROM products', callback)
    // }
    ,
    // fetch one product
    oneProduct : (productId, callback) => {
        connection.query('SELECT product_name FROM products WHERE id=?',
            [productId],
            callback
        )
    }
}

const ProductImage = {
    // fetch all images
    allImages: (callback) => {
        const query =  `
            SELECT pi.image_url, pi.product_id, pd.product_name, pd.product_description 
            FROM products pd INNER JOIN product_images pi 
            ON pd.id = pi.product_id
        `
        connection.query(query, callback)
    }
}

module.exports = {
    Products,
    ProductImage
}

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