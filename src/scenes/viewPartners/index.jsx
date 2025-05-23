import React, { useEffect, useState } from "react";
import {
  Box,
  useTheme,
  IconButton,
  InputBase,
  Snackbar,
  Alert,
  Button,
  Dialog,
  Grid,
  Typography,
  DialogContent,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import DetailCard from "../../components/DetailCard";
import DetailItem from "../../components/DetailItem";
import StatBox from "../../components/StatBox";
import DescriptionIcon from "@mui/icons-material/Description";
import InfoIcon from "@mui/icons-material/Info";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import StatBoxSkeleton from "../../components/skeleton/StatBox";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";

const ViewPartners = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:768px)");
  const isMobile = useMediaQuery("(min-width:521px)");

  const [viewLeadersData, setViewLeadersData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");
  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://app.buy2rent.eu/list-leads", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.status === "success") {
          // Unwrap the nested array if necessary
          let leadsData = response.data.leads;
          if (Array.isArray(leadsData) && Array.isArray(leadsData[0])) {
            leadsData = leadsData[0];
          }
          setViewLeadersData(leadsData);
          setFilteredData(leadsData);
        } else {
          throw new Error(response.data.message || "Failed to fetch leads");
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setViewLeadersData([]);
          setNotificationType("warning");
          setNotificationMessage(
            err.response.data.message ||
              "No Partner found for this user. Please Create or Upload your Partners"
          );
          setShowNotification(true);
        } else {
          setError(err.message);
        }
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

  // Do not toggle global loading for deletion
  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem("authToken");
      const response = await axios.delete(
        `https://app.buy2rent.eu/delete-lead/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotificationType("success");
      setNotificationMessage(
        response.data.message || "Lead deleted successfully!"
      );

      // Remove the deleted lead from the UI immediately
      setViewLeadersData((prevData) =>
        prevData.filter((lead) => lead.id !== id)
      );
      setFilteredData((prevData) => prevData.filter((lead) => lead.id !== id));
    } catch (error) {
      let errorMessage = "Error deleting lead. Please try again.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      setNotificationType("error");
      setNotificationMessage(errorMessage);
      console.error("Error deleting lead:", error);
    } finally {
      setShowNotification(true);
    }
  };

  // 🔍 Search Function with null checks
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredResults = viewLeadersData.filter(
      (partner) =>
        (partner.fullname ? partner.fullname.toLowerCase() : "").includes(
          query
        ) || (partner.email ? partner.email.toLowerCase() : "").includes(query)
    );

    setFilteredData(filteredResults);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      headerAlign: "center",
      minWidth: 50,
      align: "center",
    },
    { field: "fullname", minWidth: 120, headerName: "Full Name", flex: 1 },
    { field: "email", minWidth: 130, headerName: "Email", flex: 1.25 },
    {
      field: "phone_number",
      headerName: "Phone Number",
      flex: 1,
      minWidth: 120,
      valueGetter: (params) =>
        `+${params.row.country_code} ${params.row.mobile_number}`,
    },
    {
      field: "company_name",
      minWidth: 120,
      headerName: "Company Name",
      flex: 1,
    },
    {
      field: "partner_definition",
      headerName: "Partner Definition",
      flex: 0.75,
      minWidth: 100,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.75,
      headerAlign: "center",
      minWidth: 100,
      align: "center",
      renderCell: (params) => (
        <Box display="flex" gap=".1em" justifyContent="center">
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
          >
            <VisibilityIcon color="success" sx={{ fontSize: "14px" }} />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.id)}
            aria-label="delete"
          >
            <DeleteIcon color="error" sx={{ fontSize: "14px" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await axios.get(
        "https://app.buy2rent.eu/list-leads?export=csv",
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
      setIsDownloading(false);
    }
  };

  // View partner details
  const handleView = (id) => {
    const selected = viewLeadersData.find((lead) => lead.id === id);
    if (selected) {
      setSelectedLead(selected);
    } else {
      setDialogError("Lead details not found");
    }
  };

  const [selectedLead, setSelectedLead] = useState(null);
  const [dialogError, setDialogError] = useState(null);

  const handleCloseDialog = () => {
    setSelectedLead(null);
    setDialogError(null);
  };

  const totalPartners = viewLeadersData.length;
  const totalVendors = viewLeadersData.filter(
    (partner) =>
      (partner.partner_definition?.trim().toLowerCase() || "") === "vendors"
  ).length;
  const totalClients = viewLeadersData.filter(
    (partner) =>
      (partner.partner_definition?.trim().toLowerCase() || "") === "clients"
  ).length;

  return (
    <SkeletonTheme
      baseColor={theme.palette.mode === "dark" ? "#333" : "#e0e0e0"}
      highlightColor={theme.palette.mode === "dark" ? "#444" : "#f5f5f5"}
    >
      <Box m="20px">
        {/* HEADER */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap="10px"
        >
          <Header
            title="VIEW PARTNERS"
            subtitle="List of Partners for Future Reference"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: isNonMobile ? "auto" : "100%",
            }}
          >
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
                <CircularProgress
                  size={20}
                  sx={{ color: "#fff", mr: "10px" }}
                />
              ) : (
                <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              )}
              {isDownloading ? "DOWNLOADING....." : "DOWNLOAD LEADS"}
            </Button>
          </Box>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          {/* ROW 1 */}

          <Box
            gridColumn={
              isNonMobile ? "span 4" : isMobile ? "span 8" : "span 12"
            }
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="8px"
          >
            {loading ? (
              <StatBoxSkeleton />
            ) : (
              <StatBox
                title={totalPartners}
                subtitle="Total Patners"
                progress="0.3"
                increase="+30%"
                icon={
                  <PersonOutlineIcon
                    sx={{ color: colors.grey[200], fontSize: "26px" }}
                  />
                }
              />
            )}
          </Box>
          <Box
            gridColumn={
              isNonMobile ? "span 4" : isMobile ? "span 6" : "span 12"
            }
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="8px"
          >
            {loading ? (
              <StatBoxSkeleton />
            ) : (
              <StatBox
                title={totalVendors} // ✅ Dynamic total vendors
                subtitle="Total Vendors"
                progress="0.25"
                increase="+25%"
                icon={
                  <Inventory2Icon
                    sx={{ color: colors.grey[200], fontSize: "26px" }}
                  />
                }
              />
            )}
          </Box>
          <Box
            gridColumn={
              isNonMobile ? "span 4" : isMobile ? "span 6" : "span 12"
            }
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="8px"
          >
            {loading ? (
              <StatBoxSkeleton />
            ) : (
              <StatBox
                title={totalClients}
                subtitle="Total Clients"
                progress="0.11"
                increase="+11%"
                icon={
                  <SupervisorAccountIcon
                    sx={{ color: colors.grey[200], fontSize: "26px" }}
                  />
                }
              />
            )}
          </Box>
        </Box>

        <Box
          gridColumn="span 12"
          backgroundColor={colors.primary[400]}
          pt=".5em"
          mt={"20px"}
          borderRadius={"4px"}
        >
          <Box
            display="flex"
            justifyContent="end"
            alignItems="center"
            flexWrap="wrap"
            p={isNonMobile ? "0 2em" : "0 1em"}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                gap: isNonMobile ? "1em" : ".5em",
              }}
            >
              <Box
                display="flex"
                backgroundColor={colors.grey[500]}
                borderRadius="0px"
                sx={{
                  width: isNonMobile ? "250px" : undefined,
                  borderRadius: "25px",
                  margin: isNonMobile ? "1em" : ".5em 0",
                  backgroundColor: "#ccc",
                  border: `1px solid white`,
                  color: "#000",
                }}
              >
                <InputBase
                  sx={{ ml: 2, flex: 1, color: "#000" }}
                  placeholder="Searchy Partners Name"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <IconButton type="button" sx={{ p: 1 }}>
                  <SearchIcon sx={{ color: "#000" }} />
                </IconButton>
              </Box>
              <Box
                onClick={() => console.log("Filter By Clicked")}
                sx={{
                  flex: 0.25,
                  padding: "0.6em 1em ",
                  width: "fit-content",
                  position: "relative",
                  background: "linear-gradient(45deg, #062994, #0E72E1)",
                  color: "#fff",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: isNonMobile ? ".5em" : "0",
                  cursor: "pointer",
                }}
              >
                <FilterAltIcon />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  textAlign="center"
                  width="60px"
                >
                  Filter By
                </Typography>
                <ArrowDropDownIcon />
              </Box>
            </Box>
          </Box>

          {loading ? (
            <Box
              gridColumn="span 12"
              // mt="20px"
              padding={"1em"}
              backgroundColor={colors.primary[400]}
            >
              <TableSkeleton rows={5} columns={8} />
            </Box>
          ) : (
            <Box
              gridColumn="span 12"
              height="450px"
              sx={{
                overflowX: "auto",
                overflowY: "hidden",
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
                    rows={filteredData}
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
          )}
        </Box>

        <Dialog
          open={!!selectedLead}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: "1em",
              boxShadow: "0px 16px 32px rgba(0, 0, 0, 0.4)",
              border: `1px solid ${colors.grey[700]}`,
            },
          }}
        >
          <DialogContent
            dividers
            sx={{
              backgroundColor: colors.primary[400],
              padding: isNonMobile ? "2em" : "1em 0",
            }}
          >
            {dialogError ? (
              <Typography
                variant="body1"
                align="center"
                sx={{
                  color: "#EF5350",
                  fontWeight: "500",
                  padding: "16px",
                  borderRadius: "8px",
                }}
              >
                {dialogError}
              </Typography>
            ) : (
              selectedLead && (
                <Grid container spacing={3}>
                  {/* Basic Information */}
                  <Grid item xs={12} md={6}>
                    <DetailCard
                      title="Basic Information"
                      icon={
                        <InfoIcon
                          sx={{
                            color: colors.blueAccent[500],
                            fontSize: "24px",
                          }}
                        />
                      } // Green icon
                    >
                      <DetailItem label="ID" value={selectedLead.id} />
                      <DetailItem
                        label="Full Name"
                        value={selectedLead.fullname}
                      />
                      <DetailItem label="Email" value={selectedLead.email} />
                      <DetailItem
                        label="Mobile Number"
                        value={`+${selectedLead.country_code} ${selectedLead.mobile_number}`}
                      />
                      <DetailItem
                        label="Country"
                        value={selectedLead.country}
                      />
                      <DetailItem label="State" value={selectedLead.state} />
                      <DetailItem label="City" value={selectedLead.city} />
                    </DetailCard>
                  </Grid>

                  {/* Additional Information */}
                  <Grid item xs={12} md={6}>
                    <DetailCard
                      title="Additional Information"
                      icon={
                        <DescriptionIcon
                          sx={{
                            color: colors.blueAccent[400],
                            fontSize: "24px",
                          }}
                        />
                      } // Blue icon
                    >
                      <DetailItem
                        label="Company Name"
                        value={selectedLead.company_name}
                      />
                      <DetailItem
                        label="Company Size"
                        value={selectedLead.company_size}
                      />
                      <DetailItem
                        label="Job Title"
                        value={selectedLead.job_title}
                      />
                      <DetailItem
                        label="Partner Definition"
                        value={selectedLead.partner_definition}
                      />
                    </DetailCard>
                  </Grid>
                </Grid>
              )
            )}
          </DialogContent>
        </Dialog>

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
    </SkeletonTheme>
  );
};

export default ViewPartners;
