import {useState, useEffect} from 'react'
import {useSearchParams, useParams, useNavigate} from "react-router-dom"
import Form from 'react-bootstrap/Form'
import axios from 'axios'

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email')
  const token = searchParams.get('token')

  const navigate = useNavigate()
  
  const [enteredPassword, setEnteredPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)

  const handlePasswordInput = (e) => {
    setEnteredPassword(e.target.value)
  }

  const handleSubmit = async() => {
    try {
        const response = await axios.post('http://localhost:5001/api/v1/auth/reset-password', {email, token, password: enteredPassword})
        const result = await response.data
        setMessage(result.msg)
        setError(false)
        setTimeout(() => {
            navigate('/login-form');
          }, 3000);
    } catch(e) {
        setError(true)
    }
  }

  return (
    <div style={{marginTop:'180px'}}>
        !<h4 style={{textAlign: 'center'}}>Please enter your new password</h4>
        <Form className="form-auth" autoComplete="off">
          <Form.Group className="form-group-auth" controlId="formBasicEmail">
            <Form.Label className="form-label-auth">New Password</Form.Label>
            <Form.Control
              placeholder="password"
              autoComplete="off"
              className="form-control-auth"
              name="form-useremail"
              value={enteredPassword}
              onChange={handlePasswordInput}
            />
            <button type="button" className='form-button-auth' onClick={handleSubmit}>
              Submit
            </button>
            {error === false && <p>{message}</p>}
          </Form.Group>
          </Form>
    </div>
  )
}

export default ResetPassword