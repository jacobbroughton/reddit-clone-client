import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startLogin, startLogout } from "../reducers/userReducer"

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    const handleSubmit = (e) => {

        dispatch(startLogin({username, password}))
        
        e.preventDefault()
    }


    return (
        <div>
        <form onSubmit={(e) => handleSubmit(e)}>
            <input placeholder="Username" onChange={e => setUsername(e.target.value)}/>
            <input placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            {/* <input placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}/> */}
            <input type="submit" placeholder="Login"/>
        </form>
        {/* { doNotMatchError !== '' && <p>{ doNotMatchError }</p> } */}

    </div>
    )
}

export default Login;