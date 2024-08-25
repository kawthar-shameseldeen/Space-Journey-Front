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
    
      useEffect(() => {
        if (user && !loading && !error) {
          navigate("/home");
          toast.success("Signup successful");
        } else if (error) {
          toast.error("Error signing up");
        }
      }, [user, loading, error]);
    
    return (
        <div className="signup-container" >
            <form onSubmit={handleSubmit}>
                <h1 className="signup-title">Register</h1>
                <p className="signup-subtitle">Please Enter your Account details</p>

                <div className="input-groupB">
                    <FaUser />
                    <input type="text" 
                    value={username} onChange={(e) => setUsername(e.target.value)}  autoComplete="off" 
                    placeholder="Name" />
                </div>
                <div className="input-groupB">
                    <FaEnvelope />
                    <input type="email"
                    value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"  autoComplete="off"  />
                </div>
                <div className="input-groupB">
                    <FaLock />
                    <input type="password" 
                    value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"   autoComplete="off" />
                </div>
                <div className="login-textB">
                    <p>Already Have Account?<Link to="/login">Login</Link> </p>
                </div>

                <button type="submit" className="signup-btnB">Sign up</button>

              
            </form>
        </div>
    );
}

export default Signup;
