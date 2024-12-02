import { Link } from "react-router-dom";
export default function Header() {
  return (
    <section className="bg-background">
      <header className="flex justify-between items-center py-4 px-6 border-b-2 border-accent">
        {/* Logo */}
        <img className="w-40" src="/main-logo.png" alt="Main Logo" />

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                replace
                to={"/panel/seller/"}
                className="text-accent font-medium hover:text-lighterAccent transition-colors"
              >
                Products Listing
              </Link>
            </li>
            <li>
              <Link
                replace
                to={"/panel/seller/orders"}
                className="text-accent font-medium hover:text-lighterAccent transition-colors"
              >
                Orders
              </Link>
            </li>
          </ul>
        </nav>

        {/* Profile Icon */}
        <Link to={"/panel/seller/profile"} className="hover:text-lighterAccent">
          <svg
            className="w-6 h-6 text-yellowish transition-colors duration-300"
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
  );
}
