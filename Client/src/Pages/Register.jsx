import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
// import app from "../../../API/index";

export const Register = () => {

  const url = "http://localhost:8800/api/auth/register";

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post(url, inputs)
      navigate("/login")
    } catch (err) {
      setError(err.response.data)
    }

  }


  return (
    <div className='auth'>
        <h1>Register Page</h1>
        <form>
            <input required type='text' placeholder='Username' name='username' onChange={handleChange}/>
            <input required type='email' placeholder='Email' name='email' onChange={handleChange}/>
            <input required type='password' placeholder='Password' name='password' onChange={handleChange}/>
            <button onClick={handleSubmit}>Register</button>
            {err && <p>{err}</p>}
            <span>
              Do you have an account? <Link to="/login">Login</Link>
            </span>
        </form>
      </div>
  )
}
