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
    useEffect(() => {
    
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      }
    }, []);
    const handleLogout = () => {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    };
    useEffect(() => {
      const fetchAllUsers = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:4040/api/user/all");
          if (response.data) {
            setUsers(Array.isArray(response.data) ? response.data : response.data[0]);
            console.log(response);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
  
      fetchAllUsers();
    }, []);
  
    const handleFileImport = async (data) => {
      const validData = [];
      const emailSet = new Set();
      const errors = [];
  
      console.log("Imported Data:", data);
  
      data.forEach((row, index) => {
        const { name, email, password } = row;
  
        if (!name) {
          errors.push(`Row ${index + 1}: Name is required (Row content: ${JSON.stringify(row)})`);
        }
        if (!email) {
          errors.push(`Row ${index + 1}: Email is required (Row content: ${JSON.stringify(row)})`);
        }
        if (!password) {
          errors.push(`Row ${index + 1}: Password is required (Row content: ${JSON.stringify(row)})`);
        }
  
        if (!name || !email || !password) {
          return;
        }
  
        if (!validateEmail(email)) {
          errors.push(`Row ${index + 1}: Invalid email format: ${email}`);
          return;
        }
  
        if (emailSet.has(email)) {
          errors.push(`Row ${index + 1}: Duplicate email found: ${email}`);
          return;
        }
  
        emailSet.add(email);
        validData.push({ name, email, password });
      });
  
      if (errors.length > 0) {
        errors.forEach(error => toast.error(error));
        return;
      }
  
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/user/bulk-import", validData);
        if (response.data.success) {
          toast.success("Users imported successfully");
          setUsers([...users, ...response.data.users]);
        } else {
          console.error("Backend validation errors:", response.data.errors);
          response.data.errors.forEach((error, index) => {
            Object.values(error).forEach((msg) => {
              toast.error(`Row ${index + 1}: ${msg}`);
            });
          });
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          console.error("Detailed error response:", error.response.data.errors);
          error.response.data.errors.forEach((error, index) => {
            Object.values(error).forEach((msg) => {
              toast.error(`Row ${index + 1}: ${msg}`);
            });
          });
        } else {
          toast.error("Error importing users");
          console.error("Error importing users:", error);
        }
      }
    };
  
  };
  
  export default Admin;
  