import { Inventory } from "../types/sellerTypes"

import { useLoaderData } from "react-router-dom"

export async function loader({params} : {params: {productId?: string}}) {
    // const product = await (async () => {
    //     const targetProduct = inventoryProducts.find(product => product.product_id === params.productId )
    //     return targetProduct ? targetProduct : "Not found"
    // })()

    return "product" ;
}

export default function ProductDetails() {

    const targetProduct: Inventory | string = useLoaderData() as (Inventory | string);
    return (
        <section>
            <div>{typeof targetProduct !== "string" ? targetProduct.productDescription : "No product Found"}</div>
        </section>
    )
}