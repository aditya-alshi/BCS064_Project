export type Order = {
    orderId: string;
    sellerId: string;
    customerId: string;
    order_date: Date;
    order_address: string;
    payment_mode: payment_mode;
    status: order_status;
    estimate_delivery: Date;
    actual_delivery: Date;
    total_price: number;
}

type payment_mode = "COD" | "credit_card" | "debit_card" | "UPI"
type order_status = "pending" | "shipped" | "delivered"