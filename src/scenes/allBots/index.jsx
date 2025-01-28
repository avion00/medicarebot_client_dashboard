import {
  Box,
  Button,
  Typography,
  useTheme,
  IconButton,
  InputBase,
  Switch,
} from "@mui/material";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { AllBotData } from "../../data/allBotData";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useLocation } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import { motion } from "framer-motion";

const AllBots = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const [, /* token */ setToken] = useState(null);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 768px)"); // For screens >= 768px
  const isTab = useMediaQuery("(min-width: 1200px)"); // For screens >= 1200px (Tablet and larger)
  const isSmallTab = useMediaQuery("(min-width: 961px)"); // For screens >= 961px (Tablet and larger)

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const extractedToken = queryParams.get("token");
    if (extractedToken) {
      localStorage.setItem("resetToken", extractedToken);
      setToken(extractedToken);
    }
  }, [location.search]);

  // Event Handlers
  const handleEdit = (id) => {
    console.log("Edit clicked for ID:", id);
    // Add your logic for editing the bot here
  };

  const handleView = (id) => {
    console.log("View clicked for ID:", id);
    // Add your logic for viewing the bot details here
  };

  // Mock data for rows
  const [botData, setBotData] = useState(AllBotData);

  // Toggle handler for the button
  const handleToggle = (id) => {
    setBotData((prevData) =>
      prevData.map((row) =>
        row.id === id
          ? { ...row, status: row.status === "Active" ? "Inactive" : "Active" }
          : row
      )
    );
  };

  // DataGrid Columns
  const columns = [
    { field: "id", headerName: "ID", flex: 0.25 },
    {
      field: "botName",
      headerName: "Bot Name",
      flex: 1,
      cellClassName: "bot-name-column--cell",
    },
    {
      field: "channel",
      headerName: "Channel",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const isActive =
          params.row.status === "active" || params.row.status === "Active";
        return (
          <Typography
            variant="h6"
            sx={{
              backgroundColor: isActive
                ? colors.greenAccent[700]
                : colors.redAccent[700],
              borderRadius: "20px",
              padding: "2px 10px",
            }}
          >
            {params.row.status}
          </Typography>
        );
      },
    },
    {
      field: "lastInteraction",
      headerName: "Last Interaction",
      flex: 1,
      renderCell: (params) => (
        <Typography variant="h6" color={colors.blueAccent[100]}>
          {params.row.lastInteraction}
        </Typography>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.75,
      renderCell: (params) => (
        <Box display="flex" gap=".5em">
          <IconButton
            onClick={() => handleEdit(params.row.id)}
            aria-label="edit"
            sx={{ color: colors.greenAccent[300] }}
          >
            <EditIcon sx={{ fontSize: "16px" }} />
          </IconButton>
          <IconButton
            onClick={() => handleView(params.row.id)}
            aria-label="view"
            sx={{ color: colors.grey[200] }}
          >
            <VisibilityIcon sx={{ fontSize: "16px" }} />
          </IconButton>
        </Box>
      ),
    },
    {
      field: "Start/Stop",
      headerName: "Start/Stop",
      flex: 0.5,
      renderCell: (params) => {
        const isOn = params.row.status === "Active";
        return (
          <Box display="flex" alignItems="center">
            <Switch
              checked={isOn}
              onChange={() => handleToggle(params.row.id)}
              inputProps={{ "aria-label": "controlled" }}
              sx={{
                "&.Mui-checked": {
                  color: "green",
                  transition: "all .3s ease-out",
                },
                "& .MuiSwitch-thumb": {
                  backgroundColor: isOn
                    ? colors.greenAccent[700]
                    : colors.redAccent[700],
                },
                "& .MuiSwitch-track": {
                  backgroundColor: isOn
                    ? colors.greenAccent[700]
                    : colors.redAccent[700],
                },
              }}
            />
          </Box>
        );
      },
    },
  ];

  // JSON Data
  const data = {
    totalBots: 910,
    activeBots: 512,
  };

  // Calculate Progress
  const progressPercentage = (data.activeBots / data.totalBots) * 100;
  const progressAngle = (progressPercentage / 100) * 360;

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Header
          title="ALL BOTS OVERVIEW"
          subtitle="Welcome to All Bots Overview"
        />
        <Box>
          <Button
            onClick={() => navigate("/addbot")}
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
          >
            <AddIcon sx={{ mr: "10px" }} />
            Add New Bot
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridTemplateRows="140px"
        columnGap="20px"
      >
        {/* ROW 1 */}

        <Box
          gridColumn={
            isTab
              ? "span 4"
              : isSmallTab
              ? "span 6"
              : isNonMobile
              ? "span 8"
              : "span 12"
          }
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="8px"
          overflow="auto"
        >
          <Box
            // gridColumn="span 4"
            gridRow="span 2"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
            p={{ xs: "20px", md: "30px" }}
          >
            {/* Dynamic Progress Circle */}
            <Box
              sx={{
                background: `conic-gradient(
                  ${colors.blueAccent[400]} 0deg ${progressAngle}deg, 
                  ${colors.redAccent[500]} ${progressAngle}deg 360deg
                )`,
                borderRadius: "50%",
                width: "150px",
                height: "150px",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Optional: to add depth
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: "20%",
                  left: "20%",
                  width: "60%",
                  height: "60%",
                  background: colors.primary[400],
                  borderRadius: "50%",
                },
              }}
            />

            {/* Data Boxes */}
            <Box
              sx={{
                position: "absolute",
                bottom: "2em",
                left: "2em",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: "2",
              }}
            >
              <Typography
                variant="h5"
                color={colors.redAccent[500]}
                fontWeight="bold"
              >
                {data.totalBots - data.activeBots}
              </Typography>
              <Typography
                variant="h6"
                color={colors.redAccent[500]}
                fontWeight="medium"
              >
                Inactive Bots
              </Typography>
            </Box>

            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: "2",
              }}
            >
              <Typography
                variant="h5"
                color={colors.grey[200]}
                fontWeight="bold"
              >
                {data.totalBots}
              </Typography>
              <Typography
                variant="h6"
                color={colors.grey[200]}
                fontWeight="medium"
              >
                Total Bots
              </Typography>
            </Box>

            <Box
              sx={{
                position: "absolute",
                right: "2em",
                top: "2em",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: "2",
              }}
            >
              <Typography
                variant="h5"
                color={colors.blueAccent[400]}
                fontWeight="bold"
              >
                {data.activeBots}
              </Typography>
              <Typography
                variant="h6"
                color={colors.blueAccent[400]}
                fontWeight="medium"
              >
                Active Bots
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* <Box
          gridColumn={isNonMobile ? "span 4" : isMobile ? "span 6" : "span 12"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="8px"
        >
          <StatBox
            title="855"
            subtitle="Total Bots"
            progress="0.81"
            increase="+81%"
            icon={
              <SmartToyIcon
                sx={{ color: colors.blueAccent[400], fontSize: "26px" }}
              />
            }
          />
        </Box> */}

        {/* <Box
          gridColumn={isNonMobile ? "span 4" : isMobile ? "span 6" : "span 12"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="8px"
        >
          <StatBox
            title="540"
            subtitle="Active Bots"
            progress="0.750"
            increase="+71%"
            icon={
              <DirectionsRunIcon
                sx={{ color: colors.blueAccent[400], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={isNonMobile ? "span 4" : isMobile ? "span 12" : "span 12"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="8px"
        >
          <StatBox
            title="354"
            subtitle="Inactive Bots"
            progress="0.37"
            increase="+37%"
            icon={
              <HailIcon
                sx={{ color: colors.redAccent[400], fontSize: "26px" }}
              />
            }
          />
        </Box> */}

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          mt="20px"
          backgroundColor={colors.primary[400]}
        >
          <Box>
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
          </Box>
          <Box
            gridColumn="span 12"
            height="380px"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
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
            <DataGrid
              checkboxSelection
              rows={botData}
              columns={columns}
              rowHeight={40}
              headerHeight={40}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AllBots;
