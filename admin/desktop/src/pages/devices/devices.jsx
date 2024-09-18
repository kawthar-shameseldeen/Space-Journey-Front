import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./devices.css"; 
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 
import Sidebar from "../../components/sidebar/sidebar";
import { toast } from "react-toastify";

const DeviceStatus = () => {
  const [devices, setDevices] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
   
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.username || "Unknown User");
    }


    // const fetchDevices = async () => {
    //   try {
    //     const response = await axios.get("http://15.236.224.49/api/devices", {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });

    //     if (response.data) {
    //       setDevices(response.data);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching devices:", error);
    //     toast.error("Error fetching devices.");
    //   }
    // };

    // fetchDevices();
  }, []);

  // Define the columns for the DataGrid
  const columns = [
    { field: "deviceName", headerName: "Device Name", flex: 1 },
    {
      field: "status",
      headerName: "Device Status",
      flex: 1,
      renderCell: (params) => {
        return params.row.status === "connected" ? "Connected" : "Disconnected";
      },
    },
    { field: "username", headerName: "Username", flex: 1 }, 
  ];

 
  const rows = Array.isArray(devices)
    ? devices.map((device, index) => ({
        id: device._id || index,
        deviceName: device.deviceName || "Unknown Device",
        status: device.status || "Disconnected", 
        username, 
      }))
    : [];

  return (
    <div className="deviceStatusContainer">
      <Sidebar />
      <div style={{ padding: "20px" }}>
        <h1 style={{ marginBottom: "20px", fontSize: "36px", fontWeight: "bold" }}>
          Devices
        </h1>
        <div
          className="deviceTable"
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
          {devices && (
            <DataGrid
              columns={columns}
              rows={rows}
              slots={{ toolbar: GridToolbar }}
              sx={{
                border: "1px solid #232323",
                "& .MuiDataGrid-root": {
                  border: "none",
                  fontFamily: "Arial, sans-serif",
                  backgroundColor: "#232323",
                  color: "white",
                },
                "& .MuiDataGrid-cell": {
                  border: "1px solid #232323",
                  backgroundColor: "#232323",
                  color: "white",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#232323",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-row:nth-of-type(odd)": {
                  backgroundColor: "#2e2e2e",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#e0f7fa",
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceStatus;
