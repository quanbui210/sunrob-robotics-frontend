import classes from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import {cartActions} from '../../store/cart-slice'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Tooltip from '@mui/material/Tooltip';
// import '@fontsource/roboto/400.css';
const CartItem = (props) => {
  const { title, quantity, total, price, id, image } = props.item;
  const {sum} = props
  const dispatch = useDispatch()

  const addItemHandler = () => {
    dispatch(cartActions.add({
      quantity,
      id,
      price,
      total
    }))
  }

  const removeItemHandler = () => {
    dispatch(cartActions.remove(id))
  }

  const removeWholeItemHandler = () => {
    dispatch(cartActions.removeOneItem(id))
  }

  return (
    <li className={classes.item}>
      <header>
        <div className={classes.head}>
        <img src={image} alt="" className={classes.image}></img>
        <h3>{title}</h3>
        </div>
        <div className={classes.price}>
          ${total && total.toFixed(2)}{' '}
        </div>
          <span className={classes.itemprice}>(${price && price.toFixed(2)}/item)</span>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        {!sum && <div className={classes.actions}>
          <Tooltip title="Remove this item">
            <button className={classes.deleteAll}  onClick={removeWholeItemHandler}>
              <DeleteForeverIcon/>
            </button>
          </Tooltip>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler }>+</button>
        </div>}
      </div>
    </li>
  );
};

export default CartItem;
