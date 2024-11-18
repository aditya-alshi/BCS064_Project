import { orderList } from "./lib/data"
import { Link } from "react-router-dom"

export default function Orders() {

    const renderOrderList = orderList.map((order, index) => (
        <tr key={index}>
            <td className="border border-gray-300 p-1 ">{index + 1}</td>
            <td className="border border-gray-300 p-1 underline hover:no-underline cursor-pointer truncate" >{order.order_id}</td>
            <td className="border border-gray-300 p-1 underline hover:no-underline cursor-pointer"><Link to={`${order.order_id}`}>{order.productName}</Link></td>
            <td className="border border-gray-300 p-1 ">{order.status}</td>
            <td className="border border-gray-300 p-1 ">{order.order_date.toLocaleDateString()}</td>
            <td className="border border-gray-300 p-1 ">₹{order.total_price}</td>
        </tr>
    ))

    return (
        <section className="w-[86%] m-auto">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-1 text-center">Sr.</th>
                        <th className="border border-gray-300 p-1 text-center">Order Id</th>
                        <th className="border border-gray-300 p-1 text-center">Product Name</th>
                        <th className="border border-gray-300 p-1 text-center">Order status</th>
                        <th className="border border-gray-300 p-1 text-center">Order date</th>
                        <th className="border border-gray-300 p-1 text-center">Order price</th>
                    </tr>
                </thead>
                <tbody>
                    { renderOrderList }
                </tbody>
            </table>
        </section>
    )
}