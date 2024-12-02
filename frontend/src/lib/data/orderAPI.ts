import { CartItem } from "../types/cartTypes";

export async function proceedToCheckOut(payload : { cart: CartItem[], totalAmount: number }) {
    try {

        const jwtCustomerToken = JSON.parse(localStorage.getItem('jwtCustomerToken') || "")
        const body = JSON.stringify(payload)
        const response = await fetch(`http://13.234.75.74:3000/order/checkout`, {
            method: 'POST',
            headers : {
                'Content-Type' : "application/json",
                Authorization: `Bearer ${jwtCustomerToken}`,
            },
            body: body
        })
    

        const parsedResponse = await response.json();
        console.log("proceeToCheckout parsed response", parsedResponse)
        if(response.status === 201) {
            return parsedResponse
        } else {
            return parsedResponse.error
        }

    } catch(error ) {
        return "Order fail"
    }
    
}