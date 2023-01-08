import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import CheckoutModal from './components/Stepper/CheckoutModal';
function App() {

  const showCart = useSelector(state => state.toggle.show)
  console.log(showCart)
  return (
    <>
      <Layout>
        <Products />
      </Layout>
        <CheckoutModal></CheckoutModal>
    </>
  );
}

export default App;
