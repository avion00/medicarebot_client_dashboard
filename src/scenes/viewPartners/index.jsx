import {
  Box,
  useTheme,
  // Typography,
  IconButton,
  InputBase,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const ViewPartners = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:768px)");

  const [viewLeadersData, setViewLeadersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const [leads, setLeads] = useState([]); // State to store leads
  const [showNotification, setShowNotification] = useState(false); // State for snackbar visibility
  const [notificationType, setNotificationType] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");
  const token = sessionStorage.getItem("authToken");

  // Fetch leads (you can add your API call logic here)
  useEffect(() => {
    axios
      .get("https://app.medicarebot.live/get-leads")
      .then((response) => {
        setLeads(response.data); // Set the leads data from API
      })
      .catch((error) => {
        console.error("Error fetching leads:", error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, [token]);

  const handleEdit = (id) => {
    console.log("Edit clicked for ID:", id);
    navigate(`/editPartners/${id}`);
  };

  const handleView = (id) => {
    console.log("Edit clicked for ID:", id);
  };

  const handleDelete = async (id) => {
    setLoading(true); // Show loading state
    try {
      const token = sessionStorage.getItem("authToken");

      const response = await axios.delete(
        `https://app.medicarebot.live/delete-lead/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Show success message from the server
      setNotificationType("success");
      setNotificationMessage(
        response.data.message || "Lead deleted successfully!"
      );

      // Remove the deleted lead from the UI by filtering it out of both leads and viewLeadersData
      setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
      setViewLeadersData((prevData) =>
        prevData.filter((lead) => lead.id !== id)
      ); // Update the DataGrid state
    } catch (error) {
      let errorMessage = "Error deleting lead. Please try again.";

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message; // Get the error message from the server
      }

      // Show error message
      setNotificationType("error");
      setNotificationMessage(errorMessage);
      console.error("Error deleting lead:", error);
    } finally {
      setLoading(false);
      setShowNotification(true); // Show the snackbar with message
    }
  };

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
            aria-label="view"
            sx={{ color: colors.grey[100] }}
          >
            <DeleteIcon
              sx={{ fontSize: "14px", color: colors.redAccent[400] }}
            />
          </IconButton>
        </Box>
      ),
    },
  ];

  // const handleDownload = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://app.medicarebot.live/list-leads?export=csv",
  //       {
  //         responseType: "blob", // Important for handling file downloads
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "text/csv",
  //         },
  //       }
  //     );

  //     const blob = new Blob([response.data], { type: "text/csv" });
  //     const url = window.URL.createObjectURL(blob);

  //     // Create a temporary anchor element to trigger the download
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "partners.csv"; // Set the filename
  //     document.body.appendChild(a);
  //     a.click();

  //     // Cleanup
  //     document.body.removeChild(a);
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Download error:", error);
  //   }
  // };


 const handleDownload = async () => {
   setIsDownloading(true); // Start loading

   try {
     const response = await axios.get(
       "https://app.medicarebot.live/list-leads?export=csv",
       {
         responseType: "blob",
         headers: {
           Authorization: `Bearer ${token}`,
           "Content-Type": "text/csv",
         },
       }
     );

     const blob = new Blob([response.data], { type: "text/csv" });
     const url = window.URL.createObjectURL(blob);

     const a = document.createElement("a");
     a.href = url;
     a.download = "partners.csv";
     document.body.appendChild(a);
     a.click();

     document.body.removeChild(a);
     window.URL.revokeObjectURL(url);
   } catch (error) {
     console.error("Download error:", error);
   } finally {
     setIsDownloading(false); // Stop loading
   }
 };


  return (
    <Box m="20px">
      {/* HEADER */}
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
        <Box>
          <Button
            onClick={handleDownload}
            sx={{
              background: "linear-gradient(45deg, #062994, #0E72E1)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              mb: isNonMobile ? "0em" : "1em",
              transition: "all 0.5s ease",
              "&:hover": {
                opacity: ".7",
              },
            }}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <CircularProgress size={20} sx={{ color: "#fff", mr: "10px" }} />
            ) : (
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            )}
            {isDownloading ? "DOWNLOADING....." : "DOWNLOAD PARTNERS"}
          </Button>
        </Box>
      </Box>
      <Box gridColumn="span 12" backgroundColor={colors.primary[400]} pt=".5em">
        <Box
          display="flex"
          backgroundColor={colors.grey[500]}
          borderRadius="0px"
          width="250px"
          sx={{
            width: "220px",
            borderRadius: "25px",
            margin: ".5em .5em .5em 3em",
            backgroundColor: "#ccc",
            border: `1px solid white`,
            color: "#000",
          }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1, color: "#000" }}
            placeholder="Search"
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon sx={{ color: "#000" }} />
          </IconButton>
        </Box>

        <Box
          gridColumn="span 12"
          height="450px"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.blueAccent[200],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.primary[400],
              borderBottom: `1px solid ${colors.grey[700]}`,
              borderRadius: "0 !important",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: `1px solid ${colors.grey[700]}`,
              backgroundColor: colors.primary[400],
              height: "40px !important",
              minHeight: "40px !important",
            },
            "& .MuiCheckbox-root": {
              color: `${colors.blueAccent[200]} !important`,
            },
          }}
        >
          <Box
            gridColumn="span 12"
            height="450px"
            sx={{
              "& .MuiDataGrid-root": { border: "none" },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.primary[400],
                borderBottom: `1px solid ${colors.grey[700]}`,
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: `1px solid ${colors.grey[700]}`,
                backgroundColor: colors.primary[400],
              },
            }}
          >
            {loading ? (
              <p
                style={{
                  padding: "1em",
                }}
              >
                Loading data...
              </p>
            ) : error ? (
              <p style={{ color: "red", padding: "1em" }}>Error: {error}</p>
            ) : (
              <DataGrid
                rows={viewLeadersData}
                columns={columns}
                getRowId={(row) => row.id}
                rowHeight={40}
                headerHeight={40}
                initialState={{
                  sorting: {
                    sortModel: [{ field: "id", sort: "asc" }],
                  },
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={notificationType} sx={{ width: "100%" }}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ViewPartners;
