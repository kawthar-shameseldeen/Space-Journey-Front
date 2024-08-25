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
      navigate("/home");
    } catch (error) {
      dispatch(errorOccured(error?.message));
      toast.error("Error logging in");
    }
  };

  return (
    <div className="login-container">
    <form className="login" onSubmit={handleSubmit}>
     
    </form>
  </div>
  );
};

export default Login;
