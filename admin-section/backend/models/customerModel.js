const { connection } = require("../lib/db");

const Customer = {
  allcustomers: (data, callback) => {
    const query = `
            SELECT * FROM customer LIMIT ?, ?
        `;
    const { pageNo } = data;
    const offset = (pageNo - 1) * 10;
    connection.query(query, [offset, 10], callback);
  },

  totalCount: (callback) => {
    const query = `
            SELECT COUNT(*) AS totalRows FROM customer
        `;
    connection.query(query, callback);
  },
};

module.exports = {
  Customer,
};
