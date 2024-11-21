import { useEffect, useState } from "react"
import Pagination from "../../../components/pagination/Pagination"
import { v4 as uuidV4 } from "uuid"
import { getAllProducts } from "../../../data/data"

import { Link, Params, useLoaderData, Form } from "react-router-dom"
import { Product } from "../../../types/productsTypes"

export async function action({ request } : { request: Request }) {
    const formData = await request.formData();
    const productId = formData.get('productId');
    const response = await fetch(`http://localhost:5005/shh-xxx-hss/admin/products/delete/${productId}`, {
        method: "POST"
    })
    const parsedResponse = await response.json();
    console.log(parsedResponse)
    return parsedResponse;
}


export async function loader() {
    const allProducts =  await getAllProducts();
    return allProducts
}

export default function Products() {


    const {allProducts} = (useLoaderData() as {allProducts: Product[]}) || {allProducts: [{
        product_id: "dummy text",
        product_name: "dummy text",
        seller_id: "dummy text" ,
        product_description: "dummy text",
        approval_status: "pending",
        category: "dummy text",
        stock: 12,
        created_at: new Date(),
        updated_at: new Date(),
    }]};
    
    const [pageNo, setPageNo] = useState(1)

    function handlePageNo(pageNumber: number) {
        setPageNo(pageNumber)
    }

    // useEffect(() => {
    //     const updateAllProducts = async () => {
    //         const result = getAllProducts(pageNo);
    //         // if(!result.error)
    //         setAllProducts(result);
    //     }
    //     updateAllProducts();
    // }, [pageNo])

    const renderAllProducts = allProducts.map(product => (
        <tr key={product.product_id}>
            <td className="border border-gray-300 p-1 text-start underline hover:no-underline">
                <Link className=" " to={`/product/${product.product_id}`}>
                    {product.product_name}  
                </Link>
            </td>
            <td className="border border-gray-300 p-1 text-start ">{product.category}</td>
            <td className="border border-gray-300 p-1 text-start ">{product.approval_status}</td>
            <td className="border border-gray-300 p-1 text-center ">
                <Form method="post">
                    <input readOnly hidden type="text" name="productId" value={product.product_id}/>
                    <button className=" shadow-md active:shadow-none w-[70%] bg-lighterAccent text-white rounded p-1" >Delete</button>
                </Form>
            </td>
        </tr>
    ))

    return (
        <section className="w-[86%] m-auto ">
            <table className="w-full border border-collapse border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-1 text-center ">Product Name</th>
                        <th className="border border-gray-300 p-1 text-center ">Category</th>
                        <th className="border border-gray-300 p-1 text-center ">Approval Status</th>
                        <th className="border border-gray-300 p-1 text-center "></th>
                    </tr>
                </thead>
                <tbody>
                    { renderAllProducts }
                </tbody>
            </table>
            <Pagination handlePageNo={(e: number) => handlePageNo(e)} pageNo={pageNo}/>
        </section>
    )
}