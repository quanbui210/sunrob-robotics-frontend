import './Featured.css'
import robotImg from '../../../assets/robot2.png'
import { productActions } from '../../../store/product-slice';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';



export default function Featured () {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const products = useSelector(state => state.product.products.products)
    console.log(products);
    useEffect(() => {
        dispatch(productActions.getAllProducts())
    }, [dispatch])
    return (
        <div className="featured-container">
            <h1 className='featured-title'>Featured Products</h1>
            <Grid sx={{ flexGrow: 1 }} container spacing={4}>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={7}>
                {products.filter(product => product.featured === true).map((product) => (
                    <Grid onClick={()=> navigate(`/products/${product._id}`)} className='featured-card' key={product._id} item>
                    <img className='featured-img' src={product.image} alt='Featured'/><br/>
                    <span className='name-span'>{product.name} <i className='category-span'>{product.category}</i> </span>
                    <span className='price-span' style={{color:"#25c5dd"}}>${product.price}</span>
                    </Grid>
                ))}
                </Grid>
                <button className='viewAll-btn' onClick={() => navigate('/products')}>All Products</button>
            </Grid>
            </Grid>
            
        </div>
    )
}