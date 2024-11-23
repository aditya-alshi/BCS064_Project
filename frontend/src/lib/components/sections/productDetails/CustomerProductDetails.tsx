import { useLoaderData } from "react-router-dom";
import { getProductById } from "../../../data/productAPI";
import { CompleteProductDetails } from "../../../types/customerProductTypes";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const productId = url.searchParams.get("productId");
  console.log("Product Id from loader customer details", productId)
  const reponse = await getProductById(productId || "")
  console.log(reponse)
  return reponse
}

export default function CustomerProductDetails() {

    const loaderData = useLoaderData() as {completeProductDetails: CompleteProductDetails} | string;
    if(typeof loaderData === "string") {
        return <p>{loaderData}</p>
    }

    const productDetails = loaderData.completeProductDetails;

  return (
    <section className=" w-full h-[100vh] flex gap-2 p-5">
      <div className=" flex-1">
        <div className="h-1/2 ">
          <img
            className=" bg-white m-auto h-full rounded-xl object-cover border"
            src={productDetails.signerUrl}
            alt={productDetails.productName + " Image"}
          />
        </div>
        <div className="bg-background">
          <table className="text-left ">
            <tbody>
              <tr>
                <th>Seller Name:</th>
                <td>{productDetails.businessName}</td>
              </tr>
              <tr>
                <th>Store location:</th>
                <td>{productDetails.city}</td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
      <div className=" flex-1 flex flex-col gap-2">
        <div className="bg-background flex-1">
          <table className="text-left ">
            <tbody>
                <tr>
                    <td>{productDetails.productName}</td>
                </tr>
                <tr>
                    <td>{productDetails.productDescription}</td>
                </tr>
                <tr>
                    <td>{productDetails.price}</td>
                </tr>
                <tr>
                    <td>{productDetails.categoryType.toUpperCase()}</td>
                </tr>
                <tr>
                    <td>{productDetails.category.toUpperCase()}</td>
                </tr>
            </tbody>
          </table>
        </div> 
        <div className="flex-1 bg-background">
            <button className="border m-2 p-2 bg-accent text-white shadow-md active:shadow-none">Reviews</button>
            <button className="border p-2  bg-accent text-white shadow-md active:shadow-none">Checkout</button>
        </div>
      </div>
    </section>
  );
}
