import { useLoaderData, Form, useActionData } from "react-router-dom";
import { chageProductAprovalStatus, getProductById } from "../../../data/data";
import { ProductWithExtras } from "../../../types/productsTypes";

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    if(!formData) return "Invalid input"
    const data = {
        productId: formData.get("productId") as string || "", 
        approvalStatus: formData.get("approvalStatus") as string || ""
    }
    const response = await chageProductAprovalStatus(data)
    return response
}

export async function loader({ params }: { params: { product_id?: string } }) {
  if (!params.product_id) return "Invalid Id";
  const productDetails = await getProductById(params.product_id);
  return productDetails;
}
export default function ProductDetails() {
    const actionData = useActionData() as {
        message : string
    } | string
    if(actionData){

        console.log(actionData)
    }
  const response = useLoaderData() as ProductWithExtras | string;
  if (typeof response === "string") {
    return <h1>{response}</h1>;
  }

  return (
    <section>
      <img
        className="w-72"
        src={response.imageSignedUrl || ""}
        alt="product image"
      />
      <table>
        <tbody>
          <tr>
            <th>Product Id</th>
            <td>{response.product_id}</td>
          </tr>
          <tr>
            <th>Price</th>
            <td>{response.price}</td>
          </tr>
          <tr>
            <th>Aproval status</th>
            <td>
              {response.approval_status}
              <Form method="post">
                <select
                    required
                  className="border"
                  name="approvalStatus"
                  id="approvalStatus"
                  defaultValue={response.approval_status} // Use defaultValue for uncontrolled components
                >
                  <option value="" disabled>
                    Select approval status
                  </option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <input
                  readOnly
                  hidden
                  type="text"
                  name="productId"
                  value={response.product_id}
                />
                <button className="m-2 p-1 bg-accent text-white active:shadow-none shadow-md" type="submit">Submit Change</button>
              </Form>
            </td>
          </tr>
          <tr>
            <th>Product Name</th>
            <td>{response.product_name}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{response.product_description}</td>
          </tr>
          <tr>
            <th>Category name</th>
            <td>{response.category || ""}</td>
          </tr>
          <tr>
            <th>Category type</th>
            <td>{response.category_type || ""}</td>
          </tr>
          <tr>
            <th>Seller Id</th>
            <td>{response.seller_id}</td>
          </tr>
          <tr>
            <th>Seller Name</th>
            <td>{"Seller Name"}</td>
          </tr>
          {/* <tr>
                        <th>Price</th>
                        <td>{response.price}</td>
                    </tr> */}
        </tbody>
      </table>
      { actionData &&  typeof actionData !== 'string' && actionData.message }
      {actionData && typeof actionData === 'string' && actionData}
    </section>
  );
}
