import React, { useEffect, useState, useRef } from "react";
import { Box, useTheme, IconButton, InputBase } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { io } from "socket.io-client";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const ViewPartners = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [viewLeadersData, setViewLeadersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("authToken");
  const socketRef = useRef(null); // Store socket instance

  // Function to fetch initial data
  const fetchData = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await axios.get(
        "https://app.medicarebot.live/list-leads",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        setViewLeadersData(response.data.leads);
      } else {
        throw new Error("Failed to fetch leads");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // WebSocket connection
  useEffect(() => {
    if (!token) return;

    socketRef.current = io("https://app.medicarebot.live", {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000, // Retry every 3 seconds
      auth: {
        token,
      },
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socketRef.current.on("updateLeads", (updatedData) => {
      console.log("Leads updated via WebSocket:", updatedData);
      setViewLeadersData(updatedData);
    });

    socketRef.current.on("disconnect", () => {
      console.warn("WebSocket disconnected");
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [token]);

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, [token]);

  // Handlers for actions
  const handleEdit = (id) => console.log("Edit clicked for ID:", id);
  const handleView = (id) => console.log("View clicked for ID:", id);
  const handleDelete = (id) => console.log("Delete clicked for ID:", id);

  // DataGrid columns
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "fullname", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.25 },
    { field: "mobile_number", headerName: "Phone Number", flex: 1 },
    { field: "city", headerName: "City", flex: 0.75 },
    { field: "state", headerName: "State", flex: 0.5 },
    { field: "country", headerName: "Country", flex: 0.75 },
    { field: "company_name", headerName: "Company Name", flex: 1 },
    { field: "job_title", headerName: "Job Title", flex: 1 },
    { field: "company_size", headerName: "Company Size", flex: 0.75 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" gap=".25em" justifyContent="center">
          <IconButton
            onClick={() => handleEdit(params.row.id)}
            aria-label="edit"
            sx={{ color: colors.greenAccent[200] }}
          >
            <EditIcon sx={{ fontSize: "14px" }} />
          </IconButton>
          <IconButton
            onClick={() => handleView(params.row.id)}
            aria-label="view"
            sx={{ color: colors.grey[100] }}
          >
            <VisibilityIcon sx={{ fontSize: "14px" }} />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.id)}
            aria-label="delete"
            sx={{ color: colors.redAccent[400] }}
          >
            <DeleteIcon sx={{ fontSize: "14px" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="center"
      >
        <Header
          title="VIEW PARTNERS"
          subtitle="List of Partners for Future Reference"
        />
      </Box>

      <Box gridColumn="span 12" backgroundColor={colors.primary[400]} pt=".5em">
        <Box
          display="flex"
          backgroundColor="#ccc"
          borderRadius="25px"
          width="220px"
          border="1px solid white"
          color="#000"
          margin=".5em 3em"
        >
          <InputBase
            sx={{ ml: 2, flex: 1, color: "#000" }}
            placeholder="Search"
          />
          <IconButton sx={{ p: 1 }}>
            <SearchIcon sx={{ color: "#000" }} />
          </IconButton>
        </Box>

        <Box height="450px" sx={{ "& .MuiDataGrid-root": { border: "none" } }}>
          {loading ? (
            <p>Loading data...</p>
          ) : error ? (
            <p style={{ color: "red" }}>Error: {error}</p>
          ) : (
            <DataGrid
              rows={viewLeadersData}
              columns={columns}
              getRowId={(row) => row.id}
              rowHeight={40}
              headerHeight={40}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ViewPartners;
