import { Outlet, Link } from "react-router-dom";
import Header from "./sections/header/Header";
export default function Seller() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
