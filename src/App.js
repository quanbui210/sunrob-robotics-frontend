import Products from './components/Shop/Products';
import CheckoutModal from './components/Stepper/CheckoutModal';
import Layout from './components/Layout/Layout';
import ProductPage from './components/ProductPage';
import { loader } from './components/ProductPage';
import OrderHistory from './components/history/OrderHistory';
import LoginPage from './components/auth/LoginPage'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";


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
    path: '/order-history',
    element: <Layout><OrderHistory/></Layout>,
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
