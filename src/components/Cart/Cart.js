
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import styles from './CartButton.module.css';
import {useState, useEffect} from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import './Cart.css'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { toggleActions } from '../../store/toggle-slice';
import { cartActions } from '../../store/cart-slice';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router';
import axios from 'axios';
import UserForm from './userForm';

const Cart = (props) => {
  const cartQuantity = useSelector(state => state.cart.totalQuantity)
  const [total, setTotal] = useState(0);
  const [btnIsBumped, setBtnIsBumped] = useState(false)
  const [cartIsEmpty, setCartIsEmpty] = useState(true)
  const [showForm, setShowForm] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
 

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const cartItems = useSelector(state => state.cart.items)
  const checkoutHandler = (e) => {
    setShowForm(true)
  }

  const submitOrderHandler = (userData) => {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    let orderDate = `${day} - ${month} - ${year}`
    // dispatch(toggleActions.show())
    dispatch(cartActions.removeAllItems())
    axios.post('https://sunrob-ebf44-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
      orderedProducts: cartItems,
      date: orderDate,
      userData: userData,
      total: total,
    })
    setShowForm(false)
    dispatch(toggleActions.show())
    navigate('/')
  }

  const btnClasses =  `${styles.button} ${btnIsBumped ? styles.bump : ''}` 
  
  useEffect(() => {
    if (cartItems.length === 0) {
        setCartIsEmpty(true)
        return;
    } else {
      setCartIsEmpty(false);
    }
    setBtnIsBumped(true)

    const timer = setTimeout(() =>{
        setBtnIsBumped(false)
    }, 300)

    return () => {
        clearTimeout(timer)
    }
}, [cartItems])
  

  const getTotalCartPrice = (...cartItems) => {
    let totalCartPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
      let items = cartItems[i];
      for (let j = 0; j < items.length; j++) {
        totalCartPrice += items[j].totalPrice;
      }
    }
    return totalCartPrice;
  }

  useEffect(() => {
    setTotal(getTotalCartPrice(cartItems))
  }, [cartItems])



  return (
    
    <React.Fragment key='right'>
    <Tooltip title='View Your Cart / Checkout'>
    <Button onClick={toggleDrawer('right', true)} className={btnClasses}>
      <Badge className='cart-badge'  badgeContent={cartQuantity} color="warning">
        <ShoppingCartIcon className='cart-icon'/>
      </Badge>
    </Button>
    </Tooltip>
    {showForm && <Drawer
     anchor='right'
     open={state['right']}
     onClose={toggleDrawer('right', false)}>
      <UserForm onSubmit={submitOrderHandler} setShowForm={setShowForm}/>
      </Drawer>}
    {!cartIsEmpty && !showForm &&  <Drawer 
      className='cart-ul'
      anchor='right'
      open={state['right']}
      onClose={toggleDrawer('right', false)}
    >
     {cartItems.map(item => (
          <CartItem
            className='card-list'
            key={item.id}
            item={{ 
              title: item.name.split(" ")[0], 
              quantity: item.quantity, 
              total: item.totalPrice, 
              price: item.price,
              id: item.id,
              image: item.image
            }}
          />
          ))}
            <p className='total'>Total: ${total.toFixed(2)}</p>
            <button onClick={checkoutHandler} className='checkout-btn'>Checkout 
              <ExitToAppIcon className='checkout-icon'/>
            </button>
    </Drawer>} 
    {cartIsEmpty && !showForm && <Drawer
      anchor='right'
      open={state['right']}
      onClose={toggleDrawer('right', false)}
    > <p className="empty">Your Shopping Cart is Empty</p> </Drawer>}
    
    
  </React.Fragment>
  );
};

export default Cart;