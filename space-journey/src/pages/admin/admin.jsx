import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./admin.css";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FileUploadPopup from "../../components/fileuploader/fileuploader.jsx";
import Navbar from "../../components/navbar/navbar.jsx";
import { jwtDecode } from "jwt-decode";
import Modal from "../../components/modal/modal.jsx";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/home");
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/home");
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.role !== "admin") {
          alert("You do not have access to this resource.");
          navigate("/home");
          return;
        }

        const response = await axios.get("http://localhost:4040/api/user/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setUsers(
            Array.isArray(response.data) ? response.data : response.data[0]
          );
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, [navigate]);

  const handleFileImport = async (data) => {
    const validData = [];
    const emailSet = new Set();
    const errors = [];

    data.forEach((row, index) => {
      const { name, email, password } = row;

      if (!name || !email || !password) {
        errors.push(`Row ${index + 1}: All fields are required`);
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
      errors.forEach((error) => toast.error(error));
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/bulk-import",
        validData
      );
      if (response.data.success) {
        toast.success("Users imported successfully");
        setUsers([...users, ...response.data.users]);
      } else {
        response.data.errors.forEach((error, index) => {
          Object.values(error).forEach((msg) => {
            toast.error(`Row ${index + 1}: ${msg}`);
          });
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        error.response.data.errors.forEach((error, index) => {
          Object.values(error).forEach((msg) => {
            toast.error(`Row ${index + 1}: ${msg}`);
          });
        });
      } else {
        toast.error("Error importing users");
      }
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "created_at",
      headerName: "Registered At",
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.row.created_at);
        return isNaN(date) ? "" : format(date, "yyyy-MM-dd");
      },
    },
    {
      field: "iotDevices",
      headerName: "Devices",
      flex: 1,
    },
  ];

  const rows = Array.isArray(users)
    ? users.map((user, index) => ({
        id: user._id || index,
        name: user.username,
        email: user.email,
        created_at: user.timeStamp,
        iotDevices: user.iotDevices,
      }))
    : [];

  return (
    <div style={{ padding: "20px" }}>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div className="containerA">
        <h1
          style={{
            marginBottom: "20px",
            color: "#fff",
            fontSize: "36px",
            fontWeight: "bold",
            paddingLeft: "180px",
          }}
        >
          All Users
        </h1>
        {/* <button className="btn" onClick={() => setIsPopupOpen(true)}>
          Import
        </button>
        <Modal
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          style={{
            content: {
              
              maxWidth: "500px", 
              width: "100%", 
              margin: "auto", 
              padding: "20px",
            },
          }}
        >
          <h2>Import Users</h2>
          <FileUploadPopup onFileImport={handleFileImport} />
        </Modal> */}
      </div>
      <div
        style={{
          height: "70vh",
          width: "70vw",
          margin: "0 auto",
          backgroundColor: "#232323",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        {users && (
          <DataGrid
            columns={columns}
            rows={rows}
            slots={{ toolbar: GridToolbar }}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                fontFamily: "Arial, sans-serif",
                backgroundColor: "white",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
                backgroundColor: "#232323",
                color: "white",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#232323",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-columnHeader": {
                fontWeight: "bold",
                backgroundColor: "#232323",
              },
              "& .MuiDataGrid-row:nth-of-type(odd)": {
                backgroundColor: "#232323",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#e0f7fa",
              },
              "& .MuiDataGrid-toolbarContainer": {
                justifyContent: "flex-end",
                padding: "10px",
                color: "white",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#232323",
              },
              "& .MuiDataGrid-virtualScroller": {
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#888",
                  borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#232323",
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
