import { Orders } from "./types/orderTypes";
import { Review } from "./types/reviewTypes";
import { Inventory } from "./types/sellerTypes";
import { v4 as uuidv4 } from 'uuid';

const inventoryProducts: Inventory[] = [
    {
        product_id: uuidv4(),
        productName: "Laal Kachori",
        price: 500,
        sellerId: uuidv4(),
        productDescription:  "Laal Kachori " + "Just description thing",
        approvalStatus: "pending",
        quantity: 6,
        category: {name: "savories", type: "Kachori"}
    },
    {
        product_id: uuidv4(),
        productName: "Gulab Jamun",
        price: 100,
        sellerId: uuidv4(),
        productDescription: "Gulab Jamun Just description thing",
        approvalStatus: "approved",
        quantity: 2,
        category: {name: "sweets", type: "other sweets"}
    },
    {
        product_id: uuidv4(),
        productName: "Solapur Pedha",
        price: 200,
        sellerId: uuidv4(),
        productDescription: " Solapur Pedha Just description thing",
        approvalStatus: "rejected",
        quantity: 2,
        category: {name: "sweets", type: "Pedha"}
    }
] ;

const orderList : Orders[] = [
    {
        order_id : uuidv4(),
        seller_id : uuidv4(),
        customerId : uuidv4(),
        productName: "Gulab Jamun",
        order_date: new Date(),
        order_address: "Diva Park, Mumbai",
        payment_mode: "credit_card",
        status: "shipped",
        estimate_delivery: new Date(),
        actual_delivery: new Date(),
        total_price: 5000
    },
    {
        order_id : uuidv4(),
        seller_id : uuidv4(),
        customerId : uuidv4(),
        productName: "Kesar Pedha",
        order_date: new Date(),
        order_address: "Mexi Ground, Gujrat",
        payment_mode: "upi",
        status: "delivered",
        estimate_delivery: new Date(),
        actual_delivery: new Date(),
        total_price: 2000
    },
    {
        order_id : uuidv4(),
        seller_id : uuidv4(),
        customerId : uuidv4(),
        productName: "Sev",
        order_date: new Date(),
        order_address: "Nishant Society, Vikroli",
        payment_mode: "debit_card",
        status: "pending",
        estimate_delivery: new Date(),
        actual_delivery: new Date(),
        total_price: 10
    }
]

const reviewList: Review[] = [
    {
        review_id : uuidv4(),
        product_id : uuidv4(),
        customer_id : uuidv4(),
        rating: 1,
        comment: "Very nice Product",
        created_at: new Date(),
    },
    {
        review_id : uuidv4(),
        product_id : uuidv4(),
        customer_id : uuidv4(),
        rating: 5,
        comment: "Superb Quality Very nice Product",
        created_at: new Date(),
    },
    {
        review_id : uuidv4(),
        product_id : uuidv4(),
        customer_id : uuidv4(),
        rating: 3,
        comment: "Giving it solid 3",
        created_at: new Date(),
    },
]

export { inventoryProducts, orderList, reviewList }