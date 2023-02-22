import Cart from '../Cart/Cart';
import classes from './MainHeader.module.css';
import React from 'react'
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import HistoryIcon from '@mui/icons-material/History';
import { Tooltip } from '@mui/material';
import useFetch from '../../helper/useFetch';
import {useState, useEffect} from 'react';
import Badge from '@mui/material/Badge';
const MainHeader = (props) => {



  return (
    <header className={classes.header}>
     <Link to="/">
      <img className={classes.logo} alt="sunrob.com" src={logo}></img></Link> 
      <nav>
        <ul>
          <li>
            <Link to='/order-history'>
              <Tooltip title="View Order History">
                  <HistoryIcon className='history-icon'/>
              </Tooltip>
            </Link>
            <Cart/>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
