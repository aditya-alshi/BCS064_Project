import Pagination from "../../../components/pagination/Pagination";
import { getAllProducts } from "../../../data/data";

import { Link, useLoaderData, Form } from "react-router-dom";
import { Product } from "../../../types/productsTypes";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  switch (intent) {
    case "deleteProduct": {
      const productId = formData.get("productId");
      const response = await fetch(
        `http://localhost:5005/shh-xxx-hss/admin/products/delete/${productId}`,
        {
          method: "POST",
        }
      );
      const parsedResponse = await response.json();
      console.log(parsedResponse);
      return parsedResponse;
    }
  }
}

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const sPgNo = url.searchParams.get("pageNo");
  const pageNo = parseInt(!sPgNo || sPgNo === "0" ? "1" : sPgNo);
  const allProducts = await getAllProducts(pageNo);
  console.log(allProducts);
  if (allProducts.error) return allProducts.error;
  return allProducts;
}

export default function Products() {
  //
  const loaderData = useLoaderData() as
    | { allProducts: Product[]; pageNo: number; totalPages: number }
    | string;
  if (typeof loaderData === "string") return <h1>{loaderData}</h1>;
  const { allProducts, pageNo, totalPages } = loaderData;

  const renderAllProducts = allProducts.map((product) => (
    <tr key={product.product_id}>
      <td className="border border-gray-300 p-1 text-start underline hover:no-underline">
        <Link className=" " to={`product/${product.product_id}`}>
          {product.product_name}
        </Link>
      </td>
      <td className="border border-gray-300 p-1 text-start ">
        {product.category}
      </td>
      <td className="border border-gray-300 p-1 text-start ">
        {product.approval_status}
      </td>
      <td className="border border-gray-300 p-1 text-center ">
        <Form method="post">
          <input
            readOnly
            hidden
            type="text"
            name="productId"
            value={product.product_id}
          />
          <button
            name="intent"
            value={"deleteProduct"}
            className=" shadow-md active:shadow-none w-[70%] bg-lighterAccent text-white rounded p-1"
          >
            Delete
          </button>
        </Form>
      </td>
    </tr>
  ));

  return (
    <section className="w-[86%] m-auto ">
      <table className="min-h-[75vh] w-full border border-collapse border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-1 text-center ">
              Product Name
            </th>
            <th className="border border-gray-300 p-1 text-center ">
              Category
            </th>
            <th className="border border-gray-300 p-1 text-center ">
              Approval Status
            </th>
            <th className="border border-gray-300 p-1 text-center "></th>
          </tr>
        </thead>
        <tbody>{renderAllProducts}</tbody>
      </table>
      <Pagination routeName={""} totalPages={totalPages} pageNo={pageNo} />
    </section>
  );
}
