const { connection } = require("../lib/db")

const Seller = {

    sellerProfile : (data, callback) => {
        const query = `
            SELECT * FROM seller WHERE registered_user_id=?
        `
        const { registeredUserId } = data;
        connection.query(query, [ registeredUserId ], callback)
    },

    addSeller : (data, callback) =>{
        const query = `
            INSERT INTO seller (seller_id, registered_user_id, bussiness_name, phone_number)
            VALUES (?, ?, ?, ?)
        `
        const {
            sellerId,
            reisteredUserId,
            bussinessName,
            phoneNumber
        } = data
        
        connection.query(query, [ 
            sellerId,
            reisteredUserId,
            bussinessName,
            phoneNumber 
        ], callback)
    }
}

const SellerStoreAddress = {
    addSellerStoreAddress: (data, callback) => {
        const query = `
         INSERT INTO seller_store_address ( 
         seller_address_id, seller_id, address_line_1, address_line_2, city, country, zip_code
         )
         VALUES (?, ?, ?, ?, ?, ?, ?)
        `

        const { sellerAddressId,
            sellerId,
            addressLine1,
            addressLine2,
            city,
            country,
            zipCode 
        } = data

        connection.query(query, [ 
            sellerAddressId,
            sellerId,
            addressLine1,
            addressLine2,
            city,
            country,
            zipCode  
        ], callback)


    }
}

module.exports =  {
    Seller,
    SellerStoreAddress
}