
import { Products } from "../../types/productsTypes";
import { getProductById } from "../data";
import { ProductModel } from "../models/productModel";

export function fetchProductsWithImages(pageNo: number) {
    // will check for errors and send the result to the main get logic(app.get() basically)
    const result = ProductModel.allProduct_including_images(pageNo)
    return result
    // try{
    // } catch(error) {
    //     return {
    //         error
    //     }
    // }
}

export function fetchProductById(productId: string) {
    const result = ProductModel.product_by_id(productId);
    return result;
}