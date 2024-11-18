import { v4 as uuidV4 } from "uuid"
import { Products } from "../types/productsTypes"
import { Seller } from "../types/sellersTypes"
import { Customer } from "../types/customersTypes"
import { Order } from "../types/ordersTypes"


export const allImages = [
    {
         image_name: "Kaju katli",
         Image_url: "kaju-katli-914224.jpg"
    },
   {
        image_name: "Khakra",
        Image_url: "khata-meetha-673680.jpg"
   },
   {
        image_name: "Anjeer Burfi",
        Image_url: "white-burfi-210925.jpg"
   },
]

export const allProducts: Products[] = [
    {
        product_id: uuidV4(),
        product_name: "Kaju katli",
        seller_id: uuidV4(),
        price: 500,
        product_description: "Great Indian Kaju katli",
        approval_status: "pending",
        category: {
            name: "sweets",
            type: "other sweets"
        }
    },
    {
        product_id: uuidV4(),
        product_name: "Anjeer Burfi",
        seller_id: uuidV4(),
        price: 2000,
        product_description: "Organic Angeer Burfi",
        approval_status: "approved",
        category: {
            name: "sweets",
            type: "Barfi"
        }
    },
    {
        product_id: uuidV4(),
        product_name: "Khakra",
        seller_id: uuidV4(),
        price: 200,
        product_description: "Gujrati Khakra",
        approval_status: "rejected",
        category: {
            name: "savories",
            type: "Khakra"
        }
    },
    {
        product_id: uuidV4(),
        product_name: "Kaju katli1",
        seller_id: uuidV4(),
        price: 500,
        product_description: "Great Indian Kaju katli1",
        approval_status: "pending",
        category: {
            name: "sweets",
            type: "other sweets"
        }
    },
    {
        product_id: uuidV4(),
        product_name: "Anjeer Burfi1",
        seller_id: uuidV4(),
        price: 2000,
        product_description: "Organic Angeer Burfi1",
        approval_status: "approved",
        category: {
            name: "sweets",
            type: "Barfi"
        }
    },
    {
        product_id: uuidV4(),
        product_name: "Khakra1",
        seller_id: uuidV4(),
        price: 200,
        product_description: "Gujrati Khakra1",
        approval_status: "rejected",
        category: {
            name: "savories",
            type: "Khakra"
        }
    },
    {
        product_id: uuidV4(),
        product_name: "Kaju katli2",
        seller_id: uuidV4(),
        price: 500,
        product_description: "Great Indian Kaju katli2",
        approval_status: "pending",
        category: {
            name: "sweets",
            type: "other sweets"
        }
    },
    {
        product_id: uuidV4(),
        product_name: "Anjeer Burfi2",
        seller_id: uuidV4(),
        price: 2000,
        product_description: "Organic Angeer Burfi2",
        approval_status: "approved",
        category: {
            name: "sweets",
            type: "Barfi"
        }
    },
    {
        product_id: uuidV4(),
        product_name: "Khakra2",
        seller_id: uuidV4(),
        price: 200,
        product_description: "Gujrati Khakra2",
        approval_status: "rejected",
        category: {
            name: "savories",
            type: "Khakra"
        }
    },
    {
        product_id: uuidV4(),
        product_name: "Kaju katli3",
        seller_id: uuidV4(),
        price: 500,
        product_description: "Great Indian Kaju katli3",
        approval_status: "pending",
        category: {
            name: "sweets",
            type: "other sweets"
        }
    },
    {
        product_id: uuidV4(),
        product_name: "Anjeer Burfi3",
        seller_id: uuidV4(),
        price: 2000,
        product_description: "Organic Angeer Burfi3",
        approval_status: "approved",
        category: {
            name: "sweets",
            type: "Barfi"
        }
    },
    {
        product_id: uuidV4(),
        product_name: "Khakra3",
        seller_id: uuidV4(),
        price: 200,
        product_description: "Gujrati Khakra3",
        approval_status: "rejected",
        category: {
            name: "savories",
            type: "Khakra"
        }
    },
]

export const allSellers: Seller[] = [
    {
        sellerId: uuidV4(),
        userId: uuidV4(),
        businessName: "Parmaar Sweets",
        email: "parmaar@gmail.com",
        password: "the_Parmaar",
        storeAddress: "Laal Chowki, Dadar",
        phoneNumber: "9966336699",
        approval_status: "approved",
    },
    {
        sellerId: uuidV4(),
        userId: uuidV4(),
        businessName: "Chitale Bandhu",
        email: "chitale@gmail.com",
        password: "the_Chitale",
        storeAddress: "Somvaar peth, Pune",
        phoneNumber: "6565654578",
        approval_status: "pending",
    },
    {
        sellerId: uuidV4(),
        userId: uuidV4(),
        businessName: "Anand Sweets",
        email: "anand@gmail.com",
        password: "the_Anand",
        storeAddress: "Khopat, Thane",
        phoneNumber: "7874542369",
        approval_status: "rejected",
    },
]

export const allCustomers: Customer[] = [
    {
        customerId: uuidV4(),
        userId: uuidV4(),
        name: "Kajol",
        email: "kajol@gmail.com",
    },
    {
        customerId: uuidV4(),
        userId: uuidV4(),
        name: "Laxman",
        email: "laxman@gmail.com",
    },
    {
        customerId: uuidV4(),
        userId: uuidV4(),
        name: "Viraj",
        email: "viraj@gmail.com",
    }
]

export const allOrders:Order[] = [
    {
        orderId: uuidV4(),
        sellerId: uuidV4(),
        customerId: uuidV4(),
        order_date: new Date(),
        order_address: "Laxmi Nagar, Pune",
        payment_mode: "COD",
        status: "pending",
        estimate_delivery: new Date(),
        actual_delivery: new Date(),
        total_price: 600,
    },
    {
        orderId: uuidV4(),
        sellerId: uuidV4(),
        customerId: uuidV4(),
        order_date: new Date(),
        order_address: "Patel Road, Nagpur",
        payment_mode: "UPI",
        status: "delivered",
        estimate_delivery: new Date(),
        actual_delivery: new Date(),
        total_price: 600,
    },
    {
        orderId: uuidV4(),
        sellerId: uuidV4(),
        customerId: uuidV4(),
        order_date: new Date(),
        order_address: "Jadhav Society, Udaipur",
        payment_mode: "credit_card",
        status: "shipped",
        estimate_delivery: new Date(),
        actual_delivery: new Date(),
        total_price: 900,
    },
    {
        orderId: uuidV4(),
        sellerId: uuidV4(),
        customerId: uuidV4(),
        order_date: new Date(),
        order_address: "Geeta Chawl, Mumbai",
        payment_mode: 'debit_card',
        status: "pending",
        estimate_delivery: new Date(),
        actual_delivery: new Date(),
        total_price: 1200,
    },
]