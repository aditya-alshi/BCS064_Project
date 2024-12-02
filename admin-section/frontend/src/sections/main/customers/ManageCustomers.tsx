// import { allCustomers } from "../../../data/dummyDB"

import { useLoaderData } from "react-router-dom";
import { getAllCustomer } from "../../../data/manageCustomerAPI";
import { Customer } from "../../../types/customersTypes";
import Pagination from "../../../components/pagination/Pagination";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const sPgNo = url.searchParams.get("pageNo");
  const pageNo = parseInt(!sPgNo || sPgNo === "0" ? "1" : sPgNo);
  const allCustomers = await getAllCustomer(pageNo);
  if (allCustomers.error) return allCustomers.error;
  return allCustomers;
}

export default function ManageCustomers() {
  const loaderData = useLoaderData() as
    | { allCustomer: Customer[]; pageNo: number; totalPages: number }
    | string;
  if (typeof loaderData === "string") return <h1>No customers found</h1>;

  const renderCustomers = loaderData.allCustomer.map((customer) => (
    <tr className="text-start" key={customer.customer_id}>
      <td className="border border-collapse border-gray-300 p-1">
        {customer.customer_name}
      </td>
      <td className="border border-collapse border-gray-300 p-1">
        {customer.phone_number}
      </td>
    </tr>
  ));

  return (
    <section className="w-[86%] m-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr className="text-center">
            <th className="border border-collapse border-gray-300 p-1">Name</th>
            <th className="border border-collapse border-gray-300 p-1">
              Phone
            </th>
          </tr>
        </thead>
        <tbody>{renderCustomers}</tbody>
      </table>
      <Pagination
        routeName={"/customers"}
        pageNo={loaderData.pageNo}
        totalPages={loaderData.totalPages}
      />
    </section>
  );
}
