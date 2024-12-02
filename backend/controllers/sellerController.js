const { Seller } = require("../models/sellerModel");

async function fetchAllProductsBySellerId(req, res) {
    const { seller_id } = req.seller_id;

    try {

        const allProductByIdResults = await allProductByIdHelper({seller_id})
        if(!Array.isArray(allProductByIdResults) || allProductByIdResults.length === 0) {
            return res.status(404).json({
                error: "No product found"
            })
        }

        return res.status(200).json({
            allProductByIdResults
        })
    } catch(error) {
        return res.status(500).json({
            error: "Something went wrong"
        })
    }
}

function allProductByIdHelper(data) {
    return new Promise((resolve, reject) => {
        Seller.allproductBySellerId(data, (error, results) => {
            if(error) return reject(error);
            return resolve(results)
        })
    })
}

module.exports = {
    fetchAllProductsBySellerId
}