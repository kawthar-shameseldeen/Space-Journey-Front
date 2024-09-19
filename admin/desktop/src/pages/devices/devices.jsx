
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./devices.css"; 
import axios from "axios";
import jwtDecode from "jwt-decode"; 
import Sidebar from "../../components/sidebar/sidebar";
import { toast } from "react-toastify";

const DeviceStatus = () => {
  const [devices, setDevices] = useState([]);
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
   
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUsernames = async () => {
        try {
          const response = await axios.get("http://15.236.224.49/api/all", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data) {
            
            const usernamesList = response.data.map((user) => user.username);
            setUsernames(usernamesList);
          }
        } catch (error) {
          console.error("Error fetching usernames:", error);
          toast.error("Error fetching usernames.");
        }
      };

    
      const fetchDevices = async () => {
        try {
          const response = await axios.get("http://localhost:4040/api/device/status", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data) {
       
            const deviceData = Object.entries(response.data.pinStatus).map(([pin, status]) => ({
              deviceName: response.data.deviceName,
              pin,
              status,
            }));
            setDevices(deviceData);
          }
        } catch (error) {
          console.error("Error fetching devices:", error);
          toast.error("Error fetching devices.");
        }
      };

      fetchUsernames(); 
      fetchDevices();   
    }
  }, []);

 
  const rows = usernames.length > 0 && devices.length > 0
    ? usernames.map((username, index) => ({
        id: index, 
        deviceName: devices[0]?.deviceName || "N/A", 
        pin: devices.map((device) => device.pin).join(", "),
        status: devices.map((device) => device.status).join(", "), 
        username: username,
        deviceStatus: "Disconnected",
      }))
    : [];

 
  const columns = [
    { field: "deviceName", headerName: "Device Name", flex: 1 },
    { field: "pin", headerName: "Pins", flex: 1 },
    {
      field: "status",
      headerName: "Pin Status",
      flex: 1,
      renderCell: (params) => {
     
        const uniqueStatuses = [...new Set(params.row.status.split(", "))]; 
        return uniqueStatuses.join(", "); 
      },
    },
    { field: "username", headerName: "Name", flex: 1 }, 
    { field: "deviceStatus", headerName: "Device Status", flex: 1 }, 
  ];

  return (
    <div className="adminContainer">
      <Sidebar />
      <div style={{ padding: "20px" }}>
        <div className="alignContainer">
          <div className="containerA">
            <h1
              style={{
                marginBottom: "20px",
                fontSize: "36px",
                fontWeight: "bold",
                alignSelf: "flex-start",
              }}
            >
              Devices
            </h1>
          </div>
          <div
            className="adminTable"
            style={{
              height: "70vh",
              width: "70vw",
              margin: "0 auto",
              border: "1px solid #232323",
              backgroundColor: "#232323",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            {rows.length > 0 && (
              <DataGrid
                columns={columns}
                rows={rows}
                slots={{ toolbar: GridToolbar }}
                sx={{
                  border: "1px solid #232323", 
                  "& .MuiDataGrid-root": {
                    borderColor: "#232323",
                  },
                  "& .MuiDataGrid-root": {
                    border: "none",
                    fontFamily: "Arial, sans-serif",
                    border: "1px solid #232323 !important", 
                    backgroundColor: "#232323 !important",
                    color: "white",
                  },
                  "& .MuiDataGrid-cell": {
                    border: "1px solid #232323 !important", 
                    backgroundColor: "#232323 !important",
                    color: "white",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#232323",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "bold",
                    border: "1px solid #232323",
                  },
                  "& .MuiDataGrid-columnHeader": {
                    fontWeight: "bold",
                    backgroundColor: "#232323",
                    border: "1px solid #232323",
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
                    color: "#232323",
                    "& .MuiButtonBase-root": {
                      color: "white",
                    },
                  },
                  "& .MuiDataGrid-footerContainer": {
                    backgroundColor: "#232323",
                    color: "white",
                    "& .MuiTablePagination-root": {
                      color: "white",
                    },
                    "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows, & .MuiTablePagination-select":
                      {
                        color: "white",
                      },
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
      </div>
    </div>
  );
};

export default DeviceStatus;

