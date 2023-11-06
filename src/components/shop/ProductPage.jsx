/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import { useParams, useNavigate, useLoaderData } from "react-router"
import './ProductPage.css'
import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import { Button } from "@mui/material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from '@mui/material/useMediaQuery';
import { productActions } from "../../store/product-slice";
import { cartActions } from "../../store/cart-slice";
import ReactStars from "react-rating-stars-component";


export default  function ProductPage () { 
    const matchesPhone = useMediaQuery('(min-width:600px)');
    const navigate = useNavigate()
    const {id} = useParams()
    const dispatch = useDispatch()
    const {product, reviews} = useSelector(state => state.product)
    console.log(reviews);
    useEffect(()=> {
      window.scrollTo(0,0)
      dispatch(productActions.getOneProdut(id))
      dispatch(productActions.getReviews(id))
     }, [dispatch, id])

    const addToCartHandler = () => {
        dispatch(
          cartActions.add({
            id,
            title: product.title,
            price: product.price,
            image: product.image
          })
        );
      };

    let stockColor = 'stock' 
    const disabled =  false 
    return <div className="page-container">
        {!matchesPhone ?
           <Grid className="product-ovr" container spacing={matchesPhone ? 2 : 1}>
           <Grid style={{display: 'block', width:'100%'}}>
               <Button className="go-back" onClick={()=> {
                   navigate('..')
               }}><KeyboardReturnIcon/>Back</Button>
               <div>
                   <img src={product.image} className='page-img' alt="robot"/>       /
               </div>
           </Grid>
           <Grid style={{display: 'block'}}className='page'>
               <h1>{product.title}</h1>
               <div className="info-container">
                   <h3><b>PRICE: ${product.price && product.price.toFixed(2)} <a className="sale">(-15%)</a></b></h3>
                   <p><a>FREE delivery</a> <b>Wednesday, March 1</b> on eligible first order. Order within <a>15 hrs 28 mins</a></p>
                   
                   <p className="deliver">
                   <LocationOnIcon className="location-icon"/>Deliver to Finland
                   </p>
                   <h3 className={stockColor}>{product.available ? 'In Stock: >10pcs' : 'Out Of Stock'}</h3>
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
           {disabled ? <Button
               onClick={addToCartHandler}
               disabled
               className="page-button"
               style={{
                   backgroundColor: "#ccc",
                       pointerEvents: "none"
                   }}
               >
                   Add to Basket
               </Button> : <Button
                   onClick={addToCartHandler}
                   className="page-button"
                   variant="contained"
                   style={{
                       backgroundColor: "#f49c19",
                       cursor: "pointer"
                   }}
               >
               Add to Basket
           </Button>}
           </Grid>
       </Grid> :
       <Grid container spacing={matchesPhone ? 2 : 1}>
       <Grid item xs={6}>
           <Button className="go-back" onClick={()=> {
               navigate('..')
           }}><KeyboardReturnIcon/>Back</Button>
           <div>
               <img src={product.image} className='page-img'/>
           </div>
       </Grid>
       <Grid item xs={5} className='page'>
           <h1>{product.name}</h1>
           <div className="info-container">
               <h3><b>PRICE: ${product.price && product.price.toFixed(2)} <a className="sale">(-15%)</a></b></h3>
               <p><a>FREE delivery</a> <b>Wednesday, March 1</b> on eligible first order. Order within <a>15 hrs 28 mins</a></p>
               
               <p className="deliver">
               <LocationOnIcon className="location-icon"/>Deliver to Finland
               </p>
               <h3 className={stockColor}>{product.available ? 'In Stock: >10pcs' : 'Out Of Stock'}</h3>
           </div>
           <p>{product.description}</p>
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
            {disabled ? <Button
                onClick={addToCartHandler}
                disabled
                className="page-button"
                style={{
                    backgroundColor: "#ccc",
                        pointerEvents: "none"
                    }}
                >
               Add to Basket
           </Button> : <Button
               onClick={addToCartHandler}
               className="page-button"
               variant="contained"
               style={{
                   backgroundColor: "#f49c19",
                   cursor: "pointer"
               }}
           >
           Add to Basket
       </Button>}
       </Grid>
   </Grid>
    }
    <div className="review-container">
        
        <ul>
            {reviews.map(review => <li className="review-item" key={review._id}>
                <div>
                    <p>{review.user.name}</p>
                    <ReactStars 
                        size={30}
                        value={review.rating}
                        edit={false}
                        classNames='star-review'
                        isHalf={true}
                    />
                    <h4 className="review-title">{review.title}</h4>
                    <span className="review-comment">{review.comment}</span>
                </div>
            </li>)}
        </ul>
    </div>
    </div>
}

