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
    

    // product_image?: string;
}

export interface ProductWithExtras extends Product {
    imageSignedUrl: string;
    created_at: Date;
    updated_at: Date;
    price: number | string,
    category_type : string
  }

type Category =  { name: "sweets"; type: "Barfi" | "Pedha" | "other sweets" }
| { name: "savories"; type: "Khakra" | "Kachori" | "Sev" };
