/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import Form from 'react-bootstrap/Form'
import { authActions } from '../../store/auth-slice'
import { toggleActions } from '../../store/toggle-slice'
import './LoginForm.css'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const LoginForm = () => {
    const [enteredUserName, setEnteredUserName] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const [enteredEmail, setEnteredEmail] = useState('')
    const [loadMsg, setLoadMsg] = useState(false)
    const {signUpSuccess, isAdmin, userLoggedIn} = useSelector(state => state.auth)
    const {isSignup, isLogin} = useSelector(state => state.toggle)


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userNameHandler = (e) => {
        setEnteredUserName(e.target.value)
    }
    const passwordHandler = (e) => {
        setEnteredPassword(e.target.value)
    }
    const emailHandler = (e) => {
        setEnteredEmail(e.target.value)
    }
    const signup = async (e) => {
        e.preventDefault()
        const newUser = {
            name: enteredUserName,
            email: enteredEmail,
            password: enteredPassword
        }
        try {
           await dispatch(authActions.signupThunk(newUser))
        } catch(e) {
            console.log(e);
        }
    }

    const login = async(e) => {
        e.preventDefault()
        const loginUser = {
            email: enteredEmail,
            password: enteredPassword
        }
        await dispatch(authActions.loginThunk(loginUser))
        if (userLoggedIn.role === 'Admin') {
          // navigate('/dashboard')
          navigate('/')
        } else {
         navigate('/')
        }
    }



  return (
    <>
    {signUpSuccess && 'Sign up successfully, now you can login'}
      <Form className="form-auth" autoComplete="off">
          <Form.Group className="form-group-auth" controlId="formBasicEmail">
            <Form.Label className="form-label-auth">Email</Form.Label>
            <Form.Control
              placeholder="email"
              autoComplete="off"
              className="form-control-auth"
              name="form-useremail"
              value={enteredEmail}
              onChange={emailHandler}
            />
          </Form.Group>
     { (signUpSuccess === false && isLogin === false) &&  <Form.Group className="form-group-auth" controlId="formBasicEmail">
          <Form.Label className="form-label-auth">Username: </Form.Label>
          <Form.Control
            autoComplete="off"
            className="form-control-auth"
            placeholder="username"
            value={enteredUserName}
            name="form-username"
            onChange={userNameHandler}
          />
        </Form.Group> }
        <Form.Group className="form-group-auth" controlId="formBasicEmail">
          <Form.Label className="form-label-auth">Password: </Form.Label>
          <Form.Control
            autoComplete="off"
            className="form-control-auth"
            type="password"
            placeholder="password"
            value={enteredPassword}
            onChange={passwordHandler}
            name="form-password"
          />
        </Form.Group>
        <Form.Group className="form-group">
        {(signUpSuccess === false && isLogin === false) ? (
            <button type="button" className='form-button-auth' onClick={signup}>
              Sign Up
            </button>
          ) : (
            <div>
              <button type="button" className='form-button-auth' onClick={login}>
                Login
              </button>
            </div>
          )}
          {loadMsg && (
            <p className="load-msg">The server is slow, please wait for a few minutes...</p>
          )}
        </Form.Group>
        {(!signUpSuccess || isSignup) && !isLogin ? (
          <div>
          <span className="signup">
            Already have an account?{' '}
            <a
             className='signup-span'
              onClick={() => {
                dispatch(toggleActions.isLogin())
              }}>
              Login
            </a>{' '}
            here
          </span> <br/>
          <span className="signup">
            <a
             className='signup-span'
              onClick={() => {
                dispatch(toggleActions.isLogin())
              }}>
              Forgot Password?
            </a>{' '}
          </span>
          </div>
          
        ) : (
          <div>
          <span className="signup">
            Dont have an account yet?{' '}
            <a
             className='signup-span'
              onClick={() => {
                dispatch(toggleActions.isSignupAction())
              }}>
              SignUp
            </a>{' '}
            now
          </span> <br/>
          <span className="signup">
            <a
             className='signup-span'
              onClick={() => {
                dispatch(toggleActions.isLogin())
              }}>
              Forgot Password?
            </a>{' '}
          </span>
          </div>
        )}
      </Form>
    </>
  )
}

export default LoginForm
// 🚀
