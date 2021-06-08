import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startRegister } from "../../reducers/userReducer";
import "./Register.scss";

const Register = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.darkMode)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("")
  // const [doNotMatchError, setDoNotMatchError] = useState("Passwords do not match, please try again")

  const user = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    dispatch(startRegister(username, password));

    e.preventDefault();
  };

  return (
    <div className={`register ${darkMode && 'dark'}`}>
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className="register-input"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="register-input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <input placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}/> */}
          <input className="register-submit" type="submit" value="Register" />
        </form>
        {/* { doNotMatchError !== '' && <p>{ doNotMatchError }</p> } */}
      </div>
    </div>
  );
};

export default Register;
