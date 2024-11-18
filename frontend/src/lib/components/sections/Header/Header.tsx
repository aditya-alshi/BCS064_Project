import { useState } from "react";
import { availableSavories, availableSweets } from "../../../data/filterData";
import Filter from "../Filters";
import { Search } from "../Header/Search";

export default function Header() {
  const [drop, setDrop] = useState({
    sweets: false,
    savories: false,
    search: false
  });

  const renderSweets = availableSweets.map((sweet, index) => (
    <li key={index} className="filters w-full mt-1 ">
      <label htmlFor={sweet} className="flex  gap-2 items-center select-none">
        <input
          type="checkbox"
          name={sweet}
          id={sweet}
          value={sweet}
          className="
            
            shrink-0
            appearance-none w-6 h-6 border-2 rounded-md  checked:bg-citron 
            focus:outline-none
            disabled:border-gray-600 disabled:bg-gray-600
            "
        />
        {sweet}
      </label>
    </li>
  ));

  const renderSavories = availableSavories.map((savroy, index) => (
    <li key={index} className="filters  mx-1 mt-1">
      <label
        htmlFor={savroy}
        className="flex w-full gap-2 items-center select-none"
      >
        <input
          type="checkbox"
          name={savroy}
          id={savroy}
          value={savroy}
          className="
          shrink-0
          appearance-none w-6 h-6 border-2 rounded-md  checked:bg-citron 
          focus:outline-none
          disabled:border-gray-600 disabled:bg-gray-600
          "
        />
        {savroy}
      </label>
    </li>
  ));
  return (
    <header className="select-none flex justify-between bg-berkeleyBlue py-2 bg-white">
      <section className="ml-4">
        <img src="main-logo.png" alt="" className="w-[11rem]" />
      </section>
      { drop.search && <Search /> }
      <section className="text-xl min-w-[20rem]  flex justify-around items-center">
        <span
          onClick={() =>
            setDrop((drop) => ({
              ...drop,
              savories: false,
              sweets: !drop.sweets,
            }))
          }
          className="underline cursor-pointer hover:no-underline relative"
        >
          Sweets
          <section
            className={` bg-white p-3 border rounded-sm min-w-[15rem] absolute left-[-1rem] ${
              !drop.sweets ? "hidden" : ""
            }`}
          >
            <div className="mb-4 text-indigoDye">All Sweets</div>
            <ul>{renderSweets}</ul>
          </section>
        </span>
        <span
          onClick={() =>
            setDrop((drop) => ({
              ...drop,
              sweets: false,
              savories: !drop.savories,
            }))
          }
          className="underline cursor-pointer hover:no-underline relative"
        >
          Savories
          <section
            className={`bg-white p-3 border rounded-sm min-w-[15rem] absolute left-[-1rem] ${
              !drop.savories ? "hidden" : ""
            }`}
          >
            <div className="mb-4 text-indigoDye">All Savories</div>
            <ul>{renderSavories}</ul>
          </section>
        </span>
      </section>
      <section className="flex gap-[1rem] items-center justify-end mr-[5rem]">
        <svg
          className="w-[1.7rem] inline-block text-yellowish"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
          />
        </svg>
        <svg
          className="w-[1.7rem] text-yellowish"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="currentColor"
            d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
          />
        </svg>
        <svg
          className="w-[1.4rem] text-yellowish"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
          />
        </svg>
      </section>
    </header>
  );
}
