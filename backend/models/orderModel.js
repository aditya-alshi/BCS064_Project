const { connection } = require("../lib/db");

const Order = {
  addOrder: (data, callback) => {
    const query = `
            INSERT INTO orders (
                order_id, customer_id, total_amount
            ) VALUES (
                ?,?,? 
            )
        `;
    const { orderId, customerId, totalAmount } = data;
    connection.query(query, [orderId, customerId, totalAmount], callback);
  },
};

const OrderItems = {
  addOrderItem: (data, callback) => {
    const query = `
            INSERT INTO order_items (
                order_item_id, order_id, product_id, seller_id, product_name, item_price, quantity
            ) VALUES ?
        `;
    const { arrayOfArrays } = data;
    connection.query(query, [arrayOfArrays], callback);
  },
  allOrderItemsBySellerId: (data, callback) => {
    const query = `
            SELECT * FROM order_items WHERE seller_id=?
        `;
    const { seller_id } = data;

    connection.query(query, [seller_id], callback);
  },
};

module.exports = {
  Order,
  OrderItems,
};
