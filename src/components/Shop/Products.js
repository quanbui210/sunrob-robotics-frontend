import ProductItem from './ProductItem';
import classes from './Products.module.css';
import axios from 'axios';
import {useState, useEffect} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import useFetch from '../../helper/useFetch';
import Badge from '@mui/material/Badge';


const Products = (props) => {
  const [products, setProducts] = useState([])

  const {data: fetchedData, loading}= useFetch('https://sunrob-ebf44-default-rtdb.europe-west1.firebasedatabase.app/products.json')
  useEffect(()=> {
      const loadedProducts = []
      for (let key in fetchedData) {
        loadedProducts.push({
          id: key,
          title: fetchedData[key].title,
          description: fetchedData[key].description,
          image: fetchedData[key].image,
          price: fetchedData[key].price,
          available: fetchedData[key].available
        })
      }
      setProducts(loadedProducts)
  }, [fetchedData])
  return (
    <section className={classes.products}>
      <h2 style={{marginBottom: '100px'}}>Our Robot Products</h2>

    {loading ?  
    <Box sx={{ display: 'flex', textAlign:'center', justifyContent:'center', alignItems: 'center' }}>
      <CircularProgress />
    </Box> :  
    <ul>
        {products.map((product) => (
             <ProductItem
              key={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              id={product.id}
              image={product.image}
              availability={product.available}
            />
        ))}
      </ul>}
    </section>
  );
};

export default Products;
