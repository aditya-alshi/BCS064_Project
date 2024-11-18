import { approval_status } from "./otherTypes";

export type Products = {
    product_id: string;
    product_name: string;
    seller_id: string;
    price: number;
    product_description: string;
    approval_status: approval_status;
    category: Category;
    product_image?: string;
}

type Category =  { name: "sweets"; type: "Barfi" | "Pedha" | "other sweets" }
| { name: "savories"; type: "Khakra" | "Kachori" | "Sev" };
