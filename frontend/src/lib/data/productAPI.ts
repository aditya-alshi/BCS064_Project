import { domain } from "../utils/domain";

export async function getProductById(productId: string) {
    try{
        const response = await fetch(`${domain}/product/detail/${productId}`)
        const parsedResponse = await response.json();
        if(parsedResponse.error) {
            throw new Error(parsedResponse.error)
        }
        return parsedResponse;

    } catch (error){
        if(error instanceof Error) {
            return error.message
        }
        return "Something went wrong"
    }
}

export async function getAllProducts(pageNo: number) {
    try{

        const response = await fetch(`${domain}/all-products/${pageNo}`)
        const parsedResponse = await response.json();
        
        if(parsedResponse.error) {
            throw new Error(parsedResponse.error)
        }
        return parsedResponse;

    } catch (error) {
        if(error instanceof Error) {
            return "Soemthing went wrong: " + error.message
        }
        return "Something went wrong"
    }
}

