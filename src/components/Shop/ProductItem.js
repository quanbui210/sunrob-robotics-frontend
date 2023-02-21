import { Button, CardActionArea, CardActions } from '@mui/material';
import classes from './ProductItem.module.css';
import { useDispatch } from 'react-redux';
import {cartActions} from '../../store/cart-slice'
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './ProductItem.css'



const ProductItem = (props) => {
  const { title, price, description, id, image } = props;
  const dispatch = useDispatch()

  const addToCartHandler = () => {
    dispatch(
      cartActions.add({
        id,
        title,
        price,
        image
      })
    );
  };



  return (
    <li className={classes.item}>
      <Card className='card-item' sx={{ maxWidth: 390 }}>
        <CardMedia
          component="img"
          height="140"
          image= {image}
          alt="green iguana"
          className='card-img'
        />
        <CardContent className="card-content">
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <span className="card-price">${price && price.toFixed(2)} / kpl</span>
          <p className="card-desc">
            {description}
          </p>
        <Button  className='card-btn' size="small"  onClick={addToCartHandler}>
          Add to cart
        </Button>
        <Link to={`/products/${id}`}>
          <Button 
            // onClick={()=> {
            //   window.scrollTo(0, 0)
            // }}
            className='card-btn-view' 
            size="small">
              View
          </Button>
        </Link>
        </CardContent>
      </Card>
    </li>
  );
};

export default ProductItem;
