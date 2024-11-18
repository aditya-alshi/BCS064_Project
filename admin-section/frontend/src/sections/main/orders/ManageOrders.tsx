import { allOrders } from "../../../data/dummyDB"

export default function ManageOrders() {
    
    const renderOrders = allOrders.map(order => (
        <tr >
            <td className="border border-collapse border-gray-300 p-1 text-start">{order.orderId}</td>
            <td className="border border-collapse border-gray-300 p-1 text-start">{order.order_address}</td>
            <td className="border border-collapse border-gray-300 p-1 text-start">{order.payment_mode}</td>
            <td className="border border-collapse border-gray-300 p-1 text-start">{order.total_price}</td>
            <td className="border border-collapse border-gray-300 p-1 text-start">{order.status}</td>
        </tr>
    ))

    return (
        <section className="w-[86%] m-auto">
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-collapse border-gray-300 p-1 text-center">Order Id</th>
                        <th className="border border-collapse border-gray-300 p-1 text-center">Address</th>
                        <th className="border border-collapse border-gray-300 p-1 text-center">Payment mode</th>
                        <th className="border border-collapse border-gray-300 p-1 text-center">Price</th>
                        <th className="border border-collapse border-gray-300 p-1 text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    { renderOrders }
                </tbody>
            </table>
        </section>
    )
}