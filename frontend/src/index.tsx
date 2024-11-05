import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Product from './products';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
   <Product />
  </React.StrictMode>
);
