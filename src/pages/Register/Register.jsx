import React, { useState } from "react";
import { useEffect } from "react";
import "./register.scss";
import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { registerUser } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Register() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: undefined,
    name: undefined,
    email: undefined,
    password: undefined,
    country: "IN",
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    console.log(credentials);
    const res = registerUser(credentials);
    res
      .then((data) => {
        dispatch({ type: "REGISTER_SUCCESS", payload: data.details });
        toast("User Registered!", {
          position: toast.POSITION.BOTTOM_CENTER,
          className: "toast_notification",
        });
        navigate("/login");
      })
      .catch((err) => {
        // dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        toast("Error in registering User!", {
          position: toast.POSITION.BOTTOM_CENTER,
          className: "toast_notification",
        });
      });
  };
  return (
    <div className="register">
      <div className="register_wrapper">
        <div className="info_container">
          <h1>संगीत</h1>
          <div className="register_input_container">
            <p>Username</p>
            <input
              type="text"
              placeholder="Your Username"
              id="username"
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="register_input_container">
            <p>Name</p>
            <input
              type="text"
              placeholder="Your Name"
              id="name"
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="register_input_container">
            <p>Email</p>
            <input
              type="text"
              placeholder="Your Email"
              id="email"
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="register_input_container">
            <p>Password</p>
            <input
              type="password"
              placeholder="Your password"
              id="password"
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="register_button">
            <Button className="registerButton" onClick={handleClick}>
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
      <ToastContainer />
    </div>
  );
}

export default Register;
