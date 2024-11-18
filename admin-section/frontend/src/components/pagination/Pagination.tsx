import { useState } from "react";

export default function Pagination({handlePageNo, pageNo}: {
  handlePageNo: (e: number) => void,
  pageNo: number
}) {
  

  const renderPages = [...Array(4)].map((page, index) => (
    <li
      key={index + 1}
      className={`m-1 hover:scale-125 cursor-pointer  ${
        pageNo === index + 1 ? "text-accent underline" : ""
      }`}
      onClick={() => handlePageNo(index+1)}
    >
      {index + 1}
    </li>
  ));
  return (
    <nav className="">
      <ul className="flex gap-4 justify-center">
        <button
          onClick={() => handlePageNo(pageNo - 1)}
          disabled={pageNo === 1}
          type="button"
          className="inline-block hover:scale-125 cursor-pointer active:font-extrabold"
        >
          {"<"}
        </button>
        {renderPages}
        <button
          onClick={() => {
            console.log("Next clicked");
            handlePageNo(pageNo + 1)
          }}
          disabled={pageNo === 4}
          type="button"
          className="inline-block hover:scale-125 cursor-pointer active:font-extrabold"
        >
          {">"}
        </button>
      </ul>
    </nav>
  );
}
