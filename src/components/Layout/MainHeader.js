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
  const {isLoggedIn, isLoggedOut} = useSelector(state => state.auth)
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
     <Link to="/">
      <img className={classes.logo} alt="sunrob.com" src={logo}></img></Link> 
      <nav>
        <ul>
          <li>
            <Link to='/profile'>
              <Tooltip title="View Order History">
                  <HistoryIcon className='history-icon'/>
              </Tooltip>
            </Link>
            <Cart/>

            <Link onClick={handleOpen}>
              <Tooltip title="Account Details">
                  <AccountCircleIcon className='history-icon'/>
              </Tooltip>
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
          {isLoggedIn ? "Hello user" : "Please log in or signup to continue"}
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
          <button className={classes.button}>
            Profile Details
          </button>
          <button className={classes.button}>Settings</button>
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
