import { useParams, useNavigate } from "react-router"
import './ProductPage.css'
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Image } from "@mui/icons-material";
import Image1 from '../assets/robottoys.png'
import Image2 from '../assets/robot2.png'
import Image3 from '../assets/robot3.png'
import Image4 from '../assets/robot5.png'
import Image5 from '../assets/robottoys2.png'
import { Button } from "@mui/material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";



export default  function ProductPage () { 
    const navigate = useNavigate()
    const {id} = useParams()
    console.log(Image1)
    const dispatch = useDispatch()
    let imageSrc;
    let inStock; 
    
    if (id.substring(1) === '1') {
        imageSrc = Image1
        inStock = false
    } else if (id.substring(1) === '2') {
        imageSrc = Image2
        inStock = true
    } else if (id.substring(1) === '3') {
        imageSrc = Image3
        inStock = false
    } else if (id.substring(1) === '4') {
        imageSrc = Image4
        inStock = true
    } else if (id.substring(1) === '5') {
        imageSrc = Image5
        inStock = true
    } else if (id.substring(1) === '6') {
        imageSrc = Image2
        inStock = false
    } 
    
    const addToCartHandler = () => {
        dispatch(
          cartActions.add({
            id: id,
            title: `Robot ${id.substring(1)}`,
            price: 5,
            image: imageSrc
          })
        );
      };

    let stockColor = inStock ? 'stock' : 'out-stock'
    const disabled = inStock ? false : true
    return <div className="page-container">
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Button className="go-back" onClick={()=> {
                    navigate('..')
                }}><KeyboardReturnIcon/>Back</Button>
                <div>
                    <img src={imageSrc} className='page-img'/>
                </div>
            </Grid>
            <Grid item xs={4} className='page'>
                <h1>Robot {id.substring(1)}</h1>
                <div className="info-container">
                    <h3><b>PRICE: €5 <a className="sale">(-15%)</a></b></h3>
                    <p><a>FREE delivery</a> <b>Wednesday, March 1</b> on eligible first order. Order within <a>15 hrs 28 mins</a></p>
                    
                    <p className="deliver">
                    <LocationOnIcon className="location-icon"/>    Deliver to Finland
                    </p>
                    <h3 className={stockColor}>{inStock ? 'In Stock: >10pcs' : 'Out Of Stock'}</h3>
                </div>
                <p>Suitable for children ages 3 and up, these toys make a great gift for any child interested in robotics and STEM education.</p>
                <h1>About this item:</h1>
                <ul>
                    <li>
                        Upgraded children's robot: This toy robot has a really cool look with a unique colour scheme and is larger than other toy robots, which offers a different visual experience.
                        This toy robot holds a gun in the left hand and a shield in the right hand. It can also simulate the sound of a machine gun, which is very realistic. It is suitable for children over 5 years and will definitely become a faithful companion for children.
                    </li>
                    <li>
                        【Intellectual programming】The children can give commands to toy robots and make them perform a series of consecutive actions with multiple commands. 
                        Let your children get creative and the results will be unexpected! The robot toy contains over 18 songs, 4 scientific tricks and two stories.
                    </li>
                </ul>
                <Button
                    onClick={addToCartHandler}
                    disabled={disabled}
                    className="page-button"
                >
                    Add to Basket
                </Button>
            </Grid>
        </Grid>
    </div>
}