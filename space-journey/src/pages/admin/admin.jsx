import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./admin.css";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-toastify";
import FileUploadPopup from "../../components/fileuploader/fileuploader.jsx";
import Navbar from "../../components/navbar/navbar.jsx";

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
        const response = await axios.get("http://localhost:4040/api/user/all");
        if (response.data) {
          setUsers(
            Array.isArray(response.data) ? response.data : response.data[0]
          );
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
        errors.push(
          `Row ${index + 1}: Name is required (Row content: ${JSON.stringify(
            row
          )})`
        );
      }
      if (!email) {
        errors.push(
          `Row ${index + 1}: Email is required (Row content: ${JSON.stringify(
            row
          )})`
        );
      }
      if (!password) {
        errors.push(
          `Row ${
            index + 1
          }: Password is required (Row content: ${JSON.stringify(row)})`
        );
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
  ];

  const rows = Array.isArray(users)
    ? users.map((user, index) => ({
        id: user.id || index,
        name: user.username,
        email: user.email,
        created_at: user.timeStamp,
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
          }}
        >
          All Users
        </h1>
        <button className="btn" onClick={() => setShowPopup(true)}>
          Import
        </button>
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>Import Users</h2>
              <FileUploadPopup onFileImport={handleFileImport} />
              <button className="btn" onClick={() => setShowPopup(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          height: "70vh",
          width: "70vw",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#ffffff",
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
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#1a73e8",
                color: "#204E45",
                fontSize: "16px",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
              },
              "& .MuiDataGrid-row:nth-of-type(odd)": {
                backgroundColor: "#f9f9f9",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#e0f7fa",
              },
              "& .MuiDataGrid-toolbarContainer": {
                justifyContent: "flex-end",
                padding: "10px",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#f1f1f1",
              },
              "& .MuiDataGrid-virtualScroller": {
                scrollbarWidth: "thin",
                "&::-webkit-scrollbar": {
                  width: "8px",
                  height: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#888",
                  borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#555",
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
