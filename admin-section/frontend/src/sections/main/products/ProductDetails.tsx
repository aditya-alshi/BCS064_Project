import { useLoaderData } from "react-router-dom";
import { getProductById } from "../../../data/data";
import { Products } from "../../../types/productsTypes";

export async function loader({ params }: { params:{ product_id?: string } }) {
    
    const productDetails = await (async () => {
            if(!params.product_id) return "Invalid Id"
            const response = getProductById(params.product_id)
            return response;
        })();
        return productDetails
}
export default function ProductDetails() {

    const response = useLoaderData() as Products | string;
    if(typeof response === "string") {
        return <h1>{response}</h1>
    }

    return (
        <section>
            <img className="w-16" src={response.product_image || ""} alt="product image" />
            <table>
                <tbody>
                    <tr>
                        <th>Product Id</th>
                        <td>{response.product_id}</td>
                    </tr>
                    <tr>
                        <th>Aproval status</th>
                        <td>{response.approval_status}</td>
                    </tr>
                    <tr>
                        <th>Product Name</th>
                        <td>{response.product_name}</td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td>{response.product_description}</td>
                    </tr>
                    <tr>
                        <th>Category name</th>
                        <td>{response.category.name}</td>
                    </tr>
                    <tr>
                        <th>Category type</th>
                        <td>{response.category.type}</td>
                    </tr>
                    <tr>
                        <th>Seller Id</th>
                        <td>{response.seller_id}</td>
                    </tr>
                    <tr>
                        <th>Seller Name</th>
                        <td>{"Seller Name"}</td>
                    </tr>
                    <tr>
                        <th>Price</th>
                        <td>{response.price}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}