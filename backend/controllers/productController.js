
const { Products, ProductImage } = require('../models/productModel');
const { getSignedDownloadUrl, s3Uploader }  = require('../signer/signer');

const { v4: uuidv4 } = require("uuid");


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

async function addNewProduct(req, res) {

    try {

        const productData = req.body

    
        const productFileObj = req.file;
        
        const productImageName = productFileObj.filename;
    
        const productId = uuidv4();
        const modifiedProductData = {
            productId,
            ...productData
        }
    
        const productsTableResults = await productsTableResultsHelper(modifiedProductData)
        if(!productsTableResults.error && productsTableResults.affectedRows === 1) {
    
            const responseFromS3 = await s3Uploader(productFileObj)
            if(!responseFromS3.error) {
    
                const imageId = uuidv4();
        
                const modifiedImageData = {
                    imageId,
                    productId,
                    productImageName
                }
                const productImagesTableResults = await productImagesTableResultsHelper(modifiedImageData)
                if(!productImagesTableResults.error && productImagesTableResults.affectedRows === 1) {
                    return res.status(201).json({
                        message: "Product Request fulfilled successfully"
                    })
                } else {
                    return res.status(409).json({
                        error: "Product Request I failed. Try again after some time"
                    })
                }
            } else {
                return res.status(502).json({
                    error: "Request Failed. Try again after some time"
                })
            }
            
        } else {
            return res.status(409).json({
                error: "Product Request failed. Try again after some time"
            })
        }
    }catch (error) {
        return res.status(500).json({
            error: "Something went wrong. Try again later"
        })
    }
    
}

// HELPER FUNCTIONS
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

function productsTableResultsHelper(modifiedProductData) {
    return new Promise((resolve, reject) => {
        Products.newProduct(modifiedProductData, (error, results) => {
            if(error) reject({
                error: error.message
            });
            resolve(results)
        })
    })
}

function productImagesTableResultsHelper(modifiedImageData){
    return new Promise((resolve, reject) => {
        ProductImage.addNewImage(modifiedImageData, (error, results) => {
            if(error) reject({
                error: error.message
            });
            resolve(results);
        })
    })
}



module.exports = {
    getAllProducts,
    addNewProduct
}