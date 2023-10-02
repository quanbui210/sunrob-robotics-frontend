import './Featured.css'
import robotImg from '../../../assets/robot2.png'

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router';


export default function Featured () {
    const navigate = useNavigate()
    return (
        <div className="featured-container">
            <h1 className='featured-title'>Featured Products</h1>
            <Grid sx={{ flexGrow: 1 }} container spacing={4}>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={7}>
                {[0, 1, 2].map((value) => (
                    <Grid className='featured-card' key={value} item>
                    <img className='featured-img' src={robotImg} alt='Featured'/><br/>
                    <span className='name-span'>Robot1 </span>
                    <span className='price-span' style={{color:"#25c5dd"}}>$15</span>
                    </Grid>
                ))}
                </Grid>
                <button className='viewAll-btn' onClick={() => navigate('/products')}>All Products</button>
            </Grid>
            </Grid>
            
        </div>
    )
}