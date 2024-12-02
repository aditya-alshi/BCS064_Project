import { Link, Form, useLoaderData } from "react-router-dom";
import { getAllProductsBySeller } from "./lib/data/productAPI";
import { sellerProducts } from "./lib/types/sellerProductTypes";

export async function loader() {
  const response = await getAllProductsBySeller();

  return response;
}

export default function ProductListing() {
  const loaderData = useLoaderData() as
    | {
        allProductByIdResults: sellerProducts[];
      }
    | string;

  if (typeof loaderData === "string")
    return (
      <h1 className="text-center text-red-500 font-bold text-lg">
        {" "}
        <Link
          to={"submitproudct"}
          className="inline-block px-6 py-2 bg-accent text-white font-medium rounded-md shadow-md hover:shadow-lg hover:bg-lighterAccent transition-transform transform hover:scale-105 mb-5"
        >
          Add New Product
        </Link>
      </h1>
    );

  const inventoryProducts = loaderData.allProductByIdResults;

  const renderProductListing = inventoryProducts.map((product, index) => (
    <tr
      key={index}
      className="hover:bg-yellow-100 transition-colors duration-200"
    >
      <td className="border border-gray-300 p-3 text-center">{index + 1}</td>
      <td className="border border-gray-300 p-3 text-center">
        <Link
          to={`product/${product.product_id}`}
          className="text-blue-600 underline hover:no-underline hover:text-blue-800 transition-colors"
        >
          {product.product_name}
        </Link>
      </td>
      <td
        className={`border border-gray-300 p-3 text-center ${
          product.approval_status === "approved"
            ? "text-green-600 font-semibold"
            : "text-red-600 font-semibold"
        }`}
      >
        {product.approval_status}
      </td>
      <td className="border border-gray-300 p-3 text-center">
        {product.category}
      </td>
      <td className="border border-gray-300 p-3 text-center">
        ₹{product.price}
      </td>
    </tr>
  ));

  return (
    <section className="w-[86%] mx-auto py-8">
      {/* Add New Product Button */}
      <Link
        to={"submitproudct"}
        className="inline-block px-6 py-2 bg-accent text-white font-medium rounded-md shadow-md hover:shadow-lg hover:bg-lighterAccent transition-transform transform hover:scale-105 mb-5"
      >
        Add New Product
      </Link>

      {/* Product Table */}
      <table className="w-full border-collapse border border-gray-300 shadow-md">
        <thead>
          <tr className="bg-accent text-white">
            <th className="border border-gray-300 p-3 text-center">Sr.</th>
            <th className="border border-gray-300 p-3 text-center">Title</th>
            <th className="border border-gray-300 p-3 text-center">
              Approval Status
            </th>
            <th className="border border-gray-300 p-3 text-center">Category</th>
            <th className="border border-gray-300 p-3 text-center">Price</th>
          </tr>
        </thead>
        <tbody>{renderProductListing}</tbody>
      </table>
    </section>
  );
}
