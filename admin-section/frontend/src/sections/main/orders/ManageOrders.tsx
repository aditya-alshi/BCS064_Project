import { useLoaderData } from "react-router-dom";
import { getAllOrder } from "../../../data/manageOrderAPI";
import { Order } from "../../../types/ordersTypes";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const sPgNo = url.searchParams.get("pageNo");
  const pageNo = parseInt(!sPgNo || sPgNo === "0" ? "1" : sPgNo);
  const allOrders = await getAllOrder(pageNo);
  if (allOrders.error) return allOrders.error;
  return allOrders;
}

export default function ManageOrders() {
  const loaderData = useLoaderData() as
    | { allOrders: Order[]; pageNo: number; totalPages: number }
    | string;
  if (typeof loaderData === "string") return <h1>No Orders found</h1>;

  const renderOrders = loaderData.allOrders.map((order) => (
    <tr key={order.order_id}>
      <td className="border border-collapse border-gray-300 p-1 text-start">
        {order.order_id}
      </td>
      <td className="border border-collapse border-gray-300 p-1 text-start">
        {order.customer_id}
      </td>
      <td className="border border-collapse border-gray-300 p-1 text-start">
        {order.order_date.toLocaleString()}
      </td>
      <td className="border border-collapse border-gray-300 p-1 text-start">
        {order.total_amount}
      </td>
      <td className="border border-collapse border-gray-300 p-1 text-start">
        {order.payment_status}
      </td>
    </tr>
  ));

  return (
    <section className="w-[86%] m-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-collapse border-gray-300 p-1 text-center">
              Order Id
            </th>
            <th className="border border-collapse border-gray-300 p-1 text-center">
              Customer Id
            </th>
            <th className="border border-collapse border-gray-300 p-1 text-center">
              Order Date
            </th>
            <th className="border border-collapse border-gray-300 p-1 text-center">
              Price
            </th>
            <th className="border border-collapse border-gray-300 p-1 text-center">
              Payment Status
            </th>
          </tr>
        </thead>
        <tbody>{renderOrders}</tbody>
      </table>
    </section>
  );
}
