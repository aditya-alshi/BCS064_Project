const { connection } = require("../lib/db");

const Seller = {
  sellerProfile: (data, callback) => {
    const query = `
            SELECT * FROM seller WHERE registered_user_id=?
        `;
    const { registeredUserId } = data;
    connection.query(query, [registeredUserId], callback);
  },

  addSeller: (data, callback) => {
    const query = `
            INSERT INTO seller (seller_id, registered_user_id, bussiness_name, phone_number)
            VALUES (?, ?, ?, ?)
        `;
    const { sellerId, reisteredUserId, bussinessName, phoneNumber } = data;

    connection.query(
      query,
      [sellerId, reisteredUserId, bussinessName, phoneNumber],
      callback
    );
  },

  sellerById: (data, callback) => {
    const query = `
            SELECT sl.bussiness_name as businessName,
             sl.phone_number as phoneNumber,
             sladd.address_line_1 as addressLineOne,
             sladd.address_line_2 as addressLineTwo,
             sladd.city as city,
             sladd.country as country,
             sladd.zip_code as zipCode
             FROM seller sl INNER JOIN seller_store_address sladd ON sl.seller_id=sladd.seller_id
             WHERE sl.seller_id=?
        `;
    const { sellerId } = data;
    connection.query(query, [sellerId], callback);
  },

  allproductBySellerId: (data, callback) => {
    const query = `
            SELECT * FROM products WHERE seller_id=?
        `;
    const { seller_id } = data;
    connection.query(query, [seller_id], callback);
  },
};

const SellerStoreAddress = {
  addSellerStoreAddress: (data, callback) => {
    const query = `
         INSERT INTO seller_store_address ( 
         seller_address_id, seller_id, address_line_1, address_line_2, city, country, zip_code
         )
         VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

    const {
      sellerAddressId,
      sellerId,
      addressLine1,
      addressLine2,
      city,
      country,
      zipCode,
    } = data;

    connection.query(
      query,
      [
        sellerAddressId,
        sellerId,
        addressLine1,
        addressLine2,
        city,
        country,
        zipCode,
      ],
      callback
    );
  },
};

module.exports = {
  Seller,
  SellerStoreAddress,
};
