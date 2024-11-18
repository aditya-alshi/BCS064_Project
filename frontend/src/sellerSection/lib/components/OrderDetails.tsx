import { orderList } from "../data";
import { Orders } from "../types/orderTypes";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }: { params: { orderId?: string } }) {
    const orderDetail = await (async () => {
        const targetOrder = orderList.find(order => order.order_id === params.orderId)
        return targetOrder || "Order Not found"
    })()
    return orderDetail
}

export default function OrderDetails() {
    const orderDetail: Orders|string = useLoaderData() as Orders | string;

  return <section>
    {typeof orderDetail !== "string" && <table>
        <tbody>

            <tr>
                <th className="border border-gray-300 p-1 text-center">Id</th>
                <td className="border border-gray-300 pl-5 p-1">{orderDetail.order_id}</td>
            </tr>
            <tr>
                <th className="border border-gray-300 p-1 text-center">Date</th>
                <td className="border border-gray-300 pl-5 p-1">{orderDetail.order_date.toLocaleString()}</td>
            </tr>
            <tr>
                <th className="border border-gray-300 p-1 text-center">Price</th>
                <td className="border border-gray-300 pl-5 p-1">{orderDetail.order_date.toLocaleString()}</td>
            </tr>
            <tr>
                <th className="border border-gray-300 p-1 text-center">Customer Id</th>
                <td className="border border-gray-300 pl-5 p-1">{orderDetail.customerId}</td>
            </tr>
            <tr>
                <th className="border border-gray-300 p-1 text-center">Product Name</th>
                <td className="border border-gray-300 pl-5 p-1">{orderDetail.productName}</td>
            </tr>
            <tr>
                <th className="border border-gray-300 p-1 text-center">Customer Address</th>
                <td className="border border-gray-300 pl-5 p-1">{orderDetail.order_address}</td>
            </tr>
            <tr>
                <th className="border border-gray-300 p-1 text-center">Payment mode</th>
                <td className="border border-gray-300 pl-5 p-1">{orderDetail.payment_mode}</td>
            </tr>
            <tr>
                <th className="border border-gray-300 p-1 text-center">Status</th>
                <td className="border border-gray-300 pl-5 p-1">{orderDetail.status}</td>
            </tr>
        </tbody>
    </table>}
  </section>;
}
