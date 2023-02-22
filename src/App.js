import Cart from './components/Cart/Cart';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import CheckoutModal from './components/Stepper/CheckoutModal';
import Layout from './components/Layout/Layout';
import ProductPage from './components/ProductPage';
import { createRoot } from "react-dom/client";
import { loader } from './components/ProductPage';
import OrderHistory from './components/history/OrderHistory';
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
