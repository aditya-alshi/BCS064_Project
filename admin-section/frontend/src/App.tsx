import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './sections/header/Header';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
