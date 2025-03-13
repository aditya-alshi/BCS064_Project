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
            return "Something went wrong: AWS alshiaditya55 account was suspended due to non-payment of outstanding balance due on your account, you can pay now using the Payments to reactivate your account. If you do not pay or provide a payment method to resolve your outstanding balance, your account resources may be terminated. " + error.message
        }
        return "Something went wrong"
    }
}

