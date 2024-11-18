export type Orders = {
    order_id : string;
    seller_id : string;
    customerId : string;
    productName : string;
    order_date: Date;
    order_address: string;
    payment_mode: "COD" | "debit_card" | "credit_card" | "upi";
    status: "pending" | "shipped" | "delivered";
    estimate_delivery: Date;
    actual_delivery: Date;
    total_price: number;
}