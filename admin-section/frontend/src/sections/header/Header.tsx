import { Link } from "react-router-dom"
export default function Header() {
    return (
        <header className=" border flex items-center p-2">
            <img className="w-[10rem]" src="main-logo.png" alt="main-logo" />
            <nav  className="w-full">
                <ul className="flex justify-around mr-auto ml-5 border">
                    <li className="
                        underline hover:no-underline
                    "><Link to={"/"}>Manage Products</Link></li>
                    <li className="
                        underline hover:no-underline
                    "><Link to={"/sellers"}>Manage Sellers</Link></li>
                    <li className="
                        underline hover:no-underline
                    "><Link to={"/customers"}>Manage Customers</Link></li>
                    <li className="
                        underline hover:no-underline
                    "><Link to={"/orders"}>Manage Orders</Link></li>
                </ul>
            </nav>
            <span>icon</span>
        </header>
    )
}