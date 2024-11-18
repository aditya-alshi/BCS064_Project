import { Products } from "../types/productsTypes";
import { fetchProductById, fetchProductsWithImages } from "./controllers/productsController";

// this is the mock app.get()
export function getAllProducts(pageNo: number) {
    return fetchProductsWithImages(pageNo)
}

export function getProductById(productId: string) {
    try {
        const result = fetchProductById(productId);
        if(result instanceof Error) throw Error
        return result;
    } catch (error: unknown) {
        if(error instanceof Error) {
            return { error: error.message}
        }
        else return {
            error: "Unknow error occured"
        }
    }
}