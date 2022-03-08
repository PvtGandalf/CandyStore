import React from 'react';
import { useRoutes } from 'react-router-dom';

import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Error from './pages/Error';

const App = () => useRoutes([
    { path: "/", element: <Home /> },
    { path: "/home", element: <Home /> },
    { path: "/shop", element: <Shop /> },
    { path: "/cart", element: <Cart /> },
    { path: "*", element: <Error /> }
  ]);

export default App;
