const { connection } = require("../lib/db");

const Order = {
  allOrders: (data, callback) => {
    const query = `
            SELECT * FROM orders LIMIT ?, ?
        `;
    const { pageNo } = data;
    const offset = (pageNo - 1) * 10;
    connection.query(query, [offset, 10], callback);
  },

  totalCount: (callback) => {
    const query = `
            SELECT COUNT(*) AS totalRows FROM orders
        `;
    connection.query(query, callback);
  },
};

module.exports = {
  Order,
};
