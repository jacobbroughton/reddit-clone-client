import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { startRegister } from "../../actions/auth"

const Register = () => {

    const dispatch = useDispatch()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [doNotMatchError, setDoNotMatchError] = useState("")

    const handleSubmit = (e) => {
        
        dispatch(startRegister(username, password))
        
        e.preventDefault()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                <input placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                <input placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}/>
                <input type="submit" placeholder="Register"/>
            </form>
            { doNotMatchError !== '' && <p>{ doNotMatchError }</p> }
        </div>
    )
}

export default Register