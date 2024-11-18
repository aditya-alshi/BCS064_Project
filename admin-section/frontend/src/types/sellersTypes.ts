import { approval_status } from "./otherTypes";

export type Seller = {
    sellerId: string;
    userId: string;
    businessName: string;
    email: string;
    password: string;
    storeAddress: string;
    phoneNumber: string;
    approval_status: approval_status;
}