import AddToCart from "../buttons/AddToCart";
import { useState, useEffect } from "react";
import { FaRegStar, FaRegStarHalf, FaStar } from "react-icons/fa";
import Pagination from "../buttons/Pagination";


export default function Product() {
  const [images, setImages] = useState([
    {
      image_url: "k",
      product_id: 40,
      product_name: "sonpapdi2",
      product_description: null,
    },
  ]);

  useEffect(() => {
  
    async function fetchData() {
     
      const data = await fetch("http://localhost:5000/all-products");
      const result = await data.json();
      setImages(result);
    }
    fetchData();
  }, []);

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
        <p className=" text-berkeleyBlue">{imagepath.product_name}</p>
        <p className="flex w-1/2 gap-1">
            {[...Array(5)].map((start, index) => (
                <FaRegStar key={index} size={"20"} />
            ))}
        </p>
        <p>
            <span className="font-semibold">₹</span>
            <span className=" inline-block ml-1 text-4xl">{500}</span>
        </p>
        <AddToCart />
      </div>
    </div>
  ));

  return (
    <>
      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(min-content,20rem))] justify-items-center items-center justify-center  bg-background gap-3 p-2">
        {renderImages}
      </div>
    </>
  );
}
