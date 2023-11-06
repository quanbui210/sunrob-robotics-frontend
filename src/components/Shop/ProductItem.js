import classes from './ProductItem.module.css';
import { useDispatch } from 'react-redux';
import {cartActions} from '../../store/cart-slice'
import { Link } from 'react-router-dom';

import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';

import ReactStars from "react-rating-stars-component";


import './ProductItem.css'

const ProductItem = (props) => {
  const { title, price, description, id, image, availability, averageRating, numOfReviews, category } = props;
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

  let disabled = availability ? false : true


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
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}>
          <ReactStars 
              size={20}
              value={averageRating}
              edit={false}
              classNames='star-review'
              isHalf={true}
            />
            <span className='num-reviews'>({numOfReviews})</span>
          </div>
         {!availability ? <p 
            style={{
              fontSize: '10.6px',
              color: 'rgb(192, 83, 90)'
            }}
          >Temporarily Out of Stock!!</p> : 
            <p 
            style={{
              fontSize: '10.6px',
              color: '#5d9c70'
            }}>
              In Stock
            </p>}
          <span className="card-price">${price && price.toFixed(2)} / kpl</span>
          <p className="card-desc">
            category: {category}
          </p>

        {disabled?  
          <Button
            disabled={true}
            className='card-btn disabled'
             size="small"  onClick={addToCartHandler}>
            Add to cart
          </Button> : 
          <Button
            className='card-btn' 
            size="small"  onClick={addToCartHandler}>
            <ShoppingCartIcon/>
          </Button>
        }

        <Link to={`/products/${id}`}>
          <Button 
            className='card-btn-view' 
            size="small">
              <SearchIcon/>
          </Button>
        </Link>
        </CardContent>
      </Card>
    </li>
  );
};

export default ProductItem;
