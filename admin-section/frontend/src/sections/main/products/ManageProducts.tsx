import { useEffect, useState } from "react"
import Pagination from "../../../components/pagination/Pagination"
// import { allProducts } from "../../../data/dummyDB"
import { v4 as uuidV4 } from "uuid"
import { getAllProducts } from "../../../data/data"

import { Link } from "react-router-dom"

export default function Products() {

    const [allProducts, setAllProducts] = useState([{
        product_id: uuidV4(),
        product_name: "Kaju katli",
        seller_id: uuidV4(),
        price: 500,
        product_description: "Great Indian Kaju katli",
        approval_status: "pending",
        category: {
            name: "sweets",
            type: "other sweets"
        },
        product_image: ""
    }])
    
    const [pageNo, setPageNo] = useState(1)

    function handlePageNo(pageNumber: number) {
        setPageNo(pageNumber)
    }

    useEffect(() => {
        const updateAllProducts = async () => {
            const result = getAllProducts(pageNo);
            // if(!result.error)
            setAllProducts(result);
        }
        updateAllProducts();
    }, [pageNo])

    const renderAllProducts = allProducts.map(product => (
        <tr key={product.product_id}>
            <td className="border border-gray-300 p-1 text-start flex underline hover:no-underline">
                <img className="w-5 h-5 mr-2" src={product.product_image} alt="" />
                <Link to={`/product/${product.product_id}`}>
                    {product.product_name}  
                </Link>
            </td>
            <td className="border border-gray-300 p-1 text-start ">{product.category.type}</td>
            <td className="border border-gray-300 p-1 text-start ">{product.approval_status}</td>
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