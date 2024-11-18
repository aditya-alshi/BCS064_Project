import { Link } from "react-router-dom";
export default function Header() {
    return (
        <section>
            <header className="flex justify-around py-3">
        <img className="w-[10rem]" src="/main-logo.png" alt="main logo" />
        <nav>
          <ul className=" w-[25rem] flex border justify-evenly">
            <li>
              <Link replace to={"/panel/seller/"}>
                <span>Products Listing</span>
              </Link>
            </li>
            <li>
              <Link replace to={"/panel/seller/orders"}>
                <span>Orders</span>
              </Link>
            </li>
            <li>
              <Link replace to={"/panel/seller/reviews"}>
                <span>Reviews</span>
              </Link>
            </li>
          </ul>
        </nav>
        <Link to={"/panel/seller/profile"}>
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
        </Link>
      </header>
        </section>
    )
}