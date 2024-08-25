import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import './signup.css';
import { useDispatch, useSelector } from "react-redux";
import {
    registerUserSuccess,
    registerUserStart,
    registerUserFail,
    usersSliceSelector,
  } from "../../data_store/redux/userSlice/index.js";
  import {Link , useNavigate } from "react-router-dom";
  import { toast } from "react-toastify";
  import axios from "axios";
  import React, { useState, useEffect } from "react";
  
const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector(usersSliceSelector);
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(registerUserStart());
        try {
          const response = await axios.post("http://localhost:4040/api/register", {
            username: username,
            email,
            password,
          });
          dispatch(registerUserSuccess(response.data));
        } catch (error) {
          dispatch(registerUserFail(error.response.data));
        }
      };
    
     
}

export default Signup;
