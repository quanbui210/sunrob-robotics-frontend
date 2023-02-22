import Cart from '../Cart/Cart';
import classes from './MainHeader.module.css';
import React from 'react'
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
const MainHeader = (props) => {
  return (
    <header className={classes.header}>
     <Link to="/"><img className={classes.logo} alt="sunrob.com" src={logo}></img></Link> 
      <nav>
        <ul>
          <li>
            <Cart/>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
