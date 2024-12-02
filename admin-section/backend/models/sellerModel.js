const { connection } = require("../lib/db");

const Seller = {
  allSellers: (data, callback) => {
    const query = `
            SELECT * FROM seller LIMIT ?, ?
        `;
    const { pageNo } = data;
    const offset = (pageNo - 1) * 10;
    connection.query(query, [offset, 10], callback);
  },

  totalCount: (callback) => {
    const query = `
            SELECT COUNT(*) AS totalRows FROM seller
        `;
    connection.query(query, callback);
  },
};

module.exports = {
  Seller,
};
