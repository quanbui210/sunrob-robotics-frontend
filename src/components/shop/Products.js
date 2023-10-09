import ProductItem from './ProductItem';
import classes from './Products.module.css';
import axios from 'axios';
import {useState, useEffect} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import useFetch from '../../helper/useFetch';
import Badge from '@mui/material/Badge';
import { useSelector, useDispatch } from 'react-redux';
import { productActions } from '../../store/product-slice';


const Products = (props) => {
  const {data: fetchedData, loading}= useFetch('https://sunrob-ebf44-default-rtdb.europe-west1.firebasedatabase.app/products.json')
  const productList = useSelector(state => state.product.products)
  const dispatch = useDispatch()
  useEffect(()=> {
      dispatch(productActions.getAllProducts())
  }, [dispatch])
  return (
    <section className={classes.products}>
      <h2 style={{marginBottom: '100px'}}>Our Robot Products</h2>

    {loading ?  
    <Box sx={{ display: 'flex', textAlign:'center', justifyContent:'center', alignItems: 'center' }}>
      <CircularProgress />
    </Box> :  
    <ul>
        {productList.products && productList.products.map((product) => (
             <ProductItem
              key={product._id}
              title={product.name}
              price={product.price}
              description={product.description}
              id={product._id}
              image={product.image}
              availability={product.status}
            />
        ))}
      </ul>}
    </section>
  );
};

export default Products;
