import Cart from '../Cart/Cart';
import classes from './MainHeader.module.css';
import logo from '../../assets/logo.png';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


import { useDispatch, useSelector } from 'react-redux';

import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Tooltip } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';



import {useState, useEffect} from 'react';
import { authActions } from '../../store/auth-slice';
import { toggleActions } from '../../store/toggle-slice';



const MainHeader = (props) => {
  const theme = useTheme();
  const navigate = useNavigate()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [openDialog, setOpenDialog] = useState(false)
  const {isLoggedIn, isLoggedOut, userLoggedIn, isAdmin} = useSelector(state => state.auth)
  console.log(isLoggedIn);
  const dispatch = useDispatch()
  const handleOpen = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  const logOut = async () => {
    try {
      await dispatch(authActions.logoutThunk())
      await dispatch(toggleActions.isSignupAction())
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <header className={classes.header}>
     <Link to='/'>
      <img className={classes.logo} alt="sunrob.com" src={logo}></img></Link> 
      <nav>
        <ul>
          <li>
            <Cart/>

            <Link onClick={handleOpen}>
                  <AccountCircleIcon className='history-icon'/>
                  <span className={classes.avatarName}>{userLoggedIn.name}</span>
            </Link>
          </li>
        </ul>
        <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {isLoggedIn ? "Welcome to Sunrob" : "Please log in or signup to continue"}
        </DialogTitle>
        {isLoggedIn === false ?
        <DialogContent>
          <button onClick={() => {
            navigate('/login-form')
            dispatch(toggleActions.isLogin())
            handleClose()
            }} className={classes.button}>
              Log In
          </button>
          <button onClick={() => {
            navigate('/login-form')
            dispatch(toggleActions.isSignupAction())
            handleClose()
            }} className={classes.button}>
              Signup
          </button>
        </DialogContent> : <DialogContent>
         {isAdmin ? 
         <button onClick={() => {
          navigate('/')
          handleClose()
         }} className={classes.button}>Sunrob Main Page</button> :
         <button onClick={() => {
          navigate('/profile')
          handleClose()
          }} className={classes.button}>
            Profile Details
          </button>}
         {isAdmin ? <button onClick={() => {
          navigate('/dashboard')
          handleClose()
         }}
          className={classes.button}>Admin Dashboard</button> : <button className={classes.button}>Settings</button>}
          <button onClick={() => {
            navigate('/login-form')
            dispatch(toggleActions.isSignupAction())
            logOut()
            handleClose()
            }} className={classes.buttonLogout}>
              Log out
          </button>
        </DialogContent>}
      </Dialog>
      </nav>
    </header>
  );
};

export default MainHeader;
