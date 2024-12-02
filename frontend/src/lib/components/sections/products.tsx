import AddToCart from "../buttons/AddToCart";

import { FaRegStar, FaRegStarHalf, FaStar } from "react-icons/fa";
import Pagination from "../pagination/Pagination";
import { Link, useLoaderData } from "react-router-dom";
import { getAllProducts } from "../../data/productAPI";
import { productWithImage } from "../../types/customerProductTypes";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const pageNo = parseInt(url.searchParams.get("pageNo") || "1");
  const response = await getAllProducts(pageNo);
  return response;
}

export default function Product() {
  const loaderActionData = useLoaderData() as
    | {
        totalPages: number;
        pageNo: number;
        withSignedImages: productWithImage[];
      }
    | string;

  if (typeof loaderActionData === "string") {
    return <p>{loaderActionData}</p>;
  }

  const images = loaderActionData.withSignedImages;

  const renderImages = images.map((imagepath) => (
    <div key={imagepath.product_id} className="w-[20rem]  border bg-white  p-3">
      <div className="h-64">
        <img
          className=" bg-white w-full h-full rounded-xl object-cover border"
          src={imagepath.image_url}
          alt={"test" + imagepath}
        />
      </div>
      <div className=" *:mt-2">
        <Link
          to={`details?productId=${imagepath.product_id}`}
          className=" text-berkeleyBlue cursor-pointer"
        >
          {imagepath.product_name}
        </Link>
        <p className="flex w-1/2 gap-1">
          {[...Array(5)].map((start, index) => (
            <FaRegStar key={index} size={"20"} />
          ))}
        </p>
        <p>
          <span className="font-semibold">₹</span>
          <span className=" inline-block ml-1 text-4xl">{imagepath.price}</span>
        </p>
        <AddToCart
          productId={imagepath.product_id}
          sellerId={imagepath.seller_id}
          name={imagepath.product_name}
          price={imagepath.price}
          quantity={1}
        />
      </div>
    </div>
  ));

  return (
    <>
      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(min-content,20rem))] justify-items-center items-center justify-center  bg-background gap-3 p-2">
        {renderImages}
      </div>
      <Pagination
        totalPages={loaderActionData.totalPages || 1}
        pageNo={loaderActionData.pageNo || 1}
      />
    </>
  );
}
