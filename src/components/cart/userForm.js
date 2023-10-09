import React, { useState } from 'react';
import './form.css';
const isEmpty = value => value.trim().length === 0;
const UserForm = ({onSubmit, setShowForm}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [formValid, setFormValid] = useState({
    name: true,
    email: true,
    address: true
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    const nameIsValid = !isEmpty(name)
    const emailIsValid = !isEmpty(email) && email.includes('@')
    const addressIsValid = !isEmpty(address)

    setFormValid({
      name: nameIsValid,
      email: emailIsValid,
      address: addressIsValid
    })
    const formIsValid = nameIsValid && emailIsValid && addressIsValid
    if (!formIsValid) return;
    onSubmit({
        name,
        email,
        address
    })
  };


  return (
    <form className="form" onSubmit={handleSubmit}>
    <div className='input-container'>
    <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {!formValid.name && <p className='error-msg'>Please enter a valid name</p> }

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {!formValid.email && <p className='error-msg'>Please enter a valid email</p> }


      <label htmlFor="address">Shipping Address:</label>
      <input
        id="address"
        name="address"
        rows="4"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      ></input>
      {!formValid.address && <p className='error-msg'>Please enter a valid address</p> }

    </div>
    <div className='button-container'></div>
      <button className='form-btn' type="submit">Submit</button>
      <button className='form-btn' onClick={()=>{
        setShowForm(false)
      }}>Cancel</button>
    </form>
  );
};

export default UserForm;