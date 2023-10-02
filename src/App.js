import Products from './components/shop/Products';
import CheckoutModal from './components/stepper/CheckoutModal';
import Layout from './components/layout/Layout';
import ProductPage from './components/ProductPage';
import { loader } from './components/ProductPage';
import LoginPage from './components/auth/LoginPage'
import HomePage from './components/home/HomePage';
import Dashboard from './components/dashboard/Dashboard';

import { lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { useSelector } from 'react-redux';
import Profile from './components/profile/Profile';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><HomePage/></Layout>
  },
  {
    path: '/dashboard',
    element: <Layout><Dashboard/></Layout>
  },
  {
    path: '/products',
    element: <Layout><Products/></Layout>
  },
  {
    path: '/products/:id',
    element: <Layout><ProductPage/></Layout>,
    loader: loader
  },
  {
    path: '/profile',
    element: <Layout><Profile/></Layout>,
  },
  {
    path: '/login-form',
    element: <Layout><LoginPage/></Layout>,
  }
])


function App() {
  return (
    <>
        <RouterProvider router={router}></RouterProvider>
        <CheckoutModal/>
    </>
  );
}

export default App;
