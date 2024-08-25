import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./admin.css";
import axios from "axios";
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import FileUploadPopup from '../../compnents/fileuploader/fileuploader.jsx';
import Navbar from "../../compnents/navbar/navbar.jsx";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  };
  
  export default Admin;
  