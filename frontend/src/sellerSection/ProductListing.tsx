import { inventoryProducts } from "./lib/data";
import { Link, Form } from "react-router-dom";

export async function action() {
  const jwtToken = JSON.parse(localStorage.getItem("jwtToken") || "");
  const response = await fetch("http://localhost:5000/joker/token", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  const parsedResponse = await response.json();
  console.log(parsedResponse);
  return parsedResponse;
}

export default function ProductListing() {
  const renderProductListing = inventoryProducts.map((product, index) => (
    <tr key={index}>
      <td className="border border-gray-300 p-1 text-center">{index + 1}</td>
      <td className="border border-gray-300 p-1 text-center underline hover:no-underline">
        <Link to={`product/${product.product_id}`}>{product.productName}</Link>
      </td>
      <td className="border border-gray-300 p-1 text-center">
        {product.approvalStatus}
      </td>
      <td className="border border-gray-300 p-1 text-center">
        {product.category.type}
      </td>
      <td className="border border-gray-300 p-1 text-center">
        {product.price}
      </td>
    </tr>
  ));

  return (
    <section className="w-[86%] m-auto">
      <Link className=" w-fit block p-2 border border-accent shadow hover:shadow-none" to={"submitproudct"}>
        Add new Product
      </Link>
      <table className="mt-5 w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-1 text-center">Sr.</th>
            <th className="border border-gray-300 p-1 text-center">Title</th>
            <th className="border border-gray-300 p-1 text-center">
              Approval status
            </th>
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
  );
}
