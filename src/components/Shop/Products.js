import ProductItem from './ProductItem';
import classes from './Products.module.css';
import axios from 'axios';
import {useState, useEffect} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Products = (props) => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(()=> {
    axios.get('https://sunrob-ebf44-default-rtdb.europe-west1.firebasedatabase.app/products.json')
    .then(response => {
      let fetchedData = response.data
      console.log(fetchedData)
      const loadedProducts = []
      for (let key in fetchedData) {
        loadedProducts.push({
          id: key,
          title: fetchedData[key].title,
          description: fetchedData[key].description,
          image: fetchedData[key].image,
          price: fetchedData[key].price
        })
      }
      setProducts(loadedProducts)
      setIsLoading(false)
      console.log(products)
    })
  }, [])
  return (
    <section className={classes.products}>
      <h2 style={{marginBottom: '100px'}}>Our Robot Products</h2>

    {isLoading ?  
    <Box sx={{ display: 'flex' }}>
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
        />
        ))}
      </ul>}
    </section>
  );
};

export default Products;
