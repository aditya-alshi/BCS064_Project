import { approval_status } from "./otherTypes";

export type Seller = {
    seller_id: string;
    registered_user_id:  string; 
    bussiness_name: string;
    phone_number:string;
    approval_status: approval_status;
    
}