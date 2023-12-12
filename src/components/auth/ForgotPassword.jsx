import {useState} from 'react'
import {useSearchParams, useParams} from "react-router-dom"
import Form from 'react-bootstrap/Form'
import axios from 'axios'

const ForgotPassword = () => {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)

  const handleEmailInput = (e) => {
    setEnteredEmail(e.target.value)
  }
  const handleSubmit = async() => {
    try{
        console.log(enteredEmail);
        const response = await axios.post('http://localhost:5001/api/v1/auth/forgot-password', {email: enteredEmail})
        const result = await response.data
        setMessage(result.msg)
        setError(false)
    } catch(e) {
        setError(true)
    }
  }
  return (
    <div style={{marginTop:'180px'}}>
        !<h4 style={{textAlign: 'center'}}>Please enter you account email</h4>
        <Form className="form-auth" autoComplete="off">
          <Form.Group className="form-group-auth" controlId="formBasicEmail">
            <Form.Label className="form-label-auth">Email</Form.Label>
            <Form.Control
              placeholder="email"
              autoComplete="off"
              className="form-control-auth"
              name="form-useremail"
              value={enteredEmail}
              onChange={handleEmailInput}
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

export default ForgotPassword