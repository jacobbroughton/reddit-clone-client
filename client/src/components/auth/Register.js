import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { startRegister } from "../../reducers/userReducer"

const Register = () => {

    const dispatch = useDispatch()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    // const [confirmPassword, setConfirmPassword] = useState("")
    // const [doNotMatchError, setDoNotMatchError] = useState("Passwords do not match, please try again")

    const user = useSelector(state => state.user)

    const handleSubmit = (e) => {
        
        dispatch(startRegister(username, password))
        
        e.preventDefault()
    }

    useEffect(() => {
        if(user) {
         console.log("User found")
         console.log(user)   
        } else {
            console.log("No user found in state")
        }
        
    }, [user])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                <input placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                {/* <input placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}/> */}
                <input type="submit" placeholder="Register"/>
            </form>
            {/* { doNotMatchError !== '' && <p>{ doNotMatchError }</p> } */}

            {
                user && <h1>Hi, {user.username}</h1>
            }
        </div>
    )
}

export default Register