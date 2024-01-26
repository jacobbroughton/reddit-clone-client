import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { startLogin } from "../../../redux/actions/authActions";
import { Link } from "react-router-dom";
import Meta from "../../ui/Meta";
import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    if (username === "" || password === "") return;

    dispatch(startLogin({ username, password }));

    e.preventDefault();
  };

  return (
    <div className={`login`}>
      <Meta title="Log in" />
      <div className="login-container">
        <h2>Login</h2>

        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            required
            type="text"
            className="login-input"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            required
            type="password"
            className="login-input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="login-submit"
            type="submit"
            value="Login"
            disabled={username === "" || password === ""}
          />
        </form>
        <p className="need-to-register-question">
          Not registered?{" "}
          <Link className="create-account-link" to="/register">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
