import { inventoryProducts } from "./lib/data"
import { Link } from "react-router-dom"

export default function ProductListing(){
    
    const renderProductListing = inventoryProducts.map((product, index) => (
        <tr key={index}>
            <td className="border border-gray-300 p-1 text-center">{index + 1}</td>
            <td className="border border-gray-300 p-1 text-center underline hover:no-underline"><Link to={`product/${product.product_id}`}>{product.productName}</Link></td>
            <td className="border border-gray-300 p-1 text-center">{product.approvalStatus}</td>
            <td className="border border-gray-300 p-1 text-center">{product.category.type}</td>
            <td className="border border-gray-300 p-1 text-center">{product.price}</td>
        </tr>
    ))

    return (
        <section className="w-[86%] m-auto">
             <table className="w-full border-collapse border border-gray-300">
        <thead>
            <tr className="bg-gray-100">
                <th className="border border-gray-300 p-1 text-center">Sr.</th>
                <th className="border border-gray-300 p-1 text-center">Title</th>
                <th className="border border-gray-300 p-1 text-center">Approval status</th>
                <th className="border border-gray-300 p-1 text-center">Category</th>
                <th className="border border-gray-300 p-1 text-center">Price</th>
            </tr>
        </thead>
        <tbody>
            {/* <tr>
                <td className="border border-gray-300 p-1 text-center">1</td>
                <td className="border border-gray-300 p-1 text-center">Sample Title</td>
                <td className="border border-gray-300 p-1 text-center">Approved</td>
                <td className="border border-gray-300 p-1 text-center">Category A</td>
                <td className="border border-gray-300 p-1 text-center">₹500.00</td>
            </tr> */}
            {renderProductListing}
        </tbody>
    </table>
        </section>
    )
}