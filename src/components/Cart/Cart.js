
// import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
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
import {Dialog, DialogTitle, DialogContent} from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Cart = (props) => {
  const cartQuantity = useSelector(state => state.cart.totalQuantity)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [openDialog, setOpenDialog] = useState(false)
  const {isLoggedIn} = useSelector(state => state.auth)
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

  const matchesPhone = useMediaQuery('(max-width:600px)');

  const handleClose = () => {
    setOpenDialog(false); 
};


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
    setShowForm(false)
  };
  const cartItems = useSelector(state => state.cart.items)
  const checkoutHandler = (e) => {
    if (isLoggedIn) {
      setOpenDialog(true)
    } else {
      dispatch(toggleActions.openDialog())
      setState({...state, right: false})
    }
  }

  const submitOrderHandler = () => {
    let tax = 9
    let shippingFee = 29
    let orderSummary = {
      tax,
      shippingFee,
      items: cartItems
    }
    dispatch(cartActions.createOrderThunk(orderSummary))
    dispatch(cartActions.removeAllItems())
    handleClose()
    setShowForm(false)
    dispatch(toggleActions.show())
    navigate('/')
  }


  const btnClasses =  `${styles.button} ${btnIsBumped ? styles.bump : ''}` 
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
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
    {openDialog && 
           <Dialog
              fullScreen={fullScreen}
              open={openDialog}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"> 
                <div className='order-sum'>
                  <DialogTitle>Order Summary</DialogTitle>
                  <DialogContent>
                  {cartItems.map(item => (
                    <CartItem
                      className='card-list'
                      key={item.id}
                      sum={true}
                      item={{ 
                        title: item.name, 
                        quantity: item.quantity, 
                        total: item.totalPrice, 
                        price: item.price,
                        id: item.id,
                        image: item.image
                      }}
                    />
                    ))}
                    <span>Subtotal: ${total}</span> <br></br>
                    <span>+tax: $9</span> <br/>
                    <span>+shipping fee: $29</span> <br/>
                    <h4>Total: ${total + 9 + 29}</h4>
                    <button onClick={submitOrderHandler} className='order'>Order & Pay</button>
                    <button onClick={handleClose} className='cancel'>X</button>
                  </DialogContent>
                </div>
            </Dialog>}
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
              title: item.name, 
              quantity: item.quantity, 
              total: item.totalPrice, 
              price: item.price,
              id: item.id,
              image: item.image
            }}
          />
          ))}
            <p className='total'>Total: ${total.toFixed(2)}</p>
            <Button onClick={checkoutHandler} className='checkout-btn'> 
              <ExitToAppIcon className='checkout-icon'/>
            </Button>
            <Button className='close-cart' onClick={()=>{
              setState({...state, right: false})
            }}><CloseIcon/></Button>
    </Drawer>} 
    {cartIsEmpty && !showForm && <Drawer
      anchor='right'
      open={state['right']}
      onClose={toggleDrawer('right', false)}
    > <p className="empty">{matchesPhone ? 'Your Cart is Empty' : 'Your Shopping Cart is Empty'}</p>
      <Button className='close-cart' onClick={()=>{
              setState({...state, right: false})
            }}>
              <CloseIcon/>
      </Button>
     </Drawer>}
    
    
  </React.Fragment>
  );
};

export default Cart;