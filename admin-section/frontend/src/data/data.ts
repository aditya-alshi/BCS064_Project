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
        const parsedresponse = await response.json()
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

export async function getProductById(productId: string) {
    try {
        const response = await fetch(`http://localhost:5005/shh-xxx-hss/admin/products/details/${productId}`)
        const parsedresponse = await response.json()
        if (parsedresponse.error) throw new Error(parsedresponse.error);
        return parsedresponse;
    } catch (error: unknown) {
        if (error instanceof Error) {
            return error.message
        }
        else return error
    }
}

export async function chageProductAprovalStatus({ productId, approvalStatus }: { productId: string, approvalStatus: string }) {

    const body = JSON.stringify({ productId, approvalStatus })
    try {
        const response = await fetch('http://localhost:5005/shh-xxx-hss/admin/products/chageApprovalStatus/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body

        })
        const parsedresponse = await response.json();
        if (parsedresponse.error) throw new Error("Something went wrong client-side-server-response-error");
        return parsedresponse
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
        else return error
    }
}