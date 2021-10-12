import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startLogin } from "../../actions/authActions"
import { Link } from "react-router-dom"
import Meta from "../Meta"
import "./Login.scss"

const Login = () => {

    const darkMode = useSelector(state => state.darkMode)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()


    const handleSubmit = (e) => {
        if(username === "" || password === "") return

        dispatch(startLogin({username, password}))
        
        e.preventDefault()
    }


    return (
        <div className={`login ${darkMode ? 'dark' : ''}`}>
            <Meta title="Log in"/>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input required type="text" className="login-input" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                    <input required type="password" className="login-input" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    <input className="login-submit" type="submit" value="Login"/>
                </form>
                <p className="need-to-register-question">Not registered? <Link className="create-account-link" to="/login">Create an account</Link></p>
            </div>
        </div>
    )
}

export default Login;