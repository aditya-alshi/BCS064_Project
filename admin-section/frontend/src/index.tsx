import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ManageProducts, { loader as ManageProductLoader } from './sections/main/products/ManageProducts';
import ManageSellers, { loader as ManageSellersLoader} from './sections/main/sellers/ManageSellers';
import ManageCustomers, { loader as ManageCustomerLoader } from './sections/main/customers/ManageCustomers';
import ManageOrders, { loader as ManageOrdersLoader } from  './sections/main/orders/ManageOrders';
import ProductDetails, { loader as ProductDetailsLoader, action as ProductDetailsAction } from './sections/main/products/ProductDetails';

import Login, { action as adminLoginAction } from './sections/login/Login';
import JokerComponent, { action, action as jokerAction } from './components/JokerComponent';
import { action as ManageProductAction } from './sections/main/products/ManageProducts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/admin/main",
    element: <App />,
    children: [
      {
        index: true,
        action: ManageProductAction,
        loader: ManageProductLoader,
        element: <ManageProducts />
      },
      // {
      //   path: 'joker',
      //   action: jokerAction,
      //   element: <JokerComponent />
      // },
      {
        path: 'sellers',
        loader: ManageSellersLoader,
        element: <ManageSellers />
      },
      {
        path: 'customers',
        loader: ManageCustomerLoader,
        element: <ManageCustomers />
      },
      {
        path: "orders",
        loader: ManageOrdersLoader,
        element: <ManageOrders />
      },
      {
        path: 'product/:product_id',
        loader: ProductDetailsLoader,
        action: ProductDetailsAction,
        element: <ProductDetails />
      }
    ]
  },
  {
    path: '/',
    action: adminLoginAction,
    element: <Login />
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);