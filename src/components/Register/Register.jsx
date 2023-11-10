import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { startRegister } from "../../actions/authActions"
import { Link } from "react-router-dom"
import Meta from "../Meta"

import "./Register.scss"

const Register = () => {
  const dispatch = useDispatch()
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState("Male")

  const handleSubmit = (e) => {
    if (username === "" || password === "") return

    dispatch(startRegister(username, password, gender))

    e.preventDefault()
  }

  return (
    <div className={`register  `}>
      <Meta title="Register" />
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            required
            className="register-input"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            required
            className="register-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <select
            // className="register-input"
            required
            type="text"
            placeholder="Male / Female"
            onChange={(e) => setGender(e.target.value)}
          >
            <option>Male</option>
            <option>Female</option>
          </select> */}
          {/* <input placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}/> */}
          <input className="register-submit" type="submit" value="Register" disabled={password === '' || username === ''}/>
        </form>
        {/* { doNotMatchError !== '' && <p>{ doNotMatchError }</p> } */}
        <p className="already-registered-question">
          Already registered?{" "}
          <Link className="sign-in-link" to="/login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
