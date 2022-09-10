import React, { useState } from "react";
import { useEffect } from "react";
import "./login.scss";
import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { loginUser } from "../../api/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    const res = loginUser(credentials);
    res
      .then((data) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: data.details });
        navigate("/");
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      });
  };
  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="info_container">
          <h1>संगीत</h1>
          <div className="login_input_container">
            <p>Username</p>
            <input
              type="text"
              placeholder="Your Username"
              id="username"
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="login_input_container">
            <p>Password</p>
            <input
              type="password"
              placeholder="Your password"
              id="password"
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="login_button">
            <Button className="loginButton" onClick={handleClick}>
              <p>Login</p>
            </Button>
          </div>
          <div className="login_button">
            <Button
              className="loginButton"
              onClick={() => {
                navigate("/register");
              }}
            >
              <p>Register</p>
            </Button>
          </div>
        </div>
      </div>
      <div className="image_container">
        <div className="text_parent_container">
          <div className="text_container">
            <p>Music for everyone.</p>
            <p style={{ color: "aquamarine" }}>Music for you.</p>
          </div>
        </div>
        <img src="https://wallpaperaccess.com/full/4683196.jpg" alt="" />
      </div>
    </div>
  );
}

export default Login;
