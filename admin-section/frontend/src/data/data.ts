import { Product } from "../types/productsTypes";
// import { fetchProductById, fetchProductsWithImages } from "./controllers/productsController";

const jwtToken = JSON.parse(localStorage.getItem("jwtToken") || "");
const headers = {
    Authorization: `Bearer ${jwtToken}`,
}

export async function getAllProducts() {
    const response = await fetch('http://localhost:5005/shh-xxx-hss/admin/all-products', {
        method: "GET",
        headers: headers
    });

    const parsedresponse =  await response.json()
    if(response.ok) {
        return parsedresponse
    }else {
        console.log(parsedresponse)
    }
}
// this is the mock app.get()
// export function getAllProducts(pageNo: number) {
//     return fetchProductsWithImages(pageNo)
// }

// export function getProductById(productId: string) {
//     try {
//         const result = fetchProductById(productId);
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