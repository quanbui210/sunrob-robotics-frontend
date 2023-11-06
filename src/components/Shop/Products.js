import ProductItem from './ProductItem';
import classes from './Products.module.css';
import { productActions } from '../../store/product-slice';

import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Products = (props) => {
  const {products, isLoading} = useSelector(state => state.product)
  const dispatch = useDispatch()
  useEffect(()=> {
      dispatch(productActions.getAllProducts())
  }, [dispatch])
  return (
    <section className={classes.products}>
      <h2 style={{marginBottom: '100px'}}>Products</h2>

      <input type='text' placeholder='Search...'/>
    {isLoading ?  
    <Box sx={{ display: 'flex', textAlign:'center', justifyContent:'center', alignItems: 'center' }}>
      <CircularProgress />
    </Box> :  
    <ul>
        {products.products && products.products.map((product) => (
             <ProductItem
              key={product._id}
              title={product.name}
              price={product.price}
              description={product.description}
              id={product._id}
              image={product.image}
              availability={product.status}
              averageRating={product.averageRating}
              numOfReviews={product.numOfReviews}
              category={product.category}
            />
        ))}
      </ul>}
    </section>
  );
};

export default Products;
