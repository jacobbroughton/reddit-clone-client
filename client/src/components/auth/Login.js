import { useState } from "react"

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    return (
        <div>
        <form onSubmit={handleSubmit}>
            <input placeholder="Username" onChange={e => setUsername(e.target.value)}/>
            <input placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            {/* <input placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}/> */}
            <input type="submit" placeholder="Login"/>
        </form>
        {/* { doNotMatchError !== '' && <p>{ doNotMatchError }</p> } */}

        {
            user && <h1>Hi, {user.username}</h1>
        }
    </div>
    )
}

export default Login;