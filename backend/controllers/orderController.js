const { v4: uuidv4 } = require("uuid");
const { Order, OrderItems } = require("../models/orderModel");


async function orderCheckout(req, res) {
    const {
        cart,
        totalAmount
    } = req.body;

    const { customer_id: customerId } = req.customer_id;

    if(!customerId) {
        return res.status(401).json({
            error: "Unauthorized. Please login"
        })
    }

    if(!cart || (cart && cart.length === 0) || !totalAmount) {
        return res.status(400).json({
            error: "Invalid Entries"
        })
    }

    try {
        const orderId = uuidv4();
        const orderEntriesData = {
            orderId,
            customerId,
            totalAmount
        }

        const orderEntryResult = await orderEntryHelper(orderEntriesData);

        if(orderEntryResult.error) {
            return res.status(422).json({
                error: "Error occured while order entry <O>"
            })
        }

       
        const arrayOfArrays = cart.map(item => {
            const orderItemId = uuidv4();
            return [orderItemId, orderId, ...Object.values(item)]
        });
        const orderItemEntriesData = {
            arrayOfArrays
        }
        
        const orderItemsEntryResult = await orderItemsEntryHelper(orderItemEntriesData)

        if(orderItemsEntryResult.error) {
            return res.status(422).json({
                error: "Error occured while order entry <OI>"
            })
        }

        return res.status(201).json({
            message: "Order Saved successfully"
        })


    } catch(error) {
        return res.status(500).json({
            error: "Something went wrong. Try again later"
        })
    }
}

async function fetchOrderItemsBySellerId(req, res) {
    const { seller_id } = req.seller_id;
    try {
        const orderItemsBySellerIdResult = await orderItemsBySellerIdHelper({seller_id});
        if(!Array.isArray(orderItemsBySellerIdResult) || orderItemsBySellerIdResult.length === 0) {
            return res.status(404).json({
                error: "No orders found"
            })
        }
        return res.status(200).json({
            orderItemsBySellerIdResult
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            error: "Something went wrong"
        })
    }
}

// HELPER 

function orderEntryHelper(data) {
    return new Promise((resolve, reject) => {
        Order.addOrder(data, (error, results) => {
            if(error) return reject({
                error: "Error adding data to table\n" + error.message
            });
            return resolve(results);
        });

    
    })
}

function orderItemsEntryHelper(data) {
    return new Promise((resolve, reject) => {
        OrderItems.addOrderItem(data, (error, results) => {
            if(error){
                return reject({
                    error: "Error happened in order items entry\n" + error.message
                });
            } 

            return resolve(results)
        })
    })
}

function orderItemsBySellerIdHelper(data) {
    return new Promise((resolve, reject) => {
        OrderItems.allOrderItemsBySellerId(data, (error, results) => {
            if(error) return reject(error);
            return resolve(results)
        })
    })
}

module.exports = {
    orderCheckout,
    fetchOrderItemsBySellerId
}
