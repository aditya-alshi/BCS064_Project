const { Products, ProductImage } = require('../models/productModel');
const { getSignedDownloadUrl }  = require('../signer/signer');

async function getAllProducts(req, res) {
    try {
        const result = await allProduct(); // this will contain the image information including image path
        const imagePromises = result.map(async (product) => ({
            ...product,
            image_url: await getSignedDownloadUrl(product.image_url) // this will grab the image path and make it 
                                                                     // a presigned url
        }));
        const withSignedImages = await Promise.all(imagePromises);

        return res.status(200).json(withSignedImages);
        
    } catch(error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// helper functions
function allProduct() {
    // Something new here. We have chosed to return a Promise itself which will be resolved. or rejected
    // The allProduct() will run the query and return the result here.
    return new Promise((resolve, reject) => {
        Products.allProducts((error, results) => {
            if(error) return reject(error);
            resolve(results)
        })
    })
}


module.exports = {
    getAllProducts
}