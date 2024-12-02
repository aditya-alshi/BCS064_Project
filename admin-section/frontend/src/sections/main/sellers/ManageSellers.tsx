import { useLoaderData } from "react-router-dom";
import { getAllSellers } from "../../../data/manageSellerAPI";
import { Seller } from "../../../types/sellersTypes";
import Pagination from "../../../components/pagination/Pagination";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const sPgNo = url.searchParams.get("pageNo");
  const pageNo = parseInt(!sPgNo || sPgNo === "0" ? "1" : sPgNo);
  const allSeller = await getAllSellers(pageNo);
  if (allSeller.error) return allSeller.error;
  return allSeller;
}

export default function ManageSellers() {
  const loaderData = useLoaderData() as
    | { allSellers: Seller[]; pageNo: number; totalPages: number }
    | string;
  if (typeof loaderData === "string") return <h1>No sellers found</h1>;

  const renderSellers = loaderData.allSellers.map((seller) => (
    <tr key={seller.seller_id} className="text-start p-1">
      <td className="border border-collapse border-gray-300 p-1">
        {seller.bussiness_name}
      </td>
      <td className="border border-collapse border-gray-300 p-1">
        {seller.approval_status}
      </td>
    </tr>
  ));

  return (
    <section className=" w-[86%] m-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 text-center p-1">
            <th className="border border-collapse border-gray-300 p-1">
              Business Name
            </th>

            <th className="border border-collapse border-gray-300 p-1">
              Approval Status
            </th>
          </tr>
        </thead>
        <tbody>{renderSellers}</tbody>
      </table>
      <Pagination
        routeName={"/sellers"}
        pageNo={loaderData.pageNo}
        totalPages={loaderData.totalPages}
      />
    </section>
  );
}
