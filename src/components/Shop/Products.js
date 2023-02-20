import ProductItem from './ProductItem';
import classes from './Products.module.css';
import axios from 'axios';
import {useState, useEffect} from 'react'


const Products = (props) => {
  const [products, setProducts] = useState([])
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
          image: fetchedData[key].image
        })
      }
      setProducts(loadedProducts)
      console.log(products)
    })
  }, [])
  return (
    <section className={classes.products}>
      <h2 style={{marginBottom: '100px'}}>Our Robot Products</h2>
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
      </ul>
    </section>
  );
};

export default Products;
