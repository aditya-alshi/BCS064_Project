import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ManageProducts from './sections/main/products/ManageProducts';
import ManageSellers from './sections/main/sellers/ManageSellers';
import ManageCustomers from './sections/main/customers/ManageCustomers';
import ManageOrders from './sections/main/orders/ManageOrders';
import ProductDetails from './sections/main/products/ProductDetails';

import { loader as ProductDetailsLoader } from './sections/main/products/ProductDetails'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ManageProducts />
      },
      {
        path: 'sellers',
        element: <ManageSellers />
      },
      {
        path: 'customers',
        element: <ManageCustomers />
      },
      {
        path: "orders",
        element: <ManageOrders />
      },
      {
        path: 'product/:product_id',
        loader: ProductDetailsLoader,
        element: <ProductDetails />
      }
    ]
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);