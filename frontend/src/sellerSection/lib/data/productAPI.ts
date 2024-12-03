import { domain } from "../../../lib/utils/domain";

export async function getAllProductsBySeller() {
    const jwtToken = JSON.parse(localStorage.getItem("jwtToken") || "");
    try {
        const response = await fetch(`${domain}/seller/products`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
        })
        const parsedResponse = await response.json();
        
        if(response.status === 401) return "You need to login first";
        if(response.status === 200) return parsedResponse;
        else throw new Error("Something went wrong")
    } catch(error) {
        if(error instanceof Error) {
            return error.message
        }
        return "Couldn't fetch Products"
    }
    
}