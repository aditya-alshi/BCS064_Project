import { CartItem } from "../types/cartTypes";
import { Customer } from "../types/customerTypes";

export async function registerCustomer(data: Record<string, FormDataEntryValue>) {
    const body = JSON.stringify(data)
    try {
        const response = await fetch(`http://13.234.75.74:3000/customer/regiter`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        })
        const parsedResponse = await response.json();
        if(response.status === 201) {
            return parsedResponse
        } else {
            return parsedResponse.error
        }

    } catch(error ) {
        return "Registration fail"
    }
}

export async function loginCustomer(formData: FormData) :Promise<{ error?: string; message?: string }> {
    try {
        const response = await fetch("http://13.234.75.74:3000/customer/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Ensure the server knows you're sending JSON
            },
            body: JSON.stringify({
                email: formData.get("email"),
                password: formData.get("password")
            })
        })
    
        const parsedResponse = await response.json();
        if(parsedResponse.error) {
            return {
                error: parsedResponse.error
            }
        }
        const jwtCustomerToken = parsedResponse.jwtCustomerToken
        localStorage.setItem('jwtCustomerToken', JSON.stringify(jwtCustomerToken))
        return {
            message: parsedResponse.message
        }
    } catch (error) {
        return {error: "Something went wrong"}
    }
    
}

