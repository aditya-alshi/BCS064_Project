import { approval_status, rating_status } from "./otherTypes";

export type Review = {
    review_id: string;
    product_id: string;
    customer_id: string;
    seller_id: string;
    rating: rating_status
    comment: string;
    status: approval_status;
    created_at: Date;
}