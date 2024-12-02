import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b-2 bg-background flex items-center p-4 shadow-md">
      <img className="w-40 h-auto" src="admin-main-logo.png" alt="Main Logo" />

      <nav className="w-full">
        <ul className="flex justify-around ml-8">
          <li>
            <Link
              to="/admin/main"
              className="text-accent font-medium underline hover:no-underline hover:text-lighterAccent transition-colors"
            >
              Manage Products
            </Link>
          </li>
          <li>
            <Link
              to="sellers"
              className="text-accent font-medium underline hover:no-underline hover:text-lighterAccent transition-colors"
            >
              Manage Sellers
            </Link>
          </li>
          <li>
            <Link
              to="customers"
              className="text-accent font-medium underline hover:no-underline hover:text-lighterAccent transition-colors"
            >
              Manage Customers
            </Link>
          </li>
          <li>
            <Link
              to="orders"
              className="text-accent font-medium underline hover:no-underline hover:text-lighterAccent transition-colors"
            >
              Manage Orders
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
