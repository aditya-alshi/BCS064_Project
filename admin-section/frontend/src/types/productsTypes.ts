import { approval_status } from "./otherTypes";

export type Product = {
    product_id: string;
    product_name: string;
    seller_id: string | null;
    // price: number;
    product_description: string;
    approval_status: approval_status;
    category: string;
    stock: number;
    created_at: Date;
    updated_at: Date;

    // product_image?: string;
}

type Category =  { name: "sweets"; type: "Barfi" | "Pedha" | "other sweets" }
| { name: "savories"; type: "Khakra" | "Kachori" | "Sev" };
