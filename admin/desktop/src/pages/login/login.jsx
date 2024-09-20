import React, { useState } from "react";
import "./login.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
import axios from "axios";
import {
  fetchingUsers,
  loadUsers,
  errorOccured,
} from "../../data_store/redux/userSlice/index.js";
import { jwtDecode } from "jwt-decode";
import logo from "../../assets/logo2.png";
import {useNavigate, Navigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Use the useNavigate hook

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        // toast.error("Please enter both email and password");
        return;
      }
      dispatch(fetchingUsers());
      const { data } = await axios.post("http://15.236.224.49/api/login", {
        email,
        password,
      });

      dispatch(loadUsers(data));
      const token = data.token;
      localStorage.setItem("token", token);

      const decodedToken = jwtDecode(token);
      console.log(decodedToken);

      if (decodedToken.role === "admin" || decodedToken.role === "user") {
        // toast.success("Login successful");
        navigate("/users");  
       
      } else {
        // toast.error("Unknown role");
      }
    } catch (error) {
      dispatch(errorOccured(error?.message));
      // toast.error("Error logging in");
    }
  };

  return (
  <div className="login-page">
      <div className="login-container">
      <img src={logo} alt="Logo" className="login-logo" />
      <form className="login" onSubmit={handleSubmit}>
        <h1 className="title">Login</h1>
        <p>Please Enter your Account details</p>
        <div className="input-group">
          <FaEnvelope className="icon" />
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            autoComplete="off"
            required
          />
        </div>
        <div className="input-group">
          <FaLock className="icon" />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            autoComplete="off"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  </div>
  );
};
export default Login;