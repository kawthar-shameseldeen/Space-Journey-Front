import React, { useState } from "react";
import "./login.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import {
  fetchingUsers,
  loadUsers,
  errorOccured,
} from "../../data_store/redux/userSlice/index.js";
import Navbar from "../../components/navbar/navbar.jsx";
import {jwtDecode} from "jwt-decode";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.error("Please enter both email and password");
        return;
      }
      dispatch(fetchingUsers());
      const { data } = await axios.post("http://localhost:4040/api/login", {
        email,
        password,
      });

      dispatch(loadUsers(data));
      const token = data.token;
      localStorage.setItem("token", token);

      toast.success("Login successful");

      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      if (decodedToken.role === 'admin') {
        navigate("/admin");
      } else if (decodedToken.role === 'user') {
        navigate("/home");
      } else {
        toast.error("Unknown role");
      }
    } catch (error) {
      dispatch(errorOccured(error?.message));
      toast.error("Error logging in");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <form className="login" onSubmit={handleSubmit}>
          <h3>Login</h3>
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
          <p className="signup-text">
            Don't Have Account? <Link to="/">SignUp</Link>
          </p>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
