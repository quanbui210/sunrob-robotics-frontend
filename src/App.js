import CheckoutModal from './components/stepper/CheckoutModal';
import Products from './components/shop/Products';
import Layout from './components/layout/Layout';
import LoginPage from './components/auth/LoginPage'
import HomePage from './components/home/HomePage';
import Dashboard from './components/dashboard/Dashboard';
import ProductPage from './components/shop/ProductPage';
import ProductForm from  './components/dashboard/form/ProductForm'
import { lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
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
    element: <Layout><ProductPage/></Layout>
  },
  {
    path: '/profile',
    element: <Layout><Profile/></Layout>,
  },
  {
    path: '/login-form',
    element: <Layout><LoginPage/></Layout>,
  },
  {
    path: '/dashboard/add',
    element: <Layout><ProductForm mode="add"/></Layout>
  },
  
  {
    path: '/dashboard/edit/:id',
    element: <Layout><ProductForm mode="edit"/></Layout>
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
