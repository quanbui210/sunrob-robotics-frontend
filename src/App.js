import Products from './components/Shop/Products';
import CheckoutModal from './components/Stepper/CheckoutModal';
import Layout from './components/Layout/Layout';
import ProductPage from './components/ProductPage';
import { loader } from './components/ProductPage';
import LoginPage from './components/Auth/LoginPage'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Profile from './components/Profile/Profile';


const router = createBrowserRouter([
  {
    path: '/',
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
