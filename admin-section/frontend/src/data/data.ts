import { Product } from "../types/productsTypes";
// import { fetchProductById, fetchProductsWithImages } from "./controllers/productsController";

// const jwtToken = JSON.parse(localStorage.getItem("jwtToken") || "");
const headers = {
    // Authorization: `Bearer ${jwtToken}`,
}

export async function getAllProducts(pageNo: number) {
    console.log(pageNo)
    try {
        const response = await fetch(`http://localhost:5005/shh-xxx-hss/admin/all-products/${pageNo}`, {
            method: "GET",
            // headers: headers
        });
        const parsedresponse =  await response.json() 
        return parsedresponse
    } catch (error) {
        return {
            error: "Something went wrong client-side-server-response-error"
        }
    }
}
// this is the mock app.get()
// export function getAllProducts(pageNo: number) {
//     return fetchProductsWithImages(pageNo)
// }

// export function getProductById(productId: string) {
//     try {
//         const response = f
//         if(result instanceof Error) throw Error
//         return result;
//     } catch (error: unknown) {
//         if(error instanceof Error) {
//             return { error: error.message}
//         }
//         else return {
//             error: "Unknow error occured"
//         }
//     }
// }