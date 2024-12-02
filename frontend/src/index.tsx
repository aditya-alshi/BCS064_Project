import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Seller from "./sellerSection/Seller";
import ProductListing, {
  loader as ProductListingLoader
} from "./sellerSection/ProductListing";
import Orders, { loader as ordersLoader } from "./sellerSection/Orders";
import Reviews from "./sellerSection/Reviews";
import ProductDetails from "./sellerSection/lib/components/ProductDetails";
import Product from "./lib/components/sections/products";
import { loader as productDetailsLoader } from "./sellerSection/lib/components/ProductDetails";
import OrderDetails, {
  loader as orderDetailsLoader,
} from "./sellerSection/lib/components/OrderDetails";
import Login, {
  action as loginAction,
} from "./sellerSection/sections/login/Login";
import Register, {
  action as registerAction,
} from "./sellerSection/sections/register/Register";
import SubmitProduct, {
  action as submitProductAction,
} from "./sellerSection/sections/inventory/submitProduct";
import ProfilePage from "./sellerSection/sections/profile/ProfilePage";
import EditProfile from "./sellerSection/sections/profile/EditProfle";
import CustomerProductDetails, {
  loader as CustomerProductDetailsLoader,
}from "./lib/components/sections/productDetails/CustomerProductDetails";
import { action as AddReviewAction } from "./lib/components/sections/review/AddReview";
import { loader as productLoader } from "./lib/components/sections/products";
import Header from "./lib/components/sections/Header/Header";
import Pagination from "./lib/components/pagination/Pagination";
import Footer from "./lib/components/sections/Footer";
import Cart, { action as cartAction } from "./lib/components/sections/Header/Cart";

import CustomerRegister, { action as CustomerRegisterAction } from "./lib/components/sections/register/CustomerRegister";
import CustomerLogin, { action as CustomerLoginAction } from "./lib/components/sections/login/CustomerLogin";
import Checkout from "./lib/components/sections/checkout/Checkout";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <>
            <Header />
            <section className="my-2 mx-10 m-auto border">
              {/* <Filter /> */}
              <Product />
            </section>
            <Footer />
          </>
        ),
        loader: productLoader,
      },
      {
        path: "details",
        element: <CustomerProductDetails />,
        action: AddReviewAction,
        loader: CustomerProductDetailsLoader,
      },
      {
        path: "cart",
        action: cartAction,
        element: <Cart />
      },
      {
        path: 'checkout',
        element: <Checkout />
      }
    ],
  },
  {
    path: "/customer/register",
    action: CustomerRegisterAction,
    element: <CustomerRegister />
  },
  {
    path: '/customer/login',
    action: CustomerLoginAction,
    element: <CustomerLogin />
  },
  {
    path: "/panel/seller",
    element: <Seller />,
    children: [
      {
        index: true,
        loader: ProductListingLoader,
        element: <ProductListing />,
      },
      {
        path: "register",
        action: registerAction,
        element: <Register />,
      },
      {
        path: "login",
        action: loginAction,
        element: <Login />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "profile/edit",
        element: <EditProfile />,
      },
      {
        path: "product/:productId",
        element: <ProductDetails />,
        loader: productDetailsLoader,
      },
      {
        path: "orders",
        loader: ordersLoader,
        element: <Orders />,
      },
      {
        path: "orders/:orderId",
        element: <OrderDetails />,
        loader: orderDetailsLoader,
      },
      {
        path: "reviews",
        element: <Reviews />,
      },
      {
        path: "submitproudct",
        action: submitProductAction,
        element: <SubmitProduct />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
