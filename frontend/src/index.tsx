import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Seller from './sellerSection/Seller';
import ProductListing from './sellerSection/ProductListing';
import Orders from './sellerSection/Orders';
import Reviews from './sellerSection/Reviews';
import ProductDetails from './sellerSection/lib/components/ProductDetails';

import { loader as productDetailsLoader } from './sellerSection/lib/components/ProductDetails';
import OrderDetails, { loader as orderDetailsLoader } from './sellerSection/lib/components/OrderDetails';
import Login, { action as loginAction } from './sellerSection/sections/login/Login';
import Register, { action as registerAction } from './sellerSection/sections/register/Register';
import SubmitProduct, { action as submitProductAction} from './sellerSection/sections/inventory/submitProduct';
import ProfilePage from './sellerSection/sections/profile/ProfilePage';
import EditProfile from './sellerSection/sections/profile/EditProfle';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/panel/seller",
    element: <Seller />,
    children: [
      {
        index: true,
        element: <ProductListing />,
      },
      {
        path: "register",
        action: registerAction,
        element: <Register />
      },
      {
        path: "login",
        action: loginAction,
        element: <Login />
      },
      {
        path: 'profile',
        element: <ProfilePage />
      },
      {
        path:'profile/edit',
        element:<EditProfile />
      },
      {
        path: "product/:productId",
        element: <ProductDetails />,
        loader: productDetailsLoader
      },
      {
        path: "orders",
        element: <Orders />
      },
      {
        path: "orders/:orderId",
        element: <OrderDetails />,
        loader: orderDetailsLoader,
      },
      {
        path: "reviews",
        element: <Reviews />
      },
      {
        path: "submitproudct",
        action: submitProductAction,
        element: <SubmitProduct />
      }
    ]
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
// #F4C542
// #8B1E3F
// #8CBF86

// --berkeley-blue: #052f5fff;
// --indigo-dye: #005377ff;
// --jungle-green: #06a77dff;
// --citron: #d5c67aff;
// --gamboge: #f1a208ff;