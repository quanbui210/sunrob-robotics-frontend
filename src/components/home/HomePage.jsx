import { Grid } from "@mui/material"
import { useNavigate } from "react-router"

import Featured from "./featured/Featured"
import {  useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"

import robImg from '../../assets/robottoys.png'
import './HomePage.css'
import { productActions } from "../../store/product-slice"
import { authActions } from "../../store/auth-slice"

export default function HomePage () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=> {
        dispatch(productActions.getAllProducts())
        dispatch(authActions.getAllUsers())
    }, [dispatch])

    const {isLoggedIn} = useSelector(state => state.auth)
    useEffect(()=> {
        dispatch(productActions.getAllProducts())
    }, [dispatch])


    useEffect(() => {
      const checkAuthentication = async() => {
        const response = await axios.get('api/v1/auth/checkToken')  
        console.log(response.data);
        if (response.data.authenticated === true && response.data.token) {
          console.log(response.data.token);
        } else {
          if (isLoggedIn) {
            window.alert('unauthenticated, please login again')
            dispatch(authActions.logoutThunk())
          }
        }
      }
      checkAuthentication()
    },[dispatch, isLoggedIn])

    
    return (
        <div>
        <div>
            <Grid className="intro" container spacing={3}>
            <Grid className="intro-text" item xs={6}>
                <h2 className="intro-title">Discover Tomorrow's Playmates: Your Kid's New Robo-Buddy!</h2>
                <p className="intro-desc">Introducing our captivating range of robot toys that spark imagination and learning! Designed to be your child's interactive companion, 
                these Robo-Buddies bring the future to playtime. Sunrob toys are not just playmates; they're partners in fun-filled learning experiences. 
                </p>
                <button onClick={()=> navigate('/products')} className="intro-btn">Shop Now</button>
            </Grid>
            <Grid item xs={6}>
                <img src={robImg} alt="" className="intro-img"/>
            </Grid>
            </Grid>
        </div>
        <div className="featured">
            <Featured/>
        </div>

        </div>
    )
}