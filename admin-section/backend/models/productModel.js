const { connection } = require("../lib/db")

const Product = {

    totalCount: (callback)  => {
        const query = `
            SELECT COUNT(*) AS totalRows FROM products
        `
        connection.query(query, callback)
    },

    allProduct : (data , callback) => {
        const query = `
            SELECT * FROM products LIMIT ?, ?
        `
        const { pageNo } = data
        const offset = (pageNo - 1) * 10
        connection.query(query, [offset, 10], callback);
    },

    productImage: (data, callback) => {
        
        const query = `
            SELECT pi.image_url AS imageKey
            FROM products pd INNER JOIN product_images pi
            ON pd.product_id = pi.product_id
            WHERE pd.product_id=?
        `
        const { productId } = data;
        
        connection.query(query, [ productId ], callback)
    },

    productDelete: (data, callback) => {
        const query = `
            DELETE FROM products WHERE product_id=?
        `
        const { productId } = data;
        connection.query(query, [ productId ], callback)
    }
}

module.exports = {
    Product
}