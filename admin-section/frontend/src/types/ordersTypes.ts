import { payment_status } from "./otherTypes";

export type Order = {
    order_id: string;
    customer_id: string;
    order_date: Date;
    payment_status: payment_status;
    total_amount: number;
}