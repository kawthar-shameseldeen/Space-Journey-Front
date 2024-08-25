import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import './signup.css';
import { useDispatch, useSelector } from "react-redux";
import {
    registerUserSuccess,
    registerUserStart,
    registerUserFail,
    usersSliceSelector,
  } from "../../data_store/redux/userSlice/index.js";